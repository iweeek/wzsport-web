<template>
    <div class="page-container">
        <div class="main-panel">
            <!-- 体测列表 -->
            <div class="table-panel">
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
                        <el-select class="sm" v-model="filters.result" placeholder="体测结果">
                            <el-option label="没测" value="1"></el-option>
                            <el-option label="免测" value="2"></el-option>
                            <el-option label="不及格" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="学年">
                        <el-select class="sm" v-model="filters.schoolYear" placeholder="学年">
                            <el-option v-for="item in options.schoolYear" :key="item.id" :label="item.schoolYear" :value="item.schoolYear"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期">
                        <el-select class="sm" v-model="filters.term" placeholder="学期">
                            <el-option label="第一学期" value="1"></el-option>
                            <el-option label="第二学期" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="教师姓名">
                        <el-select class="sm" v-model="filters.teacherName" placeholder="教师姓名">
                            <el-option v-for="item in options.teacherName" :key="item.id" :label="item.teacherName" :value="item.teacherName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="课程名">
                        <el-select class="sm" v-model="filters.courseName" placeholder="课程名">
                            <el-option v-for="item in options.courseName" :key="item.id" :label="item.courseName" :value="item.courseName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="课程时间">
                        <el-select class="sm" v-model="filters.courseTime" placeholder="课程时间">
                            <el-option v-for="item in options.courseTime" :key="item.id" :label="item.courseTime" :value="item.courseTime"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getPhysicalTest">筛选</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="physicalList">
                    <el-table-column prop="studentNo" label="学号" fixed>
                    </el-table-column>
                    <el-table-column prop="physicalFitnessTest.name" label="姓名" fixed>
                    </el-table-column>
                    <el-table-column prop="college" label="学院" width="130">
                    </el-table-column>
                    <el-table-column prop="physicalFitnessTest.className" label="班级">
                    </el-table-column>
                    <el-table-column label="性别">
                        <template scope="scope">
                            <span>{{scope.row.physicalFitnessTest.isMan ? scope.row.physicalFitnessTest.className : scope.row.physicalFitnessTest.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="physicalFitnessTest.isMan" label="备注" width="120">
                    </el-table-column>
                    <el-table-column prop="totalPoints" label="总分" width="120">
                    </el-table-column>
                    <el-table-column prop="totalPointsLevel" label="总分等级">
                    </el-table-column>
                    <el-table-column prop="stature" label="身高">
                    </el-table-column>
                    <el-table-column prop="weight" label="体重" width="130">
                    </el-table-column>
                    <el-table-column prop="statureWeightPoint" label="身高体重得分">
                    </el-table-column>
                    <el-table-column prop="statureWeightLevel" label="身高体重等级" width="120">
                    </el-table-column>
                    <el-table-column prop="bmi" label="BMI" width="120">
                    </el-table-column>
                    <el-table-column prop="vitalCapacity" label="肺活量成绩" width="120">
                    </el-table-column>
                    <el-table-column prop="vitalCapacityPoint" label="肺活量得分" width="120">
                    </el-table-column>
                    <el-table-column prop="vitalCapacityLevel" label="肺活量等级" width="120">
                    </el-table-column>
                    <el-table-column prop="standJump" label="立定跳远成绩" width="120">
                    </el-table-column>
                    <el-table-column prop="standJumpPoint" label="立定跳远得分" width="120">
                    </el-table-column>
                    <el-table-column prop="standJumpLevel" label="立定跳远等级" width="120">
                    </el-table-column>
                    <el-table-column prop="sittingFlexion" label="坐位体前屈成绩" width="120">
                    </el-table-column>
                    <el-table-column prop="sittingFlexionPoint" label="坐位体前屈得分" width="120">
                    </el-table-column>
                    <el-table-column prop="sittingFlexionLevel" label="坐位体前屈等级" width="120">
                    </el-table-column>
                    <el-table-column prop="sitUps" label="仰卧起坐成绩">
                    </el-table-column>
                    <el-table-column prop="fiftyRun" label="50米跑成绩">
                    </el-table-column>
                    <el-table-column prop="fiftyRunPoint" label="50米跑得分">
                    </el-table-column>
                    <el-table-column prop="fiftyRunLevel" label="50米跑等级">
                    </el-table-column>
                    <el-table-column prop="eightHundredRun" label="800米跑成绩">
                    </el-table-column>
                    <el-table-column prop="startTime" label="运动开始时间" width="170">
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination @current-change="getPhysicalTest" :current-page.sync="pageNumber" :page-size="10" layout="prev, pager, next, jumper"
                        :total="dataCount">
                    </el-pagination>
                </div>
            </div>
            <!-- 体测列表 end -->
        </div>
    </div>
</template>

<script>
    import resources from '../../resources'

    const physicalQuery =
    `
    query(
            $pageNumber: Int
            $pageSize: Int
    ){
        allstudents:searchStudents(
            pageNumber: $pageNumber
            pageSize: $pageSize
        ){
                pageNum
                pageSize
                pagesCount
                dataCount
                data {
                    name
                    physicalFitnessTest {
                        isMan
                        name
                        className
                    }
                }
        }     
    }
    `;
    const classPhysicalQuery = `
        query(
            $pageNumber: Int
            $pageSize: Int
            $classId: Long
        ){
            allstudents:searchStudents(
                classId: $classId
                pageNumber: $pageNumber
                pageSize: $pageSize
            ){
                    pageNum
                    pageSize
                    pagesCount
                    dataCount
                    data {
                        name
                        isMan
                        physicalTest {
                            isMan
                            name
                            className
                        }
                    }
            }
        }
    `;

    const conditionQuery = `
        query($universityId: Long){
            university(id: $universityId){
                teacherNameList{
                    id
                    teacherName
                }
                schoolYearList{
                    id
                    schoolYear
                }
                courseNameList{
                    id
                    courseName
                }
                courseTimeList{
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
                options: {
                    teacherName: null,
                    schoolYear: null,
                    courseName: null,
                    courseTime: null,
                },
                filters: {
                    studentName: '',
                    studentNo: '',
                    className: '',
                    result: '',
                    schoolYear: '',
                    term: '',
                    teacherName: '',
                    courseName: '',
                    courseTime: '',
                    pageSize: 0,
                    pageNumber: 0,
                    classId: 0,
                },
                physicalList: [],
            }
        },
        //hwq 页面显示的数据
        methods: {
            getClassPhysicalTest() {
                let _this = this;
                _this.filters.pageSize = _this.pageSize;
                _this.filters.pageNumber = _this.pageNumber;
                _this.filters.classId = _this.classId;
                _this.physicalList = [];
                this.$ajax.post(`${resources.graphQlApi}`,{
                                'query': `${classPhysicalQuery}`,
                                variables: _this.filters
                    })
                    .then(res => {
                        _this.dataCount = res.data.data.allstudents.dataCount;
                        this.physicalList = res.data.data.allstudents.data;
                        console.log(this.physicalList)
                        for (var i = 0;i < _this.physicalList.length; i++){
                            if(_this.physicalList[i].physicalFitnessTest == null){
                                _this.physicalList.splice(i,1)
                                i -- ;
                            }
                        }
                    });
            },
            getAllPhysicalTest() {            
                let _this = this;
                _this.filters.pageSize = _this.pageSize;
                _this.filters.pageNumber = _this.pageNumber;
                _this.physicalList = [];
                this.$ajax.post(`${resources.graphQlApi}`, {
                                'query': `${physicalQuery}`,
                                variables: _this.filters
                    })
                    .then(res => {
                        _this.dataCount = res.data.data.allstudents.dataCount;
                        //alert(res.data.data.allstudents.data.length)
                        _this.physicalList = res.data.data.allstudents.data.physicalFitnessTest;
                        
                    });
            },
            getPhysicalTest() {
                if (typeof(this.classId) == "undefined") {
                    this.getAllPhysicalTest();
                } else {
                    this.getClassPhysicalTest();
                }
            },
            getSelectCondition(){
                let _this = this;
                _this.schoolYearList = [];
                _this.teacherNameList = [];
                _this.courseNameList = [];
                _this.courseTimeList = [];
                this.$ajax.post(`${resources.graphQlApi}`, {
                                'query': `${conditionQuery}`,
                                variables: {
                                    "universityId":this.universityId
                                }       
                    })
                .then(res => {
                     _this.options.schoolYear = res.data.data.university.schoolYearList;
                     _this.options.teacherName = res.data.data.university.teacherNameList;
                     _this.options.courseName = res.data.data.university.courseNameList;
                     _this.options.courseTime = res.data.data.university.courseTimeList;
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