<template>
  <div>
    <Action class="artist" v-for="item in data" :key="item.user_id" :data="item" style="margin:5px;"></Action><br>
  </div>
</template>
<script>
import Action from '../actions/action.vue';
export default {
  data() {
    return {
        data:[]
    };
  },
  created() {
      this.axios.post("/api/index.php/rs/rsaction").then(res => {
      if (res.data.code) {
        this.data = res.data.data;
      }
    });
  },
  Mounted() {},
  methods: {},
  components:{
      Action
  }
};
</script>
<style>
</style>