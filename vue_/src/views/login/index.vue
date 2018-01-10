<template>
    <div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
    <div id="canvascontainer" ref='can'></div>

    <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules"  class="card-box login-form login-form-box">
        <h2 class='login-title'>登錄</h2>
        <Form-item prop="username">
            <Input type="text" v-model="loginForm.username" placeholder="请输入用户名" autoComplete="on">
                <Icon type="ios-person-outline" slot="prepend" ></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="handleLogin">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item  prop="jurisdiction">
            <Select v-model="loginForm.jurisdiction" placeholder="请输入用户类型" >
              <Option v-for="item in jurisdictionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleLogin('loginForm')" long>登录</Button>
        </Form-item>
         <div @click="goReigster">
            <div style='width: 330px; height: 32px; margin: 0 auto; background-color: #2d8cf0; color: #fff; text-align: center; line-height: 32px; border-radius: 5px; '>快速註冊</div>
        </div>
        <div class='tips'>普通用户账号为:user01 密码123456， 仅支持预览</div>
        <div class='tips'></div>
      </Form>

      <Form ref="register" autoComplete="on" :model="registerFrom" :rules="loginRules"  class="card-box login-form register-form-box " >
        <h2 class='register-title'>注册</h2>
        <Form-item prop="username">
            <Input type="text" v-model="registerFrom.username" placeholder="请输入用户名" autoComplete="on">
                <Icon type="ios-person-outline" slot="prepend" ></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="registerFrom.password" placeholder="请输入密码" @keyup.enter.native="handleLogin">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="phone">
            <Input type="text" v-model="registerFrom.phone" placeholder="请输入手机号码" @keyup.enter.native="handleLogin">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <FormItem label="性别" prop="gender" >
            <RadioGroup v-model="registerFrom.gender">
                <Radio label="1">男</Radio>
                <Radio label="0">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="出生日期" prop="age">
            <DatePicker type="date" placeholder="请选择出生日期" v-model="registerFrom.age"></DatePicker>
        </FormItem>
        <Form-item  prop="jurisdiction">
            <Select v-model="registerFrom.jurisdiction" placeholder="请输入用户类型" >
              <Option v-for="item in jurisdictionListRegister" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Form-item>
        <Form-item>
            <Button type="primary" @click='handRegister' long>註冊</Button>
        </Form-item >
         <div @click='goLogin'>
            <div style='width: 330px; height: 32px; margin: 0 auto; background-color: #2d8cf0; color: #fff; text-align: center; line-height: 32px; border-radius: 5px; '>返回登錄</div>
        </div>
           </Form>

          <!-- 超级三角  start -->
            <canvas></canvas>
          <!-- 超级三角  end -->

          <!-- 可爱的猫  start -->
          <div class="cat" style='display: none;'>
            <div class="ear left"></div>
            <div class="ear right"></div>
            <div class="eye left">
              <div class="lash"></div>
              <div class="shine"></div>
            </div>
            <div class="eye right">
              <div class="lash"></div>
              <div class="shine"></div>
            </div>
            <div class="nose"></div>
            <div class="mouth"></div>
          </div>
          <!-- 可爱的猫  end -->
          </div>
</template>

<script>
    import { isWscnEmail, isPhone } from 'utils/validate';
    import Cookies from 'js-cookie'
    import tooles from '../../utils/tools'
    let setLogin = tooles.setLogin;
    export default {
      name: 'login',
      data() {
        const validateEmail = (rule, value, callback) => {
          if (!isWscnEmail(value)) {
            callback(new Error('请输入正确的合法邮箱'));
          } else {
            callback();
          }
        };
        const validatePass = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码不能小于6位'));
          } else {
            callback();
          }
        };
        const validatePhone = (rule, value, callback) => {
          if (!isPhone(value)) {
            callback( new Error('请输入正确的手机号码'));
          } else {
            callback();
          }
        }

        return {
          loginForm: {
            email: 'user01@user.com',
            username: "user01",
            password: '123456',
            jurisdiction: '',
          },
          loginRules: {
            email: [
                { required: true, trigger: 'blur', validator: validateEmail }
            ],
            username: [
              { required: true , trigger: "blur"}
            ],
            password: [
                { required: true, trigger: 'blur', validator: validatePass }
            ],
            phone: [
              { required: true, trigger: 'blur', validator: validatePhone }
            ],
            jurisdiction: [
              { required: true, trigger: 'blur', message: "请输入用户类型" }
            ],
            gender: [
              { require: true, trigger: 'blur', message: '请选择性别' }
            ],
            // age: [
            //     { trigger: 'blur', message: '请选择出生日期' }
            // ]
          },
          registerFrom: {
            username: "admin@01.com",
            password: '123456',
            jurisdiction: 'teacher-normal',
            phone: "18816780001",
            gender: '1',
            age: '2017-11-10'
          },
          loading: false,
          showDialog: false,
          jurisdictionList: [
                    {
                        value: 'admin',
                        label: '管理员'
                    },
                    {
                        value: 'teacher-normal',
                        label: '普通用户'
                    }
                ],
          jurisdictionListRegister: [
                    {
                        value: 'teacher-normal',
                        label: '普通用户'
                    },
                    // {
                    //     value: 'admin',
                    //     label: '管理员'
                    // },
          ]
        }
      },
       mounted () {
        this.setTriangle();
       },
      methods: {
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.reqLogin();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        reqLogin() {
              if (this.loading) {
                return ;
              }
              this.loading = true;
              this.vFetch.login(this.loginForm).then((res) => {
                if (res.status == 200 ) {
                  this.$Message.success(res.message);
                  setLogin(res);
                  this.$router.push({ path: '/' });
                } else {
                  this.$Message.error(res.message);
                }
                this.loading = false;
              }).catch((err) => {
                  this.$Message.warning(`发生异常: ${err}`);
                  this.loading = false;
              })
        },
        afterQRScan() {
          // const hash = window.location.hash.slice(1);
          // const hashObj = getQueryObject(hash);
          // const originUrl = window.location.origin;
          // history.replaceState({}, '', originUrl);
          // const codeMap = {
          //   wechat: 'code',
          //   tencent: 'code'
          // };
          // const codeName = hashObj[codeMap[this.auth_type]];
          // if (!codeName) {
          // } else {
          //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
          //     this.$router.push({ path: '/' });
          //   });
          // }
        },
        //超级三角；
        setTriangle() {
          var timer, bai, canvas, ctx;
          canvas = document.getElementsByTagName('canvas')[0];
          ctx = canvas.getContext('2d');
          window.addEventListener('resize', function() {
            clearTimeout(timer);
            timer = setTimeout(init, 200);
          }, false);
          init();
          aaa();

          function init() {
            clearTimeout(timer);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            bai = (canvas.width > canvas.height) ? canvas.height : canvas.width;
            bai = bai / 200;
          }

          function aaa() {
            var a, b, tim, max, tx, ty, x, y, s, pen, h, r, rr, t, sou, sbai, han, o, ra;
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "lighter";
            tim = new Date().getTime() / 31;
            rr = 1 + Math.sin(tim / 17) * 0.8;
            sou = 4 + Math.sin(tim / 29) * 3;
            sbai = 2 + Math.sin(tim / 31) * 1.5;
            ra = Math.sin(tim / 37);
            max = 200;
            pen = bai * 100;
            h = Math.pow(3, 0.5) / 3 * pen;
            x = canvas.width / 2;
            y = canvas.height / 2;
            for (a = 0; a < max; a++) {
              s = 0.0 + (a + 1) / max * 1.0;
              s *= s;
              r = tim / 87 + (Math.sin(a / max * 5 + tim / 49) / 5 + Math.sin(a / max * 7 - tim / 53) / 7) * rr;
              for (b = 0; b < 3; b++) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate((r + Math.PI * 2 / 3 * b) % (Math.PI * 2));
                ctx.translate(-x, -y);
                t = Math.sin(tim / 73 - s * sou + b * ra) * sbai + 0.5;
                o = 0;
                if (t < 0) {
                  t = 0;
                  o = 1;
                }
                if (t > 1) {
                  t = 1;
                  o = 1;
                }
                ctx.fillStyle = ctx.strokeStyle = "hsla(" + (((244 + t * 140) | 0) % 360) + ",60%,60%,0.5)";
                if (!o) {
                  han = 0.5 - Math.cos(t * Math.PI * 2) / 2;
                  han *= s * 20 * bai;
                }
                t *= Math.PI * 2 / 6 * 5;
                ctx.translate(x + pen * s, y - h * s);
                ctx.rotate(t);
                ctx.translate(-x - pen * s, -(y - h * s));
                ctx.beginPath();
                ctx.lineTo(x - pen * s, y - h * s);
                ctx.lineTo(x + pen * s, y - h * s);
                ctx.stroke();
                if (!o) {
                  ctx.beginPath();
                  ctx.arc(x - pen * s, y - h * s, han, 0, Math.PI * 2, 0);
                  ctx.fill();
                }
                ctx.restore();
              }
            }
            requestAnimationFrame(aaa);
          }
        },
        //f翻转到注册页面；
        goReigster() {
          // 注册页翻转，  登录页翻转；
          var registerEL = this.$refs.register.$el;
          registerEL.classList.add('animate-roteate-180-0');
          registerEL.classList.remove('animate-roteate180');
          var loginEL = document.querySelector(".login-form-box");
          loginEL.classList.add('animate-roteate180');
          loginEL.classList.remove('animate-roteate-180-0');
        },
        //翻轉到登錄頁面；
        goLogin() {
            var loginFormEL = this.$refs.loginForm.$el;
            var registerEL = this.$refs.register.$el;
            loginFormEL.classList.remove("animate-roteate180");
            loginFormEL.classList.add('animate-roteate-180-0');
            registerEL.classList.add('animate-roteate180');
            registerEL.classList.remove('animate-roteate-180-0');
        },
        //注册；
        handRegister() {
          this.$refs.register.validate(valid => {
              if (valid) {
                this.reqRegister();
              } else {
                this.$Message.error("请填写表单");
                return false;
              }
          })
        },
        reqRegister(){
          if (this.loading) {
            return ;
          }
          this.loading = true;
          this.vFetch.register(this.registerFrom).then(res => {
            this.loading = false;
            this.$Message.info(res.message);
            if (res.status == 200) {
                this.loginForm = this.registerFrom;
                this.reqLogin();
            }
          } ).catch(err => {
            this.$Message.error(err.toString());
            this.loading = false;
          })
        }
      },
    }
</script>
<style>
.login-container a{color:#0078de;}
#canvascontainer{
  position: absolute;
  top: 0px;
}
.wz-input-group-prepend{
  background-color: #141a48;
   border: 1px solid #2d8cf0;
   border-right: none;
   color:  #2d8cf0;
}
/* 将注册页进行180度翻转； */
.register-form{
    /* backface-visibility: hidden; */
  /* -webkit-backface-visibility: hidden; */
  transform-style: preserve-3d;
  perspective: 500;
  /* transition: transform 2s; */
  /* animation: anrotate 5s infinite; */
  /* animation: animate-rotate180 7s ease-in-out alternate 1; */
}

.login-form-box{

}
.register-form-box{
  transform: rotateY(180deg);
    backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animate-roteate180{
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  /* alternate */
  animation: animate-rotate180 3s linear forwards 1;
}
.animate-roteate-180-0{
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  animation: animate-rotate-180-0 3s linear forwards 1;
}

.animate-roteate360{
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  /* animation: animate-rotate360 3s linear normal 1; */
}

@keyframes animate-rotate180 {
  0% {
    transform: rotateY(0);
    -webkit-transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
  }
}


@keyframes animate-rotate-180-0 {
  0% {
        transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0);
    -webkit-transform: rotateY(0);
  }
}

@keyframes animate-rotate360 {
  0% {
    transform: rotateY(0);
    -webkit-transform: rotateY(0);
  }
  50% {
    transform: rotateY(360deg);
    -webkit-transform: rotateY(360deg);
  }
  100% {
    transform: rotateY(0deg);
    -webkit-transform: rotateY(0deg);
  }
}

</style>

<style>

  /* 超级三角  */
    * {
      margin: 0;
      padding: 0;
      border: 0;
    }

    canvas {
      display: block;
    }

    /* 可爱的猫 */
    body {
      width: 100%;
      height: 100%;
      background-color: #473829;
    }

    .cat {
      position: absolute;
      top: 100px;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 40%;
      height: 0;
      padding-bottom: 35%;
      margin: auto;
      background-color: #FFF7EA;
      border-radius: 100%;
      box-shadow: inset rgba(0, 0, 0, 0.05) -4px -6px 0 4px, inset rgba(0, 0, 0, 0.05) -8px -10px 0 8px, rgba(0, 0, 0, 0.2) 4px 6px 0 2px, rgba(0, 0, 0, 0.1) 4px 10px 0 6px;
      -webkit-animation: head-turn 7s ease-in-out alternate infinite;
              animation: head-turn 7s ease-in-out alternate infinite;
              margin: 0 auto;
    }

    .ear {
      position: absolute;
      top: -15%;
      width: 45%;
      height: 50%;
      background: #FFF7EA;
      z-index: -1;
    }
    .ear:before {
      content: "";
      position: absolute;
      bottom: 22%;
      width: 60%;
      height: 60%;
      background: #f4e0dc;
    }
    .ear:after {
      content: "";
      position: absolute;
      bottom: 15%;
      width: 60%;
      height: 40%;
      background: #FFF7EA;
      border-radius: 100%;
    }
    .ear.left {
      left: -5%;
      border-radius: 100% 10%;
      -webkit-transform: rotate(-70deg);
              transform: rotate(-70deg);
      box-shadow: inset #FFF7EA 6px -12px 0 6px, inset rgba(0, 0, 0, 0.05) -8px -4px 0 2px, inset rgba(0, 0, 0, 0.05) -4px 10px 0 4px;
    }
    .ear.left:before {
      left: 18%;
      border-radius: 100% 10%;
      box-shadow: inset rgba(0, 0, 0, 0.05) 2px -10px 0 4px;
    }
    .ear.left:after {
      left: 12%;
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
    }
    .ear.right {
      right: -5%;
      border-radius: 10% 100%;
      -webkit-transform: rotate(70deg);
              transform: rotate(70deg);
      box-shadow: inset rgba(0, 0, 0, 0.05) 4px 8px 0 2px, inset rgba(0, 0, 0, 0.05) 4px 14px 0 4px;
    }
    .ear.right:before {
      right: 18%;
      border-radius: 10% 100%;
      box-shadow: inset rgba(0, 0, 0, 0.05) -2px 6px 0 4px;
    }
    .ear.right:after {
      right: 12%;
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
    }

    .eye {
      position: absolute;
      top: 20%;
      width: 28%;
      height: 40%;
      background: black;
    }
    .eye:before {
      content: "";
      position: absolute;
      top: 25%;
      right: 5%;
      width: 25%;
      height: 20%;
      background-color: #FFF7EA;
      border-radius: 100%;
      -webkit-animation: twitch 0.1s linear infinite alternate;
              animation: twitch 0.1s linear infinite alternate;
    }
    .eye:after {
      content: "";
      position: absolute;
      top: 45%;
      right: 28%;
      width: 10%;
      height: 8%;
      background-color: #FFF7EA;
      border-radius: 100%;
      -webkit-animation: twitch 0.12s linear alternate infinite;
              animation: twitch 0.12s linear alternate infinite;
    }
    .eye.left {
      left: 15%;
      border-radius: 100% 100% 80% 100%;
      box-shadow: inset #FFF7EA 6px 0 0 0px, inset #67523c 14px -2px 0 0, black -2px 1px 0 1px;
      -webkit-transform: rotate(-5deg);
              transform: rotate(-5deg);
    }
    .eye.left:before {
      right: 8%;
    }
    .eye.left:after {
      right: 30%;
    }
    .eye.right {
      right: 15%;
      border-radius: 100% 100% 100% 80%;
      box-shadow: inset #FFF7EA -6px 0 0 0px, inset #67523c -14px -2px 0 0, black 2px 1px 0 1px;
      -webkit-transform: rotate(5deg);
              transform: rotate(5deg);
    }
    .eye.right:before {
      left: 8%;
    }
    .eye.right:after {
      left: 30%;
    }

    .lash {
      position: absolute;
      top: 2%;
      width: 12%;
      height: 16%;
      border-radius: 100%;
    }
    .lash:after {
      content: "";
      position: absolute;
      top: 30%;
      width: 60%;
      height: 80%;
      border-radius: 100%;
    }
    .left .lash {
      left: -2%;
      box-shadow: black -4px 2px 0;
      -webkit-transform: rotate(-50deg);
              transform: rotate(-50deg);
    }
    .left .lash:after {
      left: -115%;
      box-shadow: black -3px 4px 0;
    }
    .right .lash {
      right: -2%;
      box-shadow: black 4px 2px 0;
      -webkit-transform: rotate(50deg);
              transform: rotate(50deg);
    }
    .right .lash:after {
      right: -115%;
      box-shadow: black 3px 4px 0;
      -webkit-transform: rotate(-5deg);
              transform: rotate(-5deg);
    }

    .shine {
      position: absolute;
      bottom: 15%;
      width: 35%;
      height: 15%;
      background: #FFF7EA;
    }
    .left .shine {
      left: 15%;
      border-radius: 100% 20%;
    }
    .right .shine {
      right: 15%;
      border-radius: 20% 100%;
    }

    .nose {
      position: absolute;
      top: 60%;
      right: 0;
      left: 0;
      margin: auto;
      background: #cbb8a4;
      width: 8%;
      height: 6%;
      border-radius: 100% 100% 100px 100px;
      box-shadow: inset rgba(0, 0, 0, 0.05) -4px -2px 0 2px, rgba(0, 0, 0, 0.1) 2px 2px 0 0;
      z-index: 2;
    }

    .mouth {
      position: absolute;
      right: 0;
      bottom: 12%;
      left: 0;
      margin: auto;
      width: 15%;
      height: 15%;
      background: #FF0066;
      border-radius: 100%;
      z-index: 1;
      box-shadow: inset rgba(0, 0, 0, 0.6) 0 16px 0 0, inset rgba(0, 0, 0, 0.2) 0 20px 0 2px, inset rgba(0, 0, 0, 0.05) 0 20px 0 6px;
      -webkit-animation: breathe-in 2s ease-out infinite;
              animation: breathe-in 2s ease-out infinite;
    }
    .mouth:before, .mouth:after {
      content: "";
      position: absolute;
      top: -35%;
      width: 75%;
      height: 65%;
      background: #FFF7EA;
      border-radius: 100%;
      -webkit-animation: breathe-out 2s ease-out infinite;
              animation: breathe-out 2s ease-out infinite;
    }
    .mouth:before {
      left: -22%;
      box-shadow: rgba(0, 0, 0, 0.8) -1px 3px 0;
    }
    .mouth:after {
      right: -22%;
      box-shadow: rgba(0, 0, 0, 0.8) 1px 3px 0;
    }

    @-webkit-keyframes twitch {
      to {
        -webkit-transform: translate(2px, 2px);
                transform: translate(2px, 2px);
      }
    }

    @keyframes twitch {
      to {
        -webkit-transform: translate(2px, 2px);
                transform: translate(2px, 2px);
      }
    }
    @-webkit-keyframes head-turn {
      0% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
      15% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
      25% {
        -webkit-transform: rotate(4deg);
                transform: rotate(4deg);
      }
      40% {
        -webkit-transform: rotate(4deg);
                transform: rotate(4deg);
      }
      50% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
      60% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
      70% {
        -webkit-transform: rotate(-3deg);
                transform: rotate(-3deg);
      }
      75% {
        -webkit-transform: rotate(-2deg);
                transform: rotate(-2deg);
      }
      85% {
        -webkit-transform: rotate(-2deg);
                transform: rotate(-2deg);
      }
      95% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
    }
    @keyframes head-turn {
      0% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
      15% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
      25% {
        -webkit-transform: rotate(4deg);
                transform: rotate(4deg);
      }
      40% {
        -webkit-transform: rotate(4deg);
                transform: rotate(4deg);
      }
      50% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
      60% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
      70% {
        -webkit-transform: rotate(-3deg);
                transform: rotate(-3deg);
      }
      75% {
        -webkit-transform: rotate(-2deg);
                transform: rotate(-2deg);
      }
      85% {
        -webkit-transform: rotate(-2deg);
                transform: rotate(-2deg);
      }
      95% {
        -webkit-transform: rotate(0);
                transform: rotate(0);
      }
    }
    @-webkit-keyframes breathe-out {
      50% {
        -webkit-transform: translateY(2px);
                transform: translateY(2px);
      }
      100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
      }
    }
    @keyframes breathe-out {
      50% {
        -webkit-transform: translateY(2px);
                transform: translateY(2px);
      }
      100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
      }
    }
    @-webkit-keyframes breathe-in {
      50% {
        -webkit-transform: translateY(-4px);
                transform: translateY(-4px);
      }
      100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
      }
    }
    @keyframes breathe-in {
      50% {
        -webkit-transform: translateY(-4px);
                transform: translateY(-4px);
      }
      100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
      }
    }
  /* 可爱的猫 end; */
</style>


<style rel="stylesheet/scss" lang="scss">
    .login-title{
      text-align: center;
      color: red;
    }
    .register-title{
      text-align: center;
      color: red;
    }
     .tips{
      font-size: 18px;
      color: darkcyan;
      margin-bottom: 5px;
    } 
    .login-container {
        height: 100vh;
        background-color: #2d3a4b;

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 1px solid #2d8cf0;
            -webkit-appearance: none;
            border-radius: 3px;
            padding: 12px 5px 12px 15px;
            color: fuchsia;
            height: 47px;
            font-size: 20px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }

        .title {
            font-size: 26px;
            font-weight: 400;
            color: #eeeeee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            z-index: 10;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
            background: transparent;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .forget-pwd {
            color: #fff;
        }
    }
    .ivu-form-item-content {
      background: transparent;
    }
</style>
