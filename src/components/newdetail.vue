<template>
  <div  class="shadexbox">
    <div class="content">
      <div class="con" v-for="(list,index) in datalist" :key="index">
        <div class="list" v-for="(item,key) in list" :key="key">
          <p v-if="item.type == 1">{{item.content}}</p>
          <p v-else ><img class="img" :src="item.img" alt=""></p>
        </div>
      </div>
      <div class="close" @click="closeimg()">
        <img src="../assets/cc-close.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['detaillist'],
  data(){
    return{
      datalist:[]
    }
  },
  mounted(){
    this.datalist.push(JSON.parse(this.detaillist.ch))
    this.datalist.push(JSON.parse(this.detaillist.en))
  },
  methods:{
    closeimg(){
      this.$emit('closedetail')
    }
  }
}
</script>
<style lang="stylus" scoped>
.shadexbox
  width 100%;
  height 100%;
  position fixed;
  left 0;
  top 0;
  background rgba(0,0,0,0.8)
  display flex;
  justify-content center;
  align-items center;
  .content
    width 80%;
    padding 5%;
    height 80%;
    background white;
    display flex;
    justify-content space-between;
    position relative;
    .con
      width 45%;
      padding 10px;
      height 100%;
      overflow scroll;
      border 1px solid  #dddddd;
    .img
      width 100%;
    .close
      width 50px;
      height 50px;
      text-align center;  
      position absolute;
      right 20px;
      top 20px;
      cursor pointer;
      img
        width 26px;
        margin-top 7px;
</style>