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
                    <tr v-for="(list,index) in listdata[0]" :key="index">
                        <td>{{index+1}}</td>
                        <td>
                            <p class="noborder">{{list.title}}</p>
                            <p>{{listdata[1][index].title}}</p>
                        </td>
                        <td>
                            <el-button size="mini" type="primary" @click="godetail(index)">查看</el-button>
                            <el-button size="mini" type="danger" @click="deletebtn(index)">删除</el-button>
                            <el-button size="mini" type="primary" v-if="list.status == 0" @click="uodatestatus(list,1)">发布</el-button>
                            <el-button size="mini" type="warning" v-else @click="uodatestatus(list,0)">关闭</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
           
            <div class="nodata" v-if="!listdata[0] || listdata[0].length ==0">
                暂无数据
            </div>
            <el-pagination style="margin-top:30px;text-align:right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page.sync='currentpage'
                layout="total,prev, pager, next"
                :total="totalnum">
            </el-pagination>
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
                    <el-input class="titlecon" v-model="titlecon.title_c" placeholder="请输入内容"></el-input>
                    <el-input class="titlecon" v-model="titlecon.title_e" placeholder="请输入内容"></el-input>
                </div>
                <div v-for="(list,index) in content" :key="index">
                    <div class="list imglist" v-if="list.type == 2">
                        <input class="filebtn" type="file" @change="changeFile(index)" :ref="'file'+index" accept=".jpg, .jpeg, .png"/> 
                        <div class="addimgbtn">
                            <img src="../assets/tianjia.png" alt="" srcset="">
                            <br>
                            <span>选择图片</span>
                        </div>
                        <div class="imgArr" >
                            <img :src="list.img" alt="" srcset="">
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
export default {
    props:['title'],
    data(){
        return{
            formData:new FormData(),
            loading:false,
            pageNum:1,
            currentpage:1,
            pageSize:10,
            totalnum:10,
            dialogVisible:false,
            titlecon:{
                title_c:'',
                title_e:'',
            },
            listdata:[],
            content:[],
        }
    },
    components:{
        //UpFile
    },
    mounted(){
        this.getlist()
    },
    methods:{
        getlist(){
            this.$post('/advisory/list',this.formData).then((res)=>{
                if(res.error == '0000'){
                    this.listdata = res.data
                    this.totalnum = res.total
                }
            })
        },
        clickadd(){
            this.dialogVisible = true
            this.formData = new FormData()
        },
        godetail(){

        },
        deletebtn(){

        },
        uodatestatus(list,status){
            this.$post('/advisory/updatestatus',{
                id:list.id,
                status:status
            }).then((res)=>{
                if(res.error == '0000'){
                    this.getlist();
                }
            })
        },
        handleSizeChange(val) {
            this.pageNum = val;
            this.getlist();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getlist();
        },
        clicksure(){
            this.formData.append('title',JSON.stringify(this.titlecon))
            this.formData.append('content',JSON.stringify(this.content))
            this.$post('/advisory/addadvisory',this.formData).then((res)=>{
                if(res.error == '0000'){
                    this.dialogVisible = false
                    this.getlist()
                }
            })
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
        },
        changeFile(index){
            let file = this.$refs['file'+ index ][0]
            this.content[index].img = URL.createObjectURL(file.files[0])
            this.formData.append('images'+ this.content[index].num ,file.files[0] )
        },

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