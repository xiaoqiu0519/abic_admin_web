import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        showerror: false
    },
    getters: {
        getloading(state) {
            return state.loading
        },
        getshowerror(state) {
            return state.showerror
        }
    },
    mutations: {
        changeloading(state, flag) {
            return state.loading = flag
        },
        changeshowerror(state, flag) {
            return state.showerror = flag;
        }
    },
    actions: {
        changeloadingAsy(context, flag) {
            context.commit('changeloading', flag)
        },
        changeshowerrorAsy(context) {
            context.commit('changeshowerror', true)
            setTimeout(() => {
                context.commit('changeshowerror', false)
            }, 1000)
        }
    },
    modules: {}
})