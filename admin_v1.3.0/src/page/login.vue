<template>
	<div class="login_bg">
		<div class="parent">
			<div class="main">
				<div class="title">系统登录</div>
			    <Form ref="formLogin" :model="formLogin" :rules="ruleInline" inline>
			        <Form-item prop="username" class="username">
			            <Input type="text" v-model="formLogin.username" placeholder="用户名">
			                <Icon type="ios-person-outline" slot="prepend"></Icon>
			            </Input>
			        </Form-item>
			        <Form-item prop="password" class="pwd">
			            <Input type="password" v-model="formLogin.password" placeholder="密码">
			                <Icon type="ios-locked-outline" slot="prepend"></Icon>
			            </Input>
			        </Form-item>
			        <Checkbox v-model="formLogin.remember" class="remindPwd">记住密码</Checkbox>
			        <div class="bottomDiv">
				        <Form-item class="login">
				            <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
				        </Form-item>
				        <Form-item class="reset">
				            <Button type="primary" @click="gaaaaa('formLogin')">重置</Button>
				        </Form-item>
				    </div>
			    </Form>
	    	</div>
		</div>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                formLogin: {
                    username: '',
                    password: '',
                    remember : false
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                	sessionStorage.setItem('user', JSON.stringify(this.formLogin.username));
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.$router.push({ path: '/' });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                    if(this.formLogin.remember){
                        sessionStorage.setItem('username', JSON.stringify(this.formLogin.username));
                        sessionStorage.setItem('password', JSON.stringify(this.formLogin.password));
                    }else{
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('password');
                    }
                })
            },
            formLoginReset(name){
                this.$refs[name].resetFields();
            },
            gaaaaa(){
            	this.$http('https://bird.ioliu.cn/joke')
               	.then((res) => {
                    console.log(res)
               	})
            }
        },
        mounted() {
            if(sessionStorage.getItem('username')){
                this.formLogin.username = JSON.parse(sessionStorage.getItem('username'));
            }
            if(sessionStorage.getItem('password')){
                this.formLogin.password = JSON.parse(sessionStorage.getItem('password'));
            }
        }
    }
</script>

<style scoped="scoped">
	.login_bg{
		min-height: 760px;
	    background: url('../../static/login/bg.jpg') no-repeat center;
	    background-size: cover;
	}
	.parent{
		width: 350px;
		height: 300px;
		background-color: white;
		border-radius: 10px;
		position: absolute;
		margin-left: -200px;
		left: 50%;
		top: 30%;
	}
	.main{
		width: 300px;
		height: 250px;
		margin-left: 25px;
		margin-top: 15px;
	}
	.title{
		width: 100px;
		height: 30px;
		text-align: center;
		margin-left: 100px;
		font-size: 24px;
	}
	.username{
		margin-top: 25px;
		margin-left: 60px;
	}
	.pwd{
		margin-left: 60px;
	}
	.remindPwd{
		margin-left: 60px;
	}
	.bottomDiv{
		width: 200px;
		height: 40px;
		margin-top: 15px;
		margin-left: 50px;
		display: inline-block;
	}
	.login{
		margin-left: 10px;
	}
	.reset{
		margin-left: 50px;
	}
</style>