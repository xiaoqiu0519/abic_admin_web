<template>
    <div class="ForSale">
        <div class="mestip" @click="getnewmessage(1)" v-if="messagenum != 0">
           <img src="../assets/message1.png" alt="" srcset=""><span style="font-size:20px;margin-left:6px">{{messagenum}} New Message</span> 
        </div>  
        <div class="topadd">
            <span>Realty Manage</span>
            <el-button type="primary" @click="clickadd()">Add Realty</el-button>
        </div>
        <div class="search">
            <div class="searchlist">
                <span>City : </span>
                <el-cascader class="inputsearch"
                    :options="citylist"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </div>
            <div class='searchlist'>
                <span>Type : </span>
                <el-select class="inputsearch" v-model="searchparams.type" placeholder="Please choose">
                    <el-option
                    v-for="item in housetypeselect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='searchlist'>
                <span>Used : </span>
                <el-select class="inputsearch" v-model="searchparams.used" placeholder="Please choose">
                    <el-option
                    v-for="item in houseusedselect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='searchlist'>
                <span>Status : </span>
                <el-select class="inputsearch" v-model="searchparams.status" placeholder="Please choose">
                    <el-option
                    v-for="item in housestatusselect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='searchlist'>
                <span>Price : </span>
                <el-select class="inputsearch" v-model="dataprice" @change="choiceprice($event)" placeholder="Please choose">
                    <el-option
                    v-for="item in housepriceselect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='searchbtn'>
                <el-button @click="clicksearchbtn()" type="primary" size="mini" icon="el-icon-search">Search</el-button>
            </div>
        </div>
        <table class="ForSaletable">
            <thead>
                <tr style="height:30px">
                    <td>Sort</td>
                    <td width='10%'>Name</td>
                    <td width='10%'>City</td>
                    <td>Used</td>
                    <td width='5%'>Contact No.</td>
                    <td>Face to</td>
                    <td>Size</td>
                    <td>Balcony</td>
                    <td>Parking</td>
                    <td>Price</td>
                    <td>Payment</td>
                    <td width='10%'>Furniture</td>
                    <td width='8%'>Notes</td>
                    <td width='10%'>Introduction</td>
                    <td width='7%'>Type</td>
                    <td width='7%'>Status</td>
                    <td>New</td>
                    <td width='7%'>operate</td>
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
                    <td>{{tabledata[0][index].balcony == 1 ? 'Y' : "N"}}</td>
                    <td>{{tabledata[0][index].parking == 1 ? 'Y' : "N"}}</td>
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
                        <el-button size="mini" @click="updatehouse(index,1,'type')" :type="tabledata[0][index].type == 1 ? 'primary' : 'info'">For Sale</el-button>
                        <el-button size="mini" @click="updatehouse(index,2,'type')" :type="tabledata[0][index].type == 2 ? 'primary' : 'info'">For Lease</el-button>
                        <el-button size="mini" @click="updatehouse(index,3,'type')" :type="tabledata[0][index].type == 3 ? 'primary' : 'info'">Rush Sale</el-button>
                    </td>
                    <td class="flex" v-if="tabledata[0][index].status == 0">
                        <el-button size="mini" type="primary" @click="updatehouse(index,1,'status')">Release</el-button>
                        <el-button size="mini" type="primary" @click="updatehouse(index,2,'status')">Later</el-button>
                    </td>
                    <td class="flex" v-else-if="tabledata[0][index].status == 1">
                        <el-button size="mini" type="success" disabled>Published</el-button>
                        <el-button size="mini" type="warning" @click="updatehouse(index,0,'status')">Closed</el-button>
                    </td>
                    <td class="flex" v-else-if="tabledata[0][index].status == 2">
                        <el-button size="mini" type="warning" @click="updatehouse(index,0,'status')">Open</el-button>
                    </td>
                    <td>
                        <el-switch @change="updatenewhouse(index)" v-model="tabledata[0][index].isnew" active-color="#409EFF" inactive-color="#909399" active-value="1" inactive-value="0"></el-switch>
                    </td>
                    <td class="flex">
                        <el-button size="mini" type="primary" @click="edit(index)">Edit</el-button>
                        <el-button size="mini" type="danger" @click='deletefun(index)'>Delete</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="nodata" v-if="!datalength || datalength.length ==0">
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
        <el-dialog title="Edit Realty" 
            width="90%"
            :visible="dialogFormVisible">
            <div class="dislogFormcon">
                <div class="chinese">
                    <div class="dislogcon">
                        <div class="inputDiv">
                            <span>User Name:</span>
                            <input type="text" v-model="username">
                        </div>
                        <div class="inputDiv">
                            <span>User Number:</span>
                            <input type="text" v-model="telphone">
                        </div>
                        <div class="inputDiv">
                            <span>User Email:</span>
                            <input type="text" v-model="email">
                        </div>
                        <div class="cominput">
                            <span>Name:</span>
                            <div class="inputArr">
                                <p>
                                    <span>Ch:</span>
                                    <input type="text" v-model="housename.name_c" placeholder="请输入楼盘名称(描述title)">
                                </p>
                                <p>
                                    <span>En:</span>
                                    <input type="text" v-model="housename.name_e" placeholder="Please enter the property name (description title)">
                                </p>
                            </div>
                        </div>
                        <div class="cominput">
                            <span>City:</span>
                            <el-cascader class="inputsearch" 
                                :options="selectcitylist"
                                v-model="cityvalue"
                                @change="handleChangecity">
                            </el-cascader>
                        </div>
                        <div class="inputDiv">
                            <span>Used:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="used" value="1" :checked='used == 1' name="used"> Condo
                                <input type="radio" v-model="used" value="2" :checked='used == 2' name="used"> Office
                                <input type="radio" v-model="used" value="3" :checked='used == 3' name="used"> Commercial Space
                                <input type="radio" v-model="used" value="4" :checked='used == 4' name="used"> land
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>Floor:</span>
                            <input type="text" v-model="housetower" placeholder="please enter Contact No.">
                        </div>
                        <div class="inputDiv">
                            <span>Layout:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="layout" value="1"  :checked='layout == 1' name="layout"> studio
                                <input type="radio" v-model="layout" value="2"  :checked='layout == 2' name="layout"> 1BR
                                <input type="radio" v-model="layout" value="3"  :checked='layout == 3' name="layout"> 2BR
                                <input type="radio" v-model="layout" value="4"  :checked='layout == 4' name="layout"> 3BR
                                <input type="radio" v-model="layout" value="5"  :checked='layout == 5' name="layout"> others
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>FaceTo:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="faceto" value="1"  :checked='faceto == 1' name="faceto"> East
                                <input type="radio" v-model="faceto" value="2"  :checked='faceto == 2' name="faceto"> South
                                <input type="radio" v-model="faceto" value="3"  :checked='faceto == 3' name="faceto"> West
                                <input type="radio" v-model="faceto" value="4"  :checked='faceto == 4' name="faceto"> North
                                <input type="radio" v-model="faceto" value="5"  :checked='faceto == 5' name="faceto"> Others
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>Size:</span>
                            <input type="text" v-model="size" placeholder="please enter Size">
                        </div>
                        <div class="inputDiv">
                            <span>Balcony:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="balcony" value="1"  :checked='balcony == 1' name="balcony"> Y
                                <input type="radio" v-model="balcony" value="2" :checked='balcony == 2' name="balcony"> N
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>Parking:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="parking" value="1" :checked='parking == 1' name="parking"> Y
                                <input type="radio" v-model="parking" value="2" :checked='parking == 2' name="parking"> N
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>Price:</span>
                            <input type="text" v-model="sellingprice" placeholder="please enter price">
                        </div>
                        <div class="inputDiv">
                            <span>Payment:</span>
                            <div class="radioDiv">
                                <input type="radio" v-model="payment" value="1" :checked='payment == 1' name="payment"> 2+2+pdc
                                <input type="radio" v-model="payment" value="2" :checked='payment == 2' name="payment"> 2+6
                                <input type="radio" v-model="payment" value="3" :checked='payment == 3' name="payment"> 2+12
                                <input type="radio" v-model="payment" value="4" :checked='payment == 4' name="payment"> others
                                <input type="radio" v-model="payment" value="5" :checked='payment == 5' name="payment"> cash
                                <input type="radio" v-model="payment" value="6" :checked='payment == 6' name="payment"> bank financing
                            </div>
                        </div>
                    </div>
                </div>
                <div class="english">
                    <div class="dislogcon">
                        <div class="inputDiv">
                            <span>Furniture:</span>
                            <div class="radioDiv">
                                <input type="checkbox" v-model="furniture" value="1" name="furniture">Washing Machine
                                <input type="checkbox" v-model="furniture" value="2" name="furniture">Water Heater
                                <input type="checkbox" v-model="furniture" value="3" name="furniture">Refrigerator
                                <input type="checkbox" v-model="furniture" value="4" name="furniture">TV
                                <input type="checkbox" v-model="furniture" value="5" name="furniture">Table&Chair
                                <input type="checkbox" v-model="furniture" value="6" name="furniture">Sofa                              
                                <input type="checkbox" v-model="furniture" value="7" name="furniture">Bed
                                <input type="checkbox" v-model="furniture" value="8" name="furniture">Aircon
                                <input type="checkbox" v-model="furniture" value="9" name="furniture">None
                            </div>
                        </div>
                        <div class="inputDiv">
                            <span>Surrounding:</span>
                            <div class="radioDiv">
                                <input type="checkbox" v-model="surrounding" value="1"  name="surrounding">Gym
                                <input type="checkbox" v-model="surrounding" value="2" name="surrounding">Swimming poll
                                <input type="checkbox" v-model="surrounding" value="3" name="surrounding">Basketball Court
                                <input type="checkbox" v-model="surrounding" value="4" name="surrounding">Kids playground
                            </div>
                        </div>
                        <div class="textareaDiv">
                            <span>Notes:</span>
                            <div class="inputArr">
                                <p>
                                    <span>Ch:</span>
                                    <textarea v-model="housenotes.notes_c" style="height:50px" placeholder="中文备注" name="" id=""></textarea>
                                </p>
                                <p>
                                    <span>En:</span>
                                    <textarea v-model="housenotes.notes_e" style="height:50px" placeholder="English Notes" name="" id=""></textarea>
                                </p>
                            </div>
                        </div>
                        <div class="textareaDiv">
                            <span>Introduction:</span>
                            <div class="inputArr">
                                <p style="height:100px">
                                    <span>Ch:</span>
                                    <textarea v-model="houseintroduction.introduction_c" placeholder="请输入中文房源介绍" style="height:100px" name="" id=""></textarea>
                                </p>
                                <p style="height:100px">
                                    <span>En:</span>
                                    <textarea v-model="houseintroduction.introduction_e" placeholder="Please enter a listing description in English" style="height:100px" name="" id=""></textarea>
                                </p>
                            </div>
                        </div>
                        <div class="imgDiv">
                            <span>Picture：</span>
                            <UpFile @senddata='getMsgForm' ref="ConFile"></UpFile>
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
            title="confirm deletion?"
            :visible.sync="dialogVisible" width="30%">
            <span>Are you sure you want to delete this listing information?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="deletehouse()">Submit</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import UpFile from '../components/upfile'
export default {
    data(){
        return{
            timer:'',
            messagenum:0,
            pageNum:1,
            currentpage:1,
            pageSize:10,
            totalnum:10,
            loading:true,
            editid:'',
            datalength:'',
            housetypeArr:{
                1:'Condo',
                2:'Office',
                3:'Commercial Space',
                4:'land'
            },
            housestatusselect:[
                {
                    value:'',
                    label:'All'
                },
                {
                    value:'0',
                    label:'To be released',
                },
                {
                    value:'1',
                    label:'Published'
                },
                {
                    value:'2',
                    label:'To be processed'
                }
            ],
            housepriceselect:[
                {
                    value:'0',
                    label:'All'
                },
                {
                    value:'1',
                    label:'30k below'
                },
                {
                    value:'2',
                    label:'30-50k',
                },
                {
                    value:'3',
                    label:'50-70k',
                },
                 {
                    value:'4',
                    label:'70-100k',
                },
                 {
                    value:'5',
                    label:'100k above',
                }
            ],
            houseusedselect:[
                {
                    value:'',
                    label:'All'
                },
                {
                    value:'1',
                    label:'Condo'
                },
                {
                    value:'2',
                    label:'Office'
                },
                {
                    value:'3',
                    label:'Commercial Space'
                },
                {
                    value:'4',
                    label:'Land'
                }
            ],
            housetypeselect:[
                {
                    value:'',
                    label:'All'
                },
                {
                    value:'1',
                    label:'For Sale'
                },
                {
                    value:'2',
                    label:'For Lease'
                },
                {
                    value:'3',
                    label:'Rush Sale'
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
                1:'East',
                2:'South',
                3:'West',
                4:'North',
                5:'Others'
            },
            paymentleaseArr:{
                1:'2+2+pdc',
                2:'2+6',
                3:'2+12',
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
                1:'Washing Machine',
                2:'Water Heater',
                3:'Refrigerator',
                4:'TV',
                5:'Table&Chair',
                6:'Sofa',
                7:'Bed',
                8:'Aircon',
                9:'None',
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
        this.timer = setInterval(()=>{
            this.getnewmessage(2)
        },5000)
        
    },
    beforeDestroy(){
        clearInterval(this.timer)
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
                    this.citylist = res.data[1]
                    for(var i=0 ; i <res.data[1].length ;i++){
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
                    this.selectcitylist = res.data[1].slice(1)
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
        updatenewhouse(index){
            this.loadingflag(true);    
            this.editid = this.tabledata[0][index].id;
            this.$post('/house/updatehouse',{
                id:this.editid,
                isnew:this.tabledata[0][index].isnew
            }).then((res)=>{
                this.loadingflag(false);
                if(res.error == '0000'){
                    this.gethouselist()
                }
            })
        },
        updatehouse(index,value,type){
            if((!this.tabledata[0][index].title || !this.tabledata[1][index].title 
                || !this.tabledata[0][index].city || !this.tabledata[1][index].city
                || !this.tabledata[0][index].notes || !this.tabledata[1][index].notes) && value == 1){
                    this.$message('Please fill in the complete content')
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
                        message: 'Listing deleted successfully',
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
            this.used=this.tabledata[0][index].used;
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
                    this.$message('Please fill in the complete content');
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
                        message: 'Successful operation',
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
                margin-bottom 5px;
                line-height 30px;
                display flex;
                justify-content flex-start;
                span
                    width 100px;
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
                    width 100px;
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
                    width 100px;
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
                    width 100px;
                .imgArr
                    width 400px; 
                    display flex;
                    flex-wrap wrap;
                    &>div
                        width 100px;
                        height 80px;
                        background red;  
                        margin 5px 10px 5px 0;      
                                
</style>
<style lang="stylus">
.flex
    button
        display block;
        margin 5px auto !important;
        padding 0 !important;
        width 60px;
        line-height 25px;
.ForSale
    .el-dialog__footer
        text-align center!important;   
    .inputsearch
        input
            height 30px; 
        .el-input__icon
            line-height 0.3rem !important          
</style>