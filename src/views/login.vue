<template>
  <div class="content">
    <div class="login">
      <el-form :label-position="labelPosition" label-width="120px" >
        <el-form-item label="username :">
          <el-input v-model="username" type='text' placeholder="please enter username"></el-input>
        </el-form-item>
        <el-form-item label="password :">
          <el-input v-model="password" type='password' placeholder="please enter password"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="login()" style="margin:20px 0 0 120px" type="primary">Sign in</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      labelPosition: 'left',
      username:"",
      password:''
    }
  },
  mounted(){
    let ScreenHeight = screen.availHeight
    document.getElementsByClassName('content')[0].style.height = ScreenHeight + 'px'
  },
  methods:{
    login(){
      this.$post('/user/login',{
        username:this.username,
        password:this.password
      }).then((res)=>{
        if(res.error === '0000'){
          this.$router.push('/1-1')
        }else{
          this.$message('username or password is error')
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.content{
  width 100%;
  height 100%;
  overflow hidden;
  background url('../assets/login_bg4.jpeg') no-repeat;
  background-size 100% auto;
  display flex;
  justify-content center;
  .login{
    margin-top 200px;
    color #000000;

  }
}
</style>
<style lang="stylus">
.login{
  .el-form-item__label{
    color #ffffff
    font-size 20px
  }
}  
</style>