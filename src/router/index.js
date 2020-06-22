import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ForSale from '../views/ForSale';
import QA from '../views/QA'
import Blacklist from '../views/Blacklist'
import Entertainment from '../views/Entertainment';
import PropertyNews from '../views/PropertyNews';
import Login from '../views/login';
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        redirect: 'login',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
                path: '1-1',
                name: 'ForSell',
                component: ForSale
            },
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
    }, 
    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router