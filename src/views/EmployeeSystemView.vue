<template>
    <el-container>
        <el-header>
            <div class="title">银行管理系统-雇员端</div>
            <el-popover
                placement="bottom"
                trigger="hover"
                width="100"
            >
                <template #reference>
                    <div>你好，{{userName}}<el-icon class="el-icon--right"><arrow-down /></el-icon></div>
                </template>
                <template #default>
                    <div id="popover-content">
                        <el-tag>{{userType}}</el-tag>
                        <el-button id="exit-button" @click="exit">退出登录</el-button>
                    </div>
                </template>
            </el-popover>
            
        </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu :router="true">
                <el-menu-item index="/employeesystem/openaccounts" v-if="userType!='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>开户</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/savemoney" v-if="userType!='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>存款</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/withdrawmoney" v-if="userType!='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>取款</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/search" v-if="userType!='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>查询</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/exchange" v-if="userType!='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>转账</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/closeaccounts" v-if="userType!='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>销户</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/accountmanagement" v-if="userType!='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>账号管理</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/dailyposter" v-if="userType!='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>个人日报</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/sectionmanagement" v-if="userType=='银行经理'">
                    <el-icon><Menu /></el-icon>
                    <span>部门管理</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/businessmanagement" v-if="userType=='银行业务总管'">
                    <el-icon><Menu /></el-icon>
                    <span>分管业务管理</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/employeemanagement" v-if="userType=='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>雇员管理</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/check" v-if="userType=='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>审核</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/report" v-if="userType=='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>报表</span>
                </el-menu-item>
                <el-menu-item index="/employeesystem/operationreport" v-if="userType=='系统管理员'">
                    <el-icon><Menu /></el-icon>
                    <span>操作日志</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup>
import {RouterView, useRouter} from 'vue-router'
import { Menu, ArrowDown} from "@element-plus/icons-vue";
import { onMounted, ref } from 'vue';
const router = useRouter();

var userName = ref('');
var userType = ref('');
var bussinessType = ref('');

function exit(){
    // 清除所有缓存
    sessionStorage.removeItem('bussinessType');
    sessionStorage.removeItem('employeeId');
    sessionStorage.removeItem('employeeName');
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('userType');
    // 跳转至登录页面
    router.push("/employeelogin");
}
onMounted(() => {
    bussinessType.value = sessionStorage.getItem('bussinessType')
    userType.value = sessionStorage.getItem('userType');
    userName.value = sessionStorage.getItem('employeeName');
});
</script>

<style scoped>
    .el-container{
        height:100%;
        width:100%;
    }
    .el-header{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .title{
        font-size: 25px;
    }
    #popover-content{
        width:100%;
        display: flex;
        flex-direction: column;
    }
    #exit-button{
        margin-top: 10px;
    }
</style>