export const homeRouter={
	path:"/home",
	name:"homePage",
	meta:{
		title:"首页"
	},
	component:()=>import('./homePage')
}