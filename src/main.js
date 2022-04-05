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
const app=createApp(App)

app.config.globalProperties.$http = axios
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox

app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
// app.component('user-filled',_user-filled)
app.mount("#app")
// 配置请求的根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
