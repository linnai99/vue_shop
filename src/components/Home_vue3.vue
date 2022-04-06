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
        <el-aside :width="isCollapse ? '64px' : '200px'">
            <div class="toggle-button" @click="toggleCollpase">|||</div>
            <el-menu
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409EFF"
                :unique-opened="true"
                :collapse="isCollapse"
                :collapse-transition="false"
                :router="true"
                :default-active="activePath"
                
            >              
                <el-sub-menu :index="item.id + ''"  v-for="item in menulist" :key="item.id">
                    <template #title>
                        <i :class="iconsObj[item.id]"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item :index="'/' + sunItem.path" v-for="sunItem in item.children" :key="sunItem.id" @click="saveActivePath('/' + sunItem.path)">
                        <template #title>
                            <svg t="1649237038116" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3465" width="20" height="20"><path d="M491.266281 665.192008c-19.564591 0-38.772049-5.074575-57.091276-15.08251-28.510334-15.575744-326.122569-189.452863-338.777797-196.847274l-1.343601-0.831948c-4.594645-3.01159-27.594475-19.456121-29.207206-47.466058-0.733711-12.747325 2.873444-31.683607 24.227798-49.500391l2.52859-2.109034 402.605497-210.444966c6.483668-4.037966 25.805736-14.558577 51.126424-14.558577 18.049075 0 35.198663 5.160533 50.973952 15.338337 37.943171 24.478508 331.771219 207.440539 334.733691 209.286584l0.588401 0.375553c4.937452 3.232624 29.563316 20.836561 29.465079 50.071396-0.045025 13.560854-5.595438 33.271778-31.781844 50.166563C899.354654 472.92096 583.799768 631.665427 542.96985 652.186809 536.720519 655.80215 517.917268 665.192008 491.266281 665.192008zM130.176316 402.472468c35.547611 20.764929 307.380716 179.521676 333.435115 193.755866 9.18929 5.02034 18.49319 7.566326 27.653827 7.566326 11.253298 0 19.253506-3.868097 20.803815-4.676509l1.51347-1.048889 0.844228-0.252757c139.635247-70.175269 353.529779-178.711218 380.393613-195.064674-36.099173-22.479991-295.351752-183.953615-331.798848-207.468169-5.770424-3.722788-11.556197-5.533017-17.687848-5.533017-9.91686 0-18.059308 4.861728-18.129916 4.910846l-1.609661 1.12359L130.176316 402.472468z" p-id="3466" fill="#ffffff"></path><path d="M955.967022 540.968775c0-16.403598-14.100136-29.709649-31.493272-29.709649-7.565303 0-14.504342 2.517333-19.934005 6.714935l-0.1361-0.202615C883.065665 531.191084 658.552286 642.244366 512.849856 713.61895l-0.862647 0.25992-1.549286 1.042749c-3.418866 1.821485-23.626094 11.30344-50.297546-2.901073-27.614941-14.70491-324.164984-183.54941-344.872608-195.34506-5.366218-4.004197-12.140505-6.398734-19.512403-6.398734-17.394159 0-31.494295 13.30605-31.494295 29.709649 0 12.142551 7.726985 22.578228 18.791995 27.185152l-0.046049 0.075725c12.982686 7.394411 318.293253 181.261297 347.534228 196.832947 20.681018 11.013845 40.760332 14.96483 58.46353 14.96483 22.723537 0 41.535999-6.510274 52.68799-12.95608 41.795918-20.476357 356.865757-174.97615 394.765949-197.643406C947.905416 563.997258 955.967022 553.373293 955.967022 540.968775z" p-id="3467" fill="#ffffff"></path><path d="M955.967022 658.823973c0-16.408715-14.100136-29.710672-31.493272-29.710672-7.565303 0-14.504342 2.517333-19.934005 6.711865l-0.1361-0.202615C883.065665 649.041166 658.552286 760.098541 512.849856 831.473125l-0.862647 0.25992-1.549286 1.043772c-3.418866 1.821485-23.626094 11.302417-50.297546-2.902096-27.614941-14.70491-324.164984-183.553503-344.872608-195.34506-5.366218-4.003174-12.140505-6.398734-19.512403-6.398734-17.394159 0-31.494295 13.301957-31.494295 29.709649 0 12.143575 7.726985 22.578228 18.791995 27.186176l-0.046049 0.074701c12.982686 7.394411 318.293253 181.26232 347.534228 196.832947 20.681018 11.014868 40.760332 14.965853 58.46353 14.965853 22.723537 0 41.535999-6.510274 52.68799-12.957103 41.795918-20.476357 356.865757-174.975127 394.765949-197.642382C947.905416 681.852456 955.967022 671.228491 955.967022 658.823973z" p-id="3468" fill="#ffffff"></path></svg>                        
                            <span>{{ sunItem.authName }}</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                    
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
import { useRouter } from 'vue-router'
import { ref, onMounted,getCurrentInstance,reactive } from 'vue'
import { http } from '../assets/js/http'
import { toast } from '../assets/js/toast'
// import { Location } from '@element-plus/icons-vue'
import { Menu } from '@element-plus/icons-vue'
export default ({
    
    setup() {
        const instance  = getCurrentInstance()
        let menulist = reactive([])
        // let menulist = ref([])
        const getMenuList=async function(){
            // 获取所有左侧菜单数据
            const {data:res}=await http(instance).get('menus');
            if(res.meta.status!==200) return toast(instance).error(res.meta.msg);
            menulist.push(...res.data)
            // menulist.value = res.data
            console.log(menulist);
        }
        getMenuList()
        const router = useRouter()
        function logout() {
            window.sessionStorage.clear();
            router.push('/login');
        }
        const isCollapse = ref(false)
        function toggleCollpase(){
            isCollapse.value =!isCollapse.value
        }
        // iconsObj绑定data的id，来决定哪个id对应哪个icon
        const iconsObj ={
            '125':'iconfont icon-users',
            '103':'iconfont icon-tijikongjian',
            '101':'iconfont icon-3702mima',
            '102':'iconfont icon-danju',
            '145':'iconfont icon-baobiao'
        }
        const activePath = ref('')
        activePath = window.sessionStorage.getItem('activePath')
        // 就是保存记录你所选择的path（停留在哪个界面），然后储存在session 里边
        // 重新加载的时候就从session看看你的历史记录，你浏览了别的path就去session更新一下
        // 保持连接激活状态，激活选中的id
        function saveActivePath(activePath){
            window.sessionStorage.setItem('activePath',activePath)
            activePath.value = activePath
        }
        return{
            logout,
            getMenuList,
            menulist,
            iconsObj,
            toggleCollpase,
            isCollapse,
            saveActivePath,
            activePath
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
        .el-menu {
            border-right: none;
        }
    
    }
    .el-main{
        background-color: #eaedf1;
    } 
    .home-container {
        height: 100%;
    }  
    .iconfont {
        padding-right: 10px;
    }
    .toggle-button {
        background: #4a5064;
        font-size: 10px;
        text-align: center;
        line-height: 24px;
        color: #fff;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
    .icon{
        padding-right: 5px;
    }
</style>
