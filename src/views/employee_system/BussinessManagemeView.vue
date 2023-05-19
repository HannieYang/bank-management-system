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
                        :key="item.employee_id"
                        :label="item.name"
                        :value="item.employee_id"
                    />
                </el-select>
            </div>
            
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
                <el-table-column prop="name" label="人员"/>
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
    axios.post('employeeOperation/getDataByIds',{
        employee_id_list: selected.value,
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

function dealOptions(data){
    var result = [];
    for(let i=0; i<data.length; i++){
        result.push(data[i].employee_id);
    }
    return result;
}

onMounted(()=>{
    // 获取业务下属成员列表
    axios.post('employee/getEmployeeByBussiness',{
        bussiness_type: sessionStorage.getItem('bussinessType')
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            options.value = response.data.employees;
            peopleNum.value = response.data.employees.length;
            selected.value = dealOptions(response.data.employees);
        }else{
            ElMessage({
                showClose: true,
                message: response.message,
                type: 'error',
            })
        }
    })
});
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