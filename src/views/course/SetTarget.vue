<template>
    <div class="page-container">
        <div class="seting">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/courses' }">学科管理</el-breadcrumb-item>
                <el-breadcrumb-item>设置运动指标</el-breadcrumb-item>
            </el-breadcrumb>
            <el-col :span="24">
                <span class="title">{{sport.name}}</span>
                <table class="table">
                    <tr>
                        <th></th>
                        <th v-for="th in sport.ths">{{th}}</th>
                    </tr>
                    <tr>
                        <td>达标</td>
                        <td><el-input size="small"></el-input></td>
                        <td><el-input size="small"></el-input></td>
                        <td><el-input size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td>超速</td>
                        <td><el-input size="small"></el-input></td>
                        <td><el-input size="small"></el-input></td>
                        <td><el-input size="small"></el-input></td>
                    </tr>
                </table>
            </el-col>
            <div class="tip">
                运动达标指标，将会作为学生主要的运动目标显示在前端。而超速指标，只有在学生以更短的时间，完成规定的运动距离，结束运动后，系统才会在App内提示学生，本次运动未达标。
            </div>
            <el-col :span="24">
                <el-button class="submit-btn" type="primary" @click="submit">保存</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                sport: {
                    name: '随机慢跑',
                    ths: ['距离（单位：m）', '时长（单位：min）', '速度（km/h）']
                }
            }
        },
        methods: {
            submit() {
                console.log('保存');
                this.$router.push({ path: '/courses' });

            }
        }
    }

</script>
<style lang="scss" scoped>
    .page-container {
        color: #666;
        .panel {
            margin-top: 20px;
            width: 300px;
        }
        .title {
            color: #666;
            line-height: 2.5;
            font-size: 16px;
            font-weight: bold;
        }
        .table {
            width: 60%;
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
        .tip{
            width: 700px;
            font-size: 12px;
        }
        .submit-btn {
            margin-top: 20px;
        }
    }
</style>