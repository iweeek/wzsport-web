<template>
    <div class="page-container">
        <div class="seting">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/courses' }">学科管理</el-breadcrumb-item>
                <el-breadcrumb-item>设置运动指标</el-breadcrumb-item>
            </el-breadcrumb>
            <el-col :span="24">
                <el-col :span="19" class="title">
                    区域锻炼
                    <el-button class="operate-btn" @click="setArea" size="small" type="primary">新增锻炼区域</el-button>
                </el-col>
                <table class="table">
                    <tr>
                        <th>名称</th>
                        <th>地址</th>
                        <th>类型</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="area in area_data">
                        <td>{{area.name}}</td>
                        <td>{{area.address}}</td>
                        <td>{{area.type}}</td>
                        <td>
                            <i class="dot" :class="{ 'dot-lock': !area.enable }"></i> {{area.enable ? '启用中' : '未启用'}}
                        </td>
                        <td>
                            <el-button v-if="area.enable" type="text" @click="stop">停用</el-button>
                            <div v-if="!area.enable">
                                <el-button type="text" @click="start">启用</el-button>
                                <el-button type="text" @click="edit(area.id)">编辑</el-button>
                                <el-button type="text" @click="remove">删除</el-button>
                            </div>
                        </td>
                    </tr>
                </table>
            </el-col>
        </div>
    </div>
</template>
<script>
    import resources from '../../resources'
    
    export default {
        data() {
            return {
                id: this.$route.params.sport_id,
                area_name: '区域锻炼',
                area_data: [{
                    name: '温大南校区体育馆1',
                    address: '温大南校区体育馆地址1',
                    type: 'type',
                    enable: true,
                    id: 1
                },
                {
                    name: '温大南校区体育馆1',
                    address: '温大南校区体育馆地址2',
                    type: 'type',
                    enable: false,
                    id: 2
                }]
            }
        },
        methods: {
            getArea(id) {
                console.log('获取一个室外定点活动点');
                let url = resources.fixLocationOutdoorSportPoints();
                console.log(url);
                this.$ajax.get(url)
                .then(res => {
                    console.log(res.data);
                });
            },
            setArea() {
                console.log('新增锻炼区域');
                this.$router.push({ path: `/area/${this.id}?type=add`});
            },
            stop() {
                console.log('stop');
            },
            start() {
                console.log('start');
            },
            remove() {
                console.log('remove');
            },
            edit(id) {
                console.log('修改锻炼区域');
                this.$router.push({ path: `/area/${this.id}/${id}?type=edit` });
            }
        },
        mounted: function () {
            this.getArea(this.id);
        }
    }

</script>
<style lang="scss" scoped>
    .page-container {
        color: #666;
        .title {
            color: #666;
            line-height: 2.5;
            font-size: 16px;
            font-weight: bold;
        }
        .table {
            width: 80%;
            border-collapse: collapse;
            text-align: center;
            th{
                background-color: #f7f7f7;
            }
            td{
                padding: 5px 20px;
            }
            td,th {
                border: 1px solid #ebebeb;
                height: 33px;
            }
        }
        .operate-btn {
            float: right
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
    }
</style>