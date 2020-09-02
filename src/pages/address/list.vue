<template>
    <div class="home">
       <br>
        <!-- 按钮 -->
        <el-button type="success" @click="toAddHandler">添加</el-button>
        <el-button type="danger" >批量删除</el-button>
       
        <el-table :data="categorys">
            <el-table-column prop="_id" label="编号"></el-table-column>
           
              <el-table-column prop="banner" label="封面">
                   <template slot-scope="scope">
          
             
              <img slot="reference" :src="scope.row.banner" style="width: 80px;">
            
        </template>
           </el-table-column>       
             
            <el-table-column label="操作">
                <!-- v-slot用于获取当前行数据 -->
                <template v-slot="slot">
                    <a href="" @click.prevent="toDeleteHandler(slot.row)">删除</a>
                   
                </template>
            </el-table-column>

        </el-table>
        <!-- /表格 -->
        <!-- 分页 -->
         <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        <!-- /分页 -->
        <!-- 模态框    冒号表示引用脚本-->
         <el-dialog :title="title" :visible.sync="visible" width="60%" >
                <h2>确定要删除此项吗</h2>
         <span slot="footer" class="dialog-footer">
         <el-button @click="visible = false">取 消</el-button>
         <!-- @click=onclick -->
         <el-button type="primary" @click="submitHandler">确 定</el-button>
         </span>
        </el-dialog>
        <!-- /模态框 -->
        
    </div>
</template>

<script>
//暴露接口
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    beforeMount(){
       // this.submitHandler()
    },
    // 存放网页中需要调用的方法
    methods:{
         handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarSuccess(res, file){
          this.master_img='http://dongdove.cn/'+res.hash
            console.log(res)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
        //以下是tags方法
        handleClose(tag) {
        this.Album_imgs.splice(this.Album_imgs.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.Album_imgs.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
        submitHandler(){
       
        },
        /*布尔值格式化：cellValue为后台返回的值
*/
            formatBoolean: function (row, column, cellValue) {
                var ret = ''  //你想在页面展示的值
                if (cellValue) {
                    ret = "是"  //根据自己的需求设定
                } else {
                    ret = "否"
                }
                return ret;
            },
       
        toUpdateHandler(row){
            this.isadd=false
            this.title="修改栏目信息";
          //  this.form=row;
                    this.Album_imgs=row.Album_imgs,
                    this.Album_info=row.Album_info,
                    this.Album_author=row.Album_author,
                    this.master_img=row.master_img,
                    this.Album_name=row.Album_name,
                    this. Album_time=row.Album_time,
                    this.isRecommend=row.isRecommend,
                    this.id=row._id
            this.visible=true;
        },
        closeModalHandler(){
            this.visible=false;
        },
       toAddHandler(){
            this.title="添加栏目信息";
            this.isadd=true
           this.form={
               type:"category"
           }
           this.visible=true;
          
           
       },
       toDeleteHandler(row){
         console.log(row)
            let url="/del_banner";
         request({
           url:url,
           method:'get',
           params:{
             _id:row._id
           }
         }).then(response=>{
           this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getablum()
         })
       },
       getablum(){
            let url="/get_bannner";
          request({
          url,
          method:"get",
          //为了告诉后台我的请求体中放的是查询字符串
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          //将this.form转换为查询字符串发送给后台
          data: querystring.stringify(this.form)
          }).then((response)=>{
              //请求结束
              this.closeModalHandler;
            


              this.categorys=response.data
             
              
          })
       }
    },
    //用于存放要在网页中存放的数据
    data(){
        return {    
                    isadd:true,
                   id:"",
                    token:"",
                    inputVisible: false,
                     inputValue: '',
                    Album_imgs:[],
                    Album_info:"",
                    Album_author:"",
                    master_img:"",
                    Album_name:"",
                    Album_time:"",
                    isRecommend:"",
                    title:"录入栏目信息",
                    visible:false,
                    categorys:[],
                    form:{
                        type:"category"
                    }
        }
    },
    created(){
        request({
            url:'/api/v1/file/token',
            method:'get',

        }).then(response=>{
            this.token=response.token
        })
    this.getablum();
         
    },
}
</script>

<style scoped>
.imgs{
    display: flex;
}

    .home{
        margin-left: 10px;
    }
        .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>