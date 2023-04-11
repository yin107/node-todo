import Vue from 'vue'
import Vuex from 'vuex'
import { addTaskDrawer } from './addTaskDrawer'
Vue.use(Vuex)
const store=new Vuex.Store({
	state:{
		num:1
	},
	getters:{
		userinfo(){
			let userInfo=localStorage.getItem('userinfo')
			return userInfo?JSON.parse(userInfo):{}
		}
	},
	modules:{
		addTaskDrawer
	},
	namespaced:true
})
export default store