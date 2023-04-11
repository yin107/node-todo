import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import { homeRouter } from "@/views/home/homeRouter";
import { initRouter } from "@/views/init/initRouter";
const myrouter = [
  {
    path: "",
    redirect: "/login",
  },
  initRouter,
  homeRouter,
];
const router = new Router({ mode: "history", routes: myrouter });

router.beforeEach((to, from, next) => {
  const tokenStr = localStorage.getItem("tokenStr");
  if (to.path === "/login" && tokenStr) {
    next("/home");
  } else if(to.path != "/login"&&!tokenStr&&to.path != "/register"){
	next('/login')
  }  else if(to.path === "/register" &&from.path==='/login'){
	console.log(3);
	next()
  }
  else {
    next();
  }
});

export default router;
