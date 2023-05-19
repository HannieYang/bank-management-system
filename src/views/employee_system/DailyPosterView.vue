<template>
    <div id="container">
        <div id="search-box">
            <div class="input2">
                <div class="title">操作日期：</div>
                <el-date-picker
                    v-model="timeInterval"
                    type="date"
                    placeholder="选择日期"
                    value-format="YYYY-MM-DD"
                />
            </div>
            <el-button type="primary" @click="search">查询</el-button>
        </div>
        <!-- TODO 修改表格 -->
        <div id="table">
            <el-table :data="tableData" border style="width: 100%" max-height="500">
                <el-table-column prop="time" label="时间"/>
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
import {ref} from 'vue';
import { ElMessage } from 'element-plus';
import {TimestampToDate2} from "../../utils";
import axios from 'axios';

var timeInterval = ref('');
var tableData = ref([]);

// todo
function search(){
    // 判断输入数据正误
    if(timeInterval.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请选择日期',
            type: 'error',
        })
        return;
    }
    // console.log(typeof(timeInterval.value));
    // 向后端发送请求
    axios.post('employeeOperation/getDataByIds',{
        employee_id_list: [sessionStorage.getItem('employeeId')],
        date: timeInterval.value
    }).then(function(response){
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
}

function dealData(data){
    for(let i = 0; i< data.length; i++){
        data[i].time = TimestampToDate2(data[i].time);
    }
    return data;
}
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
        justify-content: start;
    }
    .input2{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        margin-top: 10px;
        width:20%;
        margin-right: 20px;
    }
    .title{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #table{
        margin-top: 10px;
        width:100%;
    }
</style>