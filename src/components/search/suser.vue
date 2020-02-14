<template>
  <div id="searchlist">
    <h3 style="padding-left:15px;">
      搜索结果
      <span v-show="artistlist.length!==0">:共找到{{countAll}}个用户</span>
    </h3>

    <artist v-for="item in artistlist" :key="item.user_id" :data="item"></artist>
  </div>
</template>
<script>
import artist from "../artist/artist";
export default {
  data() {
    return {
      artistlist: [],
      searchMsg: ""
    };
  },
  created() {
    this.initPage();
  },
  Mounted() {},
  methods: {
    initPage() {
      const that = this;
      that.artistlist = [];
      this.axios
        .post("/api/index.php/artist/searchArtist", { key: that.searchstring })
        .then(res => {
          if (res.data.code == 1) {
            that.artistlist = res.data.data;
            that.searchMsg = res.data.msg;
            if (res.data.data.length > 0) {
              that.handleOpen();
            }
          }
        });
    },
    handleOpen() {
      $("#searchlist").css("display", "block");
    },
    handleClose() {
      $("#searchlist").css("display", "none");
    }
  },
  components: {
    artist
  },
  props: {
    searchstring: ""
  }
};
</script>
<style>
/* #searchlist{
    width:300px;
    height:400px;
    overflow:auto;
    position:absolute;
    left:40%;
    top:40%;
    z-index:1;
    box-shadow:1px 1px 2px 1px lightgray;
    padding:5px 23px;
    box-sizing: border-box;
    background:white;
    border-radius:10px;
    display:none;
} */
</style>