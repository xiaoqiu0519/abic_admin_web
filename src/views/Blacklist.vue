<template>
    <div class="Blacklist">
        <div class="topadd">
            <span>Tips</span>
            <el-button type="primary" @click="clickadd()">Add</el-button>
        </div>
        <table class="contable" v-loading="loading">
            <thead>
                <tr style="height:30px">
                    <td width='8%'>Sort</td>
                    <td width='12%'>Title</td>
                    <td width='25%'>Content</td>
                    <td width='25%'>Picture</td>
                    <td width='15%'>Status</td>
                    <td width='15%'>top</td>
                    <td width='15%'>Operate</td>
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
                    <td v-if="tabledata && tabledata.length != 0">
                        <div class="imgsArr" >
                            <img v-for="(item,index) in JSON.parse(tabledata[0][index].imgs)" :key="index" :src="item" alt="" srcset="">
                        </div>
                    </td>
                    <td v-if="tabledata[0][index].status == 0">
                        <el-button size="mini" type="primary" @click="changestatus(index,1)">Open</el-button>
                    </td>
                    <td v-else-if="tabledata[0][index].status == 1">
                        <el-button size="mini" type="success" disabled>已发布</el-button>
                        <el-button size="mini" type="warning" @click="changestatus(index,0)">Closed</el-button>
                    </td>
                    <td>
                        <el-switch @change="changetop(index)" v-model="tabledata[0][index].top" active-color="#409EFF" inactive-color="#909399" active-value="1" inactive-value="0"></el-switch>
                    </td>
                    <td>
                        <el-button size="mini" type="primary" @click="edit(index)">Edit</el-button>
                        <el-button size="mini" type="danger" @click="deletebtn(index)">Delete</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="nodata" v-if="!tablelength || tablelength.length ==0">
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
        <el-dialog title="Edit" 
            v-loading="loading"
            :visible.sync="dialogFormVisible">
            <div class="dislogFormcon">
                <div class="chinese">
                    <div class="title">
                        Chinese
                    </div>
                    <div class="con">
                        <div class="Q">
                            <span>Title:</span>
                            <textarea name="" placeholder="Please enter Chinese Title"  v-model="black_title_c"></textarea>
                        </div>
                        <div class="A">
                            <span>Content:</span>
                            <textarea name="" placeholder="Please enter Chinese content" v-model="black_content_c" id=""></textarea>
                        </div>
                    </div>
                </div>
                <div class="english">
                    <div class="title">
                        English
                    </div>
                    <div class="con">
                        <div class="Q">
                            <span>Title:</span>
                            <textarea name="" placeholder="Please enter English Title" v-model="balck_title_e" id=""></textarea>
                        </div>
                        <div class="A">
                            <span>Content:</span>
                            <textarea name="" placeholder="Please enter English content" v-model="black_content_e" id=""></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialogFooter">
                <span>Picture：</span>
                <UpFile @senddata='getMsgForm' ref="ConFile"></UpFile>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="clickbtn()">Submit</el-button>
            </div>
        </el-dialog>
        <el-dialog
            v-loading="loading"
            title="confirm deletion?"
            :visible.sync="dialogVisible" width="30%">
            <span>Are you sure you want to delete this content?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="clicksure()">Submit</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import UpFile from '../components/upfile'
export default {
    data(){
        return{
            pageNum:1,
            currentpage:1,
            pageSize:10,
            totalnum:10,
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
            ddd:[],
            formData:''
        }
    },
    components:{
        UpFile
    },
    mounted(){
        this.getlist()
    },
    methods:{
        handleSizeChange(val) {
            this.pageNum = val;
            this.getlist();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getlist();
        },
        getlist(){
            this.$post('/black/getlist',{
                pageSize:this.pageSize,
                pageNum:this.pageNum
            }).then((res)=>{
                if(res.error == '0000'){
                    this.loading = false;
                    this.tabledata = res.data;
                    this.totalnum = res.total;
                    this.tablelength = res.data[0].length;
                }
            })
        },
        changetop(index){
            this.loading = true;
            this.$post('/black/udatetop',{
                id:this.tabledata[0][index].id,
                top:this.tabledata[0][index].top
            }).then((res)=>{
                if(res.error == '0000'){
                    this.getlist()
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
        getMsgForm(data){
            this.formData = data
        },
        clickadd(){
            this.dialogFormVisible = true;
            this.editid = '';
            this.black_title_c = '';
            this.black_content_c = '';
            this.balck_title_e = '';
            this.black_content_e = '';
            this.formData = '';
            setTimeout(()=>{
                this.$refs.ConFile.clearImg()
            })
        },
        edit(index){
            this.editid = this.tabledata[0][index].id;
            this.dialogFormVisible = true;
            this.black_title_c = this.tabledata[0][index].title;
            this.black_content_c = this.tabledata[0][index].content;
            this.balck_title_e = this.tabledata[1][index].title;
            this.black_content_e = this.tabledata[1][index].content;
            this.formData = new FormData();
            setTimeout(()=>{
                this.$refs.ConFile.clearImg(this.tabledata[0][index].imgs)
            })
        },
        clickbtn(){
            if(!this.formData){
                this.$message('请填写完整内容')
                return;
            }
            this.formData.append('id',this.editid);
            this.formData.append('title_c',this.black_title_c);
            this.formData.append('content_c',this.black_content_c);
            this.formData.append('title_e',this.balck_title_e);
            this.formData.append('content_e',this.black_content_e);
            this.loading = true;
            this.$post('/black/updatecon',this.formData).then((res)=>{
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
        width 80px;
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