<template>
    <div id="container">
        <div class="title">银行管理系统-雇员端</div>
        <div id="login-box">
            <div class="title2">登录</div>
            <div class="input">
                <div>登录名:</div>
                <el-input v-model="account" placeholder="请输入雇员账号" maxlength="8"/>
            </div>
            <div class="input">
                <div>密码:</div>
                <el-input v-model="password" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <el-button type="primary" @click="login">登录</el-button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
import axios from 'axios';
const router = useRouter();
var account = ref('');
var password = ref('');

// todo
function login(){
    // 检测数据是否都输入
    if(account.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入登录名',
            type: 'error',
        })
        return;
    }
    if(account.value.length < 8){
        ElMessage({
            showClose: true,
            message: '请输入正确登录名',
            type: 'error',
        })
        return;
    }
    if(password.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入密码',
            type: 'error',
        })
        return;
    }
    // 向后端发送请求
    axios.post('employee/login',{
        account: account.value,
        password: password.value
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            //  设置缓存
            sessionStorage.setItem('bussinessType', response.data.bussiness_type.toString()); //0表示个人业务，1表示企业业务
            sessionStorage.setItem('employeeId',response.data.employee_id);
            sessionStorage.setItem('employeeName',response.data.name);
            sessionStorage.setItem('account','guyuanzhanghao');
            if(response.data.user_type == 1){
                sessionStorage.setItem('userType','前台操作员');//前台操作员，银行经理，银行业务总管、系统管理员
            }else if(response.data.user_type == 2){
                sessionStorage.setItem('userType','银行经理');//前台操作员，银行经理，银行业务总管、系统管理员
            }else if(response.data.user_type == 3){
                sessionStorage.setItem('userType','银行业务总管');//前台操作员，银行经理，银行业务总管、系统管理员
            }else{
                sessionStorage.setItem('userType','系统管理员');//前台操作员，银行经理，银行业务总管、系统管理员
            }
            // 登录成功跳转至主页
            router.push('/employeesystem');
        }else{
            ElMessage({
                showClose: true,
                message: response.message,
                type: 'error',
            })
        }
    })
}

</script>

<style scoped>
    #container{
        height: 100%;
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #login-box{
        width:20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }
    .input{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        height: 30px;
        margin-top: 10px;
        width:100%;
    }
    .title{
        font-size: 35px;
    }
    .title2{
        font-size: 25px;
        margin-bottom: 20px;
    }
    .el-input{
        width:70%;
    }
    .el-select{
        width:70%;
    }
    .el-button{
        width:100%;
        margin-top:20px;
    }
    #register-button{
        margin-top: 10px;
        font-size: 15px;
        color: darkgray;
        margin-right: auto;
    }
</style>