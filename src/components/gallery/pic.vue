<template>
  <div class="picWrapper">
    <div class="picinfolist">
      <div v-show="picdata.pic_like!=0">{{ picdata.pic_like }}</div>
    </div>

    <div class="taglist">
      <div v-for="item in picdata.pic_tag" :key="item.pic_id">#{{item}}#</div>
    </div>

    <img :src="picinfo" :alt="picdata.pic_id" style="color:lightgray;" v-show="loading==false" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      picinfo: "",
      loading:true
    };
  },
  created() {
    this.getPic();
    
  },
  updated() {
    this.getPic();
    // if (
    //   typeof this.picdata.pic_tag !== Object &&
    //   this.picdata.pic_tag.length !== ""
    // ) {
    //   this.picdata.pic_tag = this.picdata.pic_tag.split(";");
    // } else {
    //   return;
    // }
    // if (
    //   typeof this.picdata.pic_tag !== Object &&
    //   this.picdata.pic_tag.length !== ""
    // ) {
    //   this.picdata.pic_tag = this.picdata.pic_tag.split(";");
    // } else {
    //   return;
    // }
  },
  Mounted() {
    // //this.getPic();
    // if (
    //   typeof this.picdata.pic_tag !== Object &&
    //   this.picdata.pic_tag.length !== ""&&
    //   this.picdata.pic_tag.indexOf(';')!==-1
    // ) {
    //   this.picdata.pic_tag = this.picdata.pic_tag.split(";");
    // } else {
    //   return;
    // }
  },
  props: {
    picdata: {}
  },
  methods: {
    getPic() {
      const that = this;
      this.axios
        .post("/api/index.php/gallery/getPic", {
          pic_id: that.picdata.pic_id,
          pic_user_id: that.picdata.pic_user_id
        })
        .then(res => {
          if (res.data.code) {
            that.picinfo = res.data.data;
            that.loading = false;
            $('.picwrapper').css('width','auto');
          }
        });
    }
  }
};
</script>
<style>
.picwrapper {
  height: 180px;
  width: 180px;
  position: relative;
  background:gray;
}
.picinfolist {
  position: absolute;
  right: 5px;
  bottom: 12px;
  font-size: 12px !important;
  color: lightgray;
}
.taglist {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px !important;
  color: lightgray;
}
.taglist > div {
  float: left;
  margin: 0 3px;
}
img {
  height: 100%;
  width: auto;
}
</style>