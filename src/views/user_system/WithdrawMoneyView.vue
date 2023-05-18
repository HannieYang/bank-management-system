<template>
    <div id="container">
        <div id="b-box">
            <div class="input">
                <div class="title">账号:</div>
                <el-input v-model="account" placeholder="请输入账号" maxlength="19"/>
            </div>
            <div class="input">
                <div class="title">取款金额:</div>
                <el-input v-model="moneyNum" placeholder="请输入取款金额" maxlength="10"/>
            </div>
            <div class="input">
                <div class="title">账户密码:</div>
                <el-input v-model="password" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <el-button type="primary" @click="withdraw">确认取款</el-button>
            <div id="result" v-show="showResult">
                <div>取款成功！</div>
                <div>账号：{{accountR}}</div>
                <div>取款时间：{{time}}</div>
                <div>取款金额：{{moneyNumR}}</div>
                <div>余额：{{balance}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import {ref, onMounted} from 'vue';
import {TimestampToDate2} from "../../utils";
import axios from 'axios';

var moneyNum = ref('');
var password = ref('');
var showResult = ref(false)
var account = ref('');
var time = ref('');
var balance = ref('');
var accountR = ref('');
var moneyNumR = ref('');
var bussinessType = ref('');

function clear(){
    account.value = '';
    moneyNum.value = '';
    password.value = '';
}

// todo
function withdraw(){
    // 判断输入数据正误
    if(account.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入账号',
            type: 'error',
        })
        return;
    }
    if(account.value.length < 19){
        ElMessage({
            showClose: true,
            message: '请输入正确账号',
            type: 'error',
        })
        return;
    }
    if(!/^\+?[1-9][0-9]*$/.test(moneyNum.value)){
        ElMessage({
            showClose: true,
            message: '请输入正确取款金额',
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
    if(bussinessType.value == 0){
        axios.post('account/withdrawPersonalByUser',{
            p_user_id: sessionStorage.getItem('pUserId'),
            account: account.value,
            password: password.value,
            amount: moneyNum.value,
        }).then(function(response){
            response = response.data;
            if(response.code == 0){
                accountR.value = account.value;
                moneyNumR.value = moneyNum.value;
                balance.value = response.data.balance;
                time.value = TimestampToDate2(response.data.create_time);
                // 清除表单数据
                clear();
                showResult.value = true;
            }else{
                ElMessage({
                    showClose: true,
                    message: response.message,
                    type: 'error',
                })
            }
        })
    }else{
        axios.post('account/withdrawCompanyByUser',{
            c_user_id: sessionStorage.getItem('cUserId'),
            operator_id: sessionStorage.getItem('operatorId'),
            account: account.value,
            password: password.value,
            amount: moneyNum.value,
        }).then(function(response){
            response = response.data;
            if(response.code == 0){
                accountR.value = account.value;
                moneyNumR.value = moneyNum.value;
                balance.value = response.data.balance;
                time.value = TimestampToDate2(response.data.create_time);
                // 清除表单数据
                clear();
                showResult.value = true;
            }else{
                ElMessage({
                    showClose: true,
                    message: response.message,
                    type: 'error',
                })
            }
        })
    }
}

onMounted(() => {
    bussinessType.value = sessionStorage.getItem('bussinessType')
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