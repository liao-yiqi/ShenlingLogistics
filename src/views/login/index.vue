<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :show-message="true"
    >
      <div class="title-container">
        <img class="title" src="@/assets/common/shenlingLogin.png" alt="" style="height: 54px">
      </div>
      <!-- 用户名 -->
      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="account"
          v-model.trim="loginForm.account"
          placeholder="账号"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model.trim="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="guide" />
        </span>
        <el-input
          ref="code"
          v-model.trim="loginForm.code"
          type="text"
          placeholder="验证码"
          name="code"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span @click="getCode">
          <img class="code-image" :src="CaptchaUrl" alt="">
        </span>
      </el-form-item>

      <el-button
        class="loginBtn"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px;background-color: #e15536;border: 0;"
        @click.native.prevent="handleLogin"
      >登录</el-button>

    </el-form>
    <video
      data-v-548e52e0=""
      src="@/assets/video/loginBg.mp4"
      autoplay="autoplay"
      loop="loop"
      muted="muted"
      style="width: 100%; height: 100%; object-fit: fill;"
    />
    <div class="footer">
      黑马程序员神领物流开发小组 版权所有Copyright 2023-2033 All Rights Reserved 苏ICP备16007882号-11
    </div>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      CaptchaUrl: '',
      loginForm: {
        account: 'shenlingadmin',
        password: '123456',
        tenant: '0000',
        bindAccount: '',
        bindPassword: '',
        signAccount: '',
        signPassword: '',
        code: '',
        key: ''
      },
      loginRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'submit'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'submit'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'submit'] }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(async(vaild) => {
        if (vaild) {
          // 异步请求
          await this.$store.dispatch('user/login', this.loginForm)
          this.$message.success('登录成功')
          this.$router.push('/')
        } else {
          return false
        }
      })
    },
    // 获取验证码
    async getCode() {
      const key = Date.now()
      const res = await getCaptcha(key)
      this.loginForm.key = key
      const img = btoa(
        new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
      this.CaptchaUrl = 'data:image/png;base64,' + img
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #888;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-position: center; // 将图片位置设置为充满整个屏幕

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    margin-left: 35px;

    input {
      background: transparent;
      -webkit-appearance: none;
      border-radius: 5px;
      padding: 12px 5px 12px 31px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }

  .el-form-item__error {
    color: red;
    left: 33px;
  }

  .loginBtn {
    background: #407ffe;
    height: 59px;
    line-height: 32px;
    font-size: 20px;
    margin-top: 22px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 480px;
    max-width: 100%;
    padding: 50px 35px 0;
    overflow: hidden;
    background: #fff;
    border-radius: 10px;

    .code-image {
    display: inline-block;
    vertical-align: top;
    width: 71px;
    height: 32px;
    cursor: pointer;
    margin-left: 10px;
    position: absolute;
    right: 50px;
    top: 9px;
}
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    position: absolute;
    left: 30px;
    top: -2px;
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    text-align: center;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 45px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .footer{
    font-size: 14px;
    color: white;
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0%;
    width: 100%;
    opacity: 0.9;
  }
}
</style>
