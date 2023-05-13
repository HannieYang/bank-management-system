<template>
    <div id="container">
        <!-- TODO 修改表格 -->
        <div id="table">
            <el-table :data="tableData" border show-summary style="width: 100%" max-height="500">
                <el-table-column prop="datetime" label="时间"/>
                <el-table-column prop="inAmount" label="存款入账" />
                <el-table-column prop="outAmount" label="销户出账" />
            </el-table>
        </div>
        <div class="input1">银行总库存现金：{{balance}}元</div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { ElMessage } from 'element-plus';

var balance = ref(0);
var tableData = ref([]);

onMounted(()=>{
    // 向后端请求数据
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