<template>
    <div id="container">
        <div id="search-box">
            <div class="input2">
                <div class="title">操作日期：</div>
                <el-date-picker
                    v-model="timeInterval"
                    type="date"
                    placeholder="选择日期"
                />
            </div>
            <el-button type="primary" @click="search">查询</el-button>
        </div>
        <!-- TODO 修改表格 -->
        <div id="table">
            <el-table :data="tableData" border style="width: 100%" max-height="500">
                <el-table-column prop="datetime" label="时间"/>
                <el-table-column prop="operation" label="操作" />
                <el-table-column prop="account" label="账户" />
                <el-table-column prop="toAccount" label="对方账户" />
                <el-table-column prop="amount" label="操作金额" />
                <el-table-column prop="balance" label="账户余额" />
            </el-table>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { ElMessage } from 'element-plus';

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

    // 向后端发送请求
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