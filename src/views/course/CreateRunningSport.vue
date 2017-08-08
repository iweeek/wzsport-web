<template>
    <div class="page-container">
        <div class="seting">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/courses' }">学科管理</el-breadcrumb-item>
                <el-breadcrumb-item>创建跑步运动</el-breadcrumb-item>
            </el-breadcrumb>
            <span class="title">填写运动方式信息</span>
            <el-col :span="24">
                 <span class="space">
                    运动方式名称:
                    <el-input size="small" v-model="sport_data.name"></el-input>
                </span> 
                 <span class="space">
                    数据采集样本数:
                    <el-input size="small" v-model="sport_data.sampleNum"></el-input>
                </span> 
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
                <span class="title">填写运动指标</span>
                <table class="table">
                    <tr>
                        <th></th>
                        <th v-for="th in sport.ths">{{th}}</th>
                    </tr>
                    <tr>
                        <td>达标</td>
                        <td><el-input size="small" v-model="sport_data.qualifiedDistance"></el-input></td>
                        <td><el-input size="small" v-model="sport_data.qualifiedCostTime"></el-input></td>
                        <td>{{speed}}</td>
                    </tr>
                    <tr>
                        <td>超速</td>
                        <td>同上</td>
                        <td><el-input size="small" v-model="sport_data.minCostTime"></el-input></td>
                        <td>{{overSpeed}}</td>
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
    import resources from '../../resources'
    
    const queryProject = `
    query ($id: Long) {
      runningSport(id: $id) {
        name
        qualifiedDistance
        qualifiedCostTime
        minCostTime
        acquisitionInterval
      }
    }`;
    export default {
        data() {
            return {
                sport: {
                    ths: ['距离（单位：m）', '时长（单位：min）', '速度（m/s）']
                },
                sport_data: {
                    universityId: resources.universityId,
                    name: '',
                    isEnabled: false,
                    qualifiedDistance: 1000,
                    qualifiedCostTime: 3600,
                    minCostTime: 2400,
                    sampleNum: 0,
                    acquisitionInterval: 5,
                    hourlyKcalConsumption: 0
                },
                speed: 0,
                overSpeed: 0,
                coverImageUrl: '',
                coverDialogVisible: false
            }
        },
        methods: {
            submit() {
                let _this = this;
                // 普通的ajax接口
                // 使用 application/x-www-form-urlencoded 格式化 
                // 参考：http://blog.csdn.net/fantian001/article/details/70193938
                let url = resources.runningSports();
                let params = new URLSearchParams();
                params.append('qualifiedDistance', this.sport_data.qualifiedDistance);
                params.append('qualifiedCostTime', this.sport_data.qualifiedCostTime*60);
                params.append('minCostTime', this.sport_data.minCostTime*60);
                params.append('acquisitionInterval', this.sport_data.acquisitionInterval);
                params.append('sampleNum', this.sport_data.sampleNum);
                params.append('isEnabled', this.sport_data.isEnabled);
                params.append('name', this.sport_data.name);
                params.append('universityId', this.sport_data.universityId);
                params.append('hourlyKcalConsumption', this.sport_data.hourlyKcalConsumption);

                this.$ajax.post(url, params)
                .then(res => {
                    _this.$router.push({ path: '/courses' });
                });
            },
            countSpeed() {
                this.speed = (this.sport_data.qualifiedDistance/this.sport_data.qualifiedCostTime).toFixed(1);
                this.overSpeed = (this.sport_data.qualifiedDistance/this.sport_data.minCostTime).toFixed(1);
            },
            handlePictureCardPreview(file) {
                this.coverImageUrl = file.url;
                this.coverDialogVisible = true;
            }
        },
        mounted: function () {
            this.countSpeed();
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
        .space{
            display: block;
            width: 400px;
            margin-bottom: 10px;
            .el-input{
                width: 100px;
            }
        }
    }
</style>