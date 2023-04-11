<template>
  <div id="register">
    <div class="bgc">
      <img
        src="../../../public/v2-ffa0ab7e8cea7ba0d080a8e1f10bb810_r.jpg"
        width="100%"
        height="100%"
        alt=""
      />
    </div>
    <el-card class="mycard">
      <div slot="header" class="clearfix">注册</div>
      <el-form ref="registerForm" :model="registerInfo">
        <el-form-item>
          <el-input
            v-model="registerInfo.card"
            placeholder="请输入注册邮箱/手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerInfo.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerInfo.checkPassword"
            placeholder="请再次输入密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        class="confirm"
        :disabled="isDis"
        type="primary"
        @click="register"
        >立即注册</el-button
      >
      <el-button style="margin-left:0px" class="confirm" type="primary" @click="$router.push({ path: '/login' })">返回登录页</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "registerPage",
  data() {
    return {
      registerInfo: {
        card: "",
        password: "",
        checkPassword: "",
      },
    };
  },
  computed: {
    isDis() {
      if (
        this.registerInfo.card === "" ||
        this.registerInfo.password === "" ||
        this.registerInfo.checkPassword === ""
      )
        return true;
      return false;
    },
  },
  methods: {
    register() {
      this.$request({
        url: "/user/register",
        method: "post",
        data: { ...this.registerInfo },
      }).then((res) => {
        if (res.code === 200) {
          this.$router.push({ path: "/login" });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "style/pc/init/init.less";
</style>
