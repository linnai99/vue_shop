<template>
    <el-container class="home-container">
      <el-header>
          <div>
              <img src="../assets/1.jpg" alt="">
              <span>后台管理系统</span>
          </div>
          <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF">
          <!-- 一级菜单 -->
                <el-sub-menu>
                    <template #title>
                        <!-- 图标 -->
                        <i class="el-icon-location"></i>
                        <!-- 文本 -->
                        <span>111</span>
                    </template>
                    <el-menu-item>
                        <template #title>
                        <!-- 图标 -->
                        <i class="el-icon-location"></i>
                        <!-- 文本 -->
                        <span>22</span>
                    </template>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>
<script>
import { useRouter } from 'vue-router'
import { ref, onMounted,getCurrentInstance } from 'vue'
import { http } from '../assets/js/http'
import { toast } from '../assets/js/toast'
// import { Location } from '@element-plus/icons-vue'
import { Location } from '@element-plus/icons-vue'
export default ({
    
    setup() {
        const instance  = getCurrentInstance()
        const getMenuList=async function(){
            // 获取所有左侧菜单数据
            const {data:res}=await http(instance).get('menus');
            if(res.meta.status!==200) return toast(instance).error(res.meta.msg);
            const menulist=res.data;
            console.log(res);
        }
        getMenuList();
        const router = useRouter()
        function logout() {
            window.sessionStorage.clear();
            router.push('/login');
        }
        return{
            logout,
            getMenuList,
            menulist:[],
            Location
        }
    },
})
</script>
<style lang="less" scoped>
    .el-header{
        background-color: #373d3f;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;
        >div{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
            }
        }
        img{
            height: 50px;
            border-radius: 50%;
        }
    }
    .el-aside {
        background-color: #333744;
    
    }
    .el-main{
        background-color: #eaedf1;
    } 
    .home-container {
        height: 100%;
    }  
</style>
