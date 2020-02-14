<template>
  <div id="today" class="ui">
    <div class="topic">
      <a class="ui red tag medium label">News</a>
      <div class="ui right mini labeled icon button">
        <router-link tag="span" to="/news">更多</router-link>
        <i class="right arrow icon"></i>
      </div>
    </div>
    <hr />
    <keep-alive>
      <applyartist style="margin-bottom:10px;"></applyartist>
    </keep-alive>
  </div>
</template>
<script>
import applyartist from "../common/Applyartist";
export default {
  Mounted() {
    $(".accordion").accordion();
  },
  components: {
    applyartist
  }
};
</script>
<style>
.items {
  height: 300px;
  overflow: auto;
}
</style>