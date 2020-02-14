<template>
  <div id="register">
    <div class="ui error form segment">
      <div v-show="handleRes == false " class="ui error message">
        <div class="header">操作失败</div>
        <p>{{ msgbox }}</p>
      </div>
      <div class="field">
        <label>用户名</label>
        <input placeholder="Username" type="text" v-model="thisData.user_id"/>
      </div>
      <div class="field">
        <label>密码</label>
        <input type="password" placeholder="Password" v-model="thisData.user_password" />
      </div>
      <div class="field">
        <label>邮箱</label>
        <input type="email" placeholder="Email" v-model="thisData.user_mail" />
      </div>
      <div class="fields">
        <div class="ten wide field">
          <label>验证码</label>
          <input type="text" placeholder="Code" />
        </div>
        <div class="six wide field">
          <label>-</label>
          <div class="ui submit teal button">获取验证码</div>
        </div>
      </div>

      <div class="inline field">
        <div class="ui checkbox">
          <input type="checkbox" />
          <label>I agree to the Terms and Conditions</label>
        </div>
      </div>
      <div class="ui submit button" @click="handleSubmit">注册</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      thisData: {},
      handleRes:true,
      msgbox:''
    };
  },
  Mounted() {
    $(".dropdown").dropdown({
      // you can use any ui transition
      transition: "drop"
    });
  },
  methods: {
    handleSubmit() {
      this.axios
        .post("/api/index.php/register/adduser", this.thisData)
        .then(res => {
          if (res.data.code === 1) {
            this.handleRes = true
            this.msgbox = ''
            this.$store.commit("changeLogin", true);
            this.$store.commit("setUser", this.thisData.id);
          } else {
            this.handleRes = false
            this.msgbox = res.data.msg;
            this.$store.commit("changeLogin", false);
            this.$store.commit("setUser", '');
          }
        });
    },
    testUserIdFunc() {
      //检测用户名是否已经注册
      var thisvue = this;
      var testall = /^[a-zA-Z][a-zA-Z0-9]*$/; //只能是数字和字母
      if (thisvue.userid == "") {
        thisvue.testUserId = false;
        return 0;
      } else if (!testall.test(thisvue.userid)) {
        //检测英文和数字
        this.errorFlag = 1;
        this.errorMsg = "用户名必须以英文开头，且只能由英文和数字组成";
      } else if (thisvue.userid.length < 9) {
        thisvue.errorFlag = 1;
        thisvue.errorMsg = "用户名长度须在9-16之间";
        thisvue.testUserId = false;
        return 0;
      } else {
        $.ajax({
          type: "POST",
          url: "../server/testUserId.php",
          data: {
            user_id: thisvue.userid
          },
          success: function(res) {
            if (res.code == 1) {
              thisvue.testUserId = true;
              thisvue.errorFlag = 0;
            } else {
              thisvue.testUserId = false;
              thisvue.errorFlag = 1;
              thisvue.errorMsg = res.msg;
            }
          }
        });
      }
    },
    readInfo() {
      //检索密码安全等
      var result = 1;
      var testall = /^(?!\d+$)[\da-zA-Z]+$/; //只能是数字和字母
      if (this.usercode.length < 9) {
        //检测长度
        this.errorFlag = 1;
        this.errorMsg = "密码长度须在9-20个字符，只能由英文和数字组成";
        result = 0;
      } else if (!testall.test(this.usercode)) {
        //检测英文和数字
        this.errorFlag = 1;
        this.errorMsg = "密码只能使用英文+数字,且不能为纯数字";
        result = 0;
      } else if (this.usercode != this.usercodes) {
        this.errorFlag = 1;
        this.errorMsg = "两次密码输入不一致";
        result = 0;
      }
      /*else if(testenglish.test(this.usercode))
                {
                    this.errorFlag = 1;
                    this.errorMsg = '密码不能为纯数字';
                    result = 0;
                }*/

      if (result == 1) {
        this.errorFlag = 0;
        this.testpass = 1; //如果密码验证成功，则通过
      }
      return result;
    },
    register() {
      var thisvue = this;
      if (thisvue.usermail == "" || thisvue.code == "") {
        thisvue.errorMsg = "你还没有进行邮箱验证";
        thisvue.errorFlag = 1;
      } else {
        thisvue.verifyCode();
        $.ajax({
          url: "../server/register.php",
          type: "POST",
          data: $("#registerForm").serialize(),
          success: function(res) {
            if (res.code == 1) {
              window.location.href = "indexmobile.html";
            } else {
              thisvue.errorMsg = "注册失败";
              thisvue.errorFlag = 1;
            }
          }
        });
      }
    },
    getCode() {
      //获取验证码
      if (
        this.userid == "" ||
        this.username == "" ||
        this.usercode == "" ||
        this.usercodes == "" ||
        this.usermail == ""
      ) {
        this.errorFlag = 1;
        this.errorMsg = "请填写全部的信息后获取验证码";
      } else if (this.usercode != this.usercodes) {
        this.errorFlag = 1;
        this.errorMsg = "两次密码输入不一致";
      } else {
        var thisvue = this;
        thisvue.btnGetCode = 1; //把获取验证码按钮禁用
        var timer1 = setInterval(function() {
          thisvue.clock = thisvue.clock - 1;
        }, 1000);
        setTimeout(function() {
          clearInterval(timer1);
          thisvue.btnGetCode = 0;
          thisvue.clock = 60;
        }, 60000);
        //发送邮件
        $.ajax({
          type: "POST",
          url: "../server/mail/sendMail.php",
          async: false,
          data: {
            address: thisvue.usermail
          },
          success: function(res) {
            if (res.code == 1) {
              thisvue.errorFlag = 1;
              thisvue.errorMsg = "我们发送了一封邮件到你的邮箱，请尽快验证";
            }
          }
        });
      }
    },
    verifyCode() {
      //验证验证码
      var thisvue = this;
      if (thisvue.code > 100000 && thisvue.code < 999999) {
        $.ajax({
          type: "POST",
          url: "../server/mail/verifyCode.php",
          data: { code: thisvue.code },
          success: function(res) {
            if (res.code == "1") {
              thisvue.testcode = 1;
            } else {
              thisvue.errorFlag = 1;
              thisvue.errorMsg = "验证码不正确，请重新输入";
              return 0;
            }
          }
        });
      }
    },
    testmailFunc() {
      var thisvue = this;
      if (this.usermail != "" && this.usermail.indexOf("@") != "") {
        $.ajax({
          type: "POST",
          url: "../server/testmail.php",
          data: {
            user_mail: thisvue.usermail
          },
          success: function(res) {
            if (res.code == 1) {
              thisvue.testmail = true;
              thisvue.errorFlag = 0;
            } else {
              thisvue.testmail = false;
              thisvue.errorFlag = 1;
              thisvue.errorMsg = "此邮箱已被注册,换个邮箱试试吧";
            }
          }
        });
      }
    }
  }
};
</script>
<style>
#register {
  width: 80%;
  max-width: 700px;
  margin: 0 auto;
}
</style>