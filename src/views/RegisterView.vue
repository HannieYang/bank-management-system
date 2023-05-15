<template>
    <div id="container">
        <div id="login-box">
            <div class="title2">用户注册</div>
            <div class="input">
                <div>用户类型:</div>
                <el-select v-model="userType">
                    <el-option
                    v-for="item in userTypeOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                    />
                </el-select>
            </div>
            <div class="input" v-if="userTypeNum!=2">
                <div>姓名:</div>
                <el-input v-model="name" placeholder="请输入姓名" maxlength="10"/>
            </div>
            <div class="input" v-else>
                <div>企业名:</div>
                <el-input v-model="companyName" placeholder="请输入企业名" maxlength="10"/>
            </div>
            <div class="input">
                <div>身份证号:</div>
                <el-input v-model="idNumber" placeholder="请输入身份证号" maxlength="18"/>
            </div>
            <div class="input" v-if="userTypeNum==2">
                <div>超级用户姓名:</div>
                <el-input v-model="superName" placeholder="请输入姓名" maxlength="10"/>
            </div>
            <div class="input" v-if="userTypeNum!=2">
                <div>密码:</div>
                <el-input v-model="password1" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <div class="input" v-else>
                <div>超级用户密码:</div>
                <el-input v-model="password2" type="password" show-password placeholder="请输入密码" maxlength="20"/>
            </div>
            <div class="input">
                <div>密码确认:</div>
                <el-input v-model="password3" type="password" show-password placeholder="请再次输入密码" maxlength="20"/>
            </div>
            <el-button type="primary" @click="register">注册</el-button>
        </div>
    </div>
</template>

<script setup>
import {ref, watch, computed} from 'vue';
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
import axios from 'axios';
const router = useRouter();
const userTypeOptions = ['普通个人用户','个人贵宾用户','企业用户'];
var userType = ref('普通个人用户');
const userTypeNum = computed(() => {
    let n = 0;
    switch(userType.value){
        case '普通个人用户':
            n = 0;
            break;
        case '个人贵宾用户':
            n = 1;
            break;
        case '企业用户':
            n = 2;
            break;
    }
    return n;
})
var name = ref('');
var companyName = ref('');
var superName = ref('');
var idNumber = ref('');
var password1 = ref('');
var password2 = ref('');
var password3 = ref('');

//用户类型转变时，全部参数重置
watch(userType, async (newType, oldType) => {
  if(newType != oldType){
    name.value = '';
    companyName.value = '';
    superName.value = '';
    idNumber.value = '';
    password1.value = '';
    password2.value = '';
    password3.value = '';
  }
});

// todo
function register(){
    // 判断内容是否都输入，并且身份证格式正确
    // 判断密码是否一致
    if(userTypeNum.value == 2){
        if(companyName.value.length == 0){
            ElMessage({
                showClose: true,
                message: '请输入企业名',
                type: 'error',
            })
            return;
        }
        if(idNumber.value.length == 0 ){
            ElMessage({
                showClose: true,
                message: '请输入身份证号',
                type: 'error',
            })
            return;
        }
        if(idNumber.value.length < 18){
            ElMessage({
                showClose: true,
                message: '请输入正确身份证号',
                type: 'error',
            })
            return;
        }
        if(superName.value.length == 0){
            ElMessage({
                showClose: true,
                message: '请输入超级用户姓名',
                type: 'error',
            })
            return;
        }
        if(password2.value.length == 0){
            ElMessage({
                showClose: true,
                message: '请输入超级用户密码',
                type: 'error',
            })
            return;
        }
        if(password3.value.length == 0){
            ElMessage({
                showClose: true,
                message: '请输入密码确认',
                type: 'error',
            })
            return;
        }
        if(password3.value != password2.value){
            ElMessage({
                showClose: true,
                message: '输入密码不一致',
                type: 'error',
            })
            return;
        }
        // 向后端发送请求
        axios.post('/companyUser/register',{
            id_number: idNumber.value,
            company_name: companyName.value,
            operator_name: superName.value,
            password: password2.value,
        }).then(function(response){
            response = response.data;
            if(response.code == 0){
                // 请求成功跳转至登录页面
                ElMessage({
                    showClose: true,
                    message: response.message,
                    type: 'success',
                })
                router.push("/userlogin");
            }else{
                ElMessage({
                    showClose: true,
                    message: response.message,
                    type: 'error',
                })
            }
        })
    }else{
        if(name.value.length == 0){
            ElMessage({
                showClose: true,
                message: '请输入姓名',
                type: 'error',
            })
            return;
        }
        if(idNumber.value.length == 0 ){
            ElMessage({
                showClose: true,
                message: '请输入身份证号',
                type: 'error',
            })
            return;
        }
        if(idNumber.value.length < 18){
            ElMessage({
                showClose: true,
                message: '请输入正确身份证号',
                type: 'error',
            })
            return;
        }
        if(password1.value.length == 0){
            ElMessage({
                showClose: true,
                message: '请输入密码',
                type: 'error',
            })
            return;
        }
        if(password3.value.length == 0){
            ElMessage({
                showClose: true,
                message: '请输入密码确认',
                type: 'error',
            })
            return;
        }
        if(password3.value != password1.value){
            ElMessage({
                showClose: true,
                message: '输入密码不一致',
                type: 'error',
            })
            return;
        }
        // 向后端发送请求
        axios.post('/personalUser/register',{
            id_number: idNumber.value,
            name: name.value,
            password: password1.value,
            type: userTypeNum.value,
        }).then(function(response){
            response = response.data;
            if(response.code == 0){
                // 请求成功跳转至登录页面
                ElMessage({
                    showClose: true,
                    message: response.message,
                    type: 'success',
                })
                router.push("/userlogin");
            }else{
                ElMessage({
                    showClose: true,
                    message: response.message,
                    type: 'error',
                })
            }
        })
    }
    
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
    #login-box{
        width:20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }
    .input{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        height: 30px;
        margin-top: 10px;
        width:100%;
    }
    .title2{
        font-size: 25px;
        margin-bottom: 20px;
    }
    .el-input{
        width:70%;
    }
    .el-select{
        width:70%;
    }
    .el-button{
        width:100%;
        margin-top:20px;
    }
</style>