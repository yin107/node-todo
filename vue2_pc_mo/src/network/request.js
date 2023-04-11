import axios from "axios";
import { Message } from "element-ui";
import router from "@/router/index.js";
export function request(config) {
  const instance = axios.create({
    baseURL: "http://localhost:300/pc",
  });
  instance.interceptors.response.use(
    (res) => {
      //对响应状态码的处理
      switch (res.data.code) {
        case 4001:
          Message({
            message: res.data.message,
            type: "error",
          });
          break;
        case 200:
          Message({
            message: res.data.message,
            type: "success",
          });
          break;
        case 4002: //token验证失败
          Message({
            message: res.data.message,
            type: "error",
          });
          //清空localstorage
          localStorage.setItem("tokenStr", "");
          router.push({ path: "/login" });
          break;
      }

      //如果res中有token字符串的话，需要将他保存到本地中
      let token = localStorage.getItem("tokenStr");
      res.headers["Authorization"] = token;
      return res.data;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );

  return instance(config);
}
