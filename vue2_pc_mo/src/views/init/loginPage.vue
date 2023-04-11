<template>
  <div id="login">
    <div class="bgc">
      <img
        src="../../../public/v2-ffa0ab7e8cea7ba0d080a8e1f10bb810_r.jpg"
        width="100%"
        height="100%"
        alt=""
      />
    </div>
    <el-card class="cardbox">
      <div slot="header" class="clearfix">登录</div>
      <el-form ref="loginForm" :model="loginInfo">
        <el-form-item>
          <el-input
            v-model="loginInfo.card"
            placeholder="请输入用户邮箱或者手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginInfo.password"
            placeholder="请输入登录密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        class="confirm"
        :disabled="canConfirm"
        type="primary"
        @click="confirm"
        >立即登录</el-button
      >
      <el-button class="confirm" @click="$router.push({ path: '/register' })"
        >还没有账号，去注册一个吧</el-button
      >
    </el-card>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data() {
    return {
      loginInfo: {
        card: "",
        password: "",
      },
    };
  },
  computed: {
    canConfirm() {
      if (this.loginInfo.card === "" || this.loginInfo.password === "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    confirm() {
      //请求/pc/user/login
      this.$request({
        url: "/user/login",
        method: "post",
        data: { ...this.loginInfo },
      }).then((res) => {
        if (res.code === 200) {
          let tokenreturn = res.data.token ? res.data.token : "";
          localStorage.setItem("tokenStr", tokenreturn);
          localStorage.setItem("userinfo", JSON.stringify(res.data.userinfo));
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "style/pc/init/init.less";
</style>
