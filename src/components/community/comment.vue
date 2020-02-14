<template>
  <div>
    <div class="commentArea" v-for="cmt in cmtlist" :key="cmt.id">
      <div class="gd-flex">
        <img :src="cmt.user_image" class="avatar" style="margin-top:-10px;" />
        <div></div>
        <label v-cloak class="display">{{cmt.cmt_id}}</label>
        <label v-cloak class="bold">{{ cmt.user_name }}</label>
        <span v-cloak v-if="cmt.cmted_id!=''" style="display:inline-block;min-width:25px;width:40px;">&nbsp;回复</span>
        <label
          v-cloak
          v-if="cmt.cmted_id!==null"
        >{{ cmt.cmted_name }}</label>
        <label v-cloak class="display">{{cmt.cmted_id}}</label>&nbsp;:&nbsp;
        <span
          style="width:450px;word-break:break-word;color:gray;"
          data-toggle="modal"
          data-target="#myModal"
          @click="commentInfo(item.mood_id,item.user_id,cmt.cmt_id,cmt.cmt_name)"
        >{{cmt.cmt_body}}</span>
        <!-- 回复当前这一条回复 -->
        <i
          @click="handleSecondCmt(cmt.id,cmt.user_name,cmt.cmt_id)"
          v-if="cmt.cmt_id!==$store.state.userid"
          class="gd-chat"
          style="position:absolute;right:50px;"
        ></i>
        &nbsp;
        <button
          v-if="cmt.cmt_id==$store.state.userid"
          class="btn btn-sm gray"
          style="position:absolute;right:0;"
          @click="deleteComment(cmt.id)"
        >X</button>
        <br />
      </div>

      <div class="gd-form-item gd-flex" v-if="thisSecondCmt == cmt.id">
        <input
          type="text"
          class="gd-input input80"
          v-model="thisData.cmt_second_body"
          :placeholder="'回复 : '+cmt.user_name"
        />
        <button type="button" class="btn gray" @click="sendSecondComment">发送</button>
      </div>
    </div>
    <!-- 循环体结束 -->
    <div class="cmtarea">
      <div class="gd-form-item gd-flex first-cmt">
        <input type="text" class="gd-input input80" v-model="thisData.cmt_body" />
        <button type="button" class="btn gray" @click="sendComment">回复</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cmtlist: [],
      thisData: {},
      // 二级评论
      thisSecondCmt: "",
      cmted_name: "",
      cmted_id: ""
    };
  },
  created() {
    this.getComment();
  },
  Mounted() {},
  methods: {
    handleSecondCmt(n, m, cid) {
      this.thisSecondCmt = n;
      this.cmted_name = m;
      this.cmted_id = cid;
    },
    getComment() {
      const that = this;
      this.axios
        .post("/api/index.php/community/getComment", {
          mood_id: that.cmtdata.mood_id
        })
        .then(res => {
          if (res.data.code === 1) {
            that.cmtlist = res.data.data;
            that.cmtlist.sort(function(a,b){
                return Date.parse(a.date) - Date.parse(b.date);//时间倒序
            });
          }
        });
    },
    sendComment() {
      // 发送一级评论
      if (this.$store.state.islogin === false) {
        this.$router.push("/login");
        return;
      }
      var mydata = {
        mood_id: this.cmtdata.mood_id,
        mood_owner_id: this.cmtdata.user_id,
        cmted_id: "",
        cmt_id: this.$store.state.userid, //更改
        cmt_body: this.thisData.cmt_body,
        cmt_date: new Date(),
        cmt_name: this.$store.state.userinfo.user_name,
        cmted_name: "",
        user_name: this.$store.state.userinfo.user_name,
        id: this.cmtdata.mood_id + this.$store.state.userid + new Date(),
        user_image: this.$store.state.userinfo.user_image
      };
      const that = this;
      this.axios
        .post("/api/index.php/community/sendComment", mydata)
        .then(res => {
          that.cmtlist.push(mydata);
          that.thisData.cmt_body = "";
        });
    },
    sendSecondComment() {
      // 发送二级评论
      if (this.$store.state.islogin === false) {
        this.$router.push("/login");
        return;
      }
      var mydata = {
        mood_id: this.cmtdata.mood_id,
        mood_owner_id: this.cmtdata.user_id,
        cmted_id: this.cmted_id,
        cmt_id: this.$store.state.userid, //更改
        cmt_body: this.thisData.cmt_second_body,
        cmt_date: this.thisDate(),
        cmt_name: this.$store.state.userinfo.user_name,
        cmted_name: this.cmted_name,
        user_name: this.$store.state.userinfo.user_name,
        id: this.cmtdata.mood_id + this.$store.state.userid + new Date(),
        user_image: this.$store.state.userinfo.user_image
      };
      console.log(mydata);
      const that = this;
      this.axios
        .post("/api/index.php/community/sendComment", mydata)
        .then(res => {
          that.cmtlist.push(mydata);
          that.thisData.cmt_second_body = "";
          that.thisSecondCmt = "";
        });
    },
    deleteComment(id) {
      const that = this;
      this.axios
        .post("/api/index.php/community/deleteComment", { id: id })
        .then(res => {
          if (res.data.code === 1) {
            that.cmtlist.forEach((item, index) => {
              if (item.id === id) {
                that.cmtlist.splice(index, 1);
              }
            });
          }
        });
    },
    enterPage() {},
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
  props: {
    cmtdata: {}
  }
};
</script>
<style>
/* 留言表列表 一个commentArea 是一条留言 */
.commentArea {
  position: relative;
  padding-top: 10px;
  margin: 10px 0;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.7rem !important;
}
.commentArea .gd-form-item {
  padding-left: 45px;
}
.commentArea .gd-input {
  height: 30px !important;
}
.commentArea .btn {
  min-width: 40px;
  height: 30px !important;
  font-size: 0.7rem;
  margin-right: 5px !important;
}
/* 针对于 mood 的留言条，一直显示在 mood 的最下方 */
.cmtarea {
  width: 100%;
  opacity: 0.5;
  font-size: 0.7rem;
}
.cmtarea .gd-input {
  height: 30px !important;
}
.cmtarea .btn {
  height: 30px !important;
}
</style>