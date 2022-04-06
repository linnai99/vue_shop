<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <el-row :gutter="20">
        <el-col :span="8">
            <!-- <el-input placeholder="请输入内容"> 
                <el-button v-slot="append" icon="el-icon-search" @click="getUserList()" ></el-button> 
            </el-input> -->
            <div class="input-group mb-3">
                <input type="search" class="form-control" placeholder="请输入内容" v-model="queryInfo.query">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="getUserList()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button>
            </div>


        </el-col>
        <el-col :span="4">
            <button type="button" class="btn btn-primary" @click="addDialogVisible=true">添加用户</button>
        </el-col>
    </el-row>
    <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="状态" >
            <template v-slot="scope">
                <!-- {{scope.row}} -->
                <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"/>
            </template> 
        </el-table-column>
        <el-table-column label="操作" >
            <template v-slot="scope" width="210px">
                <el-button type="primary" size="mini" :icon="Edit" @click="showEditDialog(scope.row.id)" />
                <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                    <el-button type="warning" size="mini" :icon="Setting"  />
                </el-tooltip>
                
                <el-button type="danger" size="mini" :icon="Delete" @click="removeUserById(scope.row.id)" />
            </template> 
        </el-table-column>  
    </el-table>
    <el-pagination
      v-model:currentPage="queryInfo.pagenum"
      v-model:page-size="queryInfo.pagesize"
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
    <!-- 添加用户对话框 -->
    <el-dialog
        v-model="addDialogVisible"
        title="添加用户"
        width="50%"
        :before-close="handleClose"
        @close="addDialogClosed"
    >
    <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="70px"
        :size="formSize"
    >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser"
          >确定</el-button>
      </span>
    </template>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog
        title="修改用户"
        v-model="editDialogVisible"
        width="50%" @close="editDialogClosed"
    >

    <!-- 修改用户表单 -->
    <!-- 用户名的disabled是不可更改，不能改不可传数据，所以prop不需要 -->
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" @close="editDialogClosed">
        <el-form-item label="用户名" >
        <el-input v-model="editForm.username" disabled></el-input>
    </el-form-item>
        <el-form-item label="邮箱"  prop="email" >
        <el-input v-model="editForm.email" ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" >
        <el-input v-model="editForm.mobile" ></el-input>
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUserInfo">确定</el-button>
        </span>
    </template>
    </el-dialog>
</template>
<script>
import { Delete, Edit, Setting,Search } from '@element-plus/icons-vue'
export default {
//   name: 'Users',
  data() {
    // 自定义验证邮箱规则
    const  checkEmail =(rule,value,cb) => {
        const regmail= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if(regmail.test(value))
        {
            return cb()
        }
        cb(new Error('请输入合法邮箱'))  
    }
    // 验证手机规则        
    const  checkMobile =(rule,value,cb) => {
        const regMobile= /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if(regMobile.test(value))      
        {
            return cb()
        }
        cb(new Error('请输入正确手机号'))
    }

    return {
        // 获取用户列表的参数对象
        queryInfo: {
            // 搜索值
            query: '',
            // 当前的页数
            pagenum: 1,
            // 当前每次显示多少条数据
            pagesize: 5
        },
        userlist:[],
        total:0,
        Delete,
        Edit,
        Setting,
        Search,
        //控制添加用户对话框的显示与隐藏
        addDialogVisible:false,
        //控制修改用户对话框的显示与隐藏
        editDialogVisible:false,
        //添加用户的表单数据
        addForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
        },
        // 查询到的用户信息对象   
        editForm:{}, 
        editFormRules:{
            email:[
                {required:true,message:'请输入邮箱',trigger:'blur'},
                {validator:checkEmail,trigger:'blur'}
            ],
            mobile:[
                {required:true,message:'请输入手机号',trigger:'blur'},
                {validator:checkMobile,trigger:'blur'}
            ]  
        },  
        addFormRules:{
            username:[ 
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
            ],
            password:[
                {required:true,message:'请输入密码',trigger:'blur'},
                {min:6,max:10,message:'密码长6-10个间',trigger:'blur'}
                ],
            email:[
                {required:true,message:'请输入邮箱',trigger:'blur'},
                {validator:checkEmail,trigger:'blur'}
            ],
            mobile:[
                {required:true,message:'请输入手机号',trigger:'blur'},
                {validator:checkMobile,trigger:'blur'}
            ]  
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList(){
        const {data:res} = await this.$http.get('users',{params:this.queryInfo})
        console.log(this.$http);
        if(res.meta.status!==200){
            return this.$message.error('获取用户列表失败！')
        }
        this.userlist =res.data.users;
        this.total=res.data.total;
        console.log(res);
    },
    //监听pagesize 改变的事件
    handleSizeChange(newSize){
        console.log(newSize);
        this.queryInfo.pagesize = newSize;
        this.getUserList();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage){
        console.log(newPage);
        this.queryInfo.pagenum = newPage;
        this.getUserList();
    },
    //监听switch 开关状态的改变

    async userStateChanged(userinfo){
        console.log(userinfo);
        // axios用api向后台发送put请求进行更改：uid是用户id，state是布尔值
        // 为了可以动态改uid，修改成模板字符串，单变反引，发起请求时返回promise
        // 所以异步两个,解构给res，通过响应meta的status判断
        const {data:res}= await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
        if(res.meta.status!==200) {
            // 更新失败的话恢复回去，取反
            userinfo.mg_state=!userinfo.mg_state
            return this.$message.error('更新用户状态失败')
        }
        this.$message.success('用户状态更新成功')
    },
  // 监听添加用户对话框的关闭事件
    addDialogClosed(){
        // 通过表单的ref引用 调用resetFields（）函数重置表单
        this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加新用户
    addUser(){
            // 验证添加是否成功
            this.$refs.addFormRef.validate( async valid =>{
                
                console.log(valid)
                // 如果返回值不是true，就返回
                if(!valid) return

                // 可以发起添加用户网络请求,promise简化并结构res，状态码201成功
                // this.addForm ,添加的对象
               const {data:res} =await this.$http.post('users',this.addForm)
               if (res.meta.status !== 201){
                    return this.$message.error('添加用户失败！')
               }
               this.$message.success('添加用户成功')
                //隐藏添加用户对话框
               this.addDialogVisible=false
                //刷新用户列表
                this.getUserList()
            })
            
    },
    // 展示编辑用户的对话框
    async showEditDialog(id){
        // console.log(id)
        // users/:id改为动态
        const {data:res} =await this.$http.get('users/'+id);
        if (res.meta.status !== 200){
            return this.$message.error('查询用户信息失败');
        }
        // editForm信息绑定给表单
        this.editForm =res.data;
        // console.log(res.data)
        this.editDialogVisible =true;


    },
    // 监听添加用户对话框的关闭事件
    editDialogClosed(){
        // 通过表单的ref引用 调用resetFields（）函数重置表单
        this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo(){
        this.$refs.editFormRef.validate( async valid =>{
        // console.log(valid)
        // 如果返回值不是true，就返回
        if(!valid) return
        // 可以发起添加用户网络请求,promise简化并结构res，状态码201成功
        // ,this.editForm ,添加的对象
        const {data:res} =await this.$http.put('users/'+this.editForm.id,
        {email:this.editForm.email,mobile:this.editForm.mobile})
        if (res.meta.status !== 200){
            return this.$message.error('修改用户信息失败！')
        }
        this.$message.success('修改用户信息成功')
        //隐藏添加用户对话框
        this.editDialogVisible=false
        //刷新用户列表
        this.getUserList()
    })
    },
    // 弹框询问用户是否删除数据
    async removeUserById(id){
        // console.log(id)
        // $confirm返回promise，await简化，返回字符串confirm和cancel
        const confirmResult =await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).catch(err=>err);//err=>retun err
        // catch是为了把取消报错组成返回值err
        //如果用户确认删除，则返回值为字符串confirm 
        //如果用户取消了删除，则返回值为字符串cancel
        // console.log(confirmResult)
        if(confirmResult!='confirm'){
            return this.$message.info('已取消删除');
        }
        // this.$message.success('确认删除')
        // axios delete请求删除id
        const {data:res}= await this.$http.delete('users/'+id);    
        if(res.meta.status!==200){
            return this.$message.error('删除失败');
        }
        this.$message.success('确认删除');
        // 刷新用户列表
        this.getUserList();
    },
    
  }
}
</script>

<style lang="less" scoped>

</style>
