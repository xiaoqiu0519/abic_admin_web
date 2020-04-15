import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ForSale from '../views/ForSale';
//import ForLease from '../views/ForLease';
//import AuthorizeRent from '../views/AuthorizeRent';
//import AuthorizeSale from '../views/AuthorizeSale';
import QA from '../views/QA'
import Blacklist from '../views/Blacklist'
import Entertainment from '../views/Entertainment';
import PropertyNews from '../views/PropertyNews';
//import RushSale from '../views/RushSale';
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '1-1',
    children: [{
            path: '1-1',
            name: 'ForSell',
            component: ForSale
        },
        // {
        //     path: '1-2',
        //     name: 'ForLease',
        //     component: ForLease
        // }, {
        //     path: '1-3',
        //     name: 'RushSale',
        //     component: RushSale
        // },
        // {
        //     path: '2-2',
        //     name: 'AuthorizeRent',
        //     component: AuthorizeRent
        // },
        // {
        //     path: '2-1',
        //     name: 'AuthorizeSale',
        //     component: AuthorizeSale
        // }, 
        {
            path: '3-1',
            name: 'QA',
            component: QA
        }, {
            path: '3-2',
            name: 'PropertyNews',
            component: PropertyNews
        }, {
            path: '3-3',
            name: 'Entertainment',
            component: Entertainment
        }, {
            path: '4-1',
            name: 'Blacklist',
            component: Blacklist
        }
    ]
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router