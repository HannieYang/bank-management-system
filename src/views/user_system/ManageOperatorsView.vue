<template>
    <div id="container">
        <div id="search-box">
            <el-button type="primary" @click="clickAddButton">添加操作人</el-button>
        </div>
        <el-dialog v-model="dialogFormVisible" title="添加操作人">
            <div class="input">
                <div>操作人姓名:</div>
                <el-input v-model="name" placeholder="请输入姓名" maxlength="10"/>
            </div>
            <div class="input">
                <div>密码:</div>
                <el-input v-model="password" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="add">
                添加
                </el-button>
            </span>
            </template>
        </el-dialog>
        <!-- TODO 修改表格 -->
        <div id="table">
            <el-table :data="tableData" border style="width: 100%" max-height="500">
                <el-table-column prop="name" label="操作人姓名"/>
                <el-table-column prop="password" label="密码" />
                <el-table-column prop="operation" label="操作" >
                    <template #default="scope">
                        <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="deleteRow(scope.$index)"
                        >
                        删除
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

var dialogFormVisible = ref(false);
var name = ref('');
var password = ref('');
var tableData = ref([]);

function clickAddButton(){
    if(tableData.value.length < 4){
        dialogFormVisible.value = true;
    }else{
        ElMessage({
            showClose: true,
            message: '操作人数已达上限',
            type: 'error',
        })
    }
}
// todo：删除操作人
const deleteRow = (index) => {
    // console.log(index);
    // 向后端请求
    axios.post('operator/deleteOperator',{
        c_user_id: sessionStorage.getItem('cUserId'),
        operator_id: tableData.value[index].operator_id
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            tableData.value = response.data.operators;
            ElMessage({
                showClose: true,
                message: "删除成功",
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

// todo
function add(){
    if(name.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入姓名',
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
    // 向后端请求
    axios.post('operator/addOperator',{
        c_user_id: sessionStorage.getItem('cUserId'),
        operator_name: name.value,
        password: password.value
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            tableData.value = response.data.operators;
            ElMessage({
                showClose: true,
                message: "添加成功",
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
    dialogFormVisible.value = false;
    // 清除参数
    name.value = '';
    password.value = '';
}

onMounted(()=>{
    // todo:获取操作人列表
    axios.post('operator/getAllOperators',{
        c_user_id: sessionStorage.getItem('cUserId')
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            tableData.value = response.data.operators;
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