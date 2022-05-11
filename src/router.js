import Vue from 'vue'
import Login from './components/Login.vue'
import {createRouter,createWebHashHistory} from "vue-router";
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'
import Rights from './components/power/Rights.vue'
import Roles from './components/power/Roles.vue'
import Cate from './components/goods/Cate.vue'
import Params from './components/goods/Params.vue'
import List from './components/goods/List.vue'
import Add from './components/goods/Add.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            redirect:'/Login'
        },
        {
            path:"/login",
            component:Login
        },{
            path:"/home",
            component:Home,
            redirect:'/welcome',
            children:[
                {
                    path:'/welcome',
                    component:Welcome
                },
                {
                    path: '/users',
                    component: Users
                },
                {
                    path: '/rights',
                    component: Rights
                },
                {
                    path: '/roles',
                    component: Roles
                },
                {
                    path: '/categories',
                    component: Cate
                },
                {
                    path: '/params',
                    component: Params
                },
                {
                    path: '/goods',
                    component: List
                },
                {
                    path: '/goods/add',
                    component: Add
                }
            ]
        }
    ]
});

//导航守卫、路由守卫、路由拦截
router.beforeEach((to,from,next)=>{
    //console.log(to);//要去的路径
    //console.log(from);//从哪来的路径
    // next();是一个函数,表示放行
    // next('/login') 强制跳转
    //验证token,只有存在token的时候，才能跳转到内容页。
    let tokenStr = window.sessionStorage.getItem("token");
    if(tokenStr||to.path==="/login"){
        next();
    }else{
        next("/login")
    }
})

export default router;

