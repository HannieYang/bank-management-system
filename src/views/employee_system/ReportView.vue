<template>
    <div id="container">
        <!-- TODO 修改表格 -->
        <div id="table">
            <el-table :data="tableData" border show-summary style="width: 100%" max-height="500">
                <el-table-column prop="time" label="时间"/>
                <el-table-column prop="in_amount" label="开户存款入账" />
                <el-table-column prop="out_amount" label="取款销户出账" />
            </el-table>
        </div>
        <div class="input1">银行总库存现金：{{balance}}元</div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { ElMessage } from 'element-plus';
import {TimestampToDate2} from "../../utils";
import axios from 'axios';

var balance = ref(0);
var tableData = ref([]);

function dealData(data){
    for(let i = 0; i< data.length; i++){
        data[i].time = TimestampToDate2(data[i].time);
    }
    return data;
}

onMounted(()=>{
    // 向后端请求数据
    axios.get('account/getReport').then(function (response) {  
        response = response.data;
        if(response.code == 0){
            balance.value = response.data.balance;
            tableData.value = dealData(response.data.details);
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
    .input1{
        width:100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top:20px;
        font-size: 20px;
    }
    #table{
        margin-top: 10px;
        width:100%;
    }
</style>