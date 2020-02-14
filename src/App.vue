<template>
  <div id="app">
    <nav id="nav" class="gd-nav" style="margin-top:-15px;">
      <ul class="gd-nav-list">
        <li
          class="gd-nav-item"
          style="color:white!important;display:flex;align-items:center;margin-right:20px;font-weight:bold;font-size:1.2rem;"
        >摄 时 网</li>
        <router-link tag="li" class="gd-nav-item" to="/">
          <a class="active" href="javascript:void(0);">
            <img class="icon" src="../static/img/system/icon/home.svg" />首页
          </a>
        </router-link>
        <router-link tag="li" class="gd-nav-item" to="/tutorial">
          <a href="javascript:void(0);">
            <img class="icon" src="../static/img/system/icon/ondemand_video.svg" />教程
          </a>
        </router-link>
        <router-link tag="li" class="gd-nav-item" to="/gallery">
          <a href="javascript:void(0);">
            <img class="icon" src="../static/img/system/icon/camera-1.svg" />图库
          </a>
        </router-link>
        <router-link tag="li" class="gd-nav-item" to="/artist">
          <a href="javascript:void(0);">
            <img class="icon" src="../static/img/system/icon/people.svg" />摄影师
          </a>
        </router-link>
        <router-link tag="li" class="gd-nav-item" to="/zone">
          <a href="javascript:void(0);">
            <img class="icon" src="../static/img/system/icon/record_voice_over.svg" />全球动态
          </a>
        </router-link>
        <!-- <router-link tag="li" class="gd-nav-item" to="/pmaster">
          <a href="javascript:void(0);">
            <img class="icon" src="../static/img/system/icon/dollar.svg" />PMaster
          </a>
        </router-link> -->

        <router-link tag="li" class="gd-nav-item" to="/about">
          <a href="javascript:void(0);">
            <img class="icon" src="../static/img/system/icon/question_answer.svg" />关于
          </a>
        </router-link>
        <!-- <li class="gd-nav-item gd-nav-form">
          <input
            class="gd-input"
            type="text"
            style="border-top-right-radius:0;border-bottom-right-radius:0;"
            :placeholder="$store.state.location.City"
          />
          <a
            class="btn pink"
            href="more.html#/search"
            target="_blank"
            style="cursor:pointer;border-top-left-radius:0;border-bottom-left-radius:0;min-width:50px;"
          >
            <img class="icon" src="../static/img/system/icon/search.svg" />
          </a>
        </li> -->
        <a href="more.html#/money" target="_blank">
          <li
            class="gd-nav-item"
            style="position:absolute;right:170px;display:flex;align-items:center;"
            v-show="this.$store.state.islogin == true"
          >
            <i class="gd-film"></i>
            <span
              style="margin-left:10px;font-size:12px;color:lightgray;"
            >X {{ $store.state.userinfo.user_money }}</span>
          </li>
        </a>
        <li
          class="gd-nav-item"
          v-show="this.$store.state.islogin == true"
          style="position:absolute;right:0px;"
        >
          <a href="javascript:void(0);">
            <img class="avatar" :src="this.$store.state.userinfo.user_image" />{{ $store.state.userinfo.user_name }}
            <img class="icon" src="../static/img/system/icon/down.svg" />
            
          </a>
          <ul class="gd-nav-drop">
            <!-- <li>我的空间</li>
            <li>个人设置</li>
            <li>退出登录</li>-->
            <router-link tag="li" to="/myzone">
              <i class="icon home"></i>我的主页
            </router-link>
            <router-link tag="li" to="/person">
              <i class="icon setting"></i>个人设置
            </router-link>
            <router-link tag="li" to="/msg">
              <i class="icon gd-chat"></i>我的消息
            </router-link>
            <router-link tag="li" class to="/friends">
              <i class="icon user"></i>我的好友
              <div class="ui circular label">23</div>
            </router-link>
            <li>
              <a href="more.html#/apt" target="_blank">我的业务</a><div class="ui circular label">23</div>
            </li>
            <li class="item" @click="quitLogin">
              <i class="icon share"></i>退出登录
            </li>
          </ul>
        </li>
        <li
          class="gd-nav-item gd-nav-form"
          v-show="this.$store.state.islogin == false"
          style="position:absolute;right:10px;"
        >
          <router-link tag="button" class="btn yellow" to="/login">登录</router-link>&nbsp; &nbsp;
          <router-link tag="button" class="btn white" to="/register">注册</router-link>
          <!-- <button type="button" class="btn yellow">登录</button> -->
          <!-- <button type="button" class="btn white">注册</button> -->
        </li>
      </ul>

      <!-- <div class="right menu">
        <div class="item">
          <div class="ui icon input">
            <div
              class="ui compact selection dropdown"
              style="border-top-right-radius:0;border-bottom-right-radius:0;"
            >
              <i class="dropdown icon"></i>
              <div class="text">用户</div>
              <div class="menu">
                <div class="item">用户</div>
                <div class="item">文章</div>
                <div class="item">视频</div>
              </div>
            </div>
            <input
              type="text"
              placeholder="搜索内容"
              style="border-top-left-radius:0;border-bottom-left-radius:0;"
            />
          </div>
          <router-link
            tag="i"
            class="ui icon search"
            to="/search"
            style="margin-left:10px;cursor:pointer;"
          ></router-link>
        </div>
        <router-link v-show="this.$store.state.islogin == false" tag="a" class="item" to="/login">
          <div class="ui inverted teal button">登录</div>
        </router-link>
        <router-link
          v-show="this.$store.state.islogin == false"
          tag="a"
          class="item"
          to="/register"
        >
          <div class="ui inverted button">注册</div>
        </router-link>
        <div v-show="this.$store.state.islogin == true" class="ui dropdown item">
          <img class="ui avatar image" :src="this.$store.state.userinfo.user_image" />
          个人中心
          <span class="ui circular label red">66</span>
          <i class="dropdown icon"></i>
          <div class="menu">
            <router-link tag="a" class="item" to="/myzone">
              <i class="icon home"></i>我的主页
            </router-link>
            <router-link tag="a" class="item" to="/person">
              <i class="icon setting"></i>个人设置
            </router-link>
            <router-link tag="a" class="item" to="/friends">
              <i class="icon user"></i>我的好友
              <div class="ui circular label">23</div>
            </router-link>
            <a class="item">
              <i class="icon comments"></i>
              <span>评论</span>
              <div class="ui circular label">23</div>
            </a>
            <a class="item">
              <i class="icon heart"></i>
              <span>赞</span>
              <div class="ui circular label">23</div>
            </a>
            <a class="item" @click="quitLogin">
              <i class="icon share"></i>退出登录
            </a>
          </div>
        </div>
      </div>-->
    </nav>
    <transition name="">
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          style="box-sizing:border-box;min-height:100vh;width:80vw;margin:0 auto;padding-left:10px;padding-right:10px;"
        />
      </keep-alive>
    </transition>
    <transition name="">
      <router-view
        v-if="!$route.meta.keepAlive"
        style="box-sizing:border-box;min-height:100vh;width:80vw;margin:0 auto;padding-left:10px;padding-right:10px;"
      />
    </transition>
    <Foot></Foot>
    <rightbar style="position:fixed;top:70%;right:40px;z-index:999;"></rightbar>
    <!-- <foot style="width:100%;height:100px;position:absolute;bottom:-100px;"></foot> -->
  </div>
</template>

<script>
import Foot from "./views/Foot.vue";
import rightbar from "./components/common/right.vue";
export default {
  data() {
    return {
      islogin: false,
      activeIndex: "1"
    };
  },
  name: "App",
  created() {
    this.checkLogin();
    this.handleIp();
  },
  update() {
    // this.checkLogin();
  },
  mounted() {
    $("#navbar .item:lt(5)").click(function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  },
  methods: {
    checkLogin() {
      console.log(localStorage.getItem("userid"));
      if (localStorage.getItem("userid") !== null) {
        this.axios
          .post("/api/index.php/user/getinfo", {
            id: localStorage.getItem("userid")
          })
          .then(res => {
            if (res.data.data.user_tag!=='') {
              res.data.data.user_tag = res.data.data.user_tag.split(";");
            }
            if (res.data.code == 1) {
              this.thisData = res.data.data;
              this.$store.commit("changeLogin", true);
              this.$store.commit("setUserInfo", res.data.data);
              localStorage.setItem("userinfo", JSON.stringify(res.data.data));
            } else {
              this.thisRes = false;
              this.msgbox = "获取个人信息失败";
            }
          });
        this.$store.commit("changeLogin", true);
        this.$store.commit("setUser", localStorage.getItem("userid"));
        // this.$store.commit("setUserInfo", localStorage.getItem("userinfo"));
      }
    },
    handleSearch() {},
    quitLogin() {
      this.axios.get("/api/index.php/login/logout").then(res => {
        this.islogin = false;
        this.$store.state.islogin = false;
        this.$store.state.userid = "";
        // this.$router.push("/home");
        localStorage.clear();
      });
    },
    handleIp() {
      const that = this;
      this.$store.commit("setIp", localStorage.getItem("ip"));
      this.axios
        .post("/juhe/ip/ipNew", {
          ip: localStorage.getItem("ip"),
          key: "ad28f030e99b7523efba8a26fc4529f5"
        })
        .then(res => {
            localStorage.setItem("province", res.data.result.Province);
            localStorage.setItem("city", res.data.result.City);
            that.$store.commit("setLocation", res.data.result);
            console.log(that.$store.state.location) 
        });
    }
  },
  components: { Foot,rightbar }
};
</script>

<style>
#app {
  position: relative;
  /* background:gray; */
}

/*box-shadow: 1px 1px 1px 1px lightgray;*/

/* 
a {
  text-decoration: none;
} */
.item {
  position: relative;
}
.circular {
  float: right;
}
.ui.dimmer {
  display: none !important;
  visibility: hidden;
}
</style>
