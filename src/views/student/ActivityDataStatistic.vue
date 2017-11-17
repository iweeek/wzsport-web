<template>
    <div class="page-container">
        <div class="main-panel">
            <el-col class="table-panel">
                <!-- <el-col :span="24">
                    <el-form :inline="true" :model="filters">
                        <el-form-item label="学生姓名">
                            <el-input v-model="filters.studentName" placeholder="输入学生姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="学生学号">
                            <el-input v-model="filters.studentNo" placeholder="输入学生学号"></el-input>
                        </el-form-item>
                        <el-form-item label="运动编号">
                            <el-input v-model="filters.activityId" placeholder="输入运动编号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchActivityDataStatistic">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>  -->

                <el-table :data="runningActivityStatisticList"> 
                    <el-table-column prop="name" label="学生姓名">
                        <template scope="scope">
                            {{allActivityRecord.name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="studentNo" label="学生学号">
                        <template scope="scope">
                            {{allActivityRecord.studentNo}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="activityId" label="运动编号">
                    </el-table-column>
                    <el-table-column prop="locationTotalCount" label="记录点总数">
                    </el-table-column>
                    <el-table-column prop="distancePerStepAgainst" label="违背步幅的点数">
                    </el-table-column>
                    <el-table-column prop="speedAgainst" label="违背速度的点数">
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination @current-change="searchActivityDataStatistic" :current-page.sync="pageNumber" :page-size="10" layout="prev, pager, next, jumper"
                        :total="dataCount">
                    </el-pagination>
                </div>
            </el-col>
        </div>
    </div>
</template>


<script>
    import resources from '../../resources'

    // 获取轨迹
    const runnningActivityStatisticQuery = `
    query(
        $studentId: Long
        $pageSize: Int
        $pageNumber: Int
        ){
            allActivityRecord:student(id: $studentId){
                name
                studentNo
                activityInfo:runningActivityDataStatistic(
                pageSize: $pageSize
                pageNumber: $pageNumber){
                    pageNum
                    dataCount
                    pageSize
                    data{
                        studentId
                        activityId
                        locationTotalCount
                        distancePerStepAgainst
                        speedAgainst
                    }
                }
            }       
        }
    `

    export default {
        data() {
            return {
                studentId: this.$route.params.student_id,
                pageSize: 10,
                pageNumber: 1,
                dataCount: 0,
                loading: false,
                studentNo: '',
                studentName: '',
                options: {
                    project: null
                },
                filters: {
                    studentName: '',
                    studentNo: '',
                    activityId: '',
                },
                runningActivityStatisticList: [],
                allActivityRecord: []
            }
        },
        methods: {
            searchActivityDataStatistic() {
                let params = {
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber,
                    "studentId": this.studentId
                };
                let _this = this;
                // if (this.filters.studentName !== '') {
                //     params.studentName = this.filters.studentName
                // }
                // if (this.filters.isMan !== '') {
                //     params.isMan = this.filters.isMan
                // // }
                // if (this.filters.studentNo !== '') {
                //     params.studentNo = this.filters.studentNo
                // }
                // if (this.filters.className !== '') {
                //     params.className = this.filters.className
                // }
                this.getData(params);
            },
            getData(params) {
                console.log(params);
                let _this = this;
                this.runningActivityStatisticList = [];
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${runnningActivityStatisticQuery}`,
                    variables: params
                })
                .then(res => {
                    console.log(res);
                    _this.loading = false;
                    // _this.dataCount = res.data.data.allstudent.stuInfo.dataCount;
                    _this.runningActivityStatisticList = res.data.data.allActivityRecord.activityInfo.data;
                    _this.allActivityRecord = res.data.data.allActivityRecord;
                });
            },
        },
        mounted: function () {
            this.searchActivityDataStatistic()
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
