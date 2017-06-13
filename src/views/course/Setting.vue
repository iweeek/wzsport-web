<template>
    <div class="page-container">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/courses' }">学科管理</el-breadcrumb-item>
                <el-breadcrumb-item>设置学期运动次数</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form class="panel" ref="form" label-width="80px">
                <el-form-item label="选择学期">
                    <el-select v-model="selected_term" @change="changed" placeholder="选择学期">
                        <el-option v-for="item in terms" :key="item.id" :label="item.name" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                </el-form-item>
                <el-form-item label="次数">
                    <el-input v-model="targetSportsTimes"></el-input>
                </el-form-item>
            </el-form>
            <el-button class="submit-btn" type="primary" @click="submit">保存</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                terms: [], // 所有学期
                selected_term: '', // 选择的学期
                targetSportsTimes: '' //运动次数
            }
        },
        methods: {
            submit() {
                let _this = this;
                let id = this.selected_term.id;
                // 普通的ajax接口
                // 使用 application/x-www-form-urlencoded 格式化 
                // 参考：http://blog.csdn.net/fantian001/article/details/70193938
                let url = `http:\/\/120.77.72.16:8080\/api\/termSportsTasks\/${id}`;
                let params = new URLSearchParams();
                params.append('targetSportsTimes', this.targetSportsTimes);

                this.$ajax.post(url, params)
                    .then(res => {
                        console.log(res);
                        this.$router.push({ path: '/courses' });
                    });

            },
            changed() {
                let _this = this;
                this.targetSportsTimes = _this.selected_term.termSportsTask.targetSportsTimes
            },
            getAllTerms() {
                let _this = this;
                const getTerms = `{
                    terms(universityId: 1) {
                        id
                        name
                        termSportsTask {
                            targetSportsTimes
                        }
                    }
                }`;
                this.$ajax.post('http://120.77.72.16:8080/api/graphql', {
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
            this.getAllTerms();
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
        .submit-btn {
            margin-left: 80px;
        }
    }
</style>