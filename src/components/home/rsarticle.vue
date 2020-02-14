<template>
  <div>
    <Article class="artist" v-for="item in data" :key="item.tv_id" :data="item" style="margin:5px;"></Article><br>
  </div>
</template>
<script>
import Article from '../tutorial/article.vue';
export default {
  data() {
    return {
        data:[]
    };
  },
  created() {
      this.axios.post("/api/index.php/rs/rsarticle").then(res => {
      if (res.data.code==1) {
        this.data = res.data.data;
      }
    });
  },
  Mounted() {},
  methods: {},
  components:{
      Article
  }
};
</script>
<style>
</style>