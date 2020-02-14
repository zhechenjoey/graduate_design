<template>
  <div>
    <div class="gd-form-item gd-flex input100">
      <input type="text" class="gd-input input100" placeholder="2020毕业快乐" v-model="searchkey">
      <button type="button" class="btn pink" @click="handleClick(searchkey)">搜索</button>
    </div>
    <ul class="gd-typelist">
      <li class="gd-type-item active" @click="handleClick('')">全部<span class="bable yellow">56</span></li>
      <li class="gd-type-item" @click="handleClick('相机教程')">相机教程<span class="bable gray">2</span></li>
      <li class="gd-type-item" @click="handleClick('Photoshop')">Photoshop<span class="bable gray">7</span></li>
      <li class="gd-type-item" @click="handleClick('Lightroom')">Lightroom<span class="bable gray">12</span></li>
      <li class="gd-type-item" @click="handleClick('风光')">风光<span class="bable gray">12</span></li>
      <li class="gd-type-item" @click="handleClick('纪实')">纪实<span class="bable gray">12</span></li>
      <li class="gd-type-item" @click="handleClick('人文')">人文<span class="bable gray">12</span></li>
      <li class="gd-type-item" @click="handleClick('自然')">自然<span class="bable gray">12</span></li>
      <li class="gd-type-item" @click="handleClick('城市')">城市<span class="bable gray">12</span></li>
      <li class="gd-type-item" @click="handleClick('其他')">其他</li>
    </ul>
    <ul class="gd-typelist">
      <li class="gd-type-item active" @click="handleSort('date')">最新</li>
      <li class="gd-type-item" @click="handleSort('hot')">最热</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchkey:''
    };
  },
  created() {
    $(function() {
      $(".gd-type-item").click(function() {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active");
        $(this)
          .children(".bable")
          .removeClass("gray")
          .addClass("yellow");
        $(this)
          .siblings()
          .children(".bable")
          .removeClass("yellow")
          .addClass("gray");
      });
    });
  },
  Mounted() {},
  methods: {
    handleClick($search){
      this.$parent.searchkey = $search;
      this.$parent.handleSearch($search);
    },
    handleSort($sort){
      this.$parent.handleSort($sort);
    }
  }
};
</script>
<style>
</style>