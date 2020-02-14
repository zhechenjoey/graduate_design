<template>
  <div id>
    <div class="gd-flex" style="align-items:center;">
      <span class="bable yellow" style="margin:10px;">{{ data.sequence }}</span>
      <img :src="data.user_image" class="avatar" alt />
      <span style="font-weight:bold;">{{ data.user_name }}</span>
      <span class="bable gray" v-for="item in data.art_tag" :key="item.art_id"></span>
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
  methods: {},
  props:{
      data:{}
  }
};
</script>
<style scoped>
</style>