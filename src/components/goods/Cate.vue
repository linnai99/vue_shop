<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- path点击会去/home -->
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary" @click="showCateDialog">添加分类</el-button>
                </el-col>
            </el-row>
            <!-- <zk-table :data="catList" :expand-type="false" :selection-type="false" show-index class="treetable" index-text="#" stripe border :show-row-hover="false" :columns="columns"></zk-table> -->
            <vxe-table 
          :row-config="{keyField: 'id'}"
          :column-config="{resizable: true}"
          :tree-config="{rowField: 'id', parentField: 'parentId', accordion: true}"
          :data="catList">
          <vxe-column  field="cat_name" title="分类名称" tree-node>
              <template v-slot="scope" width="210px"> 
                <pre>{{scope.row.cat_name}}</pre>
            </template> 
          </vxe-column>
          <vxe-column field="size" title="是否有效">
              
            <template v-slot="scope">
                    <i  v-if="scope.row.cat_deleted === false" style="color: lightgreen">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                    </i>
                    <i class="el-icon-circle-close-filled" style="color: red" v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                    </i>
            </template>
          </vxe-column>
          <vxe-column field="type" title="排序">
                <template v-slot="scope">
                    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                    <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                    <el-tag size="mini" type="warning" v-else>三级</el-tag>
                </template>
          </vxe-column>
          <vxe-column field="date" title="操作">
              <template v-slot="scope">
            <!-- id显示为row_2222,删除id只要里面的数字，必须把前面的去除，否者res.meta.status显示400，删除失败 -->
                    <el-button size="mini" type="primary" :icon="Edit" @click="showeditCateDialog(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" :icon="Delete" @click="removeCate(scope.row.id.replace(/[^0-9]/ig,''))">删除</el-button>
          </template>
          </vxe-column>
        </vxe-table>
        <el-pagination
            v-model:currentPage="querInfo.pagenum"
            v-model:page-size="querInfo.pagesize"
            :page-sizes="[1, 2, 5, 10]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />

        </el-card>

        <el-dialog
            v-model="addCateDialogVisible"
            title="添加分类"
            width="50%"
            @close="addCateDialogClosed"
        >
            <el-form
                ref="addCateFormRef"
                :model="addCateForm"
                :rules="addCateRules"
                label-width="120px"
                :size="formSize"
            >
                <el-form-item label="分类名称：" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name" />
                </el-form-item>
                <el-form-item label="父级分类：">
                <!-- options 用来指定数据源 -->
                <!-- props 用来指定配置对象 -->
                    <el-cascader
                    v-model="selectedKeys"
                    :options="parentCateList"
                    :props="cascaderProps"
                    @change="parentCateChanged"
                    clearable
                    />
                </el-form-item>
                
            </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="addCateDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addCate"
                        >确 定</el-button
                        >
                    </span>
                </template>
        </el-dialog>

        <!-- 编辑分类信息 -->
    <el-dialog title="修改分类" v-model="editCateDialogVisbel" width="50%">
      <el-form :model="editCate" :rules="editCateRules" ref="editCateRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCate.cat_name"></el-input>
        </el-form-item>
      </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="editCateDialogVisbel = false">取 消</el-button>
            <el-button type="primary" @click="editCateInfo">确 定</el-button>
        </span>
        </template>
    </el-dialog>
    </div>
</template>
<script>
import { Delete, Edit } from '@element-plus/icons-vue'

export default {
    data(){
        return{
            //商品分类的数据列表
            catList :[],
            //查询条件
            querInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            total:0,
            //table 列
            Edit,
            Delete,
            addCateDialogVisible :false,
            editCateDialogVisbel: false,
            addCateForm:{
                cat_name:'',
                //分类父id
                cat_pid:0,
                // 分类的等级，默认要添加的是1级分类
                cat_level: 0
            },
            addCateRules:{
                cat_name:[
                    {
                      required: true, message: '请输入分类名称', trigger: 'blur'  
                    }
                ]
            },
            editCate: {},
            editCateRules: {
                cat_name: [{ required: true, message: '请输入要修改的信息', trigger: 'blur' }]
            },
            editCateId: '',
            parentCateList:[],
            cascaderProps:{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
                checkStrictly: true,
            },
            // 选中的父级分类的Id数组
            selectedKeys:[]

            

        }
    },
    created(){
        this.getCateList();
    },
    methods:{
        //获取商品分类数据
        async getCateList(){
            const {data:res} = await this.$http.get('categories',{params:this.querInfo});
            if(res.meta.status!==200){
                return this.$message.error('获取商品分类失败！')
            }
            // console.log(res.data);
            this.catList = res.data.result;
            // console.log(this.catList);
            //为总数据条数赋值
            this.total = res.data.total;
        },
       //监听pagesize 改变的事件
        handleSizeChange(newSize){
            // console.log(newSize);
            this.querInfo.pagesize = newSize;
            this.getCateList();
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            // console.log(newPage);
            this.querInfo.pagenum = newPage;
            this.getCateList();
        },
        showCateDialog(){
            this.getParentCateList();
            this.addCateDialogVisible = "true";
        },
        // 获取父级分类的数据列表
        // type为2，获取1到2，第三级不用
        async getParentCateList(){
            const {data:res} = await this.$http.get('categories',{params:{ type:2 }});
        
            if(res.meta.status!==200){
                return this.$message.error('获取父级分类数据失败！');
            }
            // console.log(res.data);
            this.parentCateList = res.data;

        },
        // 监听选择项发生变化触发这个函数
        parentCateChanged() {
            console.log(this.selectedKeys);
            // 如果 selectedKeys 数组中的 length 大于0，证明选中的父级分类
            // 反之，就说明没有选中任何父级分类
            if (this.selectedKeys.length > 0) {
                // 父级分类的Id
                this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1];
                // 为当前分类的等级赋值
                // 三级，level为2，父id pid=1
                this.addCateForm.cat_level = this.selectedKeys.length;
            } else {
                // 一级，重置level为0，父id pid=0
                // 父级分类的Id
                this.addCateForm.cat_pid = 0;
                // 为当前分类的等级赋值
                this.addCateForm.cat_level = 0;
            }
        },
        // 监听对话框的关闭事件，重置表单数据
        addCateDialogClosed(){
            this.$refs.addCateFormRef.resetFields();
            this.selectedKeys = [];
            this.addCateForm.cat_pid = 0;
            this.addCateForm.cat_level = 0;

        },
         // 点击按钮，添加新的分类，预验证
        addCate() {
        this.$refs.addCateFormRef.validate(async valid => {
            if (!valid) return;
            const { data: res } = await this.$http.post('categories', this.addCateForm);

            if (res.meta.status !== 201) {
                return this.$message.error('添加分类失败！');
            }

            this.$message.success('添加分类成功！');
            this.getCateList();
            this.addCateDialogVisible = false;
        })
        },
        async showeditCateDialog(cateInfo) {
            this.editCateId = cateInfo.cat_id
            const { data: res } = await this.$http.get('categories/' + cateInfo.cat_id);
            this.editCate = res.data;
            console.log(this.editCate);
            // console.log(res.data)
            this.editCateDialogVisbel = true;
        },
        // 编辑分类信息
        async editCateInfo() {
            const { data: res } = await this.$http.put('categories/' + this.editCate.cat_id, { cat_name: this.editCate.cat_name });
            if (res.meta.status !== 200) {
                return this.$message.error('更新分类数据失败!');
            }
            this.$message.success('更新分类数据成功!');
            this.getCateList();
            this.editCateDialogVisbel = false;
            // console.log(res)
        },
        // 删除分类
        async removeCate(id) {
            console.log(id);
            const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '删除分类', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);

            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除操作!');
            }

            const { data: res } = await this.$http.delete('categories/' + id);
            console.log(res.meta.status);
            if (res.meta.status !== 200) {
                return this.$message.error('分类删除失败!');
            }
            this.$message.success('该分类已经成功删除!');
            this.getCateList();
        }
  
    }
}
</script>
<style lang="less" scoped>
.vxe-table {
  // 按钮和表格间距
  margin-top: 15px;
}



</style>