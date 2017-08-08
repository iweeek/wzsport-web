<template>
    <div class="page-container">
        <div class="overview-panel">
            <el-row>
                <el-col :span="4" class="subject">
                    <span>体育</span>
                </el-col>
                <el-col :span="15" class="overview" :offset="1">
                    <span class="title">任课教师概况</span>
                    <table width="100%">
                        <tr class="th">
                            <td>男性</td>
                            <td>女性</td>
                            <td>总数</td>
                        </tr>
                        <tr class="counts">
                            <td><span>{{maleTeachersCount}}人</span></td>
                            <td><span class="female">{{femaleTeachersCount}}人</span></td>
                            <td><span class="total">{{maleTeachersCount + femaleTeachersCount}}人</span></td>
                        </tr>
                    </table>
                </el-col>
                <el-col class="subject-detail">
                    <span @click="goTeachers">查看所有任课教师 ></span>
                </el-col>
            </el-row>
        </div>
        <div class="main-panel">
            <div>
                <el-col class="table-panel panel" :span="16">
                    <el-col :span="24" class="title">
                        运动方式列表
                        <el-button @click="setTimes" style="float: right;margin: 7px 10px 0 0;" size="small" type="primary">设置学期运动次数</el-button>
                    </el-col>
                    <el-col :span="24">
                        <div class="division">
                            <hr/>跑步运动<hr/>
                        </div>
                        <div class="sport-type-panel">
                            <div class="add-sports" @click="addRunningSprots">
                                <span class="icon-plus">+</span>
                                添加跑步运动方式
                            </div>
                            <div v-for="item in runningSports" class="card">
                                <div class="sport-detail">
                                    <el-col :span="24" class="title">
                                        {{item.name}}
                                    </el-col>
                                    达标距离：<span>{{item.qualifiedDistance}}米</span> 达标时间：
                                    <span>{{ (item.qualifiedCostTime/60).toFixed(0) }}分钟</span> 达标速度：
                                    <span>{{item.speed}}m/s</span>
                                </div>
                                <div class="sport-number">
                                    <el-col :span="19">
                                        <i class="dot" :class="{ 'dot-lock': !item.isEnabled }"></i> {{item.isEnabled ? '启用中'
                                        : '未启用'}}
                                    </el-col>
                                    <el-col :span="5" class="title icon">
                                        <i @click="showSportsSettingDialog(item)" class="fa fa-cog"></i>
                                        <i @click="setTarget(item.id)" class="fa fa-pencil"></i>
                                        <i v-if="item.isEnabled" @click="toggleEnable(item.id, false)" class="fa fa-lock"></i>
                                        <i v-if="!item.isEnabled" @click="toggleEnable(item.id, true)" class="fa fa-unlock-alt"></i>
                                    </el-col>
                                </div>
                            </div>
                        </div>
                        <div class="division">
                            <hr/>定点运动<hr/>
                        </div>
                        <div class="sport-type-panel">
                            <div v-for="item in areaSports" class="card">
                                <div class="sport-detail">
                                    <el-col :span="24" class="title">
                                        {{item.name}}
                                    </el-col>
                                    达标时间： <span>{{ (item.qualifiedCostTime/60).toFixed(0) }}分钟</span> 
                                </div>
                                <div class="sport-number">
                                    <el-col :span="19">
                                        <i class="dot" :class="{ 'dot-lock': !item.isEnabled }"></i> {{item.isEnabled ? '启用中'
                                        : '未启用'}}
                                    </el-col>
                                    <el-col :span="5" class="title icon">
                                        <i @click="showSportsSettingDialog(item)" class="fa fa-cog"></i>
                                        <i @click="setOutdoorTarget(item.id)" class="fa fa-pencil"></i>
                                        <i v-if="item.isEnabled" @click="editAreaSport('card', item, false)" class="fa fa-lock"></i>
                                        <i v-if="!item.isEnabled" @click="editAreaSport('card', item, true)" class="fa fa-unlock-alt"></i>
                                    </el-col>
                                </div>
                            </div>
                        </div>
                    </el-col>
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

                <!-- 运动设置弹窗 -->
                <el-dialog size="tiny" :visible.sync="runningSportsSettingDialog">
                     <el-form :model="runningSportsInfo">
                        <el-form-item label="运动方式名称" :label-width="formLabelWidth">
                        <el-input v-model="runningSportsInfo.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="数据采集样本数" :label-width="formLabelWidth">
                        <el-input v-model="runningSportsInfo.sampleNum" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form> 
                    <div class="cover">
                        <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">封面尺寸：1440x620</div>
                        </el-upload>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="runningSportsSettingDialog = false">取 消</el-button>
                        <el-button type="primary" @click="editAreaSport('dialog', runningSportsInfo)">更 新</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import resources from '../../resources'

    // 获取任课教师概览数据
    const teachersQuery = `query($id: Long){
        university(id: $id){
            teachersCount
            maleTeachersCount
            femaleTeachersCount
        }
    }`;
    // 运动方式列表
    const sportsQuery = `
    query(
        $universityId: Long
        $isEnabled: Boolean
        $unEnabled: Boolean
        ){
        enabledSports:runningSports(
        universityId:$universityId
        isEnabled:$isEnabled
        ) {
            id
            universityId
            name
            type
            isEnabled
            qualifiedDistance
            qualifiedCostTime
            minCostTime
            acquisitionInterval
            sampleNum
        }
        unenabledSports:runningSports(
        universityId:$universityId
        isEnabled:$unEnabled
        ) {
            id
            universityId
            name
            type
            isEnabled
            qualifiedDistance
            qualifiedCostTime
            minCostTime
            acquisitionInterval
            sampleNum
        }
    }`;
    export default {
        data() {
            return {
                maleTeachersCount: 0,
                femaleTeachersCount: 0,
                runningSports: [],
                universityId: resources.universityId,
                areaSports: [
                    {
                        "id": 0,
                        "isEnabled": true,
                        "name": "区域运动",
                        "qualifiedCostTime": 600,
                    }
                ],
                runningSportsSettingDialog: false,
                runningSportsInfo: {
                    name: '',
                    sampleNum: 0,
                },
                formLabelWidth: '120px',
                coverImageUrl: '',
                coverDialogVisible: false
            }
        },
        methods: {
            goTeachers() {
                this.$router.push({ path: '/teachers' });
            },
            goScore() {
                this.$router.push({ path: '/allscore' });
            },
            goData() {
                this.$router.push({ path: '/alldata' });
            },
            setTimes() {
                console.log('设置学期运动次数');
                this.$router.push({ path: '/setting' });
            },
            setTarget(id) {
                console.log('设置运动指标');
                this.$router.push({ path: '/settarget/' + id });
            },
            setOutdoorTarget(id) {
                this.$router.push({ path: '/outdoortarget/' + id });
            },
            toggleEnable(id, isEnabled) {
                let _this = this;
                // 普通的ajax接口
                // 使用 application/x-www-form-urlencoded 格式化 
                // 参考：http://blog.csdn.net/fantian001/article/details/70193938
                let url = resources.runningSportsEnable(id);
                let params = new URLSearchParams();
                params.append('isEnabled', isEnabled);
                this.$ajax.post(url, params)
                .then(res => {
                    _this.getSports();
                });
            },
            editAreaSport(from, item, isEnabled) {
                let _this = this;
                // 普通的ajax接口
                // 使用 application/x-www-form-urlencoded 格式化 
                // 参考：http://blog.csdn.net/fantian001/article/details/70193938
                let url = resources.areaSports(item.id);
                let params = new URLSearchParams();
                if ( from === 'card' ) {
                    params.append('isEnabled', isEnabled);
                } else {
                    this.runningSportsSettingDialog = false;
                    params.append('isEnabled', item.isEnabled);
                }
                params.append('id', item.id);
                params.append('name', item.name);
                params.append('sampleNum', item.sampleNum);
                params.append('qualifiedCostTime', item.qualifiedCostTime);
                params.append('universityId', this.universityId);
                this.$ajax.post(url, params)
                .then(res => {
                    _this.getAreaSports();
                });
            },
            getSports() {
                let _this = this;
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${sportsQuery}`,
                    variables: {
                        "universityId": _this.universityId,
                        "isEnabled": true,
                        "unEnabled": false
                    }
                })
                .then(res => {
                    _this.runningSports = res.data.data.enabledSports.concat(res.data.data.unenabledSports);
                    _this.runningSports.forEach(project => {
                        let speed = project.qualifiedDistance/project.qualifiedCostTime;
                        project.speed = speed.toFixed(1);
                    });
                });
            },
            getAreaSports() {
                // 普通的ajax接口
                let url = resources.areaSports();
                this.$ajax.get(url)
                .then(res => {
                    this.areaSports = res.data.obj;
                });
            },
            getCounts() {
                let _this = this;
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${teachersQuery}`,
                    variables: {
                        "id": this.universityId
                    }
                })
                .then(res => {
                    _this.femaleTeachersCount = res.data.data.university.femaleTeachersCount;
                    _this.maleTeachersCount = res.data.data.university.maleTeachersCount;
                });
            },
            addRunningSprots() {
                this.runningSportsSettingDialog = true;
            },
            showSportsSettingDialog(item) {
                this.runningSportsSettingDialog = true;
                this.runningSportsInfo = item;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.coverImageUrl = file.url;
                this.coverDialogVisible = true;
            }
        },
        mounted: function () {
            this.getSports();
            this.getAreaSports();
            this.getCounts();
        }
    }

</script>
<style lang="scss" scoped>
    .page-container {
        color: #666;
        width: 1170px;
        .division{
            text-align: center;
            margin: 15px;
        }
        hr {
            width: 43%;
            display: inline-block;
            margin-left: 8px;
            margin-right: 8px;
            color: #d4d4d4;
        }
        .dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #00a854;
        }
        .dot-lock {
            background: #bfbfbf;
        }
        .table-panel {
            min-height: 175px;
        }
        .panel {
            border: 1px solid #d4d4d4;
            padding: 5px 15px 15px;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        .overview-panel {
            border: 1px solid #d4d4d4;
            border-radius: 4px;
            height: 115px;
            padding: 10px 0 10px 15px;
            .subject {
                font-size: 30px;
                background: #9ccc65;
                color: #fff;
                font-weight: bold;
                text-align: center;
                width: 115px;
                height: 115px;
                line-height: 4;
                border-radius: 8px;
            }
            .overview {
                .th {
                    color: #666;
                }
                .counts span {
                    font-size: 28px;
                    border-radius: 4px;
                    background-color: #29b6f6;
                    color: #fff;
                    text-align: center;
                    font-weight: bold;
                    width: 213px;
                    height: 45px;
                    display: inline-block;
                }
                span.female {
                    background-color: #ff5722;
                }
                span.total {
                    background-color: #ebebeb;
                    color: #666;
                }
            }
            .subject-detail {
                display: inline-block;
                width: 210px;
                height: 85px;
                color: #ffffff;
                background-color: #dedede;
                font-size: 20px;
                border-radius: 4px;
                line-height: 4;
                font-weight: bold;
                text-align: center;
                margin-left: 59px;
                margin-top: 15px;
                cursor: pointer;
            }
        }
        .title {
            color: #666;
            line-height: 2.5;
            font-size: 16px;
            font-weight: bold;
        }
        .title.icon {
            font-size: 20px;
            color: #999;
            line-height: 1.5;
        }
        .main-panel {
            overflow: hidden;
            margin-top: 10px;
            .bg-purple {
                background: #d3dce6;
            }
            .bg-purple-light {
                background: #e5e9f2;
            }
        }
        .score-panel {
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
        .sport-type-panel {
            overflow: hidden;
            font-size: 12px;
            .card {
                display: inline-block;
                margin-right: 10px;
            }
            .fa {
                cursor: pointer;
            }
            .sport-detail {
                width: 342px;
                height: 60px;
                line-height: 20px;
                padding: 10px;
                background-color: #f2f2f2;
                border: 1px solid #d4d4d4;
                border-bottom-color: transparent;
                font-weight: bold;
                span {
                    font-weight: normal;
                }
            }
            .sport-number {
                width: 342px;
                height: 30px;
                line-height: 30px;
                padding: 10px;
                background-color: #fff;
                color: #101010;
                border: 1px solid #d4d4d4;
                border-top-color: transparent;
                margin-bottom: 10px;
            }
        }
        .add-sports {
            width: 342px;
            height: 110px;
            padding: 10px;
            border: 1px solid #d4d4d4;
            text-align: center;
            margin-bottom: 10px;
            display: inline-block;
            float: left;
            margin-right: 10px;
            cursor: pointer;
            .icon-plus {
                display: block;
                font-size: 130px;
                color: #d4d4d4;
                text-align: center;
                line-height: 70px;
                margin-bottom: 20px;
            }
        }
    }
</style>