<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
            <el-col :span="8">
                <div class="input-group mb-3">
                    <input type="search" class="form-control" placeholder="请输入内容" 
                    clearable
                    >
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
            </el-col>
        </el-row>

        <el-table :data="orderList" border stripe>
            <el-table-column type="index"  />
            <el-table-column prop="order_number" label="订单编号"  />
            <el-table-column prop="order_price" label="订单价格"  />
            <el-table-column prop="order_pay" label="是否付款"  >
                <template v-slot="scope" >
                   <el-tag type="success" v-if="scope.row.order_pay==='1'">已付款</el-tag>
                   <el-tag type="danger" v-else>未付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货"  />
            <el-table-column prop="create_time" label="下单时间" >
                <template v-slot="scope" >
                    {{dateFormat(scope.row.create_time)}}
                </template> 
            </el-table-column>
            <el-table-column label="操作"  >
                 <template v-slot="scope" >
                    <el-button type="primary" size="mini" :icon="Edit" @click="showBox" />         
                    <el-button type="success" size="mini" :icon="Location" @click="showProgressBox" />
                </template> 
            </el-table-column>
        </el-table>
        

        <el-pagination
            v-model:currentPage="queryInfo.pagenum"
            v-model:page-size="queryInfo.pagesize"
            :page-sizes="[5, 10, 15]"
            :small="small"
            :disabled="disabled"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"

        />

        </el-card>

        <el-dialog title="修改地址" v-model="addressDialogVisible" width="50%" @close="addressDialogClosed">
            <el-form
                ref="addressFormRef"
                :model="addressForm"
                :rules="addressFormRules"
                label-width="120px"
                :size="formSize"
            >
                <el-form-item label="省市区/县" prop="address1">
                    <!-- <el-input v-model="addressForm.address1" /> -->
                    <el-cascader
                        v-model="addressForm.address1"
                        :options="cityData"
                        :props="props"
                        @change="handleChange"
                    />
                </el-form-item>
                <el-form-item label="详细地址" prop="address2">
                    <el-input v-model="addressForm.address2" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addressDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
                </span>
            </template>
    </el-dialog>
    
    <el-dialog
        v-model="progressDialogVisible"
        title="物流进度"
        width="50%"
    >
        <el-timeline>
            <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time"
            >
            {{ activity.context }}
            </el-timeline-item>
        </el-timeline>
    </el-dialog>

    </div>
</template>

<script>
// import { log } from 'console';
import { Location, Edit } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import cityData from './citydata.js';
export default {
    data(){
        return{
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:10
            },
            total:0,
            orderList:[],
            Edit,
            Location,
            addressDialogVisible:false,
            addressForm:{
                address1:[],
                address2:''
            },
            addressFormRules:{
                address1: [{ required: true, message: '请选择省市区/县', trigger: 'blur' }],
                address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
            },
            cityData,
            progressDialogVisible:false,
            progressInfo:[]
        }
    },
    created(){
        this.getOrderList();
    },
    methods:{
        async getOrderList(){
            const {data:res}=await this.$http.get('orders',{params:this.queryInfo});
            if (res.meta.status !== 200) {
                return this.$message.error('获取订单列表失败!');
            }
            this.$message.success('获取订单列表成功!');
            console.log(res);
            this.total= res.data.total;
            this.orderList = res.data.goods;
        },
        dateFormat(create_time) {
            return dayjs(create_time).format('YYYY-MM-DD HH:mm:ss');
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize;
            this.getOrderList();
        },
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage;
            this.getOrderList();
        },
        showBox(){
            this.addressDialogVisible =true;
        },
        addressDialogClosed(){
            this.$refs.addressFormRef.resetFields();
            // 清空对话框的内容
        },
        async showProgressBox(){
            const { data: res } = await this.$http.get('/kuaidi/1106975712662');
            if (res.meta.status !== 200) {
                return this.$message.error('获取物流进度失败！');
            }
            this.progressInfo = res.data;
            console.log(this.progressInfo);
            this.progressDialogVisible =true;
        }
    }
}
</script>

<style lang="less" scoped>

</style>