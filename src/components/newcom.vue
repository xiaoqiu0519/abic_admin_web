<template>
    <div class="newcon">
        <div class="topadd">
            <span>{{title}}</span>
            <el-button type="primary" @click="clickadd()">新增</el-button>
        </div>
        <div class="listcon">
            <table class="contable" v-loading="loading">
                <thead>
                    <tr style="height:30px">
                        <td width='10%'>序号</td>
                        <td width='60%'>答案</td>
                        <td width='30%'>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list,index) in 9" :key="index">
                        <td>{{index+1}}</td>
                        <td>
                            <p class="noborder">撒旦发生</p>
                            <p>打法师打</p>
                        </td>
                        <td>
                            <el-button size="mini" type="primary" @click="edit(index)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="deletebtn(index)">删除</el-button>
                            <el-button size="mini" type="primary" @click="uodatestatus(index)">发布</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--
            <div class="nodata" v-if="!tablelength || tablelength.length ==0">
                暂无数据
            </div>
            -->
        </div>
        <el-dialog 
            width="90%"
            :visible="dialogVisible">
            <div class="addbtn"> 
                <el-button size="mini" type="primary" @click="addcon(2)">添加图片</el-button>
                <el-button size="mini" type="primary" @click="addcon(1)">添加内容</el-button>
            </div>
            <div class="diacontent">
                <div class="title">
                    <span>标题 :</span>
                    <el-input class="titlecon" v-model="title_c" placeholder="请输入内容"></el-input>
                    <el-input class="titlecon" v-model="input_e" placeholder="请输入内容"></el-input>
                </div>
                <div v-for="(list,index) in content" :key="index">
                    <div class="list imglist" v-if="list.type == 2">
                        <input class="filebtn" type="file">
                        <div class="addimgbtn">
                            <img src="../assets/tianjia.png" alt="" srcset="">
                            <br>
                            <span>选择图片</span>
                        </div>
                        <div class="imgArr" >
                            <img src="../assets/下载 (1).jpg" alt="" srcset="">
                        </div>
                    </div>
                    <div class="list textlist" v-else>   
                        <el-input class="conlist" type="textarea" :rows="2" placeholder="请输入中文内容" v-model="list.con_c"></el-input>
                        <el-input class="conlist" type="textarea" :rows="2" placeholder="请输入英文内容" v-model="list.con_e"></el-input>    
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="clicksure()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
//import UpFile from '../components/upfile'
export default {
    props:['title'],
    data(){
        return{
            loading:false,
            dialogVisible:true,
            title_c:'',
            input_e:'',
            content:[
                
            ]
        }
    },
    components:{
        //UpFile
    },
    methods:{
        clickadd(){

        },
        edit(){

        },
        deletebtn(){

        },
        uodatestatus(){

        },
        clicksure(){
            console.log(this.content)
        },
        addcon(type){
            let numId = this.content.length + 1
            if(type == 1){
                this.content.push({
                    num:numId,
                    type:1,
                    con_c:'',
                    con_e:''
                })
            }else{
                this.content.push({
                    num:numId,
                    type:2,
                    img:''
                })
            }
            setTimeout(()=>{
                var ele = document.getElementsByClassName('diacontent')[0];
                ele.scrollTop = ele.scrollHeight;
            },10)
        }

    }
}
</script>
<style lang="stylus" scoped>
.newcon{
    width 100%;
    .listcon{
        margin-top 20px;
        .list{
            width 80%;
            margin 0 auto;
            line-height 36px;
            display flex;
            justify-content space-between;
            .edit{
                width 250px;
            }
        }
    }
    .addbtn{
        width 100%;
        line-height 30px;
        padding-bottom 20px;
    }
    .diacontent{
        height 320px;
        padding 0 20px;
        overflow auto;
        .title{
            width 100%;
            display flex;
            span{
                width 100px;
                display inline-block;
                line-height 40px;
                font-size 20px;
            }
            .titlecon{
                width 30%;
                margin-right 30px;
            }
               
        }
        .list{
            margin-top 20px !important;
        }
        .textlist{
            margin 0 auto;
            display flex;
            justify-content space-between;
            .conlist{
                width 48%;
            }
        }
        .imglist{
            display flex;
            border 1px solid #C0C4CC;
            justify-content space-between;
            position relative;
            .filebtn{
                width 120px;
                height 100px;
                opacity 0;
                position absolute;
                left 0;
                top 0;
            }
            .addimgbtn{
                width 100px;
                height 100px;
                text-align center;
                border-right 1px solid #C0C4CC;
                img{
                    width 32px;
                    margin-top 20px;
                }  
            }
            .imgArr{
                width 100%;
                margin-left 20px;
                height 100px;
                img{
                    height 90px;
                    margin-top 5px;
                }
                   
            }    
        }
    }
}
</style>
<style lang="stylus">
.newcon{
    .el-dialog__body{
       height: 400px;
    } 
    .el-dialog{
        margin-top 5vh !important 
    }
}
   
</style>