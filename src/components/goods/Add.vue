<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-alert title="添加商品信息" type="info" show-icon :closable ="false" />
<!-- 将字符串0变为数字0,直接减0,加0是拼接字符串 -->
             <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
                <el-step title="基本信息" />
                <el-step title="商品参数" />
                <el-step title="商品属性" />
                <el-step title="商品图片" />
                <el-step title="商品内容" />
                <el-step title="完成" />
            </el-steps>


              <el-form
                ref="addFormRef"
                :model="addForm"
                :rules="addFormRules"
                label-width="120px"
                :size="formSize"
                label-position="top"
            >
                <el-tabs @tab-click="tabClicked"	 v-model="activeIndex" tab-position="left"  class="demo-tabs" :before-leave="beforeTabLeave">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name " />
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input
                            type="number"
                            v-model="addForm.goods_price " />
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input type="number" v-model="addForm.goods_weight " />
                        </el-form-item>
                         <el-form-item label="商品数量" prop="goods_number">
                            <el-input type="number" v-model="addForm.goods_number " />
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                           <el-cascader
                            v-model="addForm.goods_cat"
                            :options="cateList"
                            :props="cateProps"
                            @change="handleChange"
                            />
                        </el-form-item>
    
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals"  :key="i" border/>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">    
                        <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                        <el-tab-pane label="商品图片" name="3">
                            <el-upload
                                :action="uploadURL"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                list-type="picture"
                                :headers="headers"
                                :on-success="handleSuccess"	
                            >
                            <el-button type="primary">点击上传</el-button>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <QuillEditor theme="snow" v-model:content="addForm.goods_introduce"/>
                         
                        <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>

                    </el-tab-pane>
                   
                </el-tabs>
             </el-form>
        </el-card>

        <el-dialog
            v-model="previewVisible"
            title="图片预览"
            width="50%"
        >
            <img :src="previewPath" alt="">
        </el-dialog>

    </div>
</template>

<script>
import _ from 'lodash';
export default {
    data(){
        return{
            activeIndex:'0',
            addForm:{
                goods_name:'',
                goods_price:0,
                goods_weight:0,
                goods_number:0,
                goods_cat:[],
                pics:[],
                goods_introduce:'',
                attrs:[]
            },
            addFormRules:{
                goods_name:[{ required: true, message: '请输入商品名称!', trigger: 'blur' }],
                goods_price:[{ required: true, message: '请输入商品价格!', trigger: 'blur' }],
                goods_weight:[{ required: true, message: '请输入商品重量!', trigger: 'blur' }],
                goods_number:[{ required: true, message: '请输入商品数量!', trigger: 'blur' }],
                goods_cat:[{ required: true, message: '请选择商品分类!', trigger: 'blur' }],
            },
            cateList:[],
            cateProps:{
                label:'cat_name',
                value:'cat_id',
                children:'children'
            },
            manyTableData:[],
            onlyTableData:[],
            uploadURL:'https://lianghj.top:8888/api/private/v1/upload',
            headers:{
                Authorization:window.sessionStorage.getItem('token')
            },
            previewPath:'',
            previewVisible:false,
            // QuillEditor
        }
    },
    created(){
        this.getCateList();
    },
    methods:{
        async getCateList(){
            const {data:res} = await this.$http.get('categories');
            if(res.meta.status!==200){
                return this.$message.error('获取商品分类数据失败!');
            }
            this.cateList = res.data;
            console.log(this.cateList );
        },
        handleChange(){
            if(this.addForm.goods_cat.length!==3){
                this.addForm.goods_cat = [];
            }
        },
        beforeTabLeave(activeName, oldActiveName){
            // console.log('即将离开标签页的名字: ', oldActiveName);
            // console.log('即将进入标签页的名字: ', activeName);
            if(oldActiveName==='0' && this.addForm.goods_cat.length!==3){
                this.$message.error('请先选择商品分类!');
                return false;
            }
        },
        async tabClicked(){
            // console.log(this.activeIndex);
            if(this.activeIndex === "1"){
                //this.activeIndex === 1,没打印,因为1不是字符串
                // console.log("动态参数");
                const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:'many'}});
                if(res.meta.status!==200){
                    return this.$message.error("获取动态列表失败!");
                }
                console.log(res);
                res.data.forEach(item=>{
                    item.attr_vals=item.attr_vals.length===0?[]:item.attr_vals.split(' ');
                })
                this.manyTableData = res.data;

            }else if(this.activeIndex === "2"){
                 const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:'only'}});
                if(res.meta.status!==200){
                    return this.$message.error("获取静态列表失败!");
                }
                console.log(res);
               
                this.onlyTableData = res.data;
            }
        },
        handlePreview(uploadFile){
            console.log(uploadFile);
            this.previewPath=uploadFile.response.data.url;
            this.previewVisible = true;
        },
        handleRemove(uploadFile){
            // console.log(uploadFile);
            const uploadFilePath = uploadFile.response.data.tmp_path;
            const index=this.addForm.pics.findIndex(item=>item.pic===uploadFilePath);
            this.addForm.pics.splice(index,1);
            // console.log(this.addForm);
        },
        handleSuccess(response){
            // console.log(response);
            const pictureInfo = {pic:response.data.tmp_path};
            this.addForm.pics.push(pictureInfo);
            // console.log(this.addForm);
        },
        add(){
            console.log(this.addForm);
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) {
                    return this.$message.error('请填写必要的表单项');
                }
                // 执行添加的业务逻辑
                const form = _.cloneDeep(this.addForm);
                form.goods_cat = form.goods_cat.join(',');
                // this.addForm.goods_cat = this.addForm.goods_cat.join(',');
                
                // 处理动态参数
                this.manyTableData.forEach(item => {
                    const newInfo = { attr_id: item.attr_id, attr_vals: item.attr_vals };
                    this.addForm.attrs.push(newInfo);
                })
                // 处理静态参数
                this.onlyTableData.forEach(item => {
                    const newInfo = { attr_id: item.attr_id, attr_vals: item.attr_vals };
                    this.addForm.attrs.push(newInfo);
                })
                form.goods_introduce=this.addForm.goods_introduce.ops[0].insert;
                form.attrs = this.addForm.attrs;
                console.log(form);
                // 发起请求添加商品数据
                // 商品的名称必须是唯一的
                const { data: res } = await this.$http.post('goods', form);
                console.log(res);
                 if (res.meta.status !== 201) {
                    return this.$message.error('添加商品失败!');
                    }
                this.$message.success('添加商品成功!');
                this.$router.push('/goods');
                // 不能直接做转换因为在 级联选择器 中双向绑定了 goods_cat 作为key
            })
        }
    },
    computed:{
        cateId(){
            if(this.addForm.goods_cat.length===3){
                return this.addForm.goods_cat[2];
            }
            return null;
        }
    }
}
</script>
<style lang="less" scoped>
.el-checkbox{
    margin: 0 10px 0 0 !important;
} 
.btnAdd {   
    margin-top: 15px; 
}

</style>