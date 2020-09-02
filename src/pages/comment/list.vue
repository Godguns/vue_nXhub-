<template>
    <div class="home">
       <br>
        <!-- 按钮 -->
        <el-button type="success" @click="toAddHandler">添加</el-button>
        <el-button type="danger" >批量删除</el-button>
        <!-- /按钮 -->
        <!-- 表格 -->
        <!-- "id": 9139,
      "name": "123",
      "num": 123,
      "icon": "http://134.175.154.93:8888/group1/M00/00/19/rBAACV2QmGOAdpjQAAASHUVudos614.png",
      "parentId": null -->
        <el-table :data="categorys">
            <el-table-column prop="_id" label="编号"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            
              <el-table-column prop="avater" label="头像">
                   <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.avater" alt="" style=" width: 150px;height: 150px">
              <img slot="reference" :src="scope.row.avater" style="  width: 80px;">
            </el-popover>
        </template>
                  
              </el-table-column>
            <el-table-column label="操作">
                <!-- v-slot用于获取当前行数据 -->
                <template v-slot="slot">
                    <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                   
                </template>
            </el-table-column>

        </el-table>
        <!-- /表格 -->
        <!-- 分页 -->
         <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        <!-- /分页 -->
        <!-- 模态框    冒号表示引用脚本-->
         <el-dialog :title="title" :visible.sync="visible" width="60%" >
         <el-form  label-width="80px">
           
        
            <el-form-item label="作者">
                <el-input  v-model="username"></el-input>
            </el-form-item>
            
        
        </el-form>
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
   
     
        submitHandler(){
         var url='/add_TJ'
            request({
          url,
          method:"get",
          params:{
                   username:this.username
          },
          //为了告诉后台我的请求体中放的是查询字符串
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          //将this.form转换为查询字符串发送给后台
        
          }).then(response=>{
              this.$message({
                  type:"success",
                  message:"添加成功"
              })
              this.visible=false;
              this.getablum()
          })
            //将form变为初始
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
            this.title="修改栏目信息";
            this.form=row;
            this.visible=true;
        },
        closeModalHandler(){
            this.visible=false;
        },
       toAddHandler(){
           this.form={
               type:"category"
           }
           this.visible=true;
          
           
       },
       getablum(){
            let url="/get_TJ";
          request({
          url,
          method:"get",
          //为了告诉后台我的请求体中放的是查询字符串
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          //将this.form转换为查询字符串发送给后台
         
          }).then((response)=>{
              //请求结束
              this.closeModalHandler;
              this.categorys=response.data
              //提示消息
             // this.loadData();
              
              
          })
       }
    },
    //用于存放要在网页中存放的数据
    data(){
        return {    
                   
                    token:"",
                    username:"",
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