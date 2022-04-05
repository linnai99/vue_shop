<template>
    <div>
        <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default ({
    setup() {
        const router = useRouter()
        function logout() {
            window.sessionStorage.clear();
            router.push('/login');
        }
        return{
            logout
        }
    },
})
</script>
<style lang="less" scoped>

</style>
