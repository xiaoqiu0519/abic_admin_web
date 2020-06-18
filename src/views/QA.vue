<template>
    <div class="QA">
        <div class="topadd">
            <span>Q & A</span>
            <el-button type="primary" @click="clickadd()">Add</el-button>
        </div>
        <table class="contable" v-loading="loading">
            <thead>
                <tr style="height:30px">
                    <td width='10%'>Sort</td>
                    <td width='25%'>Questent</td>
                    <td width='35%'>Answer</td>
                    <td width='15%'>Operate</td>
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
        <el-dialog title="Modify the question" 
            v-loading="loading"
            :visible.sync="dialogFormVisible">
            <div class="dislogFormcon">
                <div class="chinese">
                    <div class="title">
                        Chinese
                    </div>
                    <div class="con">
                        <div class="Q">
                            <span>Q:</span>
                            <textarea name="" placeholder="Please enter Chinese title" v-model="questent_c"></textarea>
                        </div>
                        <div class="A">
                            <span>A:</span>
                            <textarea name="" placeholder="Please enter Chinese content"  v-model="answer_c" id=""></textarea>
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
                            <textarea name=""  placeholder="Please enter English title" v-model="questent_e" id=""></textarea>
                        </div>
                        <div class="A">
                            <span>A:</span>
                            <textarea name="" placeholder="Please enter English content" v-model="answer_e" id=""></textarea>
                        </div>
                    </div>
                </div>
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
            <span>Are you sure you want to delete this question?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="clicksure()">Submit</el-button>
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