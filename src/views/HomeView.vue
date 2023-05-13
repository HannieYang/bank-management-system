<template>
    <div id="container">
        <div class="title">银行管理系统</div>
        <div id="b-box">
            <el-button type="primary" @click="goToUserLoginView">进入用户端</el-button>
            <el-button type="primary" @click="goToEmployeeLoginView">进入雇员端</el-button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goToUserLoginView(){
    router.push("/userlogin");
}
function goToEmployeeLoginView(){
    router.push("/employeelogin");
}
</script>

<style scoped>
    #container{
        height: 100%;
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #b-box{
        width:20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }
    .title{
        font-size: 35px;
    }
    .el-button{
        width:100%;
        margin-top:20px;
    }
</style>