<template>
    <div class="nav">
        <el-row class="tac">
            <el-col>
                <el-menu
                    :default-active="defaultactiveindex"
                    :unique-opened="true"
                    :router='true'
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <span>Realty</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">Realty</el-menu-item>                         
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <span>News</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">Q & A</el-menu-item>
                            <el-menu-item index="3-2">Property</el-menu-item>
                            <el-menu-item index="3-3">Entertainment</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <span>Tips</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">Tips</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>    
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            defaultactiveindex:'1'
        }
    },
    mounted(){

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath,this.defaultactiveindex);

      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style lang="stylus" scoped>
.nav
    font-size 20px;
</style>
<style lang="stylus">
.nav
    .el-submenu__title
        font-size 20px;
    .el-submenu .el-menu-item
        min-width 0;
        font-size 16px;
</style>