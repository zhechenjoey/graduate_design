<template>
  <div class="gd-flex" style="flex-wrap:wrap;">
    <Artist class="artist" v-for="item in artistlistdata" :key="item.user_id" :data="item" style="margin:5px;"></Artist>
  </div>
</template>
<script>
import Artist from '../artist/artist';
export default {
  data() {
    return {
        artistlistdata:[]
    };
  },
  created() {
    const that = this;
    if(that.$store.state.userid!==''){
      var data = that.$store.state.userid;
    } else {
      var data = '';
    }
      this.axios.post("/api/index.php/rs/rsartist",{userid:data}).then(res => {
      if (res.data.code) {
        this.artistlistdata = res.data.data;
      }
    });
  },
  Mounted() {},
  methods: {},
  components:{
      Artist
  }
};
</script>
<style>
</style>