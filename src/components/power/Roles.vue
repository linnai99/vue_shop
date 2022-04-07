<template>
    <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- path点击会去/home -->
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
            </el-col>
        </el-row>

        <!-- 角色列表区域 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
            <!-- 定义展开 -->
          <template v-slot="scope">
              <!-- <pre>
                  {{scope.row}}
              </pre> -->
              <!-- 三层for循环  -->
           <!-- v-for="(item1, i1) in scope.row.children"把一级权限渲染进去循环，把底部el-tag class绑定每一行 -->
           <!-- 判断是不是第一行，是的话引用'bdtop，不是可以忽略,i1接收行数 -->
            <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
                 <!-- 栅格第一列一级权限5列，col最多24列-->
              <el-col :span="5">
                  <!-- {item1.authName｝一级权限名 -->
                  <!-- 为close添加打开弹窗事件 -->
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <!-- 小箭头 -->
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限，二左三右 -->
              <el-col :span="19">
                <!-- 通过 for 循环 嵌套渲染二级权限，二级边框第一个不用bdtop，以为有了最开始一行的，只要其下面有就好 -->
                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">        
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>                  
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3, i3) in item2.children" :key="item3.id" 
                    closable @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>       
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <el-button size="mini" type="primary" :icon="Edit" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" :icon="Delete" @click="rolesdelete(scope.row.id)">删除</el-button>
            <el-button size="mini" type="warning" :icon="Setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table> 
    </el-card>

    <el-dialog title="添加角色" v-model="addDialogVisible" @close="addDislogClosed">
      <el-form :model="addRolesForm" :rules="addFormRules" ref="addRolesForm" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span  class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRolesUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="修改角色" v-model="editDialogVisible" width="30%">
      <el-form :model="editRolesForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editFormInfo">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="分配权限" v-model="SetRightDialogVisible" width="50%" @closed="SetRightDialogVisibleClosed">
        <!-- prop指定绑定的标题文本，show-checkbox选择小盒子，node-key="id"勾选盒子id唯一值
      default-expand-all，默认展开所有节点，:default-checked-keys="defKeys"，默认勾选的节点-->
      <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef" />
      <template #footer>
        <span class="dialog-footer">
            <el-button @click="SetRightDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    </div>
</template>
<script>
import { Delete, Edit, Setting } from '@element-plus/icons-vue'
export default {
    data(){
        return{
            //所有角色列表数据
            rolelist:[],
            // 所有权限的数据
            rightsList: [],
            // 添加角色对话框的显示和隐藏
            addDialogVisible: false,
            // 编辑对话框的显示和隐藏
            editDialogVisible: false,
            // 分配权限对话框的显示和隐藏
            SetRightDialogVisible: false,
            addRolesForm: {
                roleName: '',
                roleDesc: ''
            },
            editRolesForm: {},
            // 树形控件的绑定对象
            treeProps: {
                children: 'children',
                label: 'authName'
            },
            // 树形控件 -> 默认选中的节点id值数组
            defKeys: [],
            // 当前即将分配权限的角色的ID
            rolesId: '',
            Delete,
            Edit,
            Setting
        }
    },
    created(){
        this.getRolesList()
    },
    methods:{
        async getRolesList() {
            const { data: res } = await this.$http.get('roles');
            if (res.meta.status !== 200) {
                return this.$message.error('获取角色列表失败！');
            }
            this.rolelist = res.data;
            console.log(this.rolelist);
        },
        // 添加角色
        addRolesUser() {
            this.$refs.addRolesForm.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.post('roles', this.addRolesForm);
                console.log(res);
                if (res.meta.status !== 201) {
                    return this.$message.error('添加角色失败!')
                }
                this.$message.success('添加角色成功!');
                this.getRolesList();
                this.addDialogVisible = false;
        })
        // console.log(this.addRolesForm)
        },
        // 得到修改用户的信息
        async showEditDialog(id) {
            const { data: res } = await this.$http.get('roles/' + id);
            if (res.meta.status !== 200) {
                return this.$message.error('查询角色失败!');
            }
            this.editRolesForm = res.data;
            console.log(this.editRolesForm);
            this.editDialogVisible = true;
        },
        editFormInfo() {
            this.$refs.editFormRef.validate(valid => {
                if (!valid) return
                this.$http
                .put('roles/' + this.editRolesForm.roleId, {
                    roleName: this.editRolesForm.roleName,
                    roleDesc: this.editRolesForm.roleDesc
                })
                .then(res => {
                    if (res.data.meta.status !== 200) {
                        return this.$message.error('修改角色失败!')
                    }
                    this.$message.success('修改角色成功!')
                    this.getRolesList()
                })
                this.editDialogVisible = false
            })
        },
        // 删除角色
        async rolesdelete(id) {
            const confirmRusult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '删除角色', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            // 没有使用await
            if (confirmRusult !== 'confirm') {
                return this.$message.info('已取消该删除操作');
            }
            this.$http.delete('roles/' + id).then(res => {
                const { data: response } = res
                // console.log(response)
                if (response.meta.status !== 200) {
                return this.$message.error('该用户删除失败');
                }
                this.$message.success('该用户已经删除');
                this.getRolesList();
            })
        },
         // 展示分配权限的对话框
        async showSetRightDialog(role) {
            this.rolesId = role.id;
            const {data:res} = await this.$http.get('rights/tree');
            if(res.meta.status!==200){
                return this.$message.error('获取权限失败');
            }
            // console.log(res.data);
            this.rightsList=res.data;
            // this.rightsList.push(...res.data);
            console.log(this.rightsList);
            this.getLeafKeys(role,this.defKeys);
            this.SetRightDialogVisible = true;
        },
        // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
        getLeafKeys(node, arr) {
        // 如果当前 node 节点不包含 children 属性，则是三级节点
            if (!node.children) {
                return arr.push(node.id);
            }
            node.children.forEach(item => this.getLeafKeys(item, arr));
        },
        // 监听分配权限对话框的关闭事件
        SetRightDialogVisibleClosed() {
        // 清空 defkeys 数组  避免累积
            this.defKeys = [];
        },
        // 点击为角色分配权限
        async allotRights() {
            const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
            // 拿到选中的所有id，getCheckedKeys，getHalfCheckedKeys是el-tree的属性
            const idStr = keys.join(',')
            const { data: res } = await this.$http.post(`roles/${this.rolesId}/rights`, { rids: idStr })
            if (res.meta.status !== 200) {
                return this.$message.error('分配权限失败!')
            }
            this.$message.success('分配权限成功!')
            this.getRolesList()
            this.SetRightDialogVisible = false
        },
        // 根据ID删除对应的权限
        async removeRightById(roles, id) {
            // 弹框提示用户是否删除
            const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('取消了删除!');
            }
            const { data: res } = await this.$http.delete(`roles/${roles.id}/rights/${id}`);
            if (res.meta.status !== 200) {
                return this.$message.error('删除权限失败!');
            }
            // this.getRolesList()
            // 直接调用获取用户的方法会导致展开栏的关闭,这样体验不好
            // 可以直接把返回的最新数据直接赋值
            roles.children = res.data;
            console.log('删除');
        }
    }
}

</script>
<style lang="less" scoped>
    .el-table {
        margin-top: 15px;
    }
    .el-tag {
        margin: 7px;
    }
    .bdtop {
        border-top: 1px solid #eee;
    }
    .bdbottom {
        border-bottom: 1px solid #eee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>