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
                            <el-date-picker v-model="filters.timeRange" type="datetimerange" placeholder="选择时间范围">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="运动项目">
                            <el-select class="sm" v-model="filters.runningSportId" placeholder="运动项目">
                                <el-option v-for="item in options.project" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select class="sm" v-model="filters.isMan" placeholder="性别">
                                <el-option label="男" value="true"></el-option>
                                <el-option label="女" value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item label="异常判断">
                            <el-select class="sm" v-model="filters.isValid" placeholder="异常判断">
                                <el-option label="全部" value="ALL"></el-option>
                                <el-option label="数据正常" value="true"></el-option>
                                <el-option label="数据异常" value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="达标结果">
                            <el-select class="sm" v-model="filters.qualified" placeholder="达标结果">
                                <el-option label="全部" value="ALL"></el-option>
                                <el-option label="达标" value="true"></el-option>
                                <el-option label="未达标" value="false"></el-option>
                            </el-select>
                        </el-form-item>
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
                                <el-option label="=" value="EQUAL"></el-option>
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
                                <el-option label="=" value="EQUAL"></el-option>
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
                    <el-table-column label="性别">
                        <template scope="scope">
                            <span>{{scope.row.student.isMan ? '男' : '女'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="project" label="运动项目" width="120">
                    </el-table-column>
                    <el-table-column prop="distance" label="距离(m)">
                    </el-table-column>
                    <el-table-column prop="costTime" label="耗时">
                    </el-table-column>
                    <el-table-column prop="speed" label="平均速度(m/s)" width="130">
                    </el-table-column>
                    <el-table-column prop="stepCount" label="步数(步)">
                    </el-table-column>
                    <el-table-column prop="stepPerSecond" label="每秒步数(步)" width="120">
                    </el-table-column>
                    <el-table-column prop="distancePerStep" label="平均步幅(m)" width="120">
                    </el-table-column>
                    <el-table-column label="异常判断" width="120">
                        <template scope="scope">
                            <span :class="{ 'success': scope.row.isValid, 'error': !scope.row.isValid }">{{scope.row.isValid ? '数据正常' : '数据异常'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="达标结果" width="120">
                        <template scope="scope">
                            <span v-if="scope.row.endedAt" :class="{ 'success': scope.row.qualified, 'error': !scope.row.qualified }">{{scope.row.qualified ? '达标' : '未达标'}}</span>
                            <span v-if="!scope.row.endedAt" class="error">非正常结束</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="运动轨迹" width="120">
                        <template scope="scope">
                            <el-button type="text" @click="getPath(scope.row.id)">查看轨迹</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startTime" label="运动开始时间" width="170">
                    </el-table-column>
                </el-table>

                <div class="page">
                    <el-pagination @current-change="searchRecords" :current-page.sync="pageNumber" :page-size="10" layout="prev, pager, next, jumper"
                        :total="dataCount">
                    </el-pagination>
                </div>
            </el-col>
        </div>

        <el-dialog title="运动轨迹" :visible.sync="pathShow">
            <div id="container"></div>
        </el-dialog>
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
        $qualified: Boolean
        $isValid: Boolean
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
            qualified: $qualified
            isValid: $isValid
            ){
                pagesCount
                dataCount
                data{
                    id
                    runningSportId
                    distance
                    stepCount
                    costTime
                    startTime
                    speed
                    stepPerSecond
                    distancePerStep
                    qualified
                    isValid
                    endedAt
                    student{
                        name
                        studentNo
                        isMan
                    }
                }
            }
        }
    `;

    // 获取轨迹
    const pathQuery = `
    query($id: Long){
        runningActivity(id:$id) {
            id 
            runningSportId 
            costTime 
            kcalConsumed 
            startTime 
            endedAt 
            distance 
            qualified 
            qualifiedDistance 
            qualifiedCostTime
            runningSport{ 
                name 
            } 
            data { 
                longitude 
                latitude 
                isNormal
            }
        }
    }
    `
    export default {
        data() {
            return {
                universityId: resources.universityId,
                input: '',
                pageSize: 10,
                pageNumber: 1,
                dataCount: 0,
                loading: false,
                options: {
                    project: null
                },
                filters: {
                    isMan: '',
                    studentName: '',
                    studentNo: '',
                    timeRange: ['', ''],
                    isValid: '',
                    qualified: '',
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
                studentList: [],
                pathShow: false,
                pathDataOrigin: [],
                pathData: []
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
                if (this.filters.timeRange[0] !== '') {
                    params.startTime = this.filters.timeRange[0].getTime()
                }
                if (this.filters.timeRange[1] !== '') {
                    params.endTime = this.filters.timeRange[1].getTime()
                }
                if (this.filters.runningSportId !== '') {
                    params.runningSportId = this.filters.runningSportId
                }
                if (this.filters.isMan !== '') {
                    params.isMan = this.filters.isMan
                }
                if (this.filters.isValid !== '' && this.filters.isValid !== 'ALL') {
                    params.isValid = this.filters.isValid
                }
                if (this.filters.qualified !== '' && this.filters.qualified !== 'ALL') {
                    params.qualified = this.filters.qualified
                }
                if (this.filters.qualified !== '') {
                    params.qualified = this.filters.qualified
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
                            item.startTime = new Date(item.startTime).toLocaleString().replace(/:\d{1,2}$/, ' ');
                            for (let i = 0; i < _this.options.project.length; i++) {
                                if (item.runningSportId === _this.options.project[i].id) {
                                    item.project = _this.options.project[i].name;
                                }
                            }
                        });
                    });
            },
            getPath(id) {
                let _this = this;
                this.pathShow = true;
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${pathQuery}`,
                    variables: { "id": 963 }
                })
                    .then(res => {
                        _this.pathDataOrigin = res.data.data.runningActivity.data;
                        _this.pathDataOrigin.forEach(data => {
                            _this.pathData.push({
                                'isNormal': data.isNormal,
                                'lnglat': [data.longitude, data.latitude]
                            });
                        });
                        //创建地图
                        var map = new AMap.Map('container', {
                            zoom: 4
                        });

                        AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {

                            if (!PathSimplifier.supportCanvas) {
                                alert('当前环境不支持 Canvas！');
                                return;
                            }

                            var pathSimplifierIns = new PathSimplifier({
                                zIndex: 100,
                                map: map, //所属的地图实例

                                getPath: function (pathData, pathIndex) {
                                    var points = pathData.path,
                                        lnglatList = [];

                                    for (var i = 0, len = points.length; i < len; i++) {
                                        lnglatList.push(points[i].lnglat);
                                    }
                                    return lnglatList;

                                },
                                getHoverTitle: function (pathData, pathIndex, pointIndex) {

                                    if (pointIndex >= 0) {
                                        //point 
                                        return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                                    }

                                    return pathData.name + '，点数量' + pathData.path.length;
                                },
                                renderOptions: {

                                    renderAllPointsIfNumberBelow: 5 //绘制路线节点，如不需要可设置为-1
                                }
                            });

                            window.pathSimplifierIns = pathSimplifierIns;

                            //设置数据
                            pathSimplifierIns.setData([{
                                name: '路线0',
                                path: _this.pathData
                            }]);

                            //对第一条线路（即索引 0）创建一个巡航器
                            var navg1 = pathSimplifierIns.createPathNavigator(0, {
                                loop: false, //循环播放
                                speed: 1000 //巡航速度，单位千米/小时
                            });

                            navg1.start();
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