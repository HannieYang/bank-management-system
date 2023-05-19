<template>
    <div id="container">
        <!-- TODO 修改表格 -->
        <div id="table">
            <el-table :data="tableData" border style="width: 100%" max-height="500">
                <el-table-column prop="name" label="姓名"/>
                <el-table-column prop="account" label="账号"/>
                <el-table-column prop="department" label="部门"/>
                <el-table-column prop="bussiness_type" label="业务类别"/>
                <el-table-column prop="user_type" label="雇员类别"/>
                <el-table-column prop="password" label="新密码" />
                <el-table-column prop="operation" label="操作" >
                    <template #default="scope">
                        <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="pass(scope.$index)"
                        >
                        通过
                        </el-button>
                        <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="unpass(scope.$index)"
                        >
                        不通过
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
var tableData = ref([]);

// todo：通过新密码
const pass = (index) => {
    console.log(index);
    axios.post('employeeManage/modify',{
        id: manage_list[index].id,
        is_pass:1
    }).then(function (response) {  
        response = response.data;
        if(response.code == 0){
            tableData.value = response.data.manage_list;
            ElMessage({
                showClose: true,
                message: response.message,
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

// todo：审核不通过新密码
const unpass = (index) => {
    console.log(index);
    axios.post('employeeManage/modify',{
        id: manage_list[index].id,
        is_pass:0
    }).then(function (response) {  
        response = response.data;
        if(response.code == 0){
            tableData.value = response.data.manage_list;
            ElMessage({
                showClose: true,
                message: response.message,
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
    // todo:获取审核列表
    axios.get('employeeManage/get').then(function (response) {  
        response = response.data;
        if(response.code == 0){
            tableData.value = response.data.manage_list;
        }else{
            ElMessage({
                showClose: true,
                message: response.message,
                type: 'error',
            })
        }
    })
})
</script>

<style scoped>
    #container{
        height: 100%;
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
    }
    #search-box{
        width:100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
    }
    #table{
        margin-top: 10px;
        width:100%;
    }
    .input{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        height: 30px;
        margin-top: 10px;
        width:100%;
    }
    .el-input{
        width:70%;
    }
</style>