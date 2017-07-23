<template>
    <div class="page-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/courses' }">学科管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/outdoortarget/'+id }">设置运动指标</el-breadcrumb-item>
            <el-breadcrumb-item v-if="type === 'add'">新增锻炼区域</el-breadcrumb-item>
            <el-breadcrumb-item v-if="type === 'edit'">编辑锻炼区域</el-breadcrumb-item>
        </el-breadcrumb>
        <el-steps :space="300" :active="1" class="step">
            <el-step title="设置锻炼区域"></el-step>
            <el-step title="填写运动指标"></el-step>
        </el-steps>
        <div>
            <el-col :span="24" class="title">
                设置中心坐标
            </el-col>
            <div>
                地图组建
            </div>
            <el-col :span="24" class="title">
                区域介绍
            </el-col>
            <el-col :span="12">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input type="textarea" placeholder="请输入简介" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="过期时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
        <el-col :span="24">
            <el-button type="primary">下一步</el-button>
        </el-col>
    </div>
</template>
<script>
    import resources from '../../resources'

    export default {
        data() {
            return {
                id: this.$route.params.sport_id,
                area_id: this.$route.params.area_id,
                type: this.$route.query.type,
                form: {
                    name: '',
                    date: '',
                    desc: ''
                }

            }
        },
        methods: {
            getArea() {
                console.log('获取区域信息');
            }
        },
        mounted: function () {
            // 编辑状态下才会获取原本保存的信息
            if (this.type === 'edit') {
                this.getArea();
            }
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
        .step {
            text-align: center;
        }
    }
</style>