<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- path点击会去/home -->
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
    <el-row :gutter="20">
        <el-col :span="8">
            <!-- <el-input placeholder="请输入内容"> 
                <el-button v-slot="append" icon="el-icon-search" @click="getUserList()" ></el-button> 
            </el-input> -->
            <div class="input-group mb-3">
                <input type="search" class="form-control" placeholder="请输入内容" v-model="queryInfo.query"
                clearable
                @change="getGoodsList">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="getGoodsList">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button>
            </div>


        </el-col>
        <el-col :span="4">
            <button type="button" class="btn btn-primary" @click="goAddpage">添加商品</button>
        </el-col>
    </el-row>
    <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="180px">
            <template v-slot="scope" >
               {{dateFormat(scope.row.add_time)}}
            </template> 
        </el-table-column>
        <el-table-column label="操作" width="130px">
            <template v-slot="scope" >
                <el-button type="primary" size="mini" :icon="Edit"  />         
                <el-button type="danger" size="mini" :icon="Delete" @click="removeById(scope.row.goods_id)" />
            </template> 
        </el-table-column> 
    </el-table>
    <el-pagination
      v-model:currentPage="queryInfo.pagenum"
      v-model:page-size="queryInfo.pagesize"
      :page-sizes="[5, 10, 15, 20]"
      :small="small"
      :disabled="disabled"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

    />
    </el-card>

    </div>
</template>
<script>
import { Delete, Edit } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
export default {
    data(){
        return{
            queryInfo: {
                // 搜索值
                query: '',
                // 当前的页数
                pagenum: 1,
                // 当前每次显示多少条数据
                pagesize: 10
            },
            goodsList:[],
            total:0,
            Delete,
            Edit
        }
    },
    computed: {
        // dateFormat() {
        //     return add_time=> dayjs(add_time).format('YYYY-MM-DD');
        // }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        dateFormat(add_time) {
            return dayjs(add_time).format('YYYY-MM-DD HH:mm:ss');
        },
        //根据分页获取对应的商品列表
        async getGoodsList(){
            const {data:res} = await this.$http.get('goods',{
                params: this.queryInfo
            })
            if(res.meta.status!==200){
                return this.$message.error('获取商品列表失败!');
            }
            this.$message.success('获取商品列表成功!');
            console.log(res.data.goods);
            this.goodsList = res.data.goods;
            this.total = res.data.total;
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize;
            this.getGoodsList();
        },
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage;
            this.getGoodsList();
        },
        async removeById(id){
            const confirmResult =await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).catch(err=>err);
        if(confirmResult!='confirm'){
            return this.$message.info('已取消删除');
        }
        // this.$message.success('确认删除')
        // axios delete请求删除id
        const {data:res}= await this.$http.delete('goods/'+id);    
        // `goods/${id}`
        if(res.meta.status!==200){
            return this.$message.error('删除失败');
        }
        this.$message.success('确认删除');
        // 刷新用户列表
        this.getGoodsList();
        },
        goAddpage(){
            this.$router.push('/goods/add')
        }

    }
}
</script>
<style lang="less" scoped>

</style>