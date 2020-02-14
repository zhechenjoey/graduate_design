<template>
  <div id>
    <div class="gd-form-item">
      <Artist :data="item" v-for="item in artistlist" :key="item.art_id"></Artist>
      <div class="tip" v-if="artistlist.length==0" style="width:70%;text-align:center;">未搜索到用户</div>
    </div>
  </div>
</template>
<script>
const Artist = resolve => require(["../gallery/artist"],resolve);
export default {
  data() {
    return {
      artistlist: [
      ]
    };
  },
  created() {
    this.initPage();
  },
  Mounted() {},
  methods: {
    initPage(){
      const that = this;
      this.axios.post("/api/index.php/artist/getNearbyArtist",{city:that.$store.state.location.City}).then(res=>{
        if(res.data.code){
          res.data.data.forEach((element,index) => {
            element.sequence = index+1;
          });
          that.artistlist = res.data.data;
        }
      })
    }
  },
  components: {
    Artist
  }
};
</script>
