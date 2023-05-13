<template>
    <div id="container">
        <div id="search-box">
            <div class="input1">
                <div class="title">业务下属总人数：{{peopleNum}}</div>
            </div>
            <div class="input2">
                <div class="title">选择人员:</div>
                <el-select
                    v-model="selected"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </div>
            
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
                <el-table-column prop="name" label="人员"/>
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

var peopleNum = ref('');
var selected = ref([]);
var options = ref([]);
// var selected = ref(['1','2','3']);
// const options = [
//   {
//     id: '1',
//     label: 'Option1',
//   },
//   {
//     id: '2',
//     label: 'Option2',
//   },
//   {
//     id: '3',
//     label: 'Option3',
//   },
//   {
//     id: '4',
//     label: 'Option4',
//   },
//   {
//     id: '5',
//     label: 'Option5',
//   },
// ]
var timeInterval = ref('');
var tableData = ref([]);

// todo
function search(){
    // 判断输入数据正误
    if(selected.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请选择人员',
            type: 'error',
        })
        return;
    }
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
        justify-content: space-around;
    }
    .input1{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        height: 40px;
        margin-top: 10px;
        width:10%;
    }
    .input2{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        margin-top: 10px;
        width:20%;
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