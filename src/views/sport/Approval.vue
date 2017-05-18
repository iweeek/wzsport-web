<template>
    <div class="page-container">
        <div class="main-panel">
            <el-col class="table-panel">
                <el-col :span="24">
                    <el-form :inline="true" :model="filters">
                        <el-form-item label="姓名">
                            <el-input v-model="filters.name" placeholder="输入学生姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="学号">
                            <el-input v-model="filters.student_number" placeholder="输入学生学号"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select class="filter-sex" v-model="filters.sex" placeholder="审批状态">
                                <el-option label="未审批" value="un"></el-option>
                                <el-option label="审批通过" value="pass"></el-option>
                                <el-option label="审批驳回" value="reject"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="审批时间">
                            <el-date-picker v-model="time" type="datetimerange" placeholder="选择时间范围">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getStuedents">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="student_number" label="学号" width="130">
                    </el-table-column>
                    <el-table-column prop="sex" label="运动项目">
                    </el-table-column>
                    <el-table-column prop="time" label="运动时长">
                    </el-table-column>
                    <el-table-column prop="distance" label="运动距离">
                    </el-table-column>
                    <el-table-column prop="speed" label="速度">
                    </el-table-column>
                    <el-table-column prop="step" label="步数">
                    </el-table-column>
                    <el-table-column prop="creat" label="运动记录创建时间" width="200">
                    </el-table-column>
                    <el-table-column prop="reason" label="申请理由">
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作">
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
                    student_number: '',
                    sex: '',
                    term: '',
                    time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                },
                total: 0,
                currentPage: 1,
                listLoading: false,
                tableData: [{
                    student_number: '20170516',
                    name: '王小虎',
                    sex: '男',
                    time: '20:00:00',
                    distance: 8.42,
                    speed: 72,
                    status: 1.78,
                    step: 40,
                    creat: 451,
                    reason: 40,
                    operate: '查看明细'
                }],

            }
        },
        methods: {
            //获取列表
            getStuedents() {
                let params = {
                    page: this.page,
                    name: this.filters.name,
                    student_number: this.filters.student_number,
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
        .el-input{
            width: 220px;
        }
    }
</style>