<template>
  <section class="moodSection">
    <div class="moodHeader gd-col-2">
      <p class="userImage">
        <img  style="background:lightgray;" :src="data.user_image" alt="用户头像" />
      </p>
    </div>
    <div class="moodBody gd-col-10">
      <p class="userName">{{ data.user_name }}</p>
      <p class="moodArticle">{{ data.mood_body }}</p>
      <p style="display:flex;width:475px;flex-wrap:wrap;">
        <moodpic :pic="item" v-for="item in data.mood_pic" :key="item" alt></moodpic>
      </p>
      <p>
        <span v-show="item!==''" v-for="item in data.mood_tag" :key="item" class="tag">{{item}}</span>
      </p>

      <div class="moodIcon" style="position:relative;height:25px;">
        <span v-show="count_like!==0" style="font-size:12px;font-weight:bold;position:absolute;left:0;">{{ count_like }}人喜欢</span>
        <!-- <span v-show="count_like==0" style="font-size:12px;font-weight:bold;position:absolute;left:0;">来给Ta送上第一个赞吧</span> -->
        <span style="position:absolute;right:0;">
          <i class="gd-like" v-show="flag_like==false" @click="handleLike"></i>
          <i class="gd-liked" v-show="flag_like==true" @click="handleUnlike"></i>
        </span>
      </div>
      <div class="moodFooter disright">
        <p class="moodTime">{{ data.mood_date }}</p>
      </div>
      <comment :cmtdata="data"></comment>
    </div>
    <button
      v-show="data.user_id==this.$store.state.userid"
      type="button"
      class="btn pink btn-sm"
      @click="handleDelete(data.mood_id)"
    >X</button>
  </section>
</template>
<script>
const moodpic = resolve => require(["./moodpic"], resolve);
const comment = resolve => require(["./comment"], resolve);
export default {
  data() {
    return {
      mood: {},
      flag_like: false,
      count_like: 0
    };
  },
  props: {
    data: {}
  },
  created() {
    if (typeof this.data.mood_tag !== Object && this.data.mood_tag !== "") {
      this.data.mood_tag = this.data.mood_tag.split(";");
    }
    this.handleCheck();
    this.handleLikeCount();
  },
  Mounted() {
    this.handleCheck();
    //this.data.mood_tag = this.data.mood_tag.split(";");
  },
  updated() {
    this.handleCheck();
    this.handleLikeCount();
  },
  methods: {
    // 检查点赞数
    handleLikeCount() {
      const that = this;
      this.axios
        .post("/api/index.php/community/countlike", {
          mood_id: that.data.mood_id
        })
        .then(res => {
          if (res.data.code === 1) {
            that.count_like = res.data.data;
          }
        });
    },
    // 检查是否点赞这条动态
    handleCheck() {
      console.log("handlecheck");
      const that = this;
      this.axios
        .post("/api/index.php/community/checklike", {
          mood_id: that.data.mood_id,
          cmt_id: that.$store.state.userid
        })
        .then(res => {
          if (res.data.code === 1) {
            that.flag_like = true;
          }
        });
    },
    handleLike() {
      if (this.$store.state.islogin === false) {
        this.$router.push("/login");
        return;
      }
      const that = this;
      this.flag_like = true;
      const data = {
        mood_id: this.data.mood_id,
        cmt_id: that.$store.state.userid,
        date: this.thisDate()
      };
      this.axios.post("/api/index.php/community/like", data).then(res => {
        if (res.data.code === 1) {
          that.flag_like = true;
          this.handleLikeCount();
        } else {
          that.flag_like = false;
        }
      });
    },
    handleUnlike() {
      if (this.$store.state.islogin === false) {
        this.$router.push("/login");
        return;
      }
      const that = this;
      this.flag_like = false;
      const data = {
        mood_id: this.data.mood_id,
        cmt_id: that.$store.state.userid,
        //date:this.thisDate()
        type: "like"
      };
      this.axios.post("/api/index.php/community/unlike", data).then(res => {
        if (res.data.code === 1) {
          that.flag_like = false;
          that.handleLikeCount();
        } else {
          that.flag_like = true;
        }
      });
    },
    handleDelete(id) {
      this.axios
        .post("/api/index.php/community/deleteMood", { id: id })
        .then(res => {
          if (res.data.code === 1) {
            this.$parent.handleDelete(id);
          }
        });
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
    }
  },
  components: {
    moodpic,
    comment
  }
};
</script>
<style>
.moodSection {
  width: 100%;
  /* height: 200px; */
  background: white;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  /* box-shadow: 1px 1px 1px 1px rgb(240, 240, 240); */
  display: flex;
  margin: 30px 0;
  box-shadow: 1px 1px 2px 0px rgba(240, 240, 240, 0.5);
}
.moodHeader {
  width: 50px;
  overflow: hidden;
}

.moodFooter {
  width: 100%;
  height: 30px;
  position: relative;
  overflow: hidden;
}
.userImage {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.userImage img {
  width: 50px;
  height: 50px;
}
.moodBody {
  margin-left: 10px;
}
.userName {
  white-space: pre;
  height: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
}
.moodTime {
  /* width: 200px; */
  height: 20px;
  box-sizing: border-box;
  color: lightgray;
  font-size: 10px;
}
.userName:hover {
  text-decoration: underline;
}
.moodArticle {
  width: 100%;
  max-height: 200px;
}

.tag {
  margin: 0 5px;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 5px;
  opacity: 0.5;
  color: rgb(80, 80, 80);
  box-shadow: 0.5px 0.5px 3px 0px gray;
}
.tag:hover {
  opacity: 0.8;
}
</style>