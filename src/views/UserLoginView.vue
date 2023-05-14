<template>
    <div id="container">
        <div class="title">银行管理系统-用户端</div>
        <div id="login-box">
            <div class="title2">用户登录</div>
            <div class="input">
                <div>用户类型:</div>
                <el-select v-model="userType">
                    <el-option
                    v-for="item in userTypeOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                    />
                </el-select>
            </div>
            <div class="input">
                <div>登录名:</div>
                <el-input v-model="idNumber" placeholder="请输入身份证号" maxlength="18"/>
            </div>
            <div class="input">
                <div>密码:</div>
                <el-input v-model="password" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <el-button type="primary" @click="login">登录</el-button>
            <div id="register-button" @click="goToRegister">注册</div>
        </div>
    </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
const router = useRouter();
const userTypeOptions = ['个人用户','企业用户'];
var userType = ref('普通个人用户');
const userTypeNum = computed(() => {
    let n = 0;
    switch(userType.value){
        case '个人用户':
            n = 0;
            break;
        case '企业用户':
            n = 2;
            break;
    }
    return n;
})
var idNumber = ref('');
var password = ref('');

// todo
function login(){
    // 检测数据是否都输入
    if(idNumber.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入登录名',
            type: 'error',
        })
        return;
    }
    if(idNumber.value.length < 18){
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
    
    //  设置缓存
    if(userTypeNum.value == 2){
        sessionStorage.setItem('bussinessType','1'); //0表示个人业务，1表示企业业务
        sessionStorage.setItem('cUserId',1);
        sessionStorage.setItem('operatorId',1);
        sessionStorage.setItem('companyName','公司名');
        sessionStorage.setItem('operatorName','caozuorenming');
        sessionStorage.setItem('IDNumber', 'shengfenzhenghao');
        sessionStorage.setItem('userType','企业用户超级用户');//企业用户超级用户、企业用户普通用户
    }else{
        sessionStorage.setItem('bussinessType','0'); //0表示个人业务，1表示企业业务
        sessionStorage.setItem('pUserId',1);
        sessionStorage.setItem('userName','yonghuming');
        sessionStorage.setItem('IDNumber', 'shengfenzhenghao');
        sessionStorage.setItem('userType','普通个人用户');//普通个人用户、个人VIP用户
    }
    // 登录成功跳转至主页
    router.push("/usersystem");
}

function goToRegister(){
    router.push("/register");
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