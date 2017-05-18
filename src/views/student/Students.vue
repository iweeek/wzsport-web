<template>
    <div class="page-container">
        <div class="main-panel">
            <el-col :span="20">
                <el-form :inline="true" :model="filters">
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
                </el-form>
            </el-col>
            <el-col :span="4">
                <el-form>
                    <el-form-item>
                        <el-button type="primary" @click="batchAddStudents">批量创建学生账号</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-col :span="24" class="classes-panel">
                <div v-for="item in classes" class="card" @click="goDetail(item)">
                    <div class="classes-name">
                        {{item.name}}
                    </div>
                    <div class="student-number">
                        学生总数：{{item.studentsNum}}
                    </div>
                </div>
            </el-col>

            <el-col :span="24" class="page">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="3" layout="prev, pager, next, jumper"
                    :total="10">
                </el-pagination>
            </el-col>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filters: {
                    college: '',
                    major: '',
                    grade: ''
                },
                total: 0,
                currentPage: 1,
                listLoading: false,
                classes: [
                    {
                        name: '营销1班',
                        id: 1,
                        studentsNum: 63
                    },
                    {
                        name: '营销2班',
                        id: 1,
                        studentsNum: 83
                    },
                    {
                        name: '营销3班',
                        id: 1,
                        studentsNum: 83
                    },
                    {
                        name: '营销2班',
                        id: 1,
                        studentsNum: 83
                    },
                    {
                        name: '营销3班',
                        id: 1,
                        studentsNum: 83
                    },
                    {
                        name: '营销2班',
                        id: 1,
                        studentsNum: 83
                    },
                    {
                        name: '营销3班',
                        id: 1,
                        studentsNum: 83
                    },
                    {
                        name: '营销2班',
                        id: 1,
                        studentsNum: 83
                    }
                ]
            }
        },
        methods: {
            //获取班级列表
            getClasses() {
                let params = {
                    page: this.page,
                    college: this.filters.college,
                    major: this.filters.major,
                    grade: this.filters.grade
                };
                this.listLoading = true;
                console.log('发送获取班级信息请求');
                // 发送获取教师信息请求
            },
            batchAddStudents() {
                this.$router.push({ path: '/addstudent' });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            goCourses() {
                this.$router.push({ path: '/courses' });
            },
            goDetail(item) {
                this.$router.push({ path: '/classdetail/' + item.id });
            }
        }
    }

</script>
<style lang="scss" scoped>
    .page-container {
        .main-panel {
            overflow: hidden;
            margin-top: 10px;
            padding: 0 10px 0px 15px;
        }
        .title {
            color: #666;
            line-height: 2.5;
            font-size: 16px;
            font-weight: bold;
        }
        .filter-sex {
            width: 90px;
        }
        .page {
            text-align: center;
            margin: 10px;
        }
        .classes-panel {
            overflow: hidden;
            font-size: 14px;
            .card{
                display: inline-block;
                margin: 10px;
                text-align: center;
                cursor: pointer;
            }
            .classes-name {
                width: 252px;
                height: 165px;
                line-height: 165px;
                font-size: 23px;
                font-weight: bold;
                background-color: #f2f2f2;
                border: 1px solid #d4d4d4;
                border-bottom-color: transparent;
            }
            .student-number {
                width: 252px;
                height: 85px;
                line-height: 85px;
                font-size: 16px;
                background-color: #fff;
                color: #101010;
                border: 1px solid #d4d4d4;
                border-top-color: transparent;
            }
        }
    }
</style>