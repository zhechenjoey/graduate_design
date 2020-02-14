<template>
  <div id>
    <div class="gd-tip" style="height:20px;">
        <div class="gd-tip-header">
            <p @click="handleLocation(data.act_id)" :title="data.tv_name">{{ data.tv_name }}</p>
            <!-- <button type="button" class="btn btn-sm yellow">查看</button>&nbsp; -->
        </div>
        <!-- <div class="gd-tip-body">
            {{ data.act_date }} · 
        </div> -->
    </div>
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
    handleLocation () {
        window.open('more.html#/player?tv_id='+this.data.tv_id);
    }
  },
  props:{
      data:{}
  }
};
</script>
<style>
</style>