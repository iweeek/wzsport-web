<template>
    <div class="page-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/students' }">学生管理</el-breadcrumb-item>
            <el-breadcrumb-item>批量创建学生账号</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-panel">
            <span class="title">输入初始密码</span>
            <el-input class="pass-input" size="large" v-model="defaultPassword" placeholder="输入初始密码"></el-input>
            <span class="title">导入学生信息</span>
            <el-upload 
                class="file-uploader" 
                action="http://localhost:8080/uploadFile" 
                :before-upload="beforeFileUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                multiple
                :show-file-list="false" 
                :on-change="handleChange"
                :on-success="uploadSuccess">
                <img v-if="fileUrl" :src="fileUrl" class="file">
                <i v-else class="el-icon-plus file-uploader-icon"></i>
            </el-upload>

            <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">Click to upload</el-button>
                <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </el-upload> -->

            <el-button class="create-btn" type="primary" @click="batchAddStudents">创建账号</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                defaultPassword: 123456,
                fileUrl: ''
            }
        },
        methods: {
            batchAddStudents() {
                console.log('批量账号');
            },
            uploadSuccess(res, file) {
                console.log("上传成功");
                this.fileUrl = URL.createObjectURL(file.raw);
                 if(res.code===20000){
                    this.$message({
                        message: '上传成功！',
                        type: 'success'
                    });
                }else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            },
            handleChange(file, fileList) {
                console.log(file);
            },
            handleRemove(file, fileList) {
                console.log("handleRemove");
            },
            handlePreview(file) {
                console.log("handleRemove");
            },
            beforeFileUpload(file) {
                console.log("beforeFileUpload");
                let Xls = file.name.split('.');

                if(Xls[1] === 'xls'||Xls[1] === 'xlsx'){
                    return file
                }else {
                    this.$message.error('上传文件只能是 xls/xlsx 格式!')
                    return false
                }
            }
        }
    }

</script>
<style lang="scss" scoped>
    .page-container {
        .main-panel {
            padding-top: 50px;
            text-align: center;
            .title {
                margin: 10px 0 20px 0;
                display: block;
                font-size: 18px;
                color: #828282;
                line-height: 26px;
                font-weight: bold;
            }
        }
        .pass-input {
            width: 432px;
        }
        .file-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .file-uploader .el-upload:hover {
            border-color: #20a0ff;
        }
        .file-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 208px;
            height: 46px;
            line-height: 46px;
            text-align: center;
            border: 1px dotted #bbb;
            margin-bottom: 20px;
        }
        .file {
            width: 178px;
            height: 178px;
            display: block;
        }
        .create-btn {
            width: 415px;
            height: 70px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
        }
    }
</style>