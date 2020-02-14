<template>
  <div id>
    <div class="commentArea gd-flex">
      <img :src="data.user_image" class="avatar" alt />
      <label v-cloak class="display">{{data.cmt_id}}</label>
      <label v-cloak class="bold">{{ data.user_name }}</label>
      <span v-cloak v-if="data.cmted_id!=''">回复</span>
      <label
        v-cloak
        v-if="data.cmted_id!==''&&data.cmted_id!==data.cmt_id"
        @click="enterPage(data.cmted_id,$event)"
      >{{ data.cmted_name }}</label>
      <label v-cloak class="display">{{data.cmted_id}}</label>&nbsp;:&nbsp;
      <span
        data-toggle="modal"
        data-target="#myModal"
        @click="commentInfo(item.mood_id,item.user_id,data.cmt_id,data.cmt_name)"
      >{{data.cmt_body}}</span>
      <!-- 回复当前这一条回复 -->
      <button
        @click="handleSecondCmt"
        class="btn btn-sm gray"
        style="position:absolute;right:40px;"
      >回复</button>
      <button class="btn btn-sm gray" style="position:absolute;right:0;">X</button>
      <br />
      <div ref="cmtarea" v-if="thisCmt==1" class="gd-form-item gd-flex">
        <input type="text" class="gd-input" v-model="thisData.cmt_second_body" />
        <button type="button" class="btn gray" @click="sendComment">回复</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      thisData: {},
      thisCmt: 0
    };
  },
  created() {},
  Mounted() {},
  methods: {
    handleSecondCmt() {
      this.thisCmt = 1;
    }
  },
  props: {
    data: {}
  }
};
</script>
<style>
/* 留言表列表 一个commentArea 是一条留言 */
.commentArea {
  position: relative;
  overflow: hidden;
  margin: 5px 0;
  align-items: center;
  flex-wrap: wrap;
}
.commentArea .gd-form-item {
  padding-left: 50px;
}
.commentArea .gd-input {
  height: 30px !important;
}
</style>