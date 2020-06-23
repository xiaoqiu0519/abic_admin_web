<template>
    <div class="newcon">
        <div class="topadd">
            <span>{{title}}</span>
            <el-button type="primary" @click="clickadd()">Add</el-button>
        </div>
        <div class="listcon">
            <table class="contable" v-loading="loading">
                <thead>
                    <tr style="height:30px">
                        <td width='10%'>Sort</td>
                        <td width='60%'>Title</td>
                        <td width='30%'>Operate</td>
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
                            <el-button size="mini" type="primary" @click="godetail(index)">View</el-button>
                            <el-button size="mini" type="danger" @click="deletesure(list)">Detele</el-button>
                            <el-button size="mini" type="primary" v-if="list.status == 0" @click="uodatestatus(list,1)">Open</el-button>
                            <el-button size="mini" type="warning" v-else @click="uodatestatus(list,0)">Closed</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="nodata" v-if="!listdata[0] || listdata[0].length ==0">
                No Data
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
            class="dddd"
            width="90%"
            :visible="dialogVisible">
            <div class="addbtn"> 
                <el-button size="mini" type="primary" @click="addcon(2)">Add Picture</el-button>
                <el-button size="mini" type="primary" @click="addcon(1)">Add Content</el-button>
            </div>
            <div class="diacontent">
                <div class="title">
                    <span>Title :</span>
                    <el-input class="titlecon" v-model="titlecon.title_c" placeholder="Please enter content"></el-input>
                    <el-input class="titlecon" v-model="titlecon.title_e" placeholder="Please enter content"></el-input>
                </div>
                <div v-for="(list,index) in content" :key="index">
                    <div class="list imglist" v-if="list.type == 2">
                        <input class="filebtn" type="file" @change="changeFile(index)" :ref="'file'+index" accept=".jpg, .jpeg, .png"/> 
                        <div class="addimgbtn">
                            <img src="../assets/tianjia.png" alt="" srcset="">
                            <br>
                            <span>Upload picture</span>
                        </div>
                        <div class="imgArr" >
                            <img :src="list.img" alt="" srcset="">
                        </div>
                    </div>
                    <div class="list textlist" v-else>   
                        <el-input class="conlist" type="textarea" :rows="2" placeholder="Please enter Chinese content" v-model="list.con_c"></el-input>
                        <el-input class="conlist" type="textarea" :rows="2" placeholder="Please enter English content" v-model="list.con_e"></el-input>    
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="clicksure()">Submit</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="确认删除？"
            :visible.sync="dialogVisiblesure" width="30%">
            <span>确定删除此条内容么？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisiblesure = false">取 消</el-button>
                <el-button type="primary" @click="deletebtn()">确 定</el-button>
            </span>
        </el-dialog>
        <newdetail :detaillist="detaillist" @closedetail='closedetail' v-if="showdetail"></newdetail>
    </div>
</template>
<script>
import newdetail from './newdetail'
export default {
    props:['title','newtype'],
    data(){
        return{
            formData:new FormData(),
            loading:false,
            pageNum:1,
            currentpage:1,
            pageSize:10,
            totalnum:10,
            dialogVisiblesure:false,
            dialogVisible:false,
            titlecon:{
                title_c:'',
                title_e:'',
            },
            listdata:[],
            content:[],
            showdetail:false,
            detaillist:''

        }
    },
    components:{
        newdetail
    },
    mounted(){
        this.loadingflag(true)
        this.getlist()
    },
    methods:{
        getlist(){
            this.$post('/advisory/list',{
                params:JSON.stringify({
                    type:this.newtype
                }),
            }).then((res)=>{
                this.loadingflag(false)
                if(res.error == '0000'){
                    this.listdata = res.data
                    this.totalnum = res.total
                }
            })
        },
        closedetail(){
            this.showdetail = false;
            this.detaillist = {
                ch:'',
                en:''
            }
        },
        clickadd(){
            this.dialogVisible = true
            this.content = []
            this.titlecon = {
                title_c:'',
                title_e:''
            }
            this.formData = new FormData()
        },
        godetail(index){
            this.detaillist = {
                ch:this.listdata[0][index].content,
                en:this.listdata[1][index].content
            }
            this.showdetail = true
        },
        deletesure(list){
            this.deleteid = list.id
            this.dialogVisiblesure = true
        },
        deletebtn(){
            this.loadingflag(true)
            this.$post('/advisory/deleteadvisory',{
                id:this.deleteid,
            }).then((res)=>{
                if(res.error == '0000'){
                    this.dialogVisiblesure = false
                    this.getlist();
                }
            })
        },
        uodatestatus(list,status){
            this.loadingflag(true)
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
            this.formData.append('type',this.newtype)
            this.loadingflag(true)
            this.$post('/advisory/addadvisory',this.formData).then((res)=>{
                if(res.error == '0000'){
                    this.dialogVisible = false
                    this.getlist()
                }
            })
        },
        addcon(type){
            let length = this.content.length
            if(type == 1){
                this.content.push({
                    num:length + 1,
                    type:1,
                    con_c:'',
                    con_e:''
                })
            }else{
                this.content.push({
                    num:length + 1,
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
                width 120px;
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
    .dddd{
        .el-dialog__body{
            height: 600px;
        } 
        .el-dialog{
            margin-top 5vh !important 
        }
    }
    .textlist{
        .el-textarea__inner{
            height 100px;
        }
    }
}
   
</style>