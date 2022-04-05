<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form ref="loginFormRef" class="login_form" label-width="0px" :model="loginForm" :rules="loginFormRules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input :prefix-icon="UserFilled" v-model="loginForm.username" />
                </el-form-item>
                <!-- <el-icon><Search /></el-icon> -->
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" v-model="loginForm.password" type="password" />
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="danger" round @click="login">登录</el-button>
                    <el-button type="info" round @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { UserFilled,Lock } from '@element-plus/icons'
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { http } from '../assets/js/http'
import { toast } from '../assets/js/toast'
import { useRouter } from 'vue-router'

export default ({
    setup(){
        const loginForm=reactive({
            username:'admin',
            password:'123456'
        })

        const loginFormRules = reactive({
                username:[ { required: true, message: '请输入用户名称', trigger: 'blur' },
                            { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
                         ],
                password:[{ required: true, message: '请输入用户密码', trigger: 'blur' },
                            { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' }
                        ]
        })

        const loginFormRef = ref(null)

        function resetLoginForm(){
            loginFormRef.value.resetFields()
        }

        const instance  = getCurrentInstance()
        console.log(instance );
        const router = useRouter()
        // function login(){
        //     loginFormRef.value.validate(async(login)=>{
        //         // console.log(valid);
        //         // 如果符合验证，名称有3个字，密码有6个，valid为true，如果为false就直接返回
        //         if(!login) return;
        //         const { data: res } = await http(instance).post('login', loginForm)
        //         if (res.meta.status !== 200) {
        //             return toast(instance).error('登录失败')
        //         } else {
        //             window.sessionStorage.setItem('token', res.data.token)
        //             router.push('/home')
        //             return toast(instance).success('登录成功')
        //         }
        //     })
        // }
        function login(){
            loginFormRef.value.validate(async valid=>{
                if(!valid) return;
                // const result=await http(instance).post("login",loginForm);
                const {data:result}=await http(instance).post("login",loginForm);
                console.log(result);
                if(result.meta.status!==200) return toast(instance).error("登录失败");
                toast(instance).success("登录成功");
                // 1.将登录成功之后的token, 保存到客户端的sessionStorage 中
                //1.1项目中出了登录之外的其他API接口，必须在登录之后才能访问
                // 1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage 中
                window.sessionStorage.setItem("token",result.data.token);
                // 2.通过编程式导航跳转到后台主页，路由地址是/home
                router.push('/home');//this.$router.push("/")
                
                

            })
        }
        return{
            UserFilled,
            Lock,
            loginForm,
            // 验证规则对象
            loginFormRules,
            loginFormRef,
            resetLoginForm,
            login
        }
    }
})
</script>
<style lang="less" scoped>
    .login_container{
        background-color:#2b4b6b;
        height: 100%;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        // left:50%;
        // top:50%;
        // transform: translate(-50%,50%);
        left:0;
        right:0;  
        top:0;   
        bottom:0;    
        margin:auto;  
    }
    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolate;
        margin:auto;
        margin-top:-65px;
        background-color: #fff ;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee ;
        }
    }

    .btns{
        // display: flex;
        // justify-content: flex-end;
        float: right;

    }

    .login_form{
        position: absolute;
        bottom: 0;
        width:100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    
    
</style>
