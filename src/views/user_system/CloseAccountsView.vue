<template>
    <div id="container">
        <div id="b-box">
            <div class="input">
                <div class="title">身份证号:</div>
                <el-input v-model="idNumber" placeholder="请输入身份证号" maxlength="18"/>
            </div>
            <div class="input">
                <div class="title">账号:</div>
                <el-input v-model="account" placeholder="请输入账号" maxlength="19"/>
            </div>
            <div class="input">
                <div class="title">账户密码:</div>
                <el-input v-model="password" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <el-button type="primary" @click="close">确认销户</el-button>
            <div id="result" v-show="showResult">
                <div>销户成功！</div>
                <div>销户时间：{{time}}</div>
                <div>取款金额：{{moneyNum}}</div>
                <div>余额：{{balance}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import {ref,onMounted} from 'vue';
import {TimestampToDate2} from "../../utils";
import axios from 'axios';

var idNumber = ref('');
var account = ref('');
var password = ref('');
var showResult = ref(false);
var moneyNum = ref('');
var time = ref('');
var balance = ref('');
var bussinessType = ref('');

function clear(){
    idNumber.value = '';
    account.value = '';
    password.value = '';
}

// todo
function close(){
    // 判断输入数据正误
    if(idNumber.value.length == 0 ){
        ElMessage({
            showClose: true,
            message: '请输入身份证号',
            type: 'error',
        })
        return;
    }
    if(idNumber.value.length < 18){
        ElMessage({
            showClose: true,
            message: '请输入正确身份证号',
            type: 'error',
        })
        return;
    }
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
        axios.post('account/closePersonalByUser',{
            p_user_id: sessionStorage.getItem('pUserId'),
            id_number: idNumber.value,
            account: account.value,
            password: password.value
        }).then(function(response){
            response = response.data;
            if(response.code == 0){
                moneyNum.value = response.data.amount;
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
        axios.post('account/closeCompanyByUser',{
            c_user_id: sessionStorage.getItem('cUserId'),
            operator_id: sessionStorage.getItem('operatorId'),
            id_number: idNumber.value,
            account: account.value,
            password: password.value
        }).then(function(response){
            response = response.data;
            if(response.code == 0){
                moneyNum.value = response.data.amount;
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