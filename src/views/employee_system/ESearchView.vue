<template>
    <div id="container">
        <div id="search-box">
            <div class="input1">
                <div class="title">账号:</div>
                <el-input v-model="account" placeholder="请输入账号" maxlength="19"/>
            </div>
            <div class="input1">
                <div class="title">账户密码:</div>
                <el-input v-model="password" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <div class="input1">
                <div class="title">查询流水:</div>
                <el-radio-group v-model="isDetail">
                    <el-radio label="0" size="large">否</el-radio>
                    <el-radio label="1" size="large">是</el-radio>
                </el-radio-group>
            </div>
            <div class="input2">
                <div class="title">流水时间区间：</div>
                <el-date-picker
                    v-model="timeInterval"
                    type="daterange"
                    range-separator="到"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="YYYY-MM-DD"
                />
            </div>
            <el-button type="primary" @click="search">查询</el-button>
        </div>
        <div id="result" v-show="showResult">
            <div>查询成功！</div>
            <div>账户余额：{{balance}}</div>
            <div>查询时间：{{time}}</div>
        </div>
        <!-- TODO 修改表格 -->
        <div id="table" v-show="showTable">
            <el-table :data="tableData" border style="width: 100%" max-height="500">
                <el-table-column prop="time" label="时间"/>
                <el-table-column prop="operation" label="操作" />
                <el-table-column prop="to_account" label="对方账户" />
                <el-table-column prop="amount" label="操作金额" />
                <el-table-column prop="balance" label="余额" />
            </el-table>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { ElMessage } from 'element-plus';
import {TimestampToDate2} from "../../utils";
import axios from 'axios';

var account = ref('');
var password = ref('');
var isDetail = ref('0');
var timeInterval = ref('');
var showResult = ref(false);
var balance = ref('');
var time = ref('');
var showTable = ref(false);
var tableData = ref([]);
var bussinessType = ref('');

// todo
function search(){
    // 判断输入数据正误
    if(account.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入账号',
            type: 'error',
        })
        return;
    }
    if(account.value.length < 19){
        ElMessage({
            showClose: true,
            message: '请输入正确账号',
            type: 'error',
        })
        return;
    }
    if(password.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入密码',
            type: 'error',
        })
        return;
    }
    if(isDetail.value == 1){
        if(timeInterval.value.length == 0){
            ElMessage({
                showClose: true,
                message: '请选择时间区间',
                type: 'error',
            })
            return;
        }
    }
    
    axios.post('account/searchByEmployee',{
        bussiness_type: bussinessType.value,
        employee_id: sessionStorage.getItem('employeeId'),
        account: account.value,
        password: password.value,
        is_detail: isDetail.value,
        start_date: timeInterval.value[0].toString(),
        end_date: timeInterval.value[1].toString(),
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            balance.value = response.data.balance;
            time.value = TimestampToDate2(response.data.create_time);
            if(isDetail.value == 1){
                tableData.value = dealData(response.data.details);
                showTable.value = true;
            }else{
                showTable.value = false;
            }
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
        width:15%;
    }
    .input2{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        margin-top: 10px;
        width:30%;
    }
    .el-input{
        width:70%;
    }
    .el-radio-group{
        width:70%;
    }
    .title{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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