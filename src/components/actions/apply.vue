<template>
  <div id>
    <div class="gd-tip blue">
      <div class="gd-tip-header">
        <i class="gd-ring" style="color:white;"></i>
        <span @click="handleLocation">【申请摄影师资格】</span>
        <button type="button" class="btn btn-sm pink">参与</button>
      </div>
      <div class="gd-tip-body">· 推广机会 · 约拍业务 · 每日福利</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  Mounted() {},
  methods: {
    handleLocation(){
      window.open('more.html#/applyartist');
    }
  }
};
</script>
<style>
</style>