<template>
    <div class="page-container">
        <div class="main-panel">    
            <div class="table-panel">
                <!-- 筛选条件 -->
                <el-form :inline="true" :model="filters">
                    <el-form-item label="姓名">
                        <el-input v-model="filters.studentName" placeholder="输入学生姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                        <el-input v-model="filters.studentNo" placeholder="输入学号"></el-input>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-input v-model="filters.className" placeholder="输入学生班级"></el-input>
                    </el-form-item>
                    <el-form-item label="体测结果">
                        <el-select class="sm" v-model="filters.testResult" placeholder="体测结果">
                            <el-option label="没测" value="1"></el-option>
                            <el-option label="免测" value="2"></el-option>
                            <el-option label="不及格" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="showClassSelect">
                        <el-button type="primary" @click="getPhysicalTest">在该班级中筛选</el-button>
                    </el-form-item>
                    <br>
                    <el-form-item label="学年">
                        <el-select class="sm" v-model="filters.schoolYear" placeholder="学年" value-key="id" v-on:change="getSelectCondition">
                            <el-option v-for="item in options.schoolYear" :key="item.id" :label="item.schoolYear" :value="item.schoolYear"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期">
                        <el-select class="sm" v-model="filters.term" placeholder="学期" v-on:change="getSelectCondition">
                            <el-option label="第一学期" value="1"></el-option>
                            <el-option label="第二学期" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="教师姓名">
                        <el-autocomplete class="inline-input" v-model="filters.teacherName" :fetch-suggestions="querySearch" placeholder="教师姓名" @select="getSelectCondition"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="课程名">
                        <el-select class="sm" v-model="filters.courseName" placeholder="课程名" value-key="id" v-on:change="getSelectCondition">
                            <el-option v-for="item in options.courseName" :key="item.id" :label="item.courseName" :value="item.courseName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="课程时间">
                        <el-select class="sm" v-model="filters.courseTime" placeholder="课程时间">
                            <el-option v-for="item in options.courseTime" :key="item.id" :label="item.courseTime" :value="item.courseTime"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getNewPhysicalTest">筛选所有</el-button>
                    </el-form-item>
                </el-form>
                <!-- 筛选条件 end -->
                <!-- 显示体测记录列表 -->
                <el-table :data="physicalList" v-loading="loading" element-loading-text="玩命加载中">
                    <el-table-column prop="studentNo" label="学号" width="150" fixed>
                    </el-table-column>
                    <el-table-column prop="studentName" label="姓名" fixed>
                    </el-table-column>
                    <el-table-column prop="collegeName" label="学院" width="120">
                    </el-table-column>
                    <el-table-column prop="className" label="班级" width="150">
                    </el-table-column>
                    <el-table-column label="性别">
                        <template scope="scope">
                            <span>{{scope.row.isMan ? "男" : "女"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalScore" label="总分">
                    </el-table-column>
                    <el-table-column prop="height" label="身高(cm)" width="100">
                    </el-table-column>
                    <el-table-column prop="weight" label="体重(kg)" width="100">
                    </el-table-column>
                    <el-table-column prop="vitalCapacity" label="肺活量(ml)" width="130">
                    </el-table-column>
                    <el-table-column prop="standingLongJump" label="立定跳远(cm)" width="130">
                    </el-table-column>
                    <el-table-column prop="sitAndReach" label="坐位体前屈(cm)" width="140">
                    </el-table-column>
                    <el-table-column label="仰卧起坐(个/分)/引体向上(个)" width="150">
                        <template scope="scope">
                            <span>{{scope.row.isMan ? scope.row.pullUp : scope.row.oneMinuteSitUp}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fiftyRunTime" label="50米跑(s)" width="130">
                    </el-table-column>
                    <el-table-column label="800米/1000米(min)" width="160">
                        <template scope="scope">
                            <span>{{scope.row.isMan ? scope.row.oneThousandRunTime : scope.row.eightHundredRunTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isMan" label="备注" width="120">
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination @current-change="getPhysicalTest" :current-page.sync="pageNumber" :page-size="10" layout="prev, pager, next, jumper"
                        :total="dataCount">
                    </el-pagination>
                </div>
                <!-- 显示体测记录列表 end -->
            </div>  
        </div>
    </div>
</template>

<script>
    import resources from '../../resources'
    //根据条件信息筛选体测记录
    const coursePhysicalQuery = `
        query(
            $universityId: Long
            $pageNumber: Int
            $pageSize: Int
            $className: String
            $studentName: String
            $studentNo: String
            $testResult: Int
            $schoolYear: String
            $term: Int
            $teacherName: String
            $courseName: String
            $courseTime: String
            $classId: Int
        ){
            allstudents:searchCoursePhysicalTest(
                universityId: $universityId
                pageNumber: $pageNumber
                pageSize: $pageSize
                className: $className
                studentName: $studentName
                studentNo: $studentNo
                testResult: $testResult
                schoolYear: $schoolYear
                term: $term
                teacherName: $teacherName
                courseName: $courseName
                courseTime: $courseTime
                classId: $classId
            ){
                pageNum
                pageSize
                pagesCount
                dataCount
                data {
                        isMan
                        studentNo
                        collegeName
                        studentName
                        className
                        totalScore
                        height
                        weight
                        vitalCapacity
                        standingLongJump
                        sitAndReach
                        oneMinuteSitUp
                        pullUp
                        fiftyRunTime
                        eightHundredRunTime
                        oneThousandRunTime
                    }
                }
            }
        }
    `;
    //教学班筛选条件
    const conditionQuery = `
        query(
            $universityId: Long
            $teacherName: String
            $courseName: String
            $schoolYear: String
            $term: Int
        ){
            university(
                id: $universityId
            ){
                teacherNameList(
                    schoolYear: $schoolYear
                    term: $term
                    ){
                    id
                    teacherName
                }
                schoolYearList{
                    id
                    schoolYear
                }
                courseNameList(
                    schoolYear: $schoolYear
                    term: $term
                    teacherName: $teacherName
                    ){
                    id
                    courseName
                }
                courseTimeList(
                    teacherName: $teacherName
                    courseName: $courseName
                    schoolYear: $schoolYear
                    term: $term
                    ){
                    id
                    courseTime
                }
            }
        }
    `
    export default {
        data() {
            return {
                universityId: resources.universityId,
                classId: this.$route.params.classId,
                pageSize: 10,
                pageNumber: 1,
                dataCount: 0,
                loading: false,
                showClassSelect: false,
                options: {
                    teacherName: [],
                    schoolYear: [],
                    courseName: [],
                    courseTime: [],
                },
                filters: {
                    studentName: '',
                    studentNo: '',
                    className: '',
                    testResult: '',
                    schoolYear: '',
                    term: '',
                    teacherName: '',
                    courseName: '',
                    courseTime: ''
                },
                physicalList: [],
                teacherNameList: [],
            }
        },

        methods: {
            querySearch(queryString, cb) {
                var teacherNames = this.teacherNameList;
                var results = queryString ? teacherNames.filter(this.createFilter(queryString)) : teacherNames;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (teacherName) => {
                return (teacherName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            //开始新的筛选，同时去除班级id
            getNewPhysicalTest() {
                let _this = this;
                _this.classId = -1;
                _this.showClassSelect = false;
                _this.pageNumber = 1;
                this.getPhysicalTest()
            },
            //根据筛选条件筛选学生体测记录
            getPhysicalTest() {
                let _this = this;
                let params = {
                    "universityId": this.universityId,
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber
                };
                if (typeof(this.classId) != 'undefined' && this.classId !== -1) {
                    params.classId = this.classId
                    _this.showClassSelect = true;
                } else {
                    _this.showClassSelect = false;
                }
                if (this.filters.studentName !== '') {
                    params.studentName = this.filters.studentName
                }
                if (this.filters.studentNo !== '') {
                    params.studentNo = this.filters.studentNo
                }
                if (this.filters.className !== '') {
                    params.className = this.filters.className
                }
                if (this.filters.testResult !== '') {
                    params.testResult = parseInt(this.filters.testResult)
                }
                if (this.filters.schoolYear !== '') {
                    params.schoolYear = this.filters.schoolYear
                }
                if (this.filters.term !== '') {
                    params.term = parseInt(this.filters.term)
                }
                if (this.filters.teacherName !== '') {
                    params.teacherName = this.filters.teacherName
                }
                if (this.filters.courseName !== '') {
                    params.courseName = this.filters.courseName
                }
                if (this.filters.courseTime !== '') {
                    params.courseTime = this.filters.courseTime
                }
                this.getDate(params)
            },
            getDate(params){
                let _this = this;
                this.loading = true;
                _this.physicalList = [];
                this.$ajax.post(`${resources.graphQlApi}`,{
                                'query': `${coursePhysicalQuery}`,
                                variables: params
                    })
                    .then(res => {
                        this.loading = false;
                        _this.dataCount = res.data.data.allstudents.dataCount;
                        this.physicalList = res.data.data.allstudents.data;
                    });
            },
            //根据前置条件获取教学班筛选条件
            getSelectCondition(){
                let _this = this;
                let params = {
                    "universityId": this.universityId
                };
                if (this.filters.schoolYear !== '') {
                    params.schoolYear = this.filters.schoolYear
                }
                if (this.filters.term !== '') {
                    params.term = parseInt(this.filters.term)
                }
                if (this.filters.teacherName !== '') {
                    params.teacherName = this.filters.teacherName
                }
                if (this.filters.courseName !== ''){
                    params.courseName = this.filters.courseName
                }
                this.getCondition(params)
            },
            //教学班筛选条件获取
            getCondition(params){
                let _this = this;
                _this.options.schoolYear = [];
                _this.options.teacherName = [];
                _this.options.courseName = [];
                _this.options.courseTime = [];
                _this.teacherNameList = [];
                this.$ajax.post(`${resources.graphQlApi}`, {
                                'query': `${conditionQuery}`,
                                variables: params
                    })
                .then(res => {
                     _this.options.schoolYear = res.data.data.university.schoolYearList;
                    //  if (this.filters.schoolYear =='') {
                    //     this.filters.schoolYear = _this.options.schoolYear[0].schoolYear;
                    //  }
                     _this.options.teacherName = res.data.data.university.teacherNameList;
                     _this.options.courseName = res.data.data.university.courseNameList;
                     _this.options.courseTime = res.data.data.university.courseTimeList;
                     for (var i = 0;i < _this.options.teacherName.length;i ++) {
                         this.teacherNameList.push({
                             "value": this.options.teacherName[i].teacherName
                         })
                     }
                });
            }

        },
        mounted: function () {
            this.getSelectCondition(),
            this.getPhysicalTest()
        }
    }
</script>
<style lang="scss" scoped>
    .page-container {
        color: #666;
        min-width: 1200px;
        .sm {
            width: 105px;
        }
        .table-panel {
            margin-top: 20px;
        }
        .title {
            line-height: 2.5;
            font-weight: bold;
            font-size: 14px;
        }
        .page {
            text-align: center;
            margin: 10px;
        }
        .el-input {
            width: 145px;
        }
        .el-date-editor {
            width: 280px;
        }
        .pointer {
            cursor: pointer;
            color: #29b6f6;
        }
        .success {
            color: #13CE66;
        }
        .error {
            color: #FF4949;
        }
        #container {
            width: 650px;
            height: 500px;
            margin: 0px;
        }
    }
</style>