<template>
    <div class="page-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/students' }">学生管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/students' }">班级列表</el-breadcrumb-item>
            <el-breadcrumb-item>班级详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-panel">
            <div>
                <el-col class="table-panel panel" :span="16">
                    <el-col :span="24" class="title">
                        学生
                    </el-col>
                    <el-col :span="24">
                        <el-form :inline="true" :model="filters">
                            <el-form-item>
                                <el-input v-model="filters.name" placeholder="输入学生姓名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="filters.student_number" placeholder="输入学生学号"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select class="filter-sex" v-model="filters.sex" placeholder="性别">
                                    <el-option label="男" value="boy"></el-option>
                                    <el-option label="女" value="girl"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="getStuedents">筛选</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>

                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="student_number" label="学号" width="180">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="student_number" label="学号" width="180">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别">
                        </el-table-column>
                    </el-table>

                    <div class="page">
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="3" layout="prev, pager, next, jumper"
                            :total="10">
                        </el-pagination>
                    </div>
                </el-col>

                <el-col :span="7" :offset="1" class="panel">
                    <el-col :span="24" class="title">
                        班级课表
                    </el-col>
                    <div class="class-teacher">
                        <span>任课教师：某某某</span>
                        <el-button>查看班级课表</el-button>
                    </div>
                </el-col>

                <el-col :span="7" :offset="1" class="panel score-panel">
                    <el-col :span="24" class="title">
                        体育成绩
                    </el-col>
                    <div class="score">
                        <span><i class="fa fa-cloud-upload"></i> <br>批量导入</span>
                        <span @click="goScore"><i class="fa fa-database"></i> <br>查看成绩</span>
                    </div>
                </el-col>
                <el-col :span="7" :offset="1" class="panel score-panel">
                    <el-col :span="24" class="title">
                        体测数据
                    </el-col>
                    <div class="score">
                        <span><i class="fa fa-cloud-upload"></i><br>批量导入</span>
                        <span @click="goData"><i class="fa fa-database"></i><br>查看体测数据</span>
                    </div>
                </el-col>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                classId: 1,
                filters: {
                    name: '',
                    student_number: '',
                    sex: ''
                },
                total: 0,
                currentPage: 1,
                listLoading: false,
                tableData: [{
                    student_number: '20170516',
                    name: '王小虎',
                    sex: '男'
                }, {
                    student_number: '20170516',
                    name: '王大虎',
                    sex: '男'
                }, {
                    student_number: '20170516',
                    name: '王小虎',
                    sex: '男'
                }, {
                    student_number: '20170516',
                    name: '王小虎',
                    sex: '男'
                }, {
                    student_number: '20170516',
                    name: '王大虎',
                    sex: '男'
                }, {
                    student_number: '20170516',
                    name: '王小虎',
                    sex: '男'
                }, {
                    student_number: '20170516',
                    name: '王小虎',
                    sex: '男'
                }, {
                    student_number: '20170516',
                    name: '王大虎',
                    sex: '男'
                }, {
                    student_number: '20170516',
                    name: '王小虎',
                    sex: '男'
                }, {
                    student_number: '20170516',
                    name: '王小虎',
                    sex: '男'
                }]
            }
        },
        methods: {
            //获取列表
            getStuedents() {
                let params = {
                    page: this.page,
                    name: this.filters.name,
                    student_number: this.filters.student_number,
                    sex: this.filters.sex
                };
                this.listLoading = true;
                console.log('发送获取学生信息请求');
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            goCourses() {
                this.$router.push({ path: '/courses' });
            },
            goScore() {
                this.$router.push({ path: '/score/' + this.classId });
            },
            goData() {
                this.$router.push({ path: '/data/' + this.classId });
            }
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
        .table-panel{
            margin-top: 20px;
        }
        .title {
            line-height: 2.5;
            font-weight: bold;
            font-size: 14px;
        }
        .sub-title {
            line-height: 2.5;
        }
        .page {
            text-align: center;
            margin: 10px;
        }
        .class-teacher {
            text-align: center;
            span {
                display: block;
                font-weight: bold;
                line-height: 3;
            }
        }
        .score-panel{
            padding: 5px 15px 0;
        }
        .score {
            span {
                display: inline-block;
                width: 100px;
                line-height: 3;
                padding: 10px;
                cursor: pointer;
                text-align: center;
                margin-right: 20px;
            }
            i {
                width: 55px;
                height: 55px;
                background-color: #29b6f6;
                display: inline-block;
                text-align: center;
                line-height: 55px;
                border-radius: 50%;
                color: #fff;
                font-size: 28px;
            }
            .fa-database {
                background-color: #8bc34a;
            }
        }
    }
</style>