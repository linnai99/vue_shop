"use strict";(self["webpackChunkvue_shop"]=self["webpackChunkvue_shop"]||[]).push([[580],{6401:function(e,t,a){a.r(t),a.d(t,{default:function(){return V}});var o=a(311);const r=(0,o.createTextVNode)("首页"),l=(0,o.createTextVNode)("商品管理"),d=(0,o.createTextVNode)("添加商品"),s=(0,o.createTextVNode)("点击上传"),n=(0,o.createTextVNode)("添加商品"),i=["src"];function c(e,t,a,c,u,m){const p=(0,o.resolveComponent)("el-breadcrumb-item"),h=(0,o.resolveComponent)("el-breadcrumb"),g=(0,o.resolveComponent)("el-alert"),V=(0,o.resolveComponent)("el-step"),_=(0,o.resolveComponent)("el-steps"),b=(0,o.resolveComponent)("el-input"),f=(0,o.resolveComponent)("el-form-item"),C=(0,o.resolveComponent)("el-cascader"),v=(0,o.resolveComponent)("el-tab-pane"),w=(0,o.resolveComponent)("el-checkbox"),N=(0,o.resolveComponent)("el-checkbox-group"),x=(0,o.resolveComponent)("el-button"),y=(0,o.resolveComponent)("el-upload"),k=(0,o.resolveComponent)("QuillEditor"),F=(0,o.resolveComponent)("el-tabs"),L=(0,o.resolveComponent)("el-form"),z=(0,o.resolveComponent)("el-card"),B=(0,o.resolveComponent)("el-dialog");return(0,o.openBlock)(),(0,o.createElementBlock)("div",null,[(0,o.createVNode)(h,{"separator-class":"el-icon-arrow-right"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(p,{to:{path:"/home"}},{default:(0,o.withCtx)((()=>[r])),_:1}),(0,o.createVNode)(p,null,{default:(0,o.withCtx)((()=>[l])),_:1}),(0,o.createVNode)(p,null,{default:(0,o.withCtx)((()=>[d])),_:1})])),_:1}),(0,o.createVNode)(z,null,{default:(0,o.withCtx)((()=>[(0,o.createVNode)(g,{title:"添加商品信息",type:"info","show-icon":"",closable:!1}),(0,o.createVNode)(_,{space:200,active:u.activeIndex-0,"finish-status":"success","align-center":""},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(V,{title:"基本信息"}),(0,o.createVNode)(V,{title:"商品参数"}),(0,o.createVNode)(V,{title:"商品属性"}),(0,o.createVNode)(V,{title:"商品图片"}),(0,o.createVNode)(V,{title:"商品内容"}),(0,o.createVNode)(V,{title:"完成"})])),_:1},8,["active"]),(0,o.createVNode)(L,{ref:"addFormRef",model:u.addForm,rules:u.addFormRules,"label-width":"120px",size:e.formSize,"label-position":"top"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(F,{onTabClick:m.tabClicked,modelValue:u.activeIndex,"onUpdate:modelValue":t[6]||(t[6]=e=>u.activeIndex=e),"tab-position":"left",class:"demo-tabs","before-leave":m.beforeTabLeave},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(v,{label:"基本信息",name:"0"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(f,{label:"商品名称",prop:"goods_name"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(b,{modelValue:u.addForm.goods_name,"onUpdate:modelValue":t[0]||(t[0]=e=>u.addForm.goods_name=e)},null,8,["modelValue"])])),_:1}),(0,o.createVNode)(f,{label:"商品价格",prop:"goods_price"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(b,{type:"number",modelValue:u.addForm.goods_price,"onUpdate:modelValue":t[1]||(t[1]=e=>u.addForm.goods_price=e)},null,8,["modelValue"])])),_:1}),(0,o.createVNode)(f,{label:"商品重量",prop:"goods_weight"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(b,{type:"number",modelValue:u.addForm.goods_weight,"onUpdate:modelValue":t[2]||(t[2]=e=>u.addForm.goods_weight=e)},null,8,["modelValue"])])),_:1}),(0,o.createVNode)(f,{label:"商品数量",prop:"goods_number"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(b,{type:"number",modelValue:u.addForm.goods_number,"onUpdate:modelValue":t[3]||(t[3]=e=>u.addForm.goods_number=e)},null,8,["modelValue"])])),_:1}),(0,o.createVNode)(f,{label:"商品分类",prop:"goods_cat"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(C,{modelValue:u.addForm.goods_cat,"onUpdate:modelValue":t[4]||(t[4]=e=>u.addForm.goods_cat=e),options:u.cateList,props:u.cateProps,onChange:m.handleChange},null,8,["modelValue","options","props","onChange"])])),_:1})])),_:1}),(0,o.createVNode)(v,{label:"商品参数",name:"1"},{default:(0,o.withCtx)((()=>[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(u.manyTableData,(e=>((0,o.openBlock)(),(0,o.createBlock)(f,{label:e.attr_name,key:e.attr_id},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(N,{modelValue:e.attr_vals,"onUpdate:modelValue":t=>e.attr_vals=t},{default:(0,o.withCtx)((()=>[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(e.attr_vals,((e,t)=>((0,o.openBlock)(),(0,o.createBlock)(w,{label:e,key:t,border:""},null,8,["label"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1032,["label"])))),128))])),_:1}),(0,o.createVNode)(v,{label:"商品属性",name:"2"},{default:(0,o.withCtx)((()=>[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(u.onlyTableData,(e=>((0,o.openBlock)(),(0,o.createBlock)(f,{label:e.attr_name,key:e.attr_id},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(b,{modelValue:e.attr_vals,"onUpdate:modelValue":t=>e.attr_vals=t},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1032,["label"])))),128))])),_:1}),(0,o.createVNode)(v,{label:"商品图片",name:"3"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(y,{action:u.uploadURL,"on-preview":m.handlePreview,"on-remove":m.handleRemove,"list-type":"picture",headers:u.headers,"on-success":m.handleSuccess},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(x,{type:"primary"},{default:(0,o.withCtx)((()=>[s])),_:1})])),_:1},8,["action","on-preview","on-remove","headers","on-success"])])),_:1}),(0,o.createVNode)(v,{label:"商品内容",name:"4"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(k,{theme:"snow",content:u.addForm.goods_introduce,"onUpdate:content":t[5]||(t[5]=e=>u.addForm.goods_introduce=e)},null,8,["content"]),(0,o.createVNode)(x,{type:"primary",class:"btnAdd",onClick:m.add},{default:(0,o.withCtx)((()=>[n])),_:1},8,["onClick"])])),_:1})])),_:1},8,["onTabClick","modelValue","before-leave"])])),_:1},8,["model","rules","size"])])),_:1}),(0,o.createVNode)(B,{modelValue:u.previewVisible,"onUpdate:modelValue":t[7]||(t[7]=e=>u.previewVisible=e),title:"图片预览",width:"50%"},{default:(0,o.withCtx)((()=>[(0,o.createElementVNode)("img",{src:u.previewPath,alt:""},null,8,i)])),_:1},8,["modelValue"])])}var u=a(2611),m=a.n(u),p={data(){return{activeIndex:"0",addForm:{goods_name:"",goods_price:0,goods_weight:0,goods_number:0,goods_cat:[],pics:[],goods_introduce:"",attrs:[]},addFormRules:{goods_name:[{required:!0,message:"请输入商品名称!",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格!",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量!",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量!",trigger:"blur"}],goods_cat:[{required:!0,message:"请选择商品分类!",trigger:"blur"}]},cateList:[],cateProps:{label:"cat_name",value:"cat_id",children:"children"},manyTableData:[],onlyTableData:[],uploadURL:"https://lianghj.top:8888/api/private/v1/upload",headers:{Authorization:window.sessionStorage.getItem("token")},previewPath:"",previewVisible:!1}},created(){this.getCateList()},methods:{async getCateList(){const{data:e}=await this.$http.get("categories");if(200!==e.meta.status)return this.$message.error("获取商品分类数据失败!");this.cateList=e.data},handleChange(){3!==this.addForm.goods_cat.length&&(this.addForm.goods_cat=[])},beforeTabLeave(e,t){if("0"===t&&3!==this.addForm.goods_cat.length)return this.$message.error("请先选择商品分类!"),!1},async tabClicked(){if("1"===this.activeIndex){const{data:e}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:"many"}});if(200!==e.meta.status)return this.$message.error("获取动态列表失败!");e.data.forEach((e=>{e.attr_vals=0===e.attr_vals.length?[]:e.attr_vals.split(" ")})),this.manyTableData=e.data}else if("2"===this.activeIndex){const{data:e}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:"only"}});if(200!==e.meta.status)return this.$message.error("获取静态列表失败!");this.onlyTableData=e.data}},handlePreview(e){this.previewPath=e.response.data.url,this.previewVisible=!0},handleRemove(e){const t=e.response.data.tmp_path,a=this.addForm.pics.findIndex((e=>e.pic===t));this.addForm.pics.splice(a,1)},handleSuccess(e){const t={pic:e.data.tmp_path};this.addForm.pics.push(t)},add(){this.$refs.addFormRef.validate((async e=>{if(!e)return this.$message.error("请填写必要的表单项");const t=m().cloneDeep(this.addForm);t.goods_cat=t.goods_cat.join(","),this.manyTableData.forEach((e=>{const t={attr_id:e.attr_id,attr_vals:e.attr_vals};this.addForm.attrs.push(t)})),this.onlyTableData.forEach((e=>{const t={attr_id:e.attr_id,attr_vals:e.attr_vals};this.addForm.attrs.push(t)})),t.goods_introduce=this.addForm.goods_introduce.ops[0].insert,t.attrs=this.addForm.attrs;const{data:a}=await this.$http.post("goods",t);if(201!==a.meta.status)return this.$message.error("添加商品失败!");this.$message.success("添加商品成功!"),this.$router.push("/goods")}))}},computed:{cateId(){return 3===this.addForm.goods_cat.length?this.addForm.goods_cat[2]:null}}},h=a(89);const g=(0,h.Z)(p,[["render",c],["__scopeId","data-v-e9761546"]]);var V=g},6521:function(e,t,a){a.r(t),a.d(t,{default:function(){return b}});var o=a(311);const r=(0,o.createTextVNode)("首页"),l=(0,o.createTextVNode)("商品管理"),d=(0,o.createTextVNode)("商品列表"),s={class:"input-group mb-3"},n=(0,o.createElementVNode)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-search",viewBox:"0 0 16 16"},[(0,o.createElementVNode)("path",{d:"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"})],-1),i=[n];function c(e,t,a,n,c,u){const m=(0,o.resolveComponent)("el-breadcrumb-item"),p=(0,o.resolveComponent)("el-breadcrumb"),h=(0,o.resolveComponent)("el-col"),g=(0,o.resolveComponent)("el-row"),V=(0,o.resolveComponent)("el-table-column"),_=(0,o.resolveComponent)("el-button"),b=(0,o.resolveComponent)("el-table"),f=(0,o.resolveComponent)("el-pagination"),C=(0,o.resolveComponent)("el-card");return(0,o.openBlock)(),(0,o.createElementBlock)("div",null,[(0,o.createVNode)(p,{"separator-class":"el-icon-arrow-right"},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(m,{to:{path:"/home"}},{default:(0,o.withCtx)((()=>[r])),_:1}),(0,o.createVNode)(m,null,{default:(0,o.withCtx)((()=>[l])),_:1}),(0,o.createVNode)(m,null,{default:(0,o.withCtx)((()=>[d])),_:1})])),_:1}),(0,o.createVNode)(C,null,{default:(0,o.withCtx)((()=>[(0,o.createVNode)(g,{gutter:20},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(h,{span:8},{default:(0,o.withCtx)((()=>[(0,o.createElementVNode)("div",s,[(0,o.withDirectives)((0,o.createElementVNode)("input",{type:"search",class:"form-control",placeholder:"请输入内容","onUpdate:modelValue":t[0]||(t[0]=e=>c.queryInfo.query=e),clearable:"",onChange:t[1]||(t[1]=(...e)=>u.getGoodsList&&u.getGoodsList(...e))},null,544),[[o.vModelText,c.queryInfo.query]]),(0,o.createElementVNode)("button",{class:"btn btn-outline-secondary",type:"button",id:"button-addon2",onClick:t[2]||(t[2]=(...e)=>u.getGoodsList&&u.getGoodsList(...e))},i)])])),_:1}),(0,o.createVNode)(h,{span:4},{default:(0,o.withCtx)((()=>[(0,o.createElementVNode)("button",{type:"button",class:"btn btn-primary",onClick:t[3]||(t[3]=(...e)=>u.goAddpage&&u.goAddpage(...e))},"添加商品")])),_:1})])),_:1}),(0,o.createVNode)(b,{data:c.goodsList,border:"",stripe:""},{default:(0,o.withCtx)((()=>[(0,o.createVNode)(V,{type:"index",label:"#"}),(0,o.createVNode)(V,{label:"商品名称",prop:"goods_name"}),(0,o.createVNode)(V,{label:"商品价格(元)",prop:"goods_price",width:"95px"}),(0,o.createVNode)(V,{label:"商品重量",prop:"goods_weight",width:"70px"}),(0,o.createVNode)(V,{label:"创建时间",prop:"add_time",width:"180px"},{default:(0,o.withCtx)((e=>[(0,o.createTextVNode)((0,o.toDisplayString)(u.dateFormat(e.row.add_time)),1)])),_:1}),(0,o.createVNode)(V,{label:"操作",width:"130px"},{default:(0,o.withCtx)((e=>[(0,o.createVNode)(_,{type:"primary",size:"mini",icon:c.Edit},null,8,["icon"]),(0,o.createVNode)(_,{type:"danger",size:"mini",icon:c.Delete,onClick:t=>u.removeById(e.row.goods_id)},null,8,["icon","onClick"])])),_:1})])),_:1},8,["data"]),(0,o.createVNode)(f,{currentPage:c.queryInfo.pagenum,"onUpdate:currentPage":t[4]||(t[4]=e=>c.queryInfo.pagenum=e),"page-size":c.queryInfo.pagesize,"onUpdate:page-size":t[5]||(t[5]=e=>c.queryInfo.pagesize=e),"page-sizes":[5,10,15,20],small:e.small,disabled:e.disabled,background:"",layout:"total, sizes, prev, pager, next, jumper",total:c.total,onSizeChange:u.handleSizeChange,onCurrentChange:u.handleCurrentChange},null,8,["currentPage","page-size","small","disabled","total","onSizeChange","onCurrentChange"])])),_:1})])}var u=a(547),m=a(4876),p=a(5743),h=a.n(p),g={data(){return{queryInfo:{query:"",pagenum:1,pagesize:10},goodsList:[],total:0,Delete:u.Z,Edit:m.Z}},computed:{},created(){this.getGoodsList()},methods:{dateFormat(e){return h()(e).format("YYYY-MM-DD HH:mm:ss")},async getGoodsList(){const{data:e}=await this.$http.get("goods",{params:this.queryInfo});if(200!==e.meta.status)return this.$message.error("获取商品列表失败!");this.$message.success("获取商品列表成功!"),this.goodsList=e.data.goods,this.total=e.data.total},handleSizeChange(e){this.queryInfo.pagesize=e,this.getGoodsList()},handleCurrentChange(e){this.queryInfo.pagenum=e,this.getGoodsList()},async removeById(e){const t=await this.$confirm("此操作将永久删除该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((e=>e));if("confirm"!=t)return this.$message.info("已取消删除");const{data:a}=await this.$http.delete("goods/"+e);if(200!==a.meta.status)return this.$message.error("删除失败");this.$message.success("确认删除"),this.getGoodsList()},goAddpage(){this.$router.push("/goods/add")}}},V=a(89);const _=(0,V.Z)(g,[["render",c]]);var b=_},4876:function(e,t,a){a.d(t,{Z:function(){return u}});var o=a(311),r=a(6854);const l=(0,o.defineComponent)({name:"Edit"}),d={viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},s=(0,o.createElementVNode)("path",{fill:"currentColor",d:"M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"},null,-1),n=(0,o.createElementVNode)("path",{fill:"currentColor",d:"m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"},null,-1),i=[s,n];function c(e,t,a,r,l,s){return(0,o.openBlock)(),(0,o.createElementBlock)("svg",d,i)}var u=(0,r.Z)(l,[["render",c]])}}]);
//# sourceMappingURL=GoodsList_Add.39a525cb.js.map