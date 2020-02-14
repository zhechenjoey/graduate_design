<template>
  <div id>
    <div class="gd-form-item">
      <h3>热门摄影师</h3>
      <Artist :data="item" v-for="item in artistlist" :key="item.art_id"></Artist>
    </div>
  </div>
</template>
<script>
const Artist = resolve => require(["./artist"],resolve);
export default {
  data() {
    return {
      artistlist: [
        { art_id: "1230", art_name: "Joey",sequence:1 },
        { art_id: "12", art_name: "Thomas",sequence:2 }
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
      this.axios.get("/api/index.php/artist/getTopArtist").then(res=>{
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
