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
import Order from './components/order/Order.vue'
import Report from './components/report/Report.vue'

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
                },
                {
                    path: '/orders',
                    component: Order
                },
                {
                    path: '/reports',
                    component: Report
                }
            ]
        }
    ]
});

//??????????????????????????????????????????
router.beforeEach((to,from,next)=>{
    //console.log(to);//???????????????
    //console.log(from);//??????????????????
    // next();???????????????,????????????
    // next('/login') ????????????
    //??????token,????????????token???????????????????????????????????????
    let tokenStr = window.sessionStorage.getItem("token");
    if(tokenStr||to.path==="/login"){
        next();
    }else{
        next("/login")
    }
})

export default router;

