<template>
    <div id="container">
        <div id="b-box">
            <div class="input">
                <div class="title">姓名:</div>
                <el-input v-model="name" disabled/>
            </div>
            <div class="input">
                <div class="title">账号:</div>
                <el-input v-model="account" disabled/>
            </div>
            <div class="input">
                <div class="title">密码:</div>
                <el-input v-model="password" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <div class="input">
                <div class="title">新密码:</div>
                <el-input v-model="newPassword1" type="password" show-password placeholder="请输入新密码" maxlength="20"/>
            </div>
            <div class="input">
                <div class="title">新密码确认:</div>
                <el-input v-model="newPassword2" type="password" show-password placeholder="请再次输入新密码" maxlength="20"/>
            </div>
            <el-button type="primary" @click="modify">提交审核</el-button>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import {ref,onMounted} from 'vue';
import axios from 'axios';
var name = ref('');
var account = ref('');
var password = ref('');
var newPassword1 = ref('');
var newPassword2 = ref('');

function clear(){
    password.value = '';
    newPassword1.value = '';
    newPassword2.value = '';
}

// todo
function modify(){
    // 判断输入数据正误
    if(password.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入密码',
            type: 'error',
        })
        return;
    }
    if(newPassword1.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入新密码',
            type: 'error',
        })
        return;
    }
    if(newPassword2.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入新密码确认',
            type: 'error',
        })
        return;
    }
    if(newPassword2.value != newPassword1.value){
        ElMessage({
            showClose: true,
            message: '输入新密码不一致',
            type: 'error',
        })
        return;
    }
    // 向后端发送请求
    axios.post('employeeManage/add',{
        employee_id: sessionStorage.getItem('employeeId'),
        password: password.value,
        new_password: newPassword1.value
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            // 清除表单数据
            clear();
            ElMessage({
                showClose: true,
                message: "提交成功",
                type: 'success',
            })
        }else{
            ElMessage({
                showClose: true,
                message: response.message,
                type: 'error',
            })
        }
    })
}
onMounted(()=>{
    name.value = sessionStorage.getItem('employeeName');
    account.value = sessionStorage.getItem('account');
})
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