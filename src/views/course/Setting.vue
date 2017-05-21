<template>
    <div class="page-container">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/courses' }">学科管理</el-breadcrumb-item>
                <el-breadcrumb-item>设置学期运动次数</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form class="panel" ref="form" label-width="80px">
                <el-form-item label="选择学期">
                    <el-select v-model="term" placeholder="选择学期">
                        <el-option label="2016~2017第一学期" value="2016-1"></el-option>
                        <el-option label="2016~2017第二学期" value="2016-2"></el-option>
                    </el-select>
                </el-form-item>
                </el-form-item>
                <el-form-item label="次数">
                    <el-input v-model="times"></el-input>
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
                times: 123,
                term: ''
            }
        },
        methods: {
            submit() {
                console.log('保存');
                this.$router.push({ path: '/courses'});

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
        .submit-btn {
            margin-left: 80px;
        }
    }
</style>