<template>
  <div>
    <div class="gd-form-item gd-flex input90">
      <input type="text" class="gd-input input100" placeholder="2020毕业快乐" v-model="searchkey" />
      <button type="button" class="btn pink" @click="handleSearch">搜索</button>
    </div>
    <ul class="gd-typelist">
      <li class="gd-type-item active" @click="handleClick('')">
        全部
        <span class="bable yellow">56</span>
      </li>
      <li class="gd-type-item" @click="handleClick('风光')">
        风光
        <span class="bable gray">12</span>
      </li>
      <li class="gd-type-item" @click="handleClick('纪实')">
        纪实
        <span class="bable gray">12</span>
      </li>
      <li class="gd-type-item" @click="handleClick('人像')">
        人像
        <span class="bable gray">12</span>
      </li>
      <li class="gd-type-item" @click="handleClick('自然')">
        自然
        <span class="bable gray">12</span>
      </li>
      <li class="gd-type-item" @click="handleClick('城市')">
        城市
        <span class="bable gray">12</span>
      </li>
      <li class="gd-type-item" @click="handleClick('美食')">
        美食
        <span class="bable gray">12</span>
      </li>
      <li class="gd-type-item" @click="handleClick('街拍')">
        街拍
        <span class="bable gray">12</span>
      </li>
      <li class="gd-type-item" @click="handleClick('其他')">其他</li>
    </ul>
    <ul class="gd-typelist">
      <li class="gd-type-item active">最新</li>
      <li class="gd-type-item">最热</li>
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
    handleClick($key) {
      this.$parent.searchPic($key);
    },
    handleSearch() {
      if (
        this.searchkey !== "" &&
        this.searchkey !== undefined &&
        this.searchkey !== null
      ) {
        this.$parent.searchPic(this.searchkey);
      } else {
        return;
      }
    }
  }
};
</script>
<style>
</style>