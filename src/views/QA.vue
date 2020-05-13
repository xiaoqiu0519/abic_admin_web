<template>
    <div class="QA">
        <div class="topadd">
            <span>常见问题</span>
            <el-button type="primary" @click="clickadd()">添加问题</el-button>
        </div>
        <table class="contable" v-loading="loading">
            <thead>
                <tr style="height:30px">
                    <td width='10%'>序号</td>
                    <td width='25%'>问题</td>
                    <td width='35%'>答案</td>
                    <td width='15%'>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(list,index) in tablelength" :key="index">
                    <td>{{index+1}}</td>
                    <td>
                        <p class="noborder">{{tabledata[0][index].questent}}</p>
                        <p>{{tabledata[1][index].questent}}</p>
                    </td>
                    <td>
                        <p>{{tabledata[0][index].answer}}</p>
                        <p>{{tabledata[1][index].answer}}</p>
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
        <el-pagination style="margin-top:30px;text-align:right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page.sync='currentpage'
            layout="total,prev, pager, next"
            :total="totalnum">
        </el-pagination>
        <el-dialog title="修改问题" 
            v-loading="loading"
            :visible.sync="dialogFormVisible">
            <div class="dislogFormcon">
                <div class="chinese">
                    <div class="title">
                        中文
                    </div>
                    <div class="con">
                        <div class="Q">
                            <span>Q:</span>
                            <textarea name="" v-model="questent_c"></textarea>
                        </div>
                        <div class="A">
                            <span>A:</span>
                            <textarea name=""  v-model="answer_c" id=""></textarea>
                        </div>
                    </div>
                </div>
                <div class="english">
                    <div class="title">
                        English
                    </div>
                    <div class="con">
                        <div class="Q">
                            <span>Q:</span>
                            <textarea name=""  v-model="questent_e" id=""></textarea>
                        </div>
                        <div class="A">
                            <span>A:</span>
                            <textarea name="" v-model="answer_e" id=""></textarea>
                        </div>
                    </div>
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
            <span>确定删除此条问题么？</span>
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
            pageNum:1,
            currentpage:1,
            pageSize:10,
            totalnum:10,
            dialogFormVisible:false,
            dialogVisible:false,
            editid:'',
            tabledata:[],
            tablelength:0,
            questent_c:'',
            answer_c:'',
            loading:true,
            questent_e:'',
            answer_e:''
        }
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
            this.$post('/questent/getlist',{
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
        edit(index){
            this.editid = this.tabledata[0][index].id;
            this.dialogFormVisible = true;
            this.questent_c = this.tabledata[0][index].questent;
            this.answer_c = this.tabledata[0][index].answer;
            this.questent_e = this.tabledata[1][index].questent;
            this.answer_e = this.tabledata[1][index].answer;
        },
        clickbtn(){
            this.loading = true;
            this.$post('/questent/addquestent',{
                id:this.editid,
                questent_c:this.questent_c,
                answer_c:this.answer_c,
                questent_e:this.questent_e,
                answer_e:this.answer_e
            }).then(()=>{
                this.dialogFormVisible = false;
                this.loading = false
                this.getlist();
            })
            
        },
        deletebtn(index){
            this.editid = this.tabledata[0][index].id;
            this.dialogVisible = true
        },
        clicksure() {
            this.loading = true;
            this.$post('/questent/deletequestent',{
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
        clickadd(){
            this.editid = '';
            this.dialogFormVisible = true;
            this.questent_c = '';
            this.answer_c = '';
            this.questent_e = '';
            this.answer_e = '';
        }
    }
}
</script>
<style lang="stylus" scoped>
          
</style>
<style lang="stylus">
  
</style>