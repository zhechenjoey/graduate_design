<template>
<div>
  <div class="gd-msg-box gd-flex" style="align-items:center;">
    <img :src="data.user_image" class="avatar" alt="">
      <span class="tip">{{data.user_name}}评论了你:</span><br>
      <p style="width:300px;">{{data.cmt_body}}</p>
  </div>
      
      <button type="button" class="btn btn-sm blue" @click="handleOpen(data.mood_id)">查看</button>
</div>
  
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    if (this.$store.state.islogin === false) {
      this.$router.push("/login");
      return;
    }
  },
  Mounted() {},
  methods: {
    handleOpen(n){
      window.open("more.html#/moodetail?mood_id="+n);
    }
  },
  props:{
    data:{}
  }
};
</script>
<style>
.gd-msg-box{
  height:50px;
}
</style>