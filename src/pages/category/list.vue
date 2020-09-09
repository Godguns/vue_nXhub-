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
            <el-table-column prop="Album_info" label="栏目名称"></el-table-column>
            <el-table-column prop="Album_name" label="专辑名称"></el-table-column>
            <el-table-column prop="Album_time" label="时间"></el-table-column>
             <el-table-column prop="isRecommend" :formatter="formatBoolean" label="是否推荐"></el-table-column>
              <el-table-column prop="master_img" label="封面">
                   <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.master_img" alt="" style="width: 80px;">
              <img slot="reference" :src="scope.row.master_img" style="width: 80px;">
            </el-popover>
        </template>
                  
              </el-table-column>
                <el-table-column prop="Album_imgs" label="专辑内容">
              <template slot-scope="scope">
                    <div class="imgs">
                        　<img v-for="(item,index) in scope.row.Album_imgs" style="width:80px;" :key="index" :src="item"  class="head_pic"/>
                    </div>
　　            </template>
                  
              </el-table-column>
            <el-table-column label="操作">
                <!-- v-slot用于获取当前行数据 -->
                <template v-slot="slot">
                    <a href="" @click.prevent="toDeleteHandler(slot.row)">删除</a>
                    <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
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
             <!-- <el-form-item label="id">
                <el-input :disabled="true" v-model="_id"></el-input>
            </el-form-item> -->
            <el-form-item label="专辑名称">
                <el-input v-model="Album_name"></el-input>
            </el-form-item>
            <el-form-item label="专辑介绍">
                <el-input  v-model="Album_info"></el-input>
            </el-form-item>
            <el-form-item label="专辑封面">
                <!-- <el-input  v-model="master_img"></el-input> -->
                <el-upload
                list-type="picture"
                :on-success="handleAvatarSuccess"
                class="upload-demo"
                action="http://upload-z2.qiniup.com"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                  :data="{token: token}"
                :limit="1"
                :on-exceed="handleExceed"
               >
                <el-button size="small" type="primary">点击上传</el-button>
                
                </el-upload>
            </el-form-item>
            <el-form-item label="专辑内容">
                <!-- <el-input  v-model="master_img"></el-input> -->
                <el-upload
                list-type="picture"
                :on-success="handleAvatarSuccess2"
                class="upload-demo"
                action="http://upload-z2.qiniup.com"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                  :data="{token: token}"
                :limit="10"
                :on-exceed="handleExceed"
               >
                <el-button size="small" type="primary">点击上传</el-button>
               
                </el-upload>
            </el-form-item>
            <el-form-item label="作者">
                <el-input  v-model="Album_author"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input  v-model="Album_time"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐">
              <span  class="el-upload__tip">请填写 true 或者 false</span>
                <el-input  v-model="isRecommend"></el-input>
            </el-form-item>
            <el-form-item label="内容链接">
                                        
                                                <el-tag
                            :key="tag"
                            v-for="tag in Album_imgs"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                            </el-tag>
                            <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

            </el-form-item>
               <el-form-item label="添加标签">
                                        
                                                <el-tag
                            :key="tag2"
                            v-for="tag2 in Album_tags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose2(tag2)">
                            {{tag2}}
                            </el-tag>
                            <el-input
                            class="input-new-tag"
                            v-if="inputVisible2"
                            v-model="inputValue2"
                            ref="saveTagInput2"
                            size="small"
                            @keyup.enter.native="handleInputConfirm2"
                            @blur="handleInputConfirm2"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput2">+ New Tag</el-button>

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
         handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarSuccess(res, file){
          this.master_img='http://dongdove.cn/'+res.hash;
          //var imgitem='http://dongdove.cn/'+res.hash;
          //this.Album_imgs.push(imgitem)

            console.log(res)
      },
        handleAvatarSuccess2(res, file){
          //this.master_img='http://dongdove.cn/'+res.hash;
          var imgitem='http://dongdove.cn/'+res.hash;
          
          this.Album_imgs.push(imgitem)

           
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
      //tags2方法
              handleClose2(tag) {
        this.Album_tags.splice(this.Album_tags.indexOf(tag), 1);
      },

      showInput2() {
        this.inputVisible2 = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput2.$refs.input.focus();
        });
      },

      handleInputConfirm2() {
        let inputValue2 = this.inputValue2;
        if (inputValue2) {
          this.Album_tags.push(inputValue2);
        }
        this.inputVisible2 = false;
        this.inputValue2 = '';
      },
        submitHandler(){
            if(this.isadd===true){
                    var url='/add_album'
            request({
          url,
          method:"get",
          params:{  
                   Album_tags:this.Album_tags,
                    Album_imgs:this.Album_imgs,
                    Album_info:this.Album_info,
                    Album_author:this.Album_author,
                    master_img:this.master_img,
                    Album_name:this.Album_name,
                    Album_time:this. Album_time,
                    isRecommend:this.isRecommend
          },
          //为了告诉后台我的请求体中放的是查询字符串
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          //将this.form转换为查询字符串发送给后台
          data: querystring.stringify(this.form)
          }).then(response=>{
              this.$message({
                  type:"success",
                  message:"添加成功"
              })
              this.visible=false;
              this.getablum()
          })
            //将form变为初始值

            }else{
                    var url='/update_album'
                    console.log(this.Album_tags,"tags")
                    console.log(this.Album_imgs,"imgs")
            request({
          url,
          method:"get",
          params:{  
                     Album_tags:this.Album_tags,
                    id:this.id,
                    Album_imgs:this.Album_imgs,
                    Album_info:this.Album_info,
                    Album_author:this.Album_author,
                    master_img:this.master_img,
                    Album_name:this.Album_name,
                    Album_time:this. Album_time,
                    isRecommend:this.isRecommend
          },
          //为了告诉后台我的请求体中放的是查询字符串
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          //将this.form转换为查询字符串发送给后台
          //data: querystring.stringify(this.form)
          }).then(response=>{

              this.$message({
                  type:"success",
                  message:"修改成功"
              })
              this.visible=false;
              this.getablum()
              //location.reload()
          })
            //将form变为初始值

            }
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
             console.log(row.Album_imgs,"测试下")
          //  this.form=row;
                    this.Album_imgs=row.Album_imgs===null?[]:row.Album_imgs,
                    this.Album_info=row.Album_info,
                    this.Album_author=row.Album_author,
                    this.master_img=row.master_img,
                    this.Album_name=row.Album_name,
                    this.Album_time=row.Album_time,
                    this.isRecommend=row.isRecommend,
                    this.id=row._id
                     console.log(this.Album_imgs,"测试下2")
            this.visible=true;
          
        },
        toDeleteHandler(row){
              request({
                url:'/del_album',
                method:'get',
                params:{
                  id:row._id
                }
              }).then(res=>{
                 this.$message({
          message: '恭喜你， 删除成功',
          type: 'success'
        });
                this.getablum()
              })
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
       getablum(){
            let url="/get_album";
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
              //console.log(response.data[0])
              //提示消息
             // this.loadData();
              
              
          })
       }
    },
    //用于存放要在网页中存放的数据
    data(){
        return {    Album_tags:[],
                    isadd:true,
                   id:"",
                    token:"",
                    inputVisible2:false,
                    inputVisible: false,
                    inputValue2:"",
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