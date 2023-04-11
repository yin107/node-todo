export const initRouter={
	path:"/login",
	name:"loginindex",
	component:()=>import('./indexPage'),
	children:[
		{
			path:"/login",
			name:"login",
			meta:{
				title:"登录页"
			},
			component:()=>import('./loginPage')
		},
		{
			path:"/register",
			name:"register",
			meta:{
				title:"注册页"
			},
			component:()=>import('./registerPage')
		}
	]

}