<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off" label-position="left">

      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/images/logo.png" class="imglogo">
        </h3>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username" class="formStyle">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password" class="formStyle">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" class="passwordIcon" />
        </span>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="username" class="formStyle">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
          <i class="el-icon-mobile-phone codeIcon" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="验证码"
          name="code"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
        <img src="" class="codeImg">
      </el-form-item>

      <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
    <!-- 底部文字部分 -->
    <div class="tips">
      <div class="text">
        江苏传智播客教育科技股份有限公司
        <span style="margin-left: 20px;">版权所有Copyright 2006-2022 All Rights Reserved</span>
        <span style="margin-left: 20px;">苏ICP备16007882号-11</span>
      </div>
    </div>
    <!-- 视频背景 -->
    <video autoplay muted loop>
      <source src="../login/video/bgVideo.mp4">
    </video>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请填写此字段', trigger: 'blur' }],
        password: [{ required: true, message: '请填写此字段', trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },

  methods: {
    // 密码显示
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#000000;
$cursor: #f54040;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      background-color: $bg;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#ffffff;
$light_gray:#eee;

.login-container {
  /* 视频背景部分 */
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  /* 底部文字 */
    .tips {
     position: fixed;
      bottom: 20px;
      width: 100%;
      text-align: center;
      color: #fff;
      font-size: .85rem;
      line-height: 1rem;
      height: 1rem;

   .text {
      font-size: 14px;
      color: white;
      text-align: center;
      position: absolute;
      bottom: 0px;
      left: 0%;
      width: 100%;
      opacity: 0.9;
      }

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }

    }
.imglogo {
  height: 54px;
}
    /* 输入框样式 */
.formStyle {
  background-color: $bg;
  display: inline-block;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  line-height: 40px;
  border: #dedfe6 solid 1px;
}
/* 密码输入框icon样式 */
.passwordIcon {
  color: #c6c4cc;
}
/* 登录按钮 */
.loginBtn {
      width: 100%;
  height: 54px;
  margin-bottom: 14px;
  margin-top: 22px;
  background-color: #e15536;
  border: 0;
  font-size: 18px;
  color: #fff;
  font-weight: 700;
}
.codeIcon {
  width: 21px;
  height: 21px;
}
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  /* 登录表单部分 */
  .login-form {
    position: absolute;
    top: 45%;
    left: 45%;
    margin: -180px 0 0 -160px;
    width: 450px;
    height: 467px;
    padding: 36px 40px;
    background: #fff;
    border-radius: 10px;
    background-color: $bg;
  }
  /* 验证码样式 */
  .codeImg {
    width: 71px;
    height: 32px;
    display: inline-block;
    cursor: pointer;
    margin-left: 10px;
    position: absolute;
    right: -1px;
    top: 9px;
    background-color: #e84040;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #989191;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
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
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
