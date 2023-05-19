<template>
    <div id="container">
        <!-- TODO 修改表格 -->
        <div id="table">
            <el-table :data="tableData" border show-summary style="width: 100%" max-height="500">
                <el-table-column prop="time" label="时间"/>
                <el-table-column prop="p_name" label="个人用户"/>
                <el-table-column prop="c_name" label="企业用户"/>
                <el-table-column prop="e_name" label="雇员"/>
                <el-table-column prop="operation" label="操作" />
                <el-table-column prop="account" label="账户" />
                <el-table-column prop="to_account" label="对方账户" />
                <el-table-column prop="amount" label="操作金额" />
                <el-table-column prop="balance" label="账户余额" />
            </el-table>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { ElMessage } from 'element-plus';
import {TimestampToDate2} from "../../utils";
import axios from 'axios';

var tableData = ref([]);

function dealData(data){
    for(let i = 0; i< data.length; i++){
        data[i].time = TimestampToDate2(data[i].time);
    }
    return data;
}

onMounted(()=>{
    // 向后端请求数据
    axios.get('account/getAllOperation').then(function (response) {  
        response = response.data;
        if(response.code == 0){
            tableData.value = dealData(response.data.operations);
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
        justify-content: space-around;
    }
    #result{
        margin-top: 10px;
        width:100%;
    }
    #table{
        margin-top: 10px;
        width:100%;
    }
</style>