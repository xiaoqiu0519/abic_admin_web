<template>
    <div class="imglist">
        <div class="title">
            <input type="file"  name="file" ref="file" multiple @change="changeFile" accept=".jpg, .jpeg, .png"/>
            <span>选择图片(最多选择8张)</span>
        </div>
        <div class="imgArr">
            <img v-for="(item,index) in upImgArr" :key="index" :src="item" alt="" srcset="">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formData:'',
            upImgArr:[],
        }
    },
    methods:{
      changeFile(){
        this.formData = new FormData();
        this.upImgArr = [];
        let file = this.$refs.file
        //let size = 0;
        file.files.forEach((ele) => {
            this.formData.append('images', ele)
            this.upImgArr.push(URL.createObjectURL(ele))
        })
        this.$emit('senddata',this.formData)
      },
      clearImg(data){
         this.upImgArr = data ?  JSON.parse(data) : []
      }
    }
}
</script>
<style lang="stylus" scoped>
.imglist
    flex 1;
    .title
        width 100%;
        height 30px;
        position relative;
        margin-bottom 15px;
        input 
            width 100%;
            opacity 0;
            background red;
            position absolute;
            height 30px;
            left 0;
            top 0;
        span
            width 100%;
            background #f8f8f9;
            height 30px;
            border-radius 4px;    
            display block;
    .imgArr
        font-size 0;
        img
            width 80px;
            margin-right 15px;
            margin-bottom 15px;
</style>