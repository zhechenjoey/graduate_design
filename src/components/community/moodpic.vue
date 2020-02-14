<template>
  <div class="moodpic">
    <img :src="pic" alt="" @click="handleOpen">
    <div ref="origin" class="originpic" @click="handleClose"><img :src="pic" alt=""></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    
  },
  Mounted() {},
  methods: {
      handleOpen () {
          this.$refs.origin.style.width='100vw';
          this.$refs.origin.style.left='0';
          this.$refs.origin.style.top='0';
          this.$refs.origin.style.height='100vh';
      },
      handleClose(){
          this.$refs.origin.style.width='0vw';
          this.$refs.origin.style.height='0vh';
          this.$refs.origin.style.left='50%';
          this.$refs.origin.style.top='50%';

      }
  },
  props:{
      pic:''
  }
};
</script>
<style>
.moodpic{
    width:150px;
    height:150px;
    margin:2px 2px;
    overflow:hidden;
    display:inline-block;
    cursor:pointer;
}
.moodpic img{
    height:100%;
    width:auto;
}
.originpic{
    /* display:none; */
    text-align:center;
    width:0vw;
    height:0vh;
    position:fixed;
    top:50%;
    left:50%;
    z-index:999;
    background:rgba(0,0,0,0.8);
    transition:all 0.3s ease;
}
.originpic img{
    margin:0 auto;
}
</style>