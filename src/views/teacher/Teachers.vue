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
                    <span @click="goCourses">查看学科详情 ></span>
                </el-col>
            </el-row>
        </div>
        <div class="main-panel">
            <el-col :span="24" class="title">
                任课教师
            </el-col>
            <el-col :span="20">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.name" placeholder="输入教师姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="filters.worknumber" placeholder="输入教师工号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select class="filter-sex" v-model="filters.sex" placeholder="性别">
                            <el-option label="男" value="boy"></el-option>
                            <el-option label="女" value="girl"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getTeachers">筛选</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="4">
                <el-form>
                    <el-form-item>
                        <el-button type="primary" @click="batchAddTeachers">批量创建教师账号</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="worknumber" label="工号" width="180">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="worknumber" label="工号" width="180">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>
            </el-table>

            <div class="page">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="3" layout="prev, pager, next, jumper"
                    :total="10">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                filters: {
                    name: '',
                    worknumber: '',
                    sex: ''
                },
                total: 0,
                currentPage: 1,
                listLoading: false,
                tableData: [{
                    worknumber: '20170516',
                    name: '王小虎',
                    sex: '男'
                }, {
                    worknumber: '20170516',
                    name: '王大虎',
                    sex: '男'
                }, {
                    worknumber: '20170516',
                    name: '王小虎',
                    sex: '男'
                }, {
                    worknumber: '20170516',
                    name: '王小虎',
                    sex: '男'
                }]
            }
        },
        methods: {
            //获取教师列表
            getTeachers() {
                let params = {
                    page: this.page,
                    name: this.filters.name,
                    worknumber: this.filters.worknumber,
                    sex: this.filters.sex
                };
                this.listLoading = true;
                console.log('发送获取教师信息请求');
                // 发送获取教师信息请求
            },
            batchAddTeachers() {
                this.$router.push({ path: '/addteacher' });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            goCourses() {
                this.$router.push({ path: '/courses' });
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
                width: 184px;
                height: 85px;
                color: #ffffff;
                background-color: #dedede;
                font-size: 20px;
                border-radius: 4px;
                line-height: 4;
                font-weight: bold;
                text-align: center;
                margin-left: 85px;
                margin-top: 15px;
                cursor: pointer;
            }
        }
        .main-panel {
            overflow: hidden;
            border: 1px solid #d4d4d4;
            border-radius: 4px;
            margin-top: 10px;
            padding: 0 10px 0px 15px;
        }
        .title {
            color: #666;
            line-height: 2.5;
            font-size: 16px;
            font-weight: bold;
        }
        .filter-sex {
            width: 90px;
        }
        .page {
            text-align: center;
            margin: 10px;
        }
    }
</style>