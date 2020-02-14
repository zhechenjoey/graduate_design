<template>
  <div class="gd-flex">
    <div>
      <!-- <div id="searchForm">
        <Typelist></Typelist>
      </div>-->
      <h3 style="padding-left:15px;">
        搜索结果
        <span v-show="searchlist.length!==0">:共找到{{countAll}}张图片</span>
      </h3>

      <div id="gallery">
        <pic class="galleryPic" v-for="item in searchlist" :key="item.pic_id" :picdata="item"></pic>
      </div>
      <button
        type="button"
        class="btn white btn100"
        @click="handlePage"
        v-if="countAll>page*limit"
      >更多</button>
      <div
        style="margin-top:20px;text-align:center!important;"
        class="tip"
        v-if="countAll<=page*limit"
      >我是有底线的</div>
    </div>
    <!-- <div class="gd-col-2">
      <Artistlist></Artistlist>
    </div>-->
  </div>
</template>
<script>
// const pic = resolve => require(["../components/gallery/pic.vue"], resolve);
import pic from "../../components/gallery/pic.vue";
// const Typelist = resolve =>
//   require(["../../components/gallery/typelist.vue"], resolve);
// const Artistlist = resolve =>
//   require(["../../components/gallery/artistlist.vue"], resolve);

export default {
  data() {
    return {
      alllist: [],
      searchlist: [],
      searchkey: "",
      countAll: 0,
      limit: 10,
      page: 1
    };
  },
  created() {
    this.initPage();
  },
  Mounted() {},
  methods: {
    initPage() {
      //初始化列表
      const that = this;
      that.page = 1;
      this.axios
        .post("/api/index.php/gallery/searchPic", {
          searchkey: that.searchstring,
          page: that.page,
          limit: that.limit
        })
        .then(res => {
          if (res.data.code) {
            that.countAll = res.data.countAll;
            //that.alllist = res.data.data;
            res.data.data.forEach(item => {
              if (item.pic_tag !== "") {
                item.pic_tag = item.pic_tag.split(";");
                item.pic_tag.splice(item.pic_tag.length - 1, 1);
              }
            });
            that.searchlist = res.data.data;
          }
        });
    },
    handlePage() {
      // 新增数据 page++
      const that = this;
      that.page++;
      this.axios
        .post("/api/index.php/gallery/searchPic", {
          searchkey: that.searchstring,
          page: that.page,
          limit: that.limit
        })
        .then(res => {
          if (res.data.code == 1) {
            that.countAll = res.data.countAll;
            //that.alllist = res.data.data;
            res.data.data.forEach(item => {
              if (item.pic_tag !== "") {
                item.pic_tag = item.pic_tag.split(";");
                item.pic_tag.splice(item.pic_tag.length - 1, 1);
              }
            });
            that.searchlist = that.searchlist.concat(res.data.data);
          }
        });
    },
    searchPic(key) {
      //用于搜索，搜索一次，将清空page、countAll、list等数据
      const that = this;
      that.page = 1;
      that.searchkey = key; // 更新页面的搜索key
      this.axios
        .post("/api/index.php/gallery/searchPic", {
          searchkey: that.searchkey,
          page: that.page,
          limit: that.limit
        })
        .then(res => {
          if (res.data.code) {
            that.searchlist = null;
            that.countAll = res.data.countAll;
            that.searchlist = res.data.data;
            that.searchlist.forEach(item => {
              item.pic_tag = item.pic_tag.split(";");
              item.pic_tag.splice(item.pic_tag.length - 1, 1);
            });
          } else {
            that.searchlist = [];
          }
        });
    },
    addPic() {
      //用于二次加载，增加图片
      const that = this;
      if (this.searchkey !== "") {
        that.page++;
        this.axios
          .post("/api/index.php/gallery/searchPic", {
            searchkey: that.searchkey
          })
          .then(res => {
            if (res.data.code) {
              that.searchlist = null;
              that.searchlist.concat(res.data.data);
            } else {
              return;
            }
          });
      } else {
        return;
      }
    }
  },
  components: {
    pic
    // Typelist,
    // Artistlist
  },
  props: {
    searchstring: ""
  }
};
</script>
<style>
#searchForm {
  text-align: center;
  margin-top: 50px;
}
#searchForm h1 {
  color: white;
  font-size: 48px;
  font-weight: lighter;
}
#gallery {
  height: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
}
.galleryPic {
  height: 195px;
  width: 195px;
  margin: 1px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* box-shadow: 1px 1px 4px 1px black; */
}
</style>