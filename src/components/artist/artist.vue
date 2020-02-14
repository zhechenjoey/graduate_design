<template>
  <div>
    <section class="artBox">
      <div class="artInfo gd-flex">
        <div class="gd-col-3 gd-flex discenter">
          <img class="artImage" :src="data.user_image" alt />
        </div>
        <div class="gd-col-9">
          <!-- {{ data.user_id }} -->
          <span class="artName">{{ data.user_name }}</span>
          <div class="buttonGroup">
            <button
              v-show="flag_follow===false"
              type="button"
              class="btn btn-sm white"
              @click="handleFollow"
            >+关注</button>
            <button
              v-show="flag_follow===true"
              type="button"
              class="btn btn-sm white"
              @click="handleUnfollow"
            >已关注</button>
            <button type="button" class="btn btn-sm blue" @click="handleApt(data.user_id)">约拍</button>
            <button type="button" class="btn btn-sm yellow">访问</button>
          </div>
          <span class="artFollow">关注: {{ data.user_follow }}</span>
          <span class="artFollow">粉丝: {{ data.user_fans }}</span>
          <br />
          <span class="artFollow">{{ data.user_explain }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag_follow: false,
      searchkey:''
    };
  },
  created() {
    this.handleCheckFollow();
  },
  updated(){
    this.handleCheckFollow();
  },
  Mounted() {},
  methods: {
    handleCheckFollow() {
      const that = this;
      this.axios
        .post("/api/index.php/artist/checkFollow", {
          followed_id: that.data.user_id,
          follow_id: that.$store.state.userid
        })
        .then(res => {
          if (res.data.code === 1) {
            that.flag_follow = true;
          } else {
            that.flag_follow = false;
          }
        });
    },
    handleFollow() {
      if (this.$store.state.islogin === false) {
        this.$router.push("/login");
        return;
      }
      const that = this;
      this.axios
        .post("/api/index.php/artist/follow", {
          followed_id: that.data.user_id,
          follow_id: that.$store.state.userid
        })
        .then(res => {
          if (res.data.code === 1) {
            that.flag_follow = true;
          }
        });
    },
    handleUnfollow() {
      if (this.$store.state.islogin === false) {
        this.$router.push("/login");
        return;
      }
      const that = this;
      this.axios
        .post("/api/index.php/artist/unfollow", {
          followed_id: that.data.user_id,
          follow_id: that.$store.state.userid
        })
        .then(res => {
          if (res.data.code === 1) {
            that.flag_follow = false;
          }
        });
    },
    handleApt(){
      //进入约拍页面
      window.open('more.html#/addapt?fotographer='+this.data.user_id);
    }
  },
  props: {
    data: {}
  }
};
</script>
<style>
.artBox {
  position: relative;
  width: 210px;
  height: 100px;
  box-sizing: border-box;
  margin: 0px 0;
  overflow: hidden;
  box-shadow: 0px 0px 2px 0px lightgray;
  border-radius: 10px;
  border: 1px solid rgb(230, 230, 230);
}

.artInfo {
  /* margin: 15px; */
  height: 100%;
  box-sizing: border-box;
  align-items: center;
}

.artFollow {
  margin-left: 10px;
  font-size: 10px;
  color: gray;
}

.buttonGroup {
  /* height:12px; */
  margin-left: 10px;
}

.artImage {
  width: 45px;
  height: 45px;
  border-radius: 100%;
  border: 2px solid lightgray;
}

.artName {
  margin-left: 10px;
  font-size: 12px;
  font-weight: bold;
}
</style>