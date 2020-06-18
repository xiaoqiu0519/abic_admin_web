<template>
  <div class="home">
    <div class="loganbg">
      <div class="logan">
        <img class="logo" src="../assets/logo.png" alt="">
        <span>诚信所以简单 专业所以放心</span>
      </div>
    </div>
    <div class="admin_con">
      <div class="nav">
        <navcom></navcom>
      </div>
      <div class="con">
        <router-view/>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import navcom from '@/components/navcom';
export default {
  name: 'Home',
  components: {
   navcom
  }
}
</script>
<style lang="stylus" scoped>
.home
  height 100%;
  .loganbg
    width 100%;
    height 100px;
    background #ffa54f;
    .logan
      width 100%;
      margin 0 auto;
      height 100px;
      line-height 100px;
      .logo
        height 50px;
        margin-top 25px;
      span
        position relative;
        top -20px;
        font-size 20px; 
        margin-left 50px;
  .admin_con
    width 98%;
    margin 0 auto;
    display flex;
    justify-content space-between;
    .nav
      width 160px;
      height 100%;
      float left;
    .con
      width 98%;
      background white;  
      float left;
      margin-left 2%;
      padding-bottom 50px;
</style>
