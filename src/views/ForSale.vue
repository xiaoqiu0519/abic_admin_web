<template>
    <div class="ForSale">
        <div class="mestip" @click="getnewmessage(1)" v-if="messagenum != 0">
           <img src="../assets/message1.png" alt="" srcset=""> 您有 <span style="font-size:20px">{{messagenum}}</span> 条新的消息待处理
        </div>  
        <div class="topadd">
            <span>房产管理</span>
            <el-button type="primary" @click="clickadd()">添加房源</el-button>
        </div>
        <div class="search">
            <div class="searchlist">
                <span>城市 : </span>
                <el-cascader class="inputsearch"
                    :options="citylist"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </div>
            <div class='searchlist'>
                <span>类型 : </span>
                <el-select class="inputsearch" v-model="searchparams.type" placeholder="请选择">
                    <el-option
                    v-for="item in housetypeselect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='searchlist'>
                <span>用途 : </span>
                <el-select class="inputsearch" v-model="searchparams.used" placeholder="请选择">
                    <el-option
                    v-for="item in houseusedselect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='searchlist'>
                <span>状态 : </span>
                <el-select class="inputsearch" v-model="searchparams.status" placeholder="请选择">
                    <el-option
                    v-for="item in housestatusselect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='searchlist'>
                <span>价格 : </span>
                <el-select class="inputsearch" v-model="dataprice" @change="choiceprice($event)" placeholder="请选择">
                    <el-option
                    v-for="item in housepriceselect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='searchbtn'>
                <el-button @click="clicksearchbtn()" type="primary" size="mini" icon="el-icon-search">搜索</el-button>
            </div>
        </div>
        <table class="ForSaletable">
            <thead>
                <tr style="height:30px">
                    <td>序号</td>
                    <td width='10%'>楼盘名称</td>
                    <td width='10%'>楼盘位置</td>
                    <td>用途</td>
                    <td width='5%'>单元号&门牌号</td>
                    <td>户型/朝向</td>
                    <td>面积</td>
                    <td>阳台</td>
                    <td>车位</td>
                    <td>价格</td>
                    <td>付款方式</td>
                    <td width='10%'>家具</td>
                    <td width='8%'>备注</td>
                    <td width='10%'>房源介绍</td>
                    <td width='7%'>类型</td>
                    <td width='7%'>状态</td>
                    <td width='7%'>操作</td>
                </tr>
            </thead>
            <tbody v-if="datalength && datalength.length !=0">
                <tr v-for="(list,index) in datalength"  :key="index">
                    <td>{{index+1}}</td>
                    <td>
                        <p>{{tabledata[0][index].title}}</p>
                        <p>{{tabledata[1][index].title}}</p>
                    </td>
                    <td>
                        <p>{{citytran[0][tabledata[0][index].city]}}</p>
                        <p>{{citytran[1][tabledata[1][index].city]}}</p>
                    </td>
                    <td><p>{{housetypeArr[tabledata[0][index].used]}}</p></td>
                    <td><p>{{tabledata[0][index].tower}}</p></td>
                    <td><p>{{layoutArr[tabledata[0][index].layout]}}/{{facetoArr[tabledata[0][index].faceto]}}</p></td>
                    <td>{{tabledata[0][index].size}}㎡</td>
                    <td>{{tabledata[0][index].balcony == 1 ? '有' : "无"}}</td>
                    <td>{{tabledata[0][index].parking == 1 ? '有' : "无"}}</td>
                    <td>{{tabledata[0][index].sellingprice}} Peso</td>
                    <td>
                        <!-- type:1 出售，type：2 租赁 -->
                        {{ paymentleaseArr[tabledata[0][index].payment] }}
                    </td>
                    <td v-if="tabledata[0][index].furniture">
                        <span v-for="(list,index) in JSON.parse(tabledata[0][index].furniture)" :key="index">
                            {{furnitureArr[list]}}、
                        </span> 
                    </td>
                    <td>
                        <p>{{tabledata[0][index].notes}}</p>
                        <p>{{tabledata[1][index].notes}}</p>
                    </td>
                    <td>
                        <p>{{tabledata[0][index].introduction}}</p>
                        <p>{{tabledata[1][index].introduction}}</p>
                    </td>
                    <td class="flex">
                        <el-button size="mini" @click="updatehouse(index,1,'type')" :type="tabledata[0][index].type == 1 ? 'primary' : 'info'">出售</el-button>
                        <el-button size="mini" @click="updatehouse(index,2,'type')" :type="tabledata[0][index].type == 2 ? 'primary' : 'info'">租赁</el-button>
                        <el-button size="mini" @click="updatehouse(index,3,'type')" :type="tabledata[0][index].type == 3 ? 'primary' : 'info'">特价</el-button>
                    </td>
                    <td class="flex" v-if="tabledata[0][index].status == 0">
                        <el-button size="mini" type="primary" @click="updatehouse(index,1,'status')">发布</el-button>
                        <el-button size="mini" type="primary" @click="updatehouse(index,2,'status')">稍后</el-button>
                    </td>
                    <td class="flex" v-else-if="tabledata[0][index].status == 1">
                        <el-button size="mini" type="success" disabled>已发布</el-button>
                        <el-button size="mini" type="warning" @click="updatehouse(index,0,'status')">关闭</el-button>
                    </td>
                    <td class="flex" v-else-if="tabledata[0][index].status == 2">
                        <el-button size="mini" type="warning" @click="updatehouse(index,0,'status')">打开</el-button>
                    </td>
                    <td class="flex">
                        <el-button size="mini" type="primary" @click="edit(index)">编辑</el-button>
                        <el-button size="mini" type="danger" @click='deletefun(index)'>删除</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="nodata" v-if="!datalength || datalength.length ==0">
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
        <el-dialog title="编辑房源" 
            width="90%"
            :visible="dialogFormVisible">
            <div class="dislogFormcon">
                <div class="chinese">
                    <div class="dislogcon">
                        <div class="inputDiv">
                            <span>客户姓名:</span>
                            <input type="text" v-model="username">
                        </div>
                        <div class="inputDiv">
                            <span>客户手机号:</span>
                            <input type="text" v-model="telphone">
                        </div>
                        <div class="inputDiv">
                            <span>客户邮箱:</span>
                            <input type="text" v-model="email">
                        </div>
                        <div class="cominput">
                            <span>楼盘名称:</span>
                            <div class="inputArr">
                                <p>
                                    <span>中:</span>
                                    <input type="text" v-model="housename.name_c" placeholder="请输入楼盘名称(描述title)">
                                </p>
                                <p>
                                    <span>英:</span>
                                    <input type="text" v-model="housename.name_e" placeholder="请输入楼盘名称(描述title)">
                                </p>
                            </div>
                        </div>
                        <div class="cominput">
                            <span>城市:</span>
                            <el-cascader class="inputsearch" 
                                :options="selectcitylist"
                                v-model="cityvalue"
                                @change="handleChangecity">
                            </el-cascader>
                        </div>
                        <div class="inputDiv">
                            <span>用途:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="used" value="1" :checked='used == 1' name="used">公寓
                                <input type="radio" v-model="used" value="2" :checked='used == 2' name="used">旺铺
                                <input type="radio" v-model="used" value="3" :checked='used == 3' name="used">办公室
                                <input type="radio" v-model="used" value="4" :checked='used == 4' name="used">土地
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>单元/门牌号:</span>
                            <input type="text" v-model="housetower" placeholder="请输入单元号/门牌号">
                        </div>
                        <div class="inputDiv">
                            <span>户型:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="layout" value="1"  :checked='layout == 1' name="layout">studio
                                <input type="radio" v-model="layout" value="2"  :checked='layout == 2' name="layout">1BR
                                <input type="radio" v-model="layout" value="3"  :checked='layout == 3' name="layout">2BR
                                <input type="radio" v-model="layout" value="4"  :checked='layout == 4' name="layout">3BR
                                <input type="radio" v-model="layout" value="5"  :checked='layout == 5' name="layout">others
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>朝向:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="faceto" value="1"  :checked='faceto == 1' name="faceto">东
                                <input type="radio" v-model="faceto" value="2"  :checked='faceto == 2' name="faceto">南
                                <input type="radio" v-model="faceto" value="3"  :checked='faceto == 3' name="faceto">西
                                <input type="radio" v-model="faceto" value="4"  :checked='faceto == 4' name="faceto">北
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>面积:</span>
                            <input type="text" v-model="size" placeholder="请输入房屋面积大小">
                        </div>
                        <div class="inputDiv">
                            <span>阳台:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="balcony" value="1"  :checked='balcony == 1' name="balcony">有
                                <input type="radio" v-model="balcony" value="2" :checked='balcony == 2' name="balcony">无
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>车位:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="parking" value="1" :checked='parking == 1' name="parking">有
                                <input type="radio" v-model="parking" value="2" :checked='parking == 2' name="parking">无
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>预售价格:</span>
                            <input type="text" v-model="sellingprice" placeholder="请输入预售价格">
                        </div>
                        <div class="inputDiv">
                            <span>付款方式:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="payment" value="1" :checked='payment == 1' name="payment">2+2+pdc
                                <input type="radio" v-model="payment" value="2" :checked='payment == 2' name="payment">2+6
                                <input type="radio" v-model="payment" value="3" :checked='payment == 3' name="payment">2+12
                                <input type="radio" v-model="payment" value="4" :checked='payment == 4' name="payment">others
                                <input type="radio" v-model="payment" value="5" :checked='payment == 5' name="payment">cash
                                <input type="radio" v-model="payment" value="6" :checked='payment == 6' name="payment">bank financing
                            </div>
                        </div>
                    </div>
                </div>
                <div class="english">
                    <div class="dislogcon">
                        <div class="inputDiv">
                            <span>家具:</span>
                            <div class="radioDiv">
                                <input type="checkbox" v-model="furniture" value="1" name="furniture">洗衣机
                                <input type="checkbox" v-model="furniture" value="2" name="furniture">热水器
                                <input type="checkbox" v-model="furniture" value="3" name="furniture">冰箱
                                <input type="checkbox" v-model="furniture" value="4" name="furniture">电视机
                                <input type="checkbox" v-model="furniture" value="5" name="furniture">桌椅
                                <input type="checkbox" v-model="furniture" value="6" name="furniture">沙发
                                <input type="checkbox" v-model="furniture" value="7" name="furniture">茶几
                                <input type="checkbox" v-model="furniture" value="8" name="furniture">床
                                <input type="checkbox" v-model="furniture" value="9" name="furniture">空调
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>周边:</span>
                            <div class="radioDiv">
                                <input type="checkbox" v-model="surrounding" value="1"  name="surrounding">学校
                                <input type="checkbox" v-model="surrounding" value="2" name="surrounding">生活超市
                                <input type="checkbox" v-model="surrounding" value="3" name="surrounding">健身房
                                <input type="checkbox" v-model="surrounding" value="4" name="surrounding">公园
                            </div>
                        </div>
                        <div class="textareaDiv">
                            <span>备注:</span>
                            <div class="inputArr">
                                <p>
                                    <span>中:</span>
                                    <textarea v-model="housenotes.notes_c" style="height:50px" placeholder="中文备注" name="" id=""></textarea>
                                </p>
                                <p>
                                    <span>英:</span>
                                    <textarea v-model="housenotes.notes_e" style="height:50px" placeholder="英文备注" name="" id=""></textarea>
                                </p>
                            </div>
                        </div>
                        <div class="textareaDiv">
                            <span>房源介绍:</span>
                            <div class="inputArr">
                                <p style="height:100px">
                                    <span>中:</span>
                                    <textarea v-model="houseintroduction.introduction_c" placeholder="请输入中文房源介绍" style="height:100px" name="" id=""></textarea>
                                </p>
                                <p style="height:100px">
                                    <span>英:</span>
                                    <textarea v-model="houseintroduction.introduction_e" placeholder="请输入英文房源介绍" style="height:100px" name="" id=""></textarea>
                                </p>
                            </div>
                        </div>
                        <div class="imgDiv">
                            <span>图片：</span>
                            <UpFile @senddata='getMsgForm' ref="ConFile"></UpFile>
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
            title="确认删除？"
            :visible.sync="dialogVisible" width="30%">
            <span>确定删除此条房源信息么？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deletehouse()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import UpFile from '../components/upfile'
export default {
    data(){
        return{
            messagenum:0,
            pageNum:1,
            currentpage:1,
            pageSize:10,
            totalnum:10,
            loading:true,
            editid:'',
            datalength:'',
            housetypeArr:{
                1:'公寓',
                2:'办公室',
                3:'旺铺',
                4:'土地'
            },
            housestatusselect:[
                {
                    value:'',
                    label:'不限'
                },
                {
                    value:'0',
                    label:'待发布',
                },
                {
                    value:'1',
                    label:'已发布'
                },
                {
                    value:'2',
                    label:'待处理'
                }
            ],
            housepriceselect:[
                {
                    value:'0',
                    label:'不限'
                },
                {
                    value:'1',
                    label:'30000以下'
                },
                {
                    value:'2',
                    label:'30000-50000',
                },
                {
                    value:'3',
                    label:'50000-70000',
                },
                 {
                    value:'4',
                    label:'70000-100000',
                },
                 {
                    value:'5',
                    label:'100000以上',
                }
            ],
            houseusedselect:[
                {
                    value:'',
                    label:'不限'
                },
                {
                    value:'1',
                    label:'公寓'
                },
                {
                    value:'2',
                    label:'办公室'
                },
                {
                    value:'3',
                    label:'旺铺'
                },
                {
                    value:'4',
                    label:'土地'
                }
            ],
            housetypeselect:[
                {
                    value:'',
                    label:'不限'
                },
                {
                    value:'1',
                    label:'房产买卖'
                },
                {
                    value:'2',
                    label:'房产租赁'
                },
                {
                    value:'3',
                    label:'特价房源'
                }
            ],
            layoutArr:{
                1:'studio',
                2:'1BR',
                3:'2BR',
                4:'3BR',
                5:'house'
            },
            facetoArr:{
                1:'东',
                2:'南',
                3:'西',
                4:'北',
                5:'其它'
            },
            paymentleaseArr:{
                1:'2+6',
                2:'2+12',
                3:'2+2+pdc',
                4:'others',
                5:'cash',
                6:'bank financing'
            },
            paymentsaleArr:{
                1:'cash',
                2:'bank financing',
                3:'others'
            },
            furnitureArr:{
                1:'洗衣机',
                2:'热水器',
                3:'冰箱',
                4:'电视机',
                5:'桌椅',
                6:'沙发',
                7:'茶几',
                8:'床',
                9:'空调'
            },
            searchparams:{
                title:'',
                city:'',
                type:'',
                used:'',
                status:''
            },
            dialogVisible:false,
            dialogFormVisible:false,
            tabledata:[],
            username:'',
            email:'',
            telphone:'',
            housename:{
                name_c:'',
                name_e:''
            },
            city:'',
            cityvalue:'',
            used:'',
            housetower:'',
            size:'',
            layout:'',
            balcony:'',
            parking:'',
            sellingprice:'',
            payment:'',
            housenotes:{
                notes_c:'',
                notes_e:''
            },
            faceto:'',
            furniture:[],
            surrounding:[],
            houseintroduction:{
                introduction_c:'',
                introduction_e:''
            },
            citylist:[],
            selectcitylist:[],
            selectedOptions:'',
            citytran:{
                0:{},
                1:{}
            },
            formData:'',
            dataprice:''
        }
    },
    components:{
        UpFile
    },
    mounted(){
        this.loadingflag(true)
        this.gethouselist();
        this.getcity();

        this.getnewmessage(2)
        setInterval(()=>{
            this.getnewmessage(2)
        },5000)
        
    },
    methods:{
        getnewmessage(type){
            this.$post('/house/houselist',{
                params:JSON.stringify({
                    status:'0'
                }),
                pageNum:this.pageNum,
                pageSize:this.pageSize,
            }).then((res)=>{
                if(res.error == '0000'){
                    if(type == 2){
                        this.messagenum = res.total;
                    }else{
                        this.datalength = res.data[0].length;
                        this.tabledata = res.data;
                        this.totalnum = res.total;
                    }
                   
                }
            })
        },
        getMsgForm(data){
            this.formData = data
        },
        handleSizeChange(val) {
            this.pageNum = val;
            this.gethouselist();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.gethouselist();
        },
        clicksearchbtn(){
            this.pageNum = 1;
            this.currentpage = 1;
            this.gethouselist(this.searchparams)
        },
        handleChange(value) {
            this.searchparams.city = value[0] + "-" + value[1];
            
        },
        handleChangecity(value){
            this.city=value[0] + '-' + value[1]
        },
        getcity(){
            this.$get('/others/getcity').then((res)=>{
                if(res.error == '0000'){
                    this.citylist = res.data[0]
                    for(var i=0 ; i <res.data[0].length ;i++){
                        for(var j=0 ;j <res.data[0][i].children.length;j++){
                            this.citytran[0][res.data[0][i].value + '-' + res.data[0][i].children[j].value] = 
                                res.data[0][i].label + ' ' + (res.data[0][i].children[j].label == '不限' ? '' : res.data[0][i].children[j].label)
                        }
                    }
                    for(var m=0 ; m <res.data[1].length ;m++){
                        for(var n=0 ;n <res.data[1][m].children.length;n++){
                            this.citytran[1][res.data[1][m].value + '-' + res.data[1][m].children[n].value] = 
                                res.data[1][m].label + ' ' + (res.data[1][m].children[n].label == 'All' ? '' : res.data[1][m].children[n].label)
                        }
                    }
                    this.selectcitylist = res.data[0].slice(1)
                }
            })
        },
        choiceprice(e){
            switch(e){
                case '0':
                this.searchparams.price = {
                    min:0,max:NaN
                }
                break;
                case "1":
                this.searchparams.price = {
                    min:0,max:30000
                }
                break;
                case "2":
                this.searchparams.price = {
                    min:30000,max:50000
                }
                break;
                case "3":
                this.searchparams.price = {
                    min:50000,max:70000
                }
                break;
                case "4":
                this.searchparams.price = {
                    min:70000,max:100000
                }
                break;
                case "5":
                this.searchparams.price = {
                    min:100000,max:NaN
                }
                break;
            }
        },
        gethouselist(){
            this.loadingflag(true);  
            this.$post('/house/houselist',{
                params:JSON.stringify(this.searchparams),
                pageNum:this.pageNum,
                pageSize:this.pageSize,
            }).then((res)=>{
                this.loadingflag(false);
                if(res.error == '0000'){
                    this.datalength = res.data[0].length;
                    this.tabledata = res.data;
                    this.totalnum = res.total;
                }
            })
        },
        updatehouse(index,value,type){
            if((!this.tabledata[0][index].title || !this.tabledata[1][index].title 
                || !this.tabledata[0][index].city || !this.tabledata[1][index].city
                || !this.tabledata[0][index].notes || !this.tabledata[1][index].notes) && value == 1){
                    this.$message('请填写完整内容')
                    return;
                }
            this.loadingflag(true);    
            this.editid = this.tabledata[0][index].id;
            this.$post('/house/updatehouse',{
                id:this.editid,
                [type]:value
            }).then((res)=>{
                this.loadingflag(false);
                if(res.error == '0000'){
                    this.gethouselist()
                }
            })
        },
        clickadd(){
            this.editid = '';
            this.dialogFormVisible = true;
            this.username='';
            this.email='';
            this.telphone='';
            this.housename={
                name_c:'',
                name_e:''
            };
            this.city='';
            this.cityvalue = '';
            this.used='';
            this.housetower='';
            this.size='';
            this.layout='';
            this.balcony='',
            this.parking='';
            this.sellingprice='';
            this.payment='';
            this.housenotes={
                notes_c:'',
                notes_e:''
            };
            this.faceto='';
            this.furniture=[];
            this.surrounding=[],
            this.houseintroduction={
                introduction_c:'',
                introduction_e:''
            }
            this.formData = '';
            setTimeout(()=>{
                this.$refs.ConFile.clearImg()
            })
        },
        clickbtn(){
            this.addhouse()
        },
        deletefun(index){
            this.editid = this.tabledata[0][index].id
            this.dialogVisible = true;
        },
        deletehouse(){
            this.loadingflag(true);
            this.$post('/house/deletehouse',{
                id:this.editid
            }).then((res)=>{
                this.loadingflag(false);
                if(res.error == '0000'){
                    this.dialogVisible = false;
                    this.gethouselist();
                    this.$message({
                        message: '房源删除成功',
                        type: 'success'
                    });
                }
            })
        },
        edit(index){
            this.editid = this.tabledata[0][index].id;
            this.dialogFormVisible = true;
            this.username=this.tabledata[0][index].username;
            this.email=this.tabledata[0][index].email;
            this.telphone=this.tabledata[0][index].telphone;
            this.housename={
                name_c:this.tabledata[0][index].title,
                name_e:this.tabledata[1][index].title
            };
            this.city=this.tabledata[0][index].city;
            this.cityvalue = this.city.split('-')
            this.used=this.tabledata[0][index].type;
            this.housetower=this.tabledata[0][index].tower;
            this.size=this.tabledata[0][index].size;
            this.layout=this.tabledata[0][index].layout;
            this.balcony=this.tabledata[0][index].balcony,
            this.parking=this.tabledata[0][index].parking;
            this.sellingprice=this.tabledata[0][index].sellingprice;
            this.payment=this.tabledata[0][index].payment;
            this.housenotes={
                notes_c:this.tabledata[0][index].notes,
                notes_e:this.tabledata[1][index].notes
            };
            this.faceto=this.tabledata[0][index].faceto;
            this.furniture=JSON.parse(this.tabledata[0][index].furniture);
            this.surrounding=JSON.parse(this.tabledata[0][index].surrounding);
            this.houseintroduction={
                introduction_c:this.tabledata[0][index].introduction,
                introduction_e:this.tabledata[1][index].introduction
            }
            
            this.formData = new FormData();
            setTimeout(()=>{
                this.$refs.ConFile.clearImg(this.tabledata[0][index].imgArr)
            })
        },
        addhouse(){
            if(!this.housename.name_c || !this.housename.name_e || !this.city || !this.cityvalue
                || !this.used || !this.housetower || !this.size || !this.layout || !this.balcony || !this.parking
                || !this.sellingprice || !this.payment || !this.housenotes.notes_c || !this.housenotes.notes_e || !this.formData
                || !this.faceto || !this.houseintroduction.introduction_c || !this.houseintroduction.introduction_e){
                    this.$message('请填写完整内容');
                return;
            }
            this.loadingflag(true);
            this.formData.append('id',this.editid);
            this.formData.append('username',this.username.trim() ? this.username.trim() : 'admin');
            this.formData.append('telphone',this.telphone.trim() ? this.telphone.trim() : '00000000');
            this.formData.append('email',this.email.trim() ? this.email.trim() : '00000000');
            this.formData.append('title',JSON.stringify(this.housename));
            this.formData.append('city',this.city);
            this.cityname = {
                cityname_c:this.citytran[0][this.city],
                cityname_e:this.citytran[1][this.city]
            }
            this.formData.append('cityname',JSON.stringify(this.cityname));
            this.formData.append('size',this.size);
            this.formData.append('type',1);
            this.formData.append('tower',this.housetower);
            this.formData.append('layout',this.layout);
            this.formData.append('faceto',this.faceto);
            this.formData.append('balcony',this.balcony);
            this.formData.append('parking',this.parking);
            this.formData.append('sellingprice',this.sellingprice);
            this.formData.append('payment',this.payment);
            this.formData.append('notes',JSON.stringify(this.housenotes));
            this.formData.append('furniture',JSON.stringify(this.furniture));
            this.formData.append('used',this.used);
            this.formData.append('introduction',JSON.stringify(this.houseintroduction));
            this.formData.append('surrounding',JSON.stringify(this.surrounding));
            this.$post('/house/addhouse',this.formData).then((res)=>{
                this.loadingflag(false);
                if(res.error == '0000'){
                    this.gethouselist();
                    this.dialogFormVisible = false;
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
@keyframes color{
    0 {
        opacity : 1;
    }
    50% {
        opacity : 0.5;
    }
    100% {
        opacity : 1;
    }
}

@-webkit-keyframes color{
    0 {
        opacity : 1;
    }
    50% {
        opacity : 0.5;
    }
    100% {
        opacity : 1;
    }
}
.ForSale
    width 100%;
    overflow-x auto;
    font-size 14px;
    .mestip
        cursor pointer
        width 220px;
        height 50px;
        line-height 50px;
        background #409EFF;
        position absolute;
        right 1%;
        top 25px;
        color white;
        border-radius 10px;
        text-align center;
        animation color 1.5s linear infinite; 
        img
            width 25px;
            position relative;
            top 6px;
    .search
        margin 10px 0;
        display flex;
        flex-wrap wrap;
        position relative;
        .searchlist
            display flex;
            align-items center;
            margin-right 20px;
        .inputsearch
            width 140px;
        .searchbtn
            position absolute;
            right 0;
            top 6px;    
.ForSaletable
    width 100%;
    border-collapse:collapse;
    font-size 12px;
    thead
        background #ecf5ff;
    .wait
        animation backgroundcolor 1.5s linear infinite; 
        background : #C1FFE4 !important;    
    tr
        width 100%;
        overflow-x scroll;
        td
            position relative;
            border-collapse:collapse;
            text-align center;
            border 1px solid #cccccc;
            &>p:nth-child(1)
                border-top none;
            p
                width 90%;
                padding 0 5%;
                height 50px;
                overflow auto;
                border-top 1px solid #eeeeee;
                display flex;
                align-items center;
                justify-content center;
                word-wrap:break-word;
        .flex
            text-align center;     
.dislogFormcon
    width 100%;
    height 600px; 
    border-bottom 1px solid #eeeeee;
    &>div
        //background red;    
        .dislogcon
            .inputDiv
                width 100%;
                height 30px;
                margin-bottom 5px;
                line-height 30px;
                display flex;
                justify-content flex-start;
                span
                    width 80px;
                input
                    width 400px;
                    border 1px solid #eeeeee;
                    outline none;
                .radioDiv
                    input 
                        width auto;   
                        position relative;
                        top 1px; 
            .cominput
                width 100%;
                display flex;
                justify-content flex-start;
                align-items center;
                margin-bottom 5px;
                span
                    width 80px;
                .inputArr
                    width 400px;
                    border 1px solid #eeeeee;
                    &>p:nth-child(1)
                        border-bottom 1px solid #eeeeee;
                    &>p
                        height 30px;
                        line-height 30px;
                        display flex;
                        span
                            width 30px;
                        input
                            width 100%;
                            border none;
                            outline none;
                            
            .textareaDiv
                width 100%;
                display flex;
                justify-content flex-start;
                align-items center;
                margin-bottom 5px;   
                span
                    width 80px;
                .inputArr
                    width 400px;
                    border 1px solid #eeeeee;
                    &>p:nth-child(1)
                        border-bottom 1px solid #eeeeee;
                    &>p
                        height 50px;
                        display flex;
                        span
                            width 30px;
                        textarea
                            width 100%;
                            border none;
                            resize:none;
                            outline none;
                            font-size 14px;
            .imgDiv
                width 100%;
                display flex;
                justify-content flex-start;
                align-items center;
                margin-bottom 5px;   
                span
                    width 80px;
                .imgArr
                    width 400px; 
                    display flex;
                    flex-wrap wrap;
                    &>div
                        width 80px;
                        height 80px;
                        background red;  
                        margin 5px 10px 5px 0;      
                                
</style>
<style lang="stylus">
.flex
    button
        display block;
        margin 5px auto !important;
.ForSale
    .el-dialog__footer
        text-align center!important;   
    .inputsearch
        input
            height 30px; 
        .el-input__icon
            line-height 0.3rem !important          
</style>