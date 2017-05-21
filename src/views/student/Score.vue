<template>
    <div class="page-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/students' }">学生管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/students' }">班级列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/classdetail/' + classId }">班级详情</el-breadcrumb-item>
            <el-breadcrumb-item>班级体育成绩</el-breadcrumb-item>
        </el-breadcrumb>
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
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="id" label="学号" width="180">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别">
                    </el-table-column>
                    <el-table-column prop="term" label="学期" width="180">
                    </el-table-column>
                    <el-table-column prop="fifty" label="50米（秒）" width="180">
                    </el-table-column>
                    <el-table-column prop="fiftyScore" label="得分" width="180">
                    </el-table-column>
                    <el-table-column prop="jump" label="立定跳远（厘米）" width="180">
                    </el-table-column>
                    <el-table-column prop="jumpScore" label="得分" width="180">
                    </el-table-column>
                    <el-table-column prop="longrun" label="1500米（秒）" width="180">
                    </el-table-column>
                    <el-table-column prop="longrunScore" label="得分" width="180">
                    </el-table-column>
                    <el-table-column prop="situp" label="仰卧起坐（个）" width="180">
                    </el-table-column>
                    <el-table-column prop="situpScore" label="得分" width="180">
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
    export default {
        data() {
            return {
                classId: 1,
                filters: {
                    name: '',
                    id: '',
                    sex: '',
                    term: ''
                },
                total: 0,
                currentPage: 1,
                listLoading: false,
                tableData: [{
                    id: '20170516',
                    name: '王小虎',
                    sex: '男',
                    term: '2016~2017第一学期',
                    fifty: 8.42,
                    fiftyScore: 72,
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
            goClassDetail() {
                this.$router.push({ path: '/classdetail/' + this.classId });
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
    }
</style>