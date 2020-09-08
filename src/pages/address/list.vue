<template>
    <div class="home">
        
     
                <div class="upcard">
                <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                    <b-row no-gutters>
                    <b-col md="6">
                        <b-card-img :src="imageUrl" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                        <b-card-body class="cardcontent" >
                       
                               <el-upload
                               :on-exceed="toast"
                               :limit="1"
                               :multiple="no"
                                class="avatar-uploader"
                                action="http://upload-z2.qiniup.com"
                                    :on-remove="remove"
                                    :on-success="handleAvatarSuccess"
                                    :data="{token: token}">
                                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                         
                    

                        </b-card-body>
                    </b-col>
                    </b-row>
                </b-card>
                 <el-divider  content-position="left">  为分享的图片添加描述</el-divider>
                       <div class="message">
                                    <div>
                                    <b-form @submit.stop.prevent>
                                      
                                        <b-input type="text" v-model="info"  aria-describedby="password-help-block"></b-input>
                                       
                                    </b-form>
                                    </div>

                        </div>
                          <el-divider  content-position="left">Title将会展示为图片的图题</el-divider>
                       <div class="message">
                                    <div>
                                    <b-form @submit.stop.prevent>
                                      
                                        <b-input type="text" v-model="title" aria-describedby="password-help-block"></b-input>
                                      
                                    </b-form>
                                    </div>

                        </div>
                           <el-divider  content-position="left">为分享的图片添加标签！(输入后点击空白处)</el-divider><br>
                           <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
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
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
                     <el-button @click="sendmsg" class="submit" type="success">上传图片&发布</el-button>
                </div>
    </div>
</template>
<style scoped>
.submit{
    width: 441px;
    margin-top: 20px;
    background-color: #27ae60;
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
.message{
    width: 442px;
}
.el-divider__text{
    color: #606266;
     background: rgb(243, 246, 249);
    
}

.home{
    position: relative;
    margin-top: 300px;
    
}
.upcard{
   
    width: 442px;
  
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
}
.el-icon-plus{
    border:1px dashed #ccc;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    max-width: 250px;
    max-height: 300px;
    display: block;
  }
</style>
<script>
import request from '@/utils/request'
export default {
    components:{
       

    },
     data() {
      return {
          no:false,
          title:"",
          info:"",
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        imageUrl: "",
        token:""
      };
    },
    created(){
     request({
       url:'/api/v1/file/token',
       method:'get',
       
     }).then(response=>{
      this.token= response.token
     })

    },
    methods: {
      handleAvatarSuccess(res) {
            this.$message.success('嗯呐,上传已经完成了！');
        this.imageUrl = 'http://dongdove.cn/'+res.hash;
      },
       handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(()=> {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      toast(){
            this.$message.error('错了哦，每次只允许上传一张图片');
      },
        sendmsg(){
            request({
                url:'/supdate',
                method:'get',
                params:{
                    tag:this.dynamicTags,
                    info:this.info,
                    title:this.title,
                    author:sessionStorage.getItem('username'),
                    imgsrc:this.imageUrl,
                    time:this.getNowFormatDate(),
                    avater:sessionStorage.getItem('avater')
                }
            }).then(()=>{
                 this.$message({
                message: '🍦！已发布',
                type: 'success'
                 });
                 console.log(this.token)
                 //console.log()
                  this.$router.push({path:'/'})
            })
        },
 getNowFormatDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
    }
    var currentdate = year + '-' + month + '-' + strDate;
    return currentdate;
}
    }
}
</script>