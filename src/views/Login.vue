<template>
	<div class="login-container">
		<h3 class="title">教师后台</h3>
		<el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="top" label-width="80px" class="login-form">
			<el-form-item prop="account" label="工号">
				<el-input size="large" type="text" v-model="loginForm.account" placeholder="工号"></el-input>
			</el-form-item>
			<el-form-item prop="password" label="密码">
				<el-input size="large" type="password" v-model="loginForm.checkPass" placeholder="密码"></el-input>
			</el-form-item>
			<el-form-item style="width:100%;">
				<el-button size="large" type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
				<router-link to="/password">设置登录密码</router-link>
				<router-link to="/resetpass">修改登录密码</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
// import { requestLogin } from '../api/api';
export default {
	data() {
		return {
			logining: false,
			loginForm: {
				account: '123456',
				password: '123456'
			},
			rules2: {
				account: [
					{ required: true, message: '请输入账号', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
				]
			},
			checked: true
		};
	},
	methods: {
		login(ev) {
			// var _this = this;
			// this.$refs.loginForm.validate((valid) => {
			// 	if (valid) {
			// 		this.logining = true;
			// 		var loginParams = { username: this.loginForm.account, password: this.loginForm.password };
			// 		requestLogin(loginParams).then(data => {
			// 			this.logining = false;
						// let { msg, code, user } = data;
						// if (code !== 200) {
						// 	this.$message({
						// 		message: msg,
						// 		type: 'error'
						// 	});
						// } else {
						// 	sessionStorage.setItem('user', JSON.stringify(user));
							this.$router.push({ path: '/teachers' });
						// }
			// 		});
			// 	} else {
			// 		console.log('error submit!!');
			// 		return false;
			// 	}
			// });
		}
	}
}

</script>

<style lang="scss" scoped>
.login-container {
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin-top: 140px;
	.login-form{
		margin: 0 auto;
		width: 350px;
		padding: 35px 35px 15px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6;
	}
	.title {
		font-size: 28px;
		margin: 0px auto 30px auto;
		text-align: center;
		color: #505458;
	}
	.remember {
		margin: 0px 0px 35px 0px;
	}
}
</style>