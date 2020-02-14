<template>
  <div id>
    <div class="gd-tip">
        <div class="gd-tip-header">
            <i class="gd-alarm"></i>
            <p @click="handleLocation(data.act_id)" v-if="data.act_type==1" :title="data.act_name">【通知】{{ data.act_name }}</p>
            <p @click="handleLocation(data.act_id)" v-if="data.act_type==2" :title="data.act_name">【活动】{{ data.act_name }}</p>
            <!-- <button type="button" class="btn btn-sm yellow">查看</button>&nbsp; -->
        </div>
        <div class="gd-tip-body">
            {{ data.act_date }} · 
        </div>
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
        window.open('more.html#/actiondetail?act_id='+this.data.act_id);
    }
  },
  props:{
      data:{}
  }
};
</script>
<style>
</style>