<template>
    <div class="page-container">
        <div class="main-panel">
            <el-tabs v-model="filters.platform">
                <el-tab-pane label="Android" name="Android">
                    <span slot="label"><i class="fa fa-android" aria-hidden="true"></i>Android</span>
                </el-tab-pane>
                <el-tab-pane label="iOS" name="iOS">
                    <span slot="label"><i class="fa fa-apple" aria-hidden="true"></i>iOS</span>
                </el-tab-pane>
            </el-tabs>
            <el-col class="table-panel">
                <el-col :span="24">
                    <el-form :inline="true" :model="filters">
                        <el-form-item label="发布状态">
                            <el-select class="sm" v-model="filters.status" placeholder="发布状态">
                                <el-option label="全部" value="all"></el-option>
                                <el-option label="已发布" value="publish"></el-option>
                                <el-option label="未发布" value="unpublish"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="更新时间">
                            <el-date-picker v-model="filters.timeRange" type="datetimerange" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchRecords">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <table class="table">
                    <tr>
                        <th>版本名称</th>
                        <th>版本号</th>
                        <th>更新日志</th>
                        <th>是否强制升级</th>
                        <th v-if="filters.platform === 'Android'">apk url</th>
                        <th>发布状态</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="version in versionList">
                        <td>{{version.versionName}}</td>
                        <td>{{version.versionCode}}</td>
                        <td>{{version.changeLog}}</td>
                        <td>{{version.isForced}}</td>
                        <td v-if="filters.platform === 'Android'">{{version.apkUrl}}</td>
                        <td>{{version.status}}</td>
                        <td>{{version.time}}</td>
                        <td>
                            <el-button type="text" @click="">下架</el-button>

                            <el-button type="text" @click="">编辑</el-button>
                            <el-button type="text" @click="">删除</el-button>
                            <el-button type="text" @click="">发布</el-button>
                        </td>
                    </tr>
                </table>

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
    const latestAndroidVerisonInfo = `
    query{
        latestAndroidVerisonInfo{
            id
            versionName
            versionCode
            changeLog
            apkUrl
            isForced
            }
        }
    `
    export default {
        data() {
            return {
                universityId: 1,
                pageSize: 10,
                pageNumber: 1,
                dataCount: 0,
                loading: false,
                filters: {
                    platform: 'Android',
                    timeRange: [],
                    status: 'all'
                },
                versionList: []
            }
        },
        methods: {
            //获取列表
            searchRecords() {
                let _this = this;
                let params = {
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber
                };
                console.log('筛选参数：', this.filters);
                this.getData(params);
            },
            getData(params) {
                let _this = this;
                console.log('获取版本列表-安卓')
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${latestAndroidVerisonInfo}`,
                    variables: {
                        // "universityId": _this.universityId
                    }
                })
                    .then(res => {
                        _this.versionList = res.data.data.latestAndroidVerisonInfo;
                    });
            }
        },
        mounted: function () {
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
        .table {
            width: 90%;
            border-collapse: collapse;
            text-align: center;
            th {
                background-color: #f7f7f7;
            }
            td {
                padding: 5px 20px;
            }
            td,
            th {
                border: 1px solid #ebebeb;
                height: 33px;
            }
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
        .el- {
            width: 145px;
        }
        .el-date-editor {
            width: 280px;
        }
        .pointer {
            cursor: pointer;
            color: #29b6f6;
        }
    }
</style>