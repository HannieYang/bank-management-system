<template>
    <div id="container">
        <div id="search-box">
            <el-button type="primary" @click="dialogFormVisible = true">添加雇员</el-button>
        </div>
        <el-dialog v-model="dialogFormVisible" title="添加雇员">
            <div class="input">
                <div>姓名:</div>
                <el-input v-model="name" placeholder="请输入姓名" maxlength="10"/>
            </div>
            <div class="input">
                <div>密码:</div>
                <el-input v-model="password" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <div class="input">
                <div>部门:</div>
                <el-select v-model="department">
                    <el-option
                    v-for="item in departmentOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                    />
                </el-select>
            </div>
            <div class="input">
                <div>业务:</div>
                <el-select v-model="bussinessType">
                    <el-option
                    v-for="item in bussinessTypeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    />
                </el-select>
            </div>
            <div class="input">
                <div>类型:</div>
                <el-select v-model="userType">
                    <el-option
                    v-for="item in userTypeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    />
                </el-select>
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
                <el-table-column prop="name" label="姓名"/>
                <el-table-column prop="account" label="账号"/>
                <el-table-column prop="department" label="部门"/>
                <el-table-column prop="bussiness_type" label="业务类别"/>
                <el-table-column prop="user_type" label="雇员类别"/>
                <el-table-column prop="password" label="密码" />
                <el-table-column prop="operation" label="操作" >
                    <template #default="scope">
                        <el-button
                        link
                        type="primary"
                        size="small"
                        @click="clickModifyButton(scope.$index)"
                        >
                        修改
                        </el-button>
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
        <el-dialog v-model="dialogFormVisible2" title="修改雇员">
            <div class="input">
                <div>姓名:</div>
                <el-input v-model="name2" placeholder="请输入姓名" maxlength="10"/>
            </div>
            <div class="input">
                <div>密码:</div>
                <el-input v-model="password2" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <div class="input">
                <div>部门:</div>
                <el-select v-model="department2">
                    <el-option
                    v-for="item in departmentOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                    />
                </el-select>
            </div>
            <div class="input">
                <div>业务:</div>
                <el-select v-model="bussinessType2">
                    <el-option
                    v-for="item in bussinessTypeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    />
                </el-select>
            </div>
            <div class="input">
                <div>类型:</div>
                <el-select v-model="userType2">
                    <el-option
                    v-for="item in userTypeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    />
                </el-select>
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取消</el-button>
                <el-button type="primary" @click="modify(employeeId)">
                修改
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
var dialogFormVisible = ref(false);
var dialogFormVisible2 = ref(false);
var name = ref('');
var password = ref('');
var department = ref('个人业务一部');
var departmentOptions = ref(['个人业务一部','个人业务二部','个人业务三部','企业业务一部','企业业务二部','企业业务三部']);
var bussinessType = ref(0);
const bussinessTypeOptions = [{id:0, name:'个人'},{id:1, name:'企业'}];
var userType = ref(1);
const userTypeOptions = [{
    id:1,
    name:'前台操作员'
},{
    id:2,
    name:'银行经理'
},{
    id:3,
    name:'银行业务总管'
},{
    id:4,
    name:'系统管理员'}];
var tableData = ref([]);

var employeeId = ref('');
var name2 = ref('');
var password2 = ref('');
var department2 = ref('');
var bussinessType2 = ref(0);
var userType2 = ref(1);


const clickModifyButton = (index) => {
    console.log(index);
    employeeId.value = tableData.value[index].employee_id;
    name2.value = tableData.value[index].name;
    password2.value = tableData.value[index].password;
    department2.value = tableData.value[index].department;
    if(tableData.value[index].bussiness_type == "个人"){
        bussinessType2.value = 0;
    }else{
        bussinessType2.value = 1;
    }
    if(tableData.value[index].user_type == "前台操作员"){
        userType2.value = 1;
    }else if(tableData.value[index].user_type == "银行经理"){
        userType2.value = 2
    }else if(tableData.value[index].user_type == "银行业务总管"){
        userType2.value = 3
    }else{
        userType2.value = 4
    }
    dialogFormVisible2.value = true;
}

// todo：修改雇员
function modify(employeeId){
    if(name2.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入姓名',
            type: 'error',
        })
        return;
    }
    if(password2.value.length == 0){
        ElMessage({
            showClose: true,
            message: '请输入密码',
            type: 'error',
        })
        return;
    }
    axios.post('employee/modify',{
        employee_id: employeeId,
        name: name2.value,
        password: password2.value,
        department: department2.value,
        bussiness_type: bussinessType2.value,
        type: userType2.value
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            ElMessage({
                showClose: true,
                message: "修改成功",
                type: 'success',
            })
            dialogFormVisible2.value = false;
            tableData.value = response.data.employees;
        }else{
            ElMessage({
                showClose: true,
                message: response.message,
                type: 'error',
            })
        }
    })
}

// 删除雇员
const deleteRow = (index) => {
    // console.log(index);
    axios.post('employee/delete',{
        employee_id: tableData.value[index].employee_id
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            ElMessage({
                showClose: true,
                message: "删除成功",
                type: 'success',
            })
            tableData.value = response.data.employees;
        }else{
            ElMessage({
                showClose: true,
                message: response.message,
                type: 'error',
            })
        }
    })
}

function clear(){
    name.value = '';
    password.value = '';
    department.value = departmentOptions.value[0];
    bussinessType.value = bussinessTypeOptions.value[0];
    userType.value = userTypeOptions.value[0];
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
    axios.post('employee/add',{
        name: name.value,
        password: password.value,
        department: department.value,
        bussiness_type: bussinessType.value,
        type: userType.value
    }).then(function(response){
        response = response.data;
        if(response.code == 0){
            ElMessage({
                showClose: true,
                message: "添加成功",
                type: 'success',
            })
            dialogFormVisible.value = false;
            tableData.value = response.data.employees;
            // 清除参数
            clear();
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
    //获取雇员列表
    axios.get('employee/getAllEmployee').then(function(response){
        response = response.data;
        if(response.code == 0){
            tableData.value = response.data.employees;
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
    .el-select{
        width:70%;
    }
</style>