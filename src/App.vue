<template>
  <div id="app">
    <router-view/>
    <div class="shadebox" v-if="getloading" v-loading="getloading"></div>
    <div class="errortip" v-if="getshowerror">
        <ErrorCom></ErrorCom>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ErrorCom from './components/errortip';
export default {
    computed:{
        ...mapGetters(['getloading','getshowerror'])
    },
    components:{
        ErrorCom
    }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  font-size 14px;
  .nodata
    width 100%;
    margin 0 auto;
    height 100px;
    text-align center;
    line-height 100px;
  .topadd
      width 100%;
      height 50px;
      display flex;
      justify-content space-between;
      align-items center;
      font-size 16px;
  .contable
      width 1050px;
      border-collapse:collapse;
      font-size 12px;
      thead
          background #ecf5ff;
      tr
          width 1050px; 
          line-height 30px;
          td
              position relative;
              border-collapse:collapse;
              text-align center;
              border 1px solid #cccccc;
              &>p:nth-child(1)
                  border-top none;
              p
                  width 90%;
                  padding 0 5%;
                  height 30px;
                  overflow hidden;
                  border-top 1px solid #eeeeee;
            .imgsArr
                width 100%;
                display flex;
                align-items center;
                justify-content space-around;
                img 
                    height 30px;         
  .dislogFormcon
      width 100%;
      display flex;
      justify-content space-between;
      &>div
          flex 1;
          margin 0 10px;
          .title
              width 100%;
              text-align center;
              line-height 30px;
          .con
              &>div
                  width 100%;
                  height 50px;
                  display flex;
                  justify-content space-between;
                  margin-bottom 20px;
                  textarea
                      width 100%;
                      resize:none;
                      outline none;
                  span
                    width 50px;    
              .A
                  height 100px;        
  .el-dialog__body
      padding 10px !important;
  .el-dialog__header
      border-bottom 1px solid #eeeeee; 
  .shadebox
    width 100%;
    height 100%;
    position fixed;  
    left 0;
    top 0;
    z-index 20000;
  .errortip
    width 100%;
    height 100%;
    position fixed;
    left 0;  
    top 0;
    z-index 20000000;
input::-webkit-input-placeholder{
    color:#cccccc;
    font-size 12px;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#cccccc;
    font-size 12px;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#cccccc;
    font-size 12px;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color:#cccccc;
    font-size 12px;
}                             
</style>
