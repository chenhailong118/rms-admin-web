<template>
  <div class="homepage-hero-module">
    <div class="login-container">
      <div :style="fixStyle" class="filter"></div>
      <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
<!--        <source :src="login_cover_mp4" type="video/mp4"/>-->
<!--        浏览器不支持 video 标签，建议升级浏览器。-->
<!--        <source :src="login_cover_webm" type="video/webm"/>-->
<!--        浏览器不支持 video 标签，建议升级浏览器。-->
        <source :src="login_cover_mp4" type="video/mp4"/>
        浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" :src="login_gb" alt="">
      </div>
      <el-card class="login-form-layout">
        <el-form autoComplete="on"
                 :model="loginForm"
                 :rules="loginRules"
                 ref="loginForm"
                 label-position="center">
          <div style="text-align: center">
            <svg-icon icon-class="login-rms" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
          </div>
          <h2 class="login-title color-main">RMS-后台管理系统</h2>
          <el-form-item prop="username">
            <el-input name="username"
                      type="text"
                      v-model="loginForm.username"
                      autoComplete="on"
                      placeholder="请输入用户名">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password" :type="pwdType" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码">
              <span slot="prefix">
                <svg-icon icon-class="password" class="color-main"></svg-icon>
              </span>
              <span slot="suffix" @click="showPwd">
                <svg-icon icon-class="eye" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="imageCode" @keyup.enter.native="handleLogin">
            <el-input name="imageCode"
                      type="text"
                      v-model="loginForm.imageCode"
                      autoComplete="on"
                      placeholder="请输入验证码">
              <span slot="prefix">
                <svg-icon icon-class="image-code" class="color-main"></svg-icon>
              </span>
              <span slot="suffix">
                <img v-if="validateCode.imageCode" :src="imageCodeUrl" @click="refreshImage()">
              </span>
            </el-input>
          </el-form-item>s
          <el-form-item style="margin-bottom: 60px;text-align: center">
            <el-button class="color-main " style="width: 45%;background-color: #00bcd4;border-color: #00bcd4;font-weight: bold;color: #000000" type="primary" :loading="loading" @click.native.prevent="handleLogin">
              登&nbsp;&nbsp;&nbsp;&nbsp;录
            </el-button>
            <el-button style="width: 45%" type="primary" @click.native.prevent="visitorAccount">
              游客账户获取
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="description">
        <h4>Nothing is impossible for a willing heart!!</h4>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  import {setCookie,getCookie} from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'
  import login_cover_mp4 from '@/assets/videos/coverr-golden-gate-bridge.mp4';
  import login_cover_webm from '@/assets/videos/login_cover.webm';
  import login_gb from '@/assets/images/login_bg.jpg';
  import {getValidateCodeToken} from '@/api/login';


  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      const validateImageCode = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
          imageCode: '',
          validateCodeToken: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          imageCode: [{required: true, trigger: 'blur', validator: validateImageCode}]
        },
        validateCode:{
          imageCode:false
        },
        baseURL:this.baseURL,
        imageCodeUrl:'',
        loading: false,
        pwdType: 'password',
        login_center_bg,
        supportDialogVisible:false,

        vedioCanPlay: false,
        fixStyle: '',
        login_cover_mp4,
        login_cover_webm,
        login_gb
      }
    },
    created() {
      this.getValidateCodeToken();
      this.loginForm.username = getCookie("username");
      this.loginForm.password = getCookie("password");
      if(this.loginForm.username === undefined||this.loginForm.username==null||this.loginForm.username===''){
        this.loginForm.username = 'admin';
      }
      if(this.loginForm.password === undefined||this.loginForm.password==null){
        this.loginForm.password = '';
      }
    },
    methods: {
      getValidateCodeToken() {
        this.listLoading = true;
        getValidateCodeToken().then(response => {
          this.listLoading = false;
          this.loginForm.validateCodeToken = response.data.validatecodetoken;
          this.imageCodeUrl = process.env.BASE_API + '/auth/code/image/' + response.data.validatecodetoken
          this.validateCode.imageCode = true;
        });
      },
      refreshImage(){
        this.getValidateCodeToken();
      },
      canplay() {
        this.vedioCanPlay = true
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false;
              setCookie("username",this.loginForm.username,15);
              setCookie("password",this.loginForm.password,15);
              this.$router.push({path: '/'})
            }).catch(() => {
              this.getValidateCodeToken();
              this.loading = false
            })
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },
      visitorAccount(){
        this.loginForm.username = 'visitor';
        this.loginForm.password = 'visitor';
        this.handleLogin()();
      },
    },
    mounted: function() {
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    }
  }
</script>

<style scoped>
  .login-form-layout {
    background: rgba(0, 0, 0, 0.2);
    z-index: 3;
    position: fixed;
    top: 5%;
    right: 10%;
    width: 360px;
    margin: 100px auto;
    border-top: 10px solid #00bcd4;
  }
  .description{
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
    position: fixed;
    top: 20px;
    left: 5%;
    width: 360px;
    /*margin: 140px auto;*/
    color: #f6bed6;
    /*border-top: 10px solid #00bcd4;*/
  }

  .color-main{
    color: #00bcd4;
  }

  .login-title {
    text-align: center;
  }

  .homepage-hero-module,
  .login-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-container .poster img,
  .login-container video {
    z-index: 0;
    position: absolute;
  }

  .login-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.1);
  }
</style>

