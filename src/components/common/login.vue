<template>
  <div id="Login">
    <form class="gd-card" style="text-align:center;width:370px;">
      <div class="gd-card-header">
        <span>登录</span>
        <span style="position:absolute;right:20px;cursor:pointer;" @click="goBack">X</span>
      </div>
      <div class="ui message yellow" v-show="!loginRes">{{ msgbox }}</div>
      <div class="gd-card-content">
        <img src="../../../static/img/vlogo.png" alt="logo" style="width:100%;height:200px;">
        <div class="gd-form-item">
          <!-- <label class="gd-label">用户名</label> -->
          <input
            class="gd-input input100"
            type="text"
            placeholder="用户名 / 邮箱"
            v-model="thisData.id"
            required="required"
          />
        </div>
        <div class="gd-form-item">
          <!-- <label class="gd-label">密码</label> -->
          <input
            class="gd-input input100"
            type="password"
            placeholder="密码"
            v-model="thisData.pwd"
            required="required"
          />
        </div>
        <div class="gd-form-item discenter">
          <button type="button" class="btn blue btn100" @click="login">登录</button>
        </div>
        <div class="gd-form-item discenter">
          <router-link
            tag="button"
            to="/register"
            type="button"
            class="btn white btn100"
            @click="login"
          >注册</router-link>
        </div>
        <div class="disleft">
          <router-link to="/forgetpassword" tag="button" class="btn-link">忘记密码?</router-link>
        </div>
      </div>
      <!-- <div class="gd-card-footer">
        <span>分享网站</span>
      </div> -->
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginRes: true, //登录的结果
      thisData: {
        //登录的参数
        id: null,
        pwd: null
      },
      msgbox: ""
    };
  },
  Mounted() {},
  methods: {
    goBack() {
      window.history.go(-1);
    },
    checkInput() {
      var flag = true;
      for (let key in this.thisData) {
        if (this.thisData[key] == "") {
          flag = false;
          this.loginRes = false;
          this.msgbox = "请填写用户名和密码";
        }
      }
      if (flag == true) {
        this.loginRes = true;
        this.msgbox = "";
      }
      return flag;
    },
    login() {
      if (this.checkInput()) {
        this.thisData.last_login = this.thisDate();
        this.axios
          .post("/api/index.php/login/tolog", this.thisData)
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.loginRes = true;
              this.msgbox = "登陆成功";
              this.$store.commit("changeLogin", true);
              this.$store.commit("setUser", this.thisData.id);
              localStorage.setItem('islogin',true);
              localStorage.setItem('userid',this.thisData.id)
              console.log(
                "$store login:" +
                  this.$store.state.islogin +
                  ",userid:" +
                  this.$store.state.userid
              );
              this.getUserInfo();
              window.history.go(-1);
            } else {
              this.loginRes = false;
              this.$store.commit("changeLogin", false);
              this.$store.commit("setUser", "");
              this.msgbox = "用户名或密码输入错误";
            }
          });
      }
    },
    thisDate() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() +
        "/" +
        month +
        "/" +
        strDate +
        " " +
        date
          .getHours()
          .toString()
          .padStart(2, "0") +
        ":" +
        date
          .getMinutes()
          .toString()
          .padStart(2, "0") +
        ":" +
        date
          .getSeconds()
          .toString()
          .padStart(2, "0");
      return currentdate;
    },
    getUserInfo() {
      this.axios
        .post("/api/index.php/user/getinfo", {
          id: this.$store.state.userid
        })
        .then(res => {
          if (res.data.data.user_tag) {
            res.data.data.user_tag = res.data.data.user_tag.split(";");
          }
          this.$store.commit("setUserInfo", res.data.data);
          localStorage.setItem('userinfo',res.data.data);
        });
    }
  }
};
</script>
<style>
#Login {
  display: flex; /* width: 80%;
  max-width: 700px; */
  justify-content: center;
  margin: 0 auto;
}
</style>