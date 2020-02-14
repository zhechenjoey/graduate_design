<template>
  <div id>
    <h3>我的关注</h3>
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
  methods: {}
};
</script>
<style>
</style>