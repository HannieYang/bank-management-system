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
                <el-input v-model="password1" type="password" show-password placeholder="请输入密码" maxlength="20"/>
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
                    :key="item"
                    :label="item"
                    :value="item"
                    />
                </el-select>
            </div>
            <div class="input">
                <div>类型:</div>
                <el-select v-model="userType">
                    <el-option
                    v-for="item in userTypeOptions"
                    :key="item"
                    :label="item"
                    :value="item"
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
                <el-table-column prop="bussinessType" label="业务类别"/>
                <el-table-column prop="UserType" label="雇员类别"/>
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
var dialogFormVisible = ref(false);
var name = ref('');
var password = ref('');
var department = ref('');
var departmentOptions = ref([]);
var bussinessType = ref('个人');
const bussinessTypeOptions = ['个人','企业'];
var userType = ref('前台操作员');
const userTypeOptions = ['前台操作员','银行经理','银行业务总管','系统管理员'];
var tableData = ref([]);

// todo：删除操作人
const deleteRow = (index) => {
    console.log(index);
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
    // 判断密码是否已经存在
    // 关闭对话窗
    dialogFormVisible.value = false;
    // 向后端请求
    // 清除参数
    clear();
}

onMounted(()=>{
    // todo:获取雇员列表
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