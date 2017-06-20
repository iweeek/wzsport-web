<template>
    <div class="page-container">
        <div class="main-panel">
            <el-col class="table-panel">
                <el-col :span="24">
                    <el-form :inline="true" :model="filters">
                        <el-form-item label="学生姓名">
                            <el-input v-model="filters.name" placeholder="输入学生姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="学生学号">
                            <el-input v-model="filters.student_id" placeholder="输入学生学号"></el-input>
                        </el-form-item>
                        <el-form-item label="运动开始时间">
                            <el-date-picker v-model="filters.timer" type="datetimerange" placeholder="选择时间范围">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="运动项目">
                            <el-select class="sm" v-model="filters.sex" placeholder="运动项目">
                                <el-option label="快走" value="un"></el-option>
                                <el-option label="慢跑" value="pass"></el-option>
                                <el-option label="快跑" value="reject"></el-option>
                                <el-option label="累计步数" value="reject"></el-option>
                                <el-option label="全部" value="reject"></el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item label="平均速度">
                            <el-select class="sm" v-model="filters.sex" placeholder="平均速度">
                                <el-option label=">" value="un"></el-option>
                                <el-option label="<" value="pass"></el-option>
                                <el-option label="=" value="reject"></el-option>
                                <el-option label="介于" value="reject"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="input" placeholder="请输入数值"></el-input>
                            <el-input v-if="false" v-model="input" placeholder="请输入数值"></el-input>
                        </el-form-item>
                        <el-form-item label="每秒步数">
                            <el-select class="sm" v-model="filters.sex" placeholder="每秒步数">
                                <el-option label=">" value="un"></el-option>
                                <el-option label="<" value="pass"></el-option>
                                <el-option label="=" value="reject"></el-option>
                                <el-option label="介于" value="reject"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="input" placeholder="请输入数值"></el-input>
                            <el-input v-if="false" v-model="input" placeholder="请输入数值"></el-input>
                        </el-form-item>
                        <el-form-item label="平均步幅">
                            <el-select class="sm" v-model="filters.sex" placeholder="平均步幅">
                                <el-option label=">" value="un"></el-option>
                                <el-option label="<" value="pass"></el-option>
                                <el-option label="=" value="reject"></el-option>
                                <el-option label="介于" value="reject"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="input" placeholder="请输入数值"></el-input>
                            <el-input v-if="false" v-model="input" placeholder="请输入数值"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <el-table :data="studentList" style="width: 92%">
                    <el-table-column prop="name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="student_id" label="学号" width="120">
                    </el-table-column>
                    <el-table-column prop="project" label="运动项目" width="120">
                    </el-table-column>
                    <el-table-column prop="time" label="耗时" width="120">
                    </el-table-column>
                    <el-table-column prop="distance" label="平均速度" width="120">
                    </el-table-column>
                    <el-table-column prop="speed" label="步数">
                    </el-table-column>
                    <el-table-column prop="step" label="每秒步数">
                    </el-table-column>
                    <el-table-column prop="creat" label="平均步幅" width="150">
                    </el-table-column>
                    <el-table-column prop="reason" label="运动开始时间" width="120">
                    </el-table-column>
                </el-table>

                <div class="page">
                    <el-pagination @current-change="search" :current-page.sync="pageNumber" :page-size="10" layout="prev, pager, next, jumper"
                        :total="dataCount">
                    </el-pagination>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import resources from '../../resources'

    // 获取任课教师概览数据
    
    // 筛选教师
    const teacherQuery = `
        query(
            $universityId: Long
            $name: String
            $jobNo: String
            $isMan: Boolean
            $pageNumber: Int
            $pageSize: Int
        ){
            allData:searchTeachers(
                universityId: $universityId
                name: $name
                jobNo: $jobNo
                isMan: $isMan
                pageNumber: $pageNumber
                pageSize: $pageSize
            ){
                pageNum
                pageSize
                dataCount
                data{
                    name
                    jobNo
                    isMan
                    id
                }
            }
        }
    `;
    export default {
        data() {
            return {
                input: '',
                pageSize: 10,
                pageNumber: 1,
                dataCount: 0,
                loading: false,
                filters: {
                    name: '',
                    student_id: '',
                    sex: '',
                    term: '',
                    timer: '',
                },
                studentList: [{
                    student_id: '20170516',
                    name: '王小虎',
                    project: '快走',
                    time: '20:00:00',
                    distance: 8.42,
                    speed: 72,
                    status: 1.78,
                    step: 40,
                }]
            }
        },
        methods: {
            //获取列表
            search() {
                let params = {
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber
                };
                if (this.filters.name !== '') {
                    params.name = this.filters.name
                }
                if (this.filters.jobNo !== '') {
                    params.jobNo = this.filters.jobNo
                }
                if (this.filters.isMan !== '') {
                    params.isMan = this.filters.isMan
                }
                this.getData(params);
            },
            getData(params) {
                let _this = this;
                this.studentList = [];
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${teacherQuery}`,
                    variables: params
                })
                .then(res => {
                    _this.loading = false;
                    _this.dataCount = res.data.data.allData.dataCount;
                    res.data.data.allData.data.forEach(item => {
                        let listItem = {
                            id: "",
                            name: "",
                            studentNo: "",
                            isMan: false
                        };
                        listItem.name = item.name;
                        listItem.studentNo = item.studentNo;
                        listItem.id = item.id;
                        _this.studentList.push(listItem);
                    });
                });
            }
        },
        mounted: function () {
            let params = {
                "pageSize": 10,
                "pageNumber": 1
            }
            this.getData(params);
        }
    }

</script>
<style lang="scss" scoped>
    .page-container {
        color: #666;
        min-width: 1200px;
        .sm{
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
        .el-date-editor{
            width: 360px;
        }
        .pointer{
            cursor: pointer;
            color: #29b6f6;
        }
    }
</style>