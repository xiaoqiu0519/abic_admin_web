<template>
  <div>
    {{msg}}
    <!--上传-->
    <!--margin: 0 auto-->
    <!--accept	接受上传的文件类型-->
    <!--http-request 覆盖默认的上传行为，可以自定义上传的实现-->
    <div style="width:300px;height:300px">
      <el-upload
        class="upload-demo"
        multiple
        action="*"
        :limit='5'
        :http-request="upload"
        :on-change="ddddd"
        :on-success="Tusuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
        :with-credentials="true"
        :auto-upload="false"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span @click="upload">上传</span>
    </div>
    <!--弹框-->
    <el-dialog
      title="提示"
      :visible.sync="imgDialogVisible"
      width="30%">
      <img style="width: 100%" :src="dialogImageUrl" alt="">
      <span slot="footer" class="dialog-footer">
    <el-button @click="imgDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="imgDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "",
    data: function () {
      return {
        imgDialogVisible: false,
        msg: 'This is a Vue project daohang2 --图片上传',
        fileList: [
          // {
          // name: 'food.jpeg',
          // url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }, {
          //   name: 'food2.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }
        ],
        dialogImageUrl: '',
      }
    },
    create: function () {
    }, /*渲染前调用*/
    mounted: function () {
    }, /*渲染后调用*/
    methods: {
      handleRemove(file, fileList) {
          console.log(file)
          console.log(fileList)
        this.$message.success('删除成功');
      },
      ddddd(file){
        console.log(file.file)
      },
      handlePreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.imgDialogVisible = true;
      },
      Tusuccess(response, file, fileList) {
          console.log(123456)
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
      beforeAvatarUpload(file) {
        console.log(file)
        //const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        /*if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }*/
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        /*return isJPG && isLt2M;*/
        return isLt2M;//如果只限制大小只返回isLt2M即可，必须返回，不然不生效
      },
      upload(file) {
        console.log(file)
        let fd = new FormData();
        fd.append('files', file.file)
        console.log(fd)
        var self = this;
        this.$post("/others/uploads",fd)
          .then(function () {
            self.$message.success('上传成功');
          })
          .catch(function () {
            self.$message.error('上传失败');
          })
      }
    }  /*方法*/
  }
</script>

<style scoped>

</style>