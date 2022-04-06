<template>
  <el-config-provider :locale="locale"> 
    <router-view></router-view>
  </el-config-provider>
    

  
</template>

<script>
import {ElConfigProvider} from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  name: 'App',
   components: {
    [ElConfigProvider.name]:ElConfigProvider,//添加组件
  },
  data(){
    return{
      locale:zhCn,//给locale赋值
    }
  }
}
</script>

<style>

</style>
