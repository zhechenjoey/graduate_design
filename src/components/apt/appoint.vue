<template>
  <div class="gd-tip gray">
        <div class="gd-tip-header">
            <i class="gd-photo-action"></i>
            <span v-show="data.user_name!==$store.state.userinfo" style="font-weight:bold;">【{{ data.apt_kind }}】 发送给 : {{data.user_name}}</span>
            <span v-show="data.user_name==$store.state.userinfo" style="font-weight:bold;">【{{ data.apt_kind }}】 来自 {{data.user_name}}</span>
            <button type="button" class="btn btn-sm white">查看</button>&nbsp;
            <button type="button" class="btn btn-sm pink">删除</button>
        </div>
        <div class="gd-tip-body">
           预约时间 : {{ data.apt_date }}
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {

  },
  Mounted() {},
  methods: {

  },
  props:{
      data:{}
  }
};
</script>
<style>
.aptbox{
    width:80%;
    height:100px;
    box-sizing:border-box;
    padding:10px;
    box-shadow:1px 1px 1px 1px gray;
}
</style>