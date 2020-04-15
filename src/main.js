import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './commom/commom.css'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {get, post } from './commom/config';

Vue.prototype.loadingflag = function(flag) {
    store.dispatch('changeloadingAsy', flag)
}
Vue.use(ElementUi);
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')