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
                            <td><span>55人</span></td>
                            <td><span class="female">8人</span></td>
                            <td><span class="total">63人</span></td>
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
                        <div class="sport-type-panel">
                            <div v-for="item in sports" class="card">
                                <div class="sport-detail">
                                    <el-col :span="24" class="title">
                                        {{item.name}}
                                    </el-col>
                                    达标距离：<span>{{item.distance}}</span> 达标时间：
                                    <span>{{item.time}}</span> 达标速度：
                                    <span>{{item.speed}}</span>
                                </div>
                                <div class="sport-number">
                                    <el-col :span="20">
                                        启用中
                                    </el-col>
                                    <el-col :span="4" class="title">
                                        <i @click="setTarget(item.sport_id)" class="fa fa-pencil"></i>
                                        <i @click="unlock(item.sport_id)" class="fa fa-lock"></i>
                                        <i @click="lock(item.sport_id)" class="fa fa-unlock-alt"></i>
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
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                sports: [
                    {
                        sport_id: 1,
                        name: '快走',
                        distance: '6000米',
                        time: '60分钟',
                        speed: '6公里／小时',
                        status: 1,
                    },
                    {
                        sport_id: 1,
                        name: '快走',
                        distance: '6000米',
                        time: '60分钟',
                        speed: '6公里／小时',
                        status: 1,
                    },
                    {
                        sport_id: 1,
                        name: '快走',
                        distance: '6000米',
                        time: '60分钟',
                        speed: '6公里／小时',
                        status: 1,
                    },
                    {
                        sport_id: 1,
                        name: '快走',
                        distance: '6000米',
                        time: '60分钟',
                        speed: '6公里／小时',
                        status: 1,
                    }
                ]
            }
        },
        methods: {
            goTeachers() {
                this.$router.push({ path: '/teachers' });
            },
            goScore() {
                this.$router.push({ path: '/score/' + this.classId });
            },
            goData() {
                this.$router.push({ path: '/data/' + this.classId });
            },
            setTimes() {
                console.log('设置学期运动次数');
                this.$router.push({ path: '/setting' });
            },
            setTarget(sport_id) {
                console.log('设置运动指标');
                this.$router.push({ path: '/settarget/' + sport_id });
            },
            unlock(sport_id) {
                console.log('unlock');
            },
            lock(sport_id) {
                console.log('lock');
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
    }
</style>