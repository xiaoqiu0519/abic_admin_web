<template>
    <div class="Blacklist">
        <div class="topadd">
            <span>吐槽小站</span>
            <el-button type="primary" @click="clickadd()">新增</el-button>
        </div>
        <table class="contable" v-loading="loading">
            <thead>
                <tr style="height:30px">
                    <td width='8%'>序号</td>
                    <td width='12%'>标题</td>
                    <td width='25%'>内容</td>
                    <td width='25%'>图片</td>
                    <td width='15%'>状态</td>
                    <td width='15%'>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(list,index) in tablelength" :key="index">
                    <td>{{index+1}}</td>
                    <td>
                        <p class="noborder">{{tabledata[0][index].title}}</p>
                        <p>{{tabledata[1][index].title}}</p>
                    </td>
                    <td>
                        <p>{{tabledata[0][index].content}}</p>
                        <p>{{tabledata[1][index].content}}</p>
                    </td>
                    <td>
                        {{tabledata[0][index].status}}
                    </td>
                    <td v-if="tabledata[0][index].status == 0">
                        <el-button size="mini" type="primary" @click="changestatus(index,1)">发布</el-button>
                    </td>
                    <td v-else-if="tabledata[0][index].status == 1">
                        <el-button size="mini" type="success" disabled>已发布</el-button>
                        <el-button size="mini" type="warning" @click="changestatus(index,0)">关闭</el-button>
                    </td>
                    <td>
                        <el-button size="mini" type="primary" @click="edit(index)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deletebtn(index)">删除</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="nodata" v-if="!tablelength || tablelength.length ==0">
            暂无数据
        </div>
        <el-dialog title="编辑" 
            v-loading="loading"
            :visible.sync="dialogFormVisible">
            <div class="dislogFormcon">
                <div class="chinese">
                    <div class="title">
                        中文
                    </div>
                    <div class="con">
                        <div class="Q">
                            <span>标题:</span>
                            <textarea name="" v-model="black_title_c"></textarea>
                        </div>
                        <div class="A">
                            <span>内容:</span>
                            <textarea name=""  v-model="black_content_c" id=""></textarea>
                        </div>
                    </div>
                </div>
                <div class="english">
                    <div class="title">
                        English
                    </div>
                    <div class="con">
                        <div class="Q">
                            <span>标题:</span>
                            <textarea name=""  v-model="balck_title_e" id=""></textarea>
                        </div>
                        <div class="A">
                            <span>内容:</span>
                            <textarea name="" v-model="black_content_e" id=""></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialogFooter">
                <span>图片：</span>
                <div class="imgArr">
                    <div class="imglist" v-for="(list,index) in 5" :key="index"></div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="clickbtn()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            v-loading="loading"
            title="确认删除？"
            :visible.sync="dialogVisible" width="30%">
            <span>确定删除此条内容么？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="clicksure()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            editid:'',
            dialogFormVisible:false,
            dialogVisible:false,
            loading:true,
            tablelength:0,
            tabledata:[],
            black_title_c:'',
            balck_title_e:'',
            black_content_c:'',
            black_content_e:'',
        }
    },
    mounted(){
        this.getlist()
    },
    methods:{
        getlist(){
            this.$post('/black/getlist').then((res)=>{
                if(res.error == '0000'){
                    this.loading = false;
                    this.tabledata = res.data;
                    this.tablelength = res.data[0].length;
                }
            })
        },
        changestatus(index,state){
            if(!this.tabledata[0][index].title || !this.tabledata[0][index].content || !this.tabledata[1][index].title || !this.tabledata[1][index].content){
                this.$message('请填写完整内容')
                return;
            }
            this.loading = true;
            this.$post('/black/udatestatus',{
                id:this.tabledata[0][index].id,
                status:state
            }).then((res)=>{
                if(res.error == '0000'){
                    this.getlist()
                }
            })
        },
        clickadd(){
            this.dialogFormVisible = true;
            this.editid = '';
            this.black_title_c = '';
            this.black_content_c = '';
            this.balck_title_e = '';
            this.black_content_e = '';
        },
        edit(index){
            this.editid = this.tabledata[0][index].id;
            this.dialogFormVisible = true;
            this.black_title_c = this.tabledata[0][index].title;
            this.black_content_c = this.tabledata[0][index].content;
            this.balck_title_e = this.tabledata[1][index].title;
            this.black_content_e = this.tabledata[1][index].content;
        },
        clickbtn(){
            this.loading = true;
            this.$post('/black/updatecon',{
                id:this.editid,
                title_c:this.black_title_c,
                content_c:this.black_content_c,
                title_e:this.balck_title_e,
                content_e:this.black_content_e
            }).then((res)=>{
                this.loading = false
                if(res.error == '0000'){
                    this.dialogFormVisible = false;
                    this.getlist();
                }else{
                    this.$message(res.mes)
                }
                
            })
        },
        deletebtn(index){
            this.editid = this.tabledata[0][index].id;
            this.dialogVisible = true
        },
        clicksure() {
            this.loading = true;
            this.$post('/black/deleteblack',{
                id:this.editid
            }).then((res)=>{
                this.loading = false;
                if(res.error == '0000'){
                    this.dialogVisible = false;
                    this.getlist();
                }else{
                    this.$message(res.mes)
                } 
            })
        },
    }
}
</script>
<style lang="stylus" scoped>
.dialogFooter
    margin 0 auto;
    display flex;
    span 
        width 50px;
    .imgArr
        flex 1;
        height 80px;   
        display flex;
        align-items center;
        .imglist
            width 80px;
            height 80px;
            background red;    
            margin-right 5px;
</style>