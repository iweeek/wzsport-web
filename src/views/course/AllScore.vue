<template>
    <div class="page-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/courses' }">学科管理</el-breadcrumb-item>
            <el-breadcrumb-item>查看体育成绩</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="24" class="grade-filters">
            <el-form :inline="true" :model="gradeFilters">
                <el-form-item label="学院">
                    <el-select class="filter-college" v-model="filters.college" placeholder="学院">
                        <el-option label="计算机学院" value="计算机学院"></el-option>
                        <el-option label="美术学院" value="美术学院"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业">
                    <el-select class="filter-major" v-model="filters.major" placeholder="专业">
                        <el-option label="信息工程" value="信息工程"></el-option>
                        <el-option label="绘画" value="绘画"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级">
                    <el-select class="filter-grade" v-model="filters.grade" placeholder="年级">
                        <el-option label="2011" value="2011"></el-option>
                        <el-option label="2012" value="2012"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select class="filter-grade" v-model="filters.classes" placeholder="班级">
                        <el-option label="营销11班" value="营销11班"></el-option>
                        <el-option label="营销2班" value="营销2班"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-col>
        <div class="main-panel">
            <el-col class="table-panel panel">
                <el-col :span="24" class="title">
                    学生
                </el-col>
                <el-col :span="24">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-input v-model="filters.name" placeholder="输入学生姓名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="filters.id" placeholder="输入学生学号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select class="filter-sex" v-model="filters.sex" placeholder="性别">
                                <el-option label="男" value="boy"></el-option>
                                <el-option label="女" value="girl"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-select class="filter-sex" v-model="filters.term" placeholder="选择学期">
                                <el-option label="2016~2017第一学期" value="2016-1"></el-option>
                                <el-option label="2016~2017第二学期" value="2016-2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getStuedents">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <el-table :data="tableData">
                    <el-table-column prop="name" label="姓名" width="90">
                    </el-table-column>
                    <el-table-column prop="studentNo" label="学号" width="100">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" width="90">
                    </el-table-column>
                    <el-table-column prop="termId" label="学期" width="100">
                    </el-table-column>
                    <el-table-column prop="meter50SprintTime" label="50米（秒）" width="100">
                    </el-table-column>
                    <el-table-column prop="meter50SprintScore" label="得分" width="90">
                    </el-table-column>
                    <el-table-column prop="standingJumpDistance" label="立定跳远（厘米）" width="100">
                    </el-table-column>
                    <el-table-column prop="standingJumpScore" label="得分" width="90">
                    </el-table-column>
                    <el-table-column prop="meter1500RunTime" label="1500米（秒）" width="100">
                    </el-table-column>
                    <el-table-column prop="meter1500RunScore" label="得分" width="90">
                    </el-table-column>
                    <el-table-column prop="abdominalCurlCount" label="仰卧起坐（个）" width="100">
                    </el-table-column>
                    <el-table-column prop="abdominalCurlScore" label="得分" width="90">
                    </el-table-column>
                </el-table>

                <div class="page">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="3" layout="prev, pager, next, jumper"
                        :total="10">
                    </el-pagination>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    // 获取体育成绩数据
    const scoreQuery = gql`
        query(
            $classId: Long
            $name: String
            $studentNo: String
            $isMan: Boolean
            $pageNumber: Int
            $pageSize: Int
        ){
            allScore:searchStudents(
                classId: $classId
                name: $name
                studentNo: $studentNo
                isMan: $isMan
                pageNumber: $pageNumber
                pageSize: $pageSize
            ){
                pageNum
                pageSize
                data{
                    name
                    studentNo
                    isMan
                    sportScores{
                        termId
                        meter50SprintTime
                        meter50SprintScore
                        standingJumpDistance
                        standingJumpScore
                        meter1500RunTime
                        meter1500RunScore
                        abdominalCurlCount
                        abdominalCurlScore
                    }
                }
            }
        }
    `;
    export default {
        data() {
            return {
                classId: 1,
                filters: {
                    name: '',
                    id: '',
                    sex: '',
                    term: '',
                    classes: ''
                },
                gradeFilters: {
                    college: '',
                    major: '',
                    grade: ''
                },
                total: 0,
                currentPage: 1,
                listLoading: false,
                tableData: [{
                    studentNo: '20170516',
                    name: '王小虎',
                    sex: '男',
                    termId: '2016~2017第一学期',
                    meter50SprintTime: 8.42,
                    meter50SprintScore: 72,
                    jump: 1.78,
                    jumpScore: 40,
                    longrun: 451,
                    longrunScore: 40,
                    situp: 20,
                    situpScore: 15
                }]
            }
        },
        methods: {
            //获取列表
            getStuedents() {
                let params = {
                    page: this.page,
                    name: this.filters.name,
                    id: this.filters.id,
                    sex: this.filters.sex,
                    term: this.filters.term,
                };
                this.listLoading = true;
                console.log('发送获取学生信息请求');
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            getSports() {
            }
        },
        apollo: {
            allScore: {
                query: scoreQuery,
                variables() {
                    return {
                        "pageSize": 10,
                        "pageNumber": 1
                    }
                },
                result(data) {
                    let _this = this;
                    _this.tableData = [];
                    data.data.allScore.data.forEach(item => {
                        let listItem = {
                            studentNo: '',
                            name: '',
                            sex: '',
                            termId: '',
                            meter50SprintTime: 8.42,
                            meter50SprintScore: 72,
                            standingJumpDistance: 1.78,
                            standingJumpScore: 40,
                            meter1500RunTime: 451,
                            meter1500RunScore: 40,
                            abdominalCurlCount: 20,
                            abdominalCurlScore: 15
                        };
                        listItem.name = item.name;
                        listItem.sex = item.isMan ? '男':'女';
                        listItem.studentNo = item.studentNo;
                        listItem.termId = item.sportScores[0].termId;
                        listItem.meter50SprintScore = item.sportScores[0].meter50SprintScore;
                        listItem.meter50SprintTime = item.sportScores[0].meter50SprintTime;
                        listItem.abdominalCurlCount = item.sportScores[0].abdominalCurlCount;
                        listItem.abdominalCurlScore = item.sportScores[0].abdominalCurlScore;
                        listItem.meter1500RunScore = item.sportScores[0].meter1500RunScore;
                        listItem.meter1500RunTime = item.sportScores[0].meter1500RunTime;
                        listItem.standingJumpDistance = item.sportScores[0].standingJumpDistance;
                        listItem.standingJumpScore = item.sportScores[0].standingJumpScore;

                        _this.tableData.push(listItem);
                    });
                }
            }
        },
        mounted: function () {
            
        }
    }

</script>
<style lang="scss" scoped>
    .page-container {
        color: #666;
        .panel {
            border: 1px solid #d4d4d4;
            padding: 5px 15px 15px;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        .grade-filters{
            margin-top: 10px;
        }
        .title,
        .grade-filters {
            line-height: 2.5;
            font-weight: bold;
            font-size: 14px;
        }
        .page {
            text-align: center;
            margin: 10px;
        }
    }
</style>