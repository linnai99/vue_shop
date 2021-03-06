import { createApp } from 'vue'
import App from './App.vue'
// import router from './router/index.js'
import router from "./router.js"
import './plugins/element.js'
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
// import ZkTable from 'vue-table-with-tree-grid'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// import TreeTable from 'vue-table-with-tree-grid'
import ZkTable from 'vue-table-with-tree-grid'
// import { TreeTable } from 'vue-table-with-tree-grid'
import dayjs from 'dayjs'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const app=createApp(App)
app.config.globalProperties.$http = axios
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox
// app.component('tree-table', TreeTable)
// app.component(ZkTable.name, ZkTable);
app.use(ZkTable)
app.use(VXETable)
app.use(router)
app.use(bootstrap)
app.use(ElementPlus, { size: 'small', zIndex: 3000  })
// app.component('user-filled',_user-filled)
// app.component('tree-table', TreeTable)
// app.use(TreeTable)
app.use(dayjs)
// app.use(QuillEditor)
app.component('QuillEditor', QuillEditor)
app.mount("#app")
// 配置请求的根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
})