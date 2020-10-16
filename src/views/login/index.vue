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
      <el-card class="login-layout">
        <div style="text-align: center">
          <svg-icon icon-class="login-rms" style="width: 56px;height: 0px;color: #409eff"></svg-icon>
        </div>
        <h1 class="login-title color-main">RMS-资源管理系统</h1>
        <div class="login_header_title" style="margin-bottom: 10px;text-align: center">
          <a href="javascript:;" class="login-tab" :class="{on: loginWay}" @click="loginWay=true">账号密码登录</a>
          <a href="javascript:;" class="login-tab" :class="{on: !loginWay}" @click="loginWay=false">手机免密登录</a>
        </div>
        <el-form v-if="loginWay"
                 autoComplete="on"
                 :model="loginForm"
                 :rules="loginRules"
                 ref="loginForm"
                 label-position="center">
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
                <img :src="imageCodeUrl + uuid" @click="refreshImage()">
              </span>
            </el-input>
          </el-form-item>s
          <el-form-item style="margin-bottom: 60px;text-align: center">
            <el-button class="color-main" style="width: 45%;background-color: #00bcd4;border-color: #00bcd4;font-weight: bold;color: #000000" type="primary" :loading="loading" @click.native.prevent="handleLogin">
              登&nbsp;&nbsp;&nbsp;&nbsp;录
            </el-button>
            <el-button class="color-main"style="width: 45%;border-color: #00bcd4;font-weight: bold;color: #000000" type="primary" @click.native.prevent="visitorAccount">
              游客账户获取
            </el-button>
          </el-form-item>
        </el-form>
        <el-form v-if="!loginWay"
                 autoComplete="on"
                 :model="loginSms"
                 :rules="smsRules"
                 ref="loginSms"
                 label-position="center">
          <el-form-item prop="phone">
            <el-input name="phone"
                      type="text"
                      v-model="loginSms.phone"
                      autoComplete="on"
                      placeholder="手机号码">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
              <span slot="suffix" @click="getSmsCode">
                <span icon-class="eye" class="color-main">{{computeTime>0 ? `(${computeTime}s)已发送` : '获取验证码'}}</span>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="smsCode">
            <el-input name="smsCode" type="text" v-model="loginSms.smsCode" autoComplete="on" placeholder="请输入验证码">
              <span slot="prefix">
                <svg-icon icon-class="password" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 60px;text-align: center">
            <el-button class="color-main" style="width: 45%;background-color: #00bcd4;border-color: #00bcd4;font-weight: bold;color: #000000" type="primary" :loading="loading" @click.native.prevent="handleLoginSms">
              登&nbsp;&nbsp;&nbsp;&nbsp;录
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
  import {isvalidUsername,validatePhoneNumber} from '@/utils/validate';
  import {setCookie,getCookie} from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'
  import login_cover_mp4 from '@/assets/videos/coverr-golden-gate-bridge.mp4';
  import login_cover_webm from '@/assets/videos/login_cover.webm';
  import login_gb from '@/assets/images/login_bg.jpg';
  import {sendSmsCode} from '@/api/login';
  //引入uuid文件
  import uuidv1 from 'uuid/v1';
  import {Message} from 'element-ui'


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
        if (value.length !== 4) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      };
      const validatePhone = (rule, value, callback) => {
        if (!validatePhoneNumber(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      };
      const validateSmsCode = (rule, value, callback) => {
        if (value < 4) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      };
      return {
        uuid: uuidv1(),//生成唯一编码
        imageCodeUrl: process.env.API_GATEWAY_SERVER + '/auth/code/image/', //获取图片验证码地址
        computeTime: 0, //短信验证码计时器
        loginWay:true,//true代表账户密码登陆, false代表手机免密登录
        //用户名密码登录参数
        loginForm: {
          username: '',
          password: '',
          imageCode: '',
          deviceId: '',
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          imageCode: [{required: true, trigger: 'blur', validator: validateImageCode}],
        },
        //短信验证码登录参数
        loginSms: {
          deviceId: '',
          phone: '',
          smsCode: '',
        },
        smsRules:{
          phone: [{required: true, trigger: 'blur', validator: validatePhone}],
          smsCode: [{required: true, trigger: 'blur', validator: validateSmsCode}],
        },
        baseURL:this.baseURL,
        loading: false,
        pwdType: 'password',
        login_center_bg,
        supportDialogVisible:false,

        vedioCanPlay: false,
        fixStyle: '',
        login_cover_mp4,
        login_cover_webm,
        login_gb,
        tabOne: 'login-tab-active',
        tabTwo: 'login-tab-disactive',
      }
    },
    created() {
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
      refreshImage(){
        this.uuid = uuidv1();
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
            this.loginForm.deviceId = this.uuid;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false;
              setCookie("username",this.loginForm.username,15);
              setCookie("password",this.loginForm.password,15);
              this.$router.push({path: '/'})
            }).catch(() => {
              this.loading = false
              this.refreshImage();
            })
          } else {
            console.log('参数验证不合法！');
            this.refreshImage();
            return false
          }
        })
      },
      handleLoginSms(){
        console.log("进入handleLoginSms")
        this.$refs.loginSms.validate(valid => {
          if (valid) {
            this.loading = true;
            this.loginSms.deviceId = this.uuid;
            this.$store.dispatch('LoginSms', this.loginSms).then(() => {
              this.loading = false;
              this.$router.push({path: '/'})
            }).catch(() => {
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
      },
      alterToTabOne(){
        this.tabOne = 'login-tab-active';
        this.tabTwo = 'login-tab-disactive';
      },
      alterToTabTwo(){
        this.tabOne = 'login-tab-disactive';
        this.tabTwo = 'login-tab-active';
      },
      getSmsCode(){
        if(!this.computeTime){
          let params = {
            phone: this.loginSms.phone,
            deviceId: this.uuid
          }
          sendSmsCode(params).then(response => {
            if(response.code == 200){
              Message({
                message: response.data,
                type: 'success',
                duration: 3 * 1000
              })
              this.computeTime = 60;
              this.timer = setInterval(() => {
                this.computeTime --;
                if( this.computeTime <= 0){
                  clearInterval(this.timer)
                }
              }, 1000);
            }
          });

        }

      }
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
  .login-layout {
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
  .login_header_title a.on{
    color: #00BCD4;
    border-bottom: 3px solid #00BCD4;
  }

  .login-tab{
    width: 45%;
    font-weight: bold;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>

