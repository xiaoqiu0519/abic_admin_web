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
                            <span>房产管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">房产管理</el-menu-item>
                            <!--
                            <el-menu-item index="1-2">房产租赁</el-menu-item>
                            <el-menu-item index="1-3">特价房源</el-menu-item>
                            -->
                        </el-menu-item-group>
                    </el-submenu>
                    <!--
                    <el-submenu index="2">
                        <template slot="title">
                            <span>授权管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">房屋出售</el-menu-item>
                            <el-menu-item index="2-2">房屋租赁</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    -->
                    <el-submenu index="3">
                        <template slot="title">
                            <span>咨询管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">常见问题</el-menu-item>
                            <el-menu-item index="3-2">房产资讯</el-menu-item>
                            <el-menu-item index="3-3">菲常见闻</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <span>吐槽管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">吐槽小站</el-menu-item>
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