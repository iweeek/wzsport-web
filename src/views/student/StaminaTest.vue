<template>
    <div class="page-container">
        <div class="main-panel">

            <!-- 体测列表 -->
            <div class="table-panel">
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
                    <el-table-column prop="sitUpsPoint" label="仰卧起坐得分" v-if="sexType === 'girls'">
                    </el-table-column>
                    <el-table-column prop="sitUpsLevel" label="仰卧起坐等级" v-if="sexType === 'girls'">
                    </el-table-column>
                    <el-table-column prop="pushUps" label="引体向上成绩" v-if="sexType === 'boys'">
                    </el-table-column>
                    <el-table-column prop="pushUpsPoint" label="引体向上得分" v-if="sexType === 'boys'">
                    </el-table-column>
                    <el-table-column prop="pushUpsLevel" label="引体向上等级" v-if="sexType === 'boys'">
                    </el-table-column>
                    <el-table-column prop="fiftyRun" label="50米跑成绩">
                    </el-table-column>
                    <el-table-column prop="fiftyRunPoint" label="50米跑得分">
                    </el-table-column>
                    <el-table-column prop="fiftyRunLevel" label="50米跑等级">
                    </el-table-column>
                    <el-table-column prop="eightHundredRun" label="800米跑成绩">
                    </el-table-column>
                    <el-table-column prop="eightHundredPoint" label="800米跑得分" v-if="sexType === 'girls'">
                    </el-table-column>
                    <el-table-column prop="eightHundredLevel" label="800米跑等级" v-if="sexType === 'girls'">
                    </el-table-column>
                    <el-table-column prop="oneThousandRun" label="1000米跑成绩" v-if="sexType === 'boys'">
                    </el-table-column>
                    <el-table-column prop="oneThousandPoint" label="1000米跑得分" v-if="sexType === 'boys'">
                    </el-table-column>
                    <el-table-column prop="oneThousandLevel" label="1000米跑等级" v-if="sexType === 'boys'">
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
    `
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
                    physicalFitnessTest {
                        isMan
                        name
                        className
                    }
                }
        }
    }
    `
    export default {
        data() {
            return {
                universityId: resources.universityId,
                classId: this.$route.params.classId,
                sexType: 'boys',
                pageSize: 10,
                pageNumber: 1,
                dataCount: 0,
                loading: false,
                filters: {
                    isMan: true,
                    pageSize: 0,
                    pageNumber: 0,
                    classId: 0,
                },
                physicalList: []
            }
        },
        //hwq 页面显示的数据
        methods: {
            changeSex() {
                let _this = this;
                _this.pageNumber = 1;
            },
            getClassPhysicalTest() {
                let _this = this;
                if(_this.sexType == "boys"){
                    _this.filters.isMan = true;
                }else{
                    _this.filters.isMan = false;
                }
                _this.filters.pageSize = _this.pageSize;
                _this.filters.pageNumber = _this.pageNumber;
                _this.filters.classId = _this.classId;
                _this.physicalList = [];
                alert(this.physicalList.length)
                this.$ajax.post(`${resources.graphQlApi}`,{
                                'query': `${classPhysicalQuery}`,
                                variables: _this.filters
                    })
                    .then(res => {
                        _this.dataCount = res.data.data.allstudents.dataCount;
                        //alert(res.data.data.allstudents.data.length)
                        this.physicalList = res.data.data.allstudents.data;
                        console.log(this.physicalList)
                        for (var i = 0;i < _this.physicalList.length; i++){
                            if(_this.physicalList[i].physicalFitnessTest == null){
                                _this.physicalList.splice(i,1)
                                i -- ;
                            }
                        }
                        alert(this.physicalList.length)
                        console.log(this.physicalList)
                    });
            },
            getAllPhysicalTest() {            
                let _this = this;
                if(_this.sexType == "boys"){
                    _this.filters.isMan = true;
                }else{
                    _this.filters.isMan = false;
                }
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
            }
        },

        mounted: function () {
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