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
            <el-row>
                <el-col :span="17">
                    <div class="content"></div>
                </el-col>
                <el-col :span="6" :offset="1">
                    <div class="content"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            goTeachers() {
                this.$router.push({ path: '/teachers' });
            }
        }
    }

</script>
<style lang="scss" scoped>
    .page-container {
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
            .content {
                border-radius: 4px;
                border: 1px solid #d4d4d4;
                min-height: 36px;
            }
        }
    }
</style>