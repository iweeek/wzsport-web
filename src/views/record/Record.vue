<template>
    <div class="page-container">
        <div class="main-panel">
            <el-col class="table-panel">
                <el-col :span="24">
                    <el-form :inline="true" :model="filters">
                        <el-form-item label="学生姓名">
                            <el-input v-model="filters.studentName" placeholder="输入学生姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="学生学号">
                            <el-input v-model="filters.studentNo" placeholder="输入学生学号"></el-input>
                        </el-form-item>
                        <el-form-item label="运动开始时间">
                            <el-date-picker v-model="filters.startTime" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="运动项目">
                            <el-select class="sm" v-model="filters.runningSportId" placeholder="运动项目">
                                <el-option v-for="item in options.project" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item label="平均速度">
                            <el-select class="sm" v-model="filters.speedOperator" placeholder="平均速度">
                                <el-option label=">" value="GREATER_THAN"></el-option>
                                <el-option label="<" value="LESS_THAN"></el-option>
                                <el-option label="=" value="EQUALL"></el-option>
                                <el-option label="介于" value="BETWEEN"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="filters.speed" placeholder="请输入数值"></el-input>
                            <el-input v-if="filters.speedOperator === 'BETWEEN'" v-model="filters.anotherSpeed" placeholder="请输入数值"></el-input>
                        </el-form-item>
                        <el-form-item label="每秒步数">
                            <el-select class="sm" v-model="filters.stepPerSecondOperator" placeholder="每秒步数">
                                <el-option label=">" value="GREATER_THAN"></el-option>
                                <el-option label="<" value="LESS_THAN"></el-option>
                                <el-option label="=" value="EQUALL"></el-option>
                                <el-option label="介于" value="BETWEEN"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="filters.stepPerSecond" placeholder="请输入数值"></el-input>
                            <el-input v-if="filters.stepPerSecondOperator === 'BETWEEN'" v-model="filters.anotherStepPerSecond" placeholder="请输入数值"></el-input>
                        </el-form-item>
                        <el-form-item label="平均步幅">
                            <el-select class="sm" v-model="filters.distancePerStepOperator" placeholder="平均步幅">
                                <el-option label=">" value="GREATER_THAN"></el-option>
                                <el-option label="<" value="LESS_THAN"></el-option>
                                <el-option label="=" value="EQUALL"></el-option>
                                <el-option label="介于" value="BETWEEN"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="filters.distancePerStep" placeholder="请输入数值"></el-input>
                            <el-input v-if="filters.distancePerStepOperator === 'BETWEEN'" v-model="filters.anotherDistancePerStep" placeholder="请输入数值"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchRecords">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <el-table :data="studentList" style="width: 92%">
                    <el-table-column prop="student.name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="student.studentNo" label="学号" width="130">
                    </el-table-column>
                    <el-table-column prop="project" label="运动项目" width="120">
                    </el-table-column>
                    <el-table-column prop="distance" label="距离">
                    </el-table-column>
                    <el-table-column prop="costTime" label="耗时">
                    </el-table-column>
                    <el-table-column prop="speed" label="平均速度" width="120">
                    </el-table-column>
                    <el-table-column prop="stepCount" label="步数">
                    </el-table-column>
                    <el-table-column prop="stepPerSecond" label="每秒步数" width="120">
                    </el-table-column>
                    <el-table-column prop="distancePerStep" label="平均步幅" width="120">
                    </el-table-column>
                    <el-table-column prop="startTime" label="运动开始时间" width="150">
                    </el-table-column>
                </el-table>

                <div class="page">
                    <el-pagination @current-change="searchRecords" :current-page.sync="pageNumber" :page-size="10" layout="prev, pager, next, jumper"
                        :total="dataCount">
                    </el-pagination>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import resources from '../../resources'
    // 运动方式列表
    const sportsQuery = `
    query($universityId: Long){
        runningSports(universityId:$universityId) {
            id
            name
        }
    }
    `;
    // 筛选运动记录
    const recordsQuery = `
        query(
        $studentName: String
        $studentNo: String
        $startTime: Long
        $endTime: Long
        $runningSportId: Long
        $speed: Float
        $speedOperator: Operator
        $anotherSpeed: Float
        $stepPerSecond: Float
        $stepPerSecondOperator: Operator
        $anotherStepPerSecond: Float
        $distancePerStep: Float
        $distancePerStepOperator: Operator
        $anotherDistancePerStep: Float
        $pageNumber: Int
        $pageSize: Int
        ){
            allRecords:searchRunningActivities(
            studentName:$studentName
            studentNo:$studentNo
            startTime:$startTime
            endTime:$endTime
            runningSportId:$runningSportId
            speed:$speed
            speedOperator:$speedOperator
            anotherSpeed:$anotherSpeed
            stepPerSecond:$stepPerSecond
            stepPerSecondOperator:$stepPerSecondOperator
            anotherStepPerSecond:$anotherStepPerSecond
            distancePerStep:$distancePerStep
            distancePerStepOperator:$distancePerStepOperator
            anotherDistancePerStep:$anotherDistancePerStep
            pageNumber:$pageNumber
            pageSize:$pageSize
            ){
                pagesCount
                dataCount
                data{
                runningSportId
                distance
                stepCount
                costTime
                startTime
                speed
                stepPerSecond
                distancePerStep
                student{
                    name
                    studentNo
                }
                }
            }
        }
    `;
    export default {
        data() {
            return {
                universityId: 1,
                input: '',
                pageSize: 10,
                pageNumber: 1,
                dataCount: 0,
                loading: false,
                options: {
                    project: null
                },
                filters: {
                    studentName: '',
                    studentNo: '',
                    startTime: '',
                    runningSportId: '',
                    speedOperator: '',
                    speed: '',
                    anotherSpeed: '',
                    stepPerSecondOperator: '',
                    stepPerSecond: '',
                    anotherStepPerSecond: '',
                    distancePerStepOperator: '',
                    distancePerStep: '',
                    anotherDistancePerStep: ''
                },
                studentList: [{
                    studentNo: '20170516',
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
            // 获取运动方式下拉框
            getSports() {
                let _this = this;
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${sportsQuery}`,
                    variables: {
                        "universityId": _this.universityId
                    }
                })
                .then(res => {
                    _this.options.project = res.data.data.runningSports;
                });
            },
            //获取列表
            searchRecords() {
                let params = {
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber
                };
                let _this = this;
                if (this.filters.studentName !== '') {
                    params.studentName = this.filters.studentName
                }
                if (this.filters.studentNo !== '') {
                    params.studentNo = this.filters.studentNo
                }
                if (this.filters.startTime !== '') {
                    params.startTime = this.filters.startTime.getTime()
                }
                if (this.filters.runningSportId !== '') {
                    params.runningSportId = this.filters.runningSportId
                }
                if (this.filters.speedOperator !== '') {
                    params.speedOperator = this.filters.speedOperator
                }
                if (this.filters.speed !== '') {
                    params.speed = parseFloat(_this.filters.speed);
                }
                if (this.filters.anotherSpeed !== '') {
                    params.anotherSpeed = parseFloat(_this.filters.anotherSpeed);
                }
                if (this.filters.stepPerSecondOperator !== '') {
                    params.stepPerSecondOperator = this.filters.stepPerSecondOperator
                }
                if (this.filters.stepPerSecond !== '') {
                    params.stepPerSecond = parseFloat(_this.filters.stepPerSecond);
                }
                if (this.filters.anotherStepPerSecond !== '') {
                    params.anotherStepPerSecond = parseFloat(_this.filters.anotherStepPerSecond);
                }
                if (this.filters.distancePerStepOperator !== '') {
                    params.distancePerStepOperator = this.filters.distancePerStepOperator
                }
                if (this.filters.distancePerStep !== '') {
                    params.distancePerStep = parseFloat(_this.filters.distancePerStep);
                }
                if (this.filters.anotherDistancePerStep !== '') {
                    params.anotherDistancePerStep = parseFloat(_this.filters.anotherDistancePerStep);
                }
                this.getData(params);
            },
            getData(params) {
                let _this = this;
                this.studentList = [];
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${recordsQuery}`,
                    variables: params
                })
                .then(res => {
                    _this.loading = false;
                    _this.dataCount = res.data.data.allRecords.dataCount;
                    _this.studentList = res.data.data.allRecords.data;
                    _this.studentList.forEach(item => {
                        item.distance = `${item.distance}m`;
                        item.speed = `${item.speed}m/s`;
                        item.stepCount = `${item.stepCount}步`;
                        item.distancePerStep = `${item.distancePerStep}步`;
                        item.startTime = new Date(item.startTime).toLocaleString().replace(/:\d{1,2}$/,' ');
                        for(let i = 0; i < _this.options.project.length; i++){
                            if(item.runningSportId === _this.options.project[i].id){
                                item.project = _this.options.project[i].name;
                            }
                        }
                    });
                });
            }
        },
        mounted: function () {
            this.getSports();
            this.searchRecords();
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
            width: 280px;
        }
        .pointer{
            cursor: pointer;
            color: #29b6f6;
        }
    }
</style>