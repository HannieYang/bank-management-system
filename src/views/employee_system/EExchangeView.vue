<template>
    <div id="container">
        <div id="b-box">
            <div class="input">
                <div class="title">转出账号:</div>
                <el-input v-model="account" placeholder="请输入账号" maxlength="19"/>
            </div>
            <div class="input">
                <div class="title">账户密码:</div>
                <el-input v-model="password" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <div class="input">
                <div class="title">转出用户名:</div>
                <el-input v-model="userName" :placeholder="'请输入转出用户'+nameType" maxlength="10"/>
            </div>
            <div class="input">
                <div class="title">转入账号:</div>
                <el-input v-model="toAccount" placeholder="请输入账号" maxlength="19"/>
            </div>
            <div class="input">
                <div class="title">转入用户名:</div>
                <el-input v-model="toUserName" :placeholder="'请输入转入用户'+nameType" maxlength="10"/>
            </div>
            <div class="input">
                <div class="title">转账金额:</div>
                <el-input v-model="moneyNum" placeholder="请输入转账金额" maxlength="10"/>
            </div>
            
            <el-button type="primary" @click="exchange">确认转账</el-button>
            <div id="result" v-show="showResult">
                <div>转账成功！</div>
                <div>转出账号：{{accountR}}</div>
                <div>转入账号：{{toAccountR}}</div>
                <div>存款时间：{{time}}</div>
                <div>转账金额：{{moneyNumR}}</div>
                <div>余额：{{balance}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import {ref, onMounted} from 'vue';
var account = ref('');
var toAccount = ref('');
var userName = ref('');
var toUserName = ref('');
var moneyNum = ref('');
var password = ref('');
var showResult = ref(false)
var time = ref('');
var balance = ref('');
var accountR = ref('');
var toAccountR = ref('');
var moneyNumR = ref('');

var nameType = ref('');
var bussinessType = ref('');

function clear(){
    account.value = '';
    moneyNum.value = '';
    password.value = '';
    toAccount.value = '';
    toUserName.value = '';
    userName.value = '';
}

// todo
function exchange(){
    // 判断输入数据正误
    if(account.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入转出账号',
            type: 'error',
        })
        return;
    }
    if(account.value.length < 19){
        ElMessage({
            showClose: true,
            message: '请输入正确转出账号',
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
    if(userName.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入转出用户名',
            type: 'error',
        })
        return;
    }
    if(toAccount.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入转入账号',
            type: 'error',
        })
        return;
    }
    if(toAccount.value.length < 19){
        ElMessage({
            showClose: true,
            message: '请输入正确转入账号',
            type: 'error',
        })
        return;
    }
    if(toUserName.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入转入用户名',
            type: 'error',
        })
        return;
    }
    if(!/^\+?[1-9][0-9]*$/.test(moneyNum.value)){
        ElMessage({
            showClose: true,
            message: '请输入正确转账金额',
            type: 'error',
        })
        return;
    }
    
    // 向后端发送请求
    // 清除表单参数
    clear();
}
onMounted(() => {
    bussinessType.value = sessionStorage.getItem('bussinessType')
    if(bussinessType.value == '0'){
        nameType.value = '姓名';
    }else{
        nameType.value = '企业名';
    }

});
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
    #b-box{
        width:25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .input{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        height: 40px;
        margin-top: 10px;
        width:100%;
    }
    .title{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .el-input{
        width:70%;
    }
    .el-button{
        width:100%;
        margin-top:20px;
    }
    #result{
        margin-top:20px;
    }
</style>