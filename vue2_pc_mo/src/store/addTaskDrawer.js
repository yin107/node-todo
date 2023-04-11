export const addTaskDrawer={
	state:{
		ishow:false
	},
	mutations:{
		changeIshow(state,payload){
			state.ishow=payload
		}
	},
	namespaced:true
}