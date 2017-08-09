<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <!--<Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">-->
                <Menu :mode="modeType" theme="dark" width="auto" :active-name="this.$route.path" :open-names="openNames" @on-select="menuSelect" accordion>
                    <div class="layout-logo-left">
                    	<img src="../../static/login/timg.jpg" width="100%" height="100%"/>
                    </div>
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">  
                        <Submenu :name="item.name" v-if="!item.leaf">
                            <template slot="title">
                                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text" >{{item.name}}</span>
                            </template>
                            <template v-for="(child,childIndex) in item.children" v-if="!child.hidden">
                                <Menu-item :name="child.path">{{child.name}}</Menu-item>
                            </template>
                        </Submenu>
                        <template  v-if="item.leaf&&item.children.length>0">
                            <Menu-item :name="item.children[0].path">
                                 <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text" >{{item.children[0].name}}</span>
                            </Menu-item>
                        </template>  
                   </template>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
				    <Row style='height: 100%;'>
				    	<Col span="22" style="height: 60px;line-height: 60px;">
					    	<i-button type="text" @click="toggleClick">
		                        <Icon type="navicon" size="32"></Icon>
		                    </i-button>
					    </Col>
					    <Col span="2" style="height: 60px;line-height: 60px;">
		                    <Dropdown trigger="click" style="margin-left: 0px;margin-top: 5px;">
						        <div style="width: 50px;height: 50px;">
						        	<div  class="head-img">
				                    	<img src="../../static/login/user.jpg" />
				                   </div>
						        </div>
						        <Dropdown-menu slot="list">
						        	<Dropdown-item>{{userName}}</Dropdown-item>
						            <Dropdown-item @click.native="modifyPassWord()">修改密码</Dropdown-item>
						            <Dropdown-item>消息中心</Dropdown-item>
						            <Dropdown-item @click.native="logout()" divided>退出</Dropdown-item>
						        </Dropdown-menu>
						    </Dropdown>
					    </Col>
					</Row>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>{{$route.name}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                     </div>
                </div>
            </i-col>
        </Row>
        <Modal v-model="modal1" title="修改密码" @on-ok="comfirmModifyPS"  @on-cancel="cancel" >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Form-item label="原密码" prop="oldPassword">
                    <Input v-model="formValidate.oldPassword" placeholder="请输入原始密码"></Input>
                </Form-item>
                <Form-item label="新密码" prop="newPassword">
                    <Input v-model="formValidate.newPassword" placeholder="请输入新密码"></Input>
                </Form-item>
                 <Form-item label="确认新密码" prop="resetPassword">
                    <Input v-model="formValidate.resetPassword" placeholder="请再次输入新密码"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
				userName : sessionStorage.getItem('user').replace(/\"/g, ""),
                
                modal1: false,
                formValidate: {
                    oldPassword: '',
                    newPassword: '',
                    resetPassword:''
                },
                ruleValidate: {
                    oldPassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    resetPassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                },
                
                openNames: [this.$route.matched[0].name],
                modeType: "vertical",
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            modifyPassWord() {
                this.modal1 = true;    
            },
            logout() {
				this.$router.push('/login');
            },
            cancel(){
                this.modal1 = false;    
                this.$Message.info('点击了取消');
            },
            comfirmModifyPS() {
              	this.$Message.info('点击了确定');
              	return false;
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.modal1 = false;
                        //this.loading = false;
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                        return false;
                    }
                })
            },
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            menuSelect(name) {
                this.$router.push({path: name});
            }
        }
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 550px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
    	height: 700px;
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .head-img {
	    width: 100%;
	    height: 60px;
	    line-height: 60px;
	    /*float: right;*/
	    margin-top: 0px;
	}
	.head-img img{
	    border-radius: 20px;
	    margin-left: 5px;
	    margin-top: 5px;
	    width: 40px;
	    height: 40px;
	    /*float: right;*/
	}
    .layout-logo-left{
        width: 130px;
        height: 50px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>