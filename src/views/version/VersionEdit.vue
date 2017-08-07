<template>
    <div class="page-container">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/version' }">版本发布管理</el-breadcrumb-item>
                <el-breadcrumb-item>版本编辑</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form class="panel" ref="form" label-width="80px">
                <el-form-item label="版本名称">
                    <el-input v-model="info.versionName"></el-input>
                </el-form-item>
                <el-form-item label="版本号">
                    <el-input-number v-model="info.versionCode" :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="apk url" v-if="platform === 'Android'">
                    <el-input placeholder="请输入内容" v-model="info.versionCode">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="强制升级">
                    <el-switch v-model="info.isForced" on-text="是" off-text="否"></el-switch>
                </el-form-item>
                <el-form-item label="更新日志">
                    <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="info.changeLog"></el-input>
                </el-form-item>
            </el-form>
            <el-button class="submit-btn" type="primary" @click="submit">保存</el-button>
        </div>
    </div>
</template>
<script>
    import resources from '../../resources'

    export default {
        data() {
            return {
                platform: this.$route.params.platform,
                // 编辑类型：'edit' 'new'
                type: this.$route.params.type,
                versionId: this.$route.params.versionId,
                info: {
                    versionName: '', // 版本名称
                    versionCode: 0, // 版本号
                    apkUrl: '',
                    isForced: false,
                    changeLog: '',
                },
                universityId: resources.universityId,
            }
        },
        methods: {
            submit() {
                let _this = this;
                console.log('提交:', this.info);
            },
            // 获取版本信息-有传id时需要获取
            getVersionInfo() {
                let _this = this;
                const getTerms = `{
                    terms(universityId: ${_this.universityId}) {
                        id
                        name
                        termSportsTask {
                            targetSportsTimes
                        }
                    }
                }`;
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': getTerms
                })
                    .then(res => {
                        _this.terms = res.data.data.terms;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        mounted: function () {
            console.log(this.platform, this.type);
            this.getVersionInfo();
        }
    }

</script>
<style lang="scss" scoped>
    .page-container {
        color: #666;
        .panel {
            margin-top: 20px;
            width: 600px;
        }
        .submit-btn {
            margin-left: 80px;
        }
    }
</style>