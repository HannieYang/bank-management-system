<template>
    <el-container>
        <el-header>
            <div class="title">银行管理系统-用户端</div>
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
                <el-menu-item index="/usersystem/openaccounts">
                    <el-icon><Menu /></el-icon>
                    <span>开户</span>
                </el-menu-item>
                <el-menu-item index="/usersystem/savemoney">
                    <el-icon><Menu /></el-icon>
                    <span>存款</span>
                </el-menu-item>
                <el-menu-item index="/usersystem/withdrawmoney">
                    <el-icon><Menu /></el-icon>
                    <span>取款</span>
                </el-menu-item>
                <el-menu-item index="/usersystem/search">
                    <el-icon><Menu /></el-icon>
                    <span>查询</span>
                </el-menu-item>
                <el-menu-item index="/usersystem/exchange">
                    <el-icon><Menu /></el-icon>
                    <span>转账</span>
                </el-menu-item>
                <el-menu-item index="/usersystem/modifypassword">
                    <el-icon><Menu /></el-icon>
                    <span>改密码</span>
                </el-menu-item>
                <el-menu-item index="/usersystem/closeaccounts">
                    <el-icon><Menu /></el-icon>
                    <span>销户</span>
                </el-menu-item>
                <el-menu-item index="/usersystem/manageoperators" v-if="userType=='企业用户超级用户'">
                    <el-icon><Menu /></el-icon>
                    <span>操作人管理</span>
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
    // 跳转至登录页面
    router.push("/userlogin");
}
onMounted(() => {
    bussinessType.value = sessionStorage.getItem('bussinessType')
    userType.value = sessionStorage.getItem('userType');
    if(bussinessType.value == '0'){
        userName.value = sessionStorage.getItem('userName');
    }else{
        userName.value = sessionStorage.getItem('operatorName');
    }

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