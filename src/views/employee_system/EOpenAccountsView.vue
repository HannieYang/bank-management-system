<template>
    <div id="container">
        <div id="b-box">
            <div class="input">
                <div class="title">身份证号:</div>
                <el-input v-model="idNumber" placeholder="请输入身份证号" maxlength="18"/>
            </div>
            <div class="input">
                <div class="title">账户类型:</div>
                <el-radio-group v-model="accountType">
                    <el-radio label="0" size="large">活期</el-radio>
                    <el-radio label="1" size="large">定期</el-radio>
                </el-radio-group>
            </div>
            <div class="input">
                <div class="title">初始存款金额:</div>
                <el-input v-model="moneyNum" placeholder="请输入存款初始金额" maxlength="10"/>
            </div>
            <div class="input">
                <div class="title">账户密码:</div>
                <el-input v-model="password1" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <div class="input">
                <div class="title">账户密码确认:</div>
                <el-input v-model="password2" type="password" show-password placeholder="请再次输入密码" maxlength="20"/>
            </div>
            <el-button type="primary" @click="open">确认开户</el-button>
            <div id="result" v-show="showResult">
                <div>开户成功！</div>
                <div>账户号：{{account}}</div>
                <div>开户时间：{{time}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { ElMessage } from 'element-plus';
import {TimestampToDate2} from "../../utils";
import axios from 'axios';

var idNumber = ref('');
var accountType = ref('0');
var moneyNum = ref('');
var password1 = ref('');
var password2 = ref('');
var showResult = ref(false)
var account = ref('');
var time = ref('');
var bussinessType = ref('');

function clear(){
    idNumber.value = '';
    accountType.value = '0';
    moneyNum.value = '';
    password1.value = '';
    password2.value = '';
}
// todo
function open(){
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
    if(!/^\+?[1-9][0-9]*$/.test(moneyNum.value)){
        ElMessage({
            showClose: true,
            message: '请输入正确存款金额',
            type: 'error',
        })
        return;
    }
    if(password1.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入密码',
            type: 'error',
        })
        return;
    }
    if(password2.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入密码确认',
            type: 'error',
        })
        return;
    }
    if(password2.value != password1.value){
        ElMessage({
            showClose: true,
            message: '输入密码不一致',
            type: 'error',
        })
        return;
    }
    axios.post('account/addAccountByEmployee',{
        bussiness_type: bussinessType.value,
        employee_id: sessionStorage.getItem('employeeId'),
        id_number: idNumber.value,
        password: password1.value,
        type: accountType.value,
        amount: moneyNum.value,
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            account.value = response.data.account;
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
    .el-radio-group{
        width:70%;
        display: flex;
        flex-direction: row;
        /* align-items: center; */
        justify-content: center;
    }
    #result{
        margin-top:20px;
    }
</style>