<template>
  <div>
    <div class="gd-tip">
      <!-- <div class="gd-tip-header">分享摄时</div> -->
      <div class="gd-tip-body gd-flex" style="margin-right:0px!important;padding-left:0px!important;align-items:center;">
        <span class="btn pink btn-sm" style="width:35px;border-radius:5px;">分享</span>&nbsp;&nbsp;
        <i class="gd-qzone" style="background-size:20px 20px;" @click="handleShare('qzone')"></i>&nbsp;
        <i class="gd-qq" style="background-size:20px 20px;" @click="handleShare('qq')"></i>&nbsp;
        <i class="gd-weibo" style="background-size:20px 20px;" @click="handleShare('weibo')"></i>&nbsp;
      </div>
    </div>
    <button
      v-if="ifCheck==false"
      style="width:70%;height:50px;border-radius:5px;display:block;"
      type="button"
      class="btn cyan"
      @click="handleClick"
    >签到</button>
    <button
      v-if="ifCheck==true"
      disabled
      style="width:70%;height:50px;border-radius:5px;color:white;display:block;"
      type="button"
      class="btn gray"
    >已签到</button>
    <!-- <a
      href="more.html#/money" target="_blank"
      style="width:100%;height:50px;border-radius:5px;margin-top:5px;display:block;margin-top:5px;"
      type="button"
      class="btn yellow"
    >我的账户</a> -->
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      ifCheck: false,
      thisData: {}
    };
  },
  created() {
    this.initPage();
  },
  update() {
    this.initPage();
  },
  Mounted() {},
  methods: {
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
    handleClick() {
      this.thisData.last_check = this.thisDate();
      this.thisData.userid = this.$store.state.userid;
      const that = this;
      this.axios
        .post("/api/index.php/home/checkin", that.thisData)
        .then(res => {
          if (res.data.code === 1) {
            that.ifCheck = true; //签到了
            that.$store.state.userinfo.user_money++;
          }
        });
    },
    initPage() {
      // if (this.$store.state.userid!=='') {
      //   // 如果登录了，判断是否可以签到
      //   var nowdate = this.thisDate().split(" ")[0]; // 获取当前日期
      //   if (this.$store.state.userinfo.last_check!=='') {
      //     var lastcheck = this.$store.state.userinfo.last_check.split(" ")[0];
      //     if (nowdate == lastcheck) {
      //       // 说明今天签到过了、
      //       this.ifCheck = true;
      //     } else {
      //       this.ifCheck = false;
      //     }
      //   } else {
      //     this.ifCheck = false; //表示last-check为空，用户从来未签到过
      //   }
      // }
    },
    handleShare(n){
      if(n==='qzone'){
        window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=vchenzhe.com")
      } else if(n==='qq'){
        window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(document.location.href) + '&desc=邀请详情&title=标题&summary=简介&pics=&flash=&site=邀请人或网站&callback=title="QQ登录"');
      } else if(n==='weibo'){
        window.open("http://service.weibo.com/share/share.php?url=vchenzhe.com");
      }
    }
  }
};
</script>
<style>
</style>