<template>
  <div>
    <h3 style="padding-left:15px;">
      搜索结果
      <span v-show="videolist.length!==0">:共找到{{countAll}}个视频</span>
    </h3>
    <div class="gd-flex">
      <div>
        <div style="display:flex;flex-wrap:wrap;">
          <a
            :href="'more.html#/player?tv_id='+item.tv_id"
            target="_blank"
            v-for="item in videolist"
            :key="item.tv_id"
          >
            <Video style="margin:10px 10px;" :data="item"></Video>
          </a>
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
      <!-- <div class="gd-col-3">
        <div class="gd-form-item disright">
          <a href="more.html#/applyartist" target="_blank" style="margin-right:20px;">
            <button type="button" class="btn gray">认证摄影师</button>
          </a>
          <a href="more.html#/upload" target="_blank" class="btn blue">上传视频</a>
        </div>
      </div>-->

      <!-- <Upload ref="upload"></Upload> -->
      <!-- Upload：上传文件组件，本组件打开modal，上传等操作在子组件中 -->
    </div>
  </div>
</template>
<script>
import Video from "../../components/tutorial/video.vue";
import Top from "../../components/tutorial/top.vue";
// import Typelist from "../../components/tutorial/typelist.vue";
// import Upload from "../../components/tutorial/upload.vue";
export default {
  data() {
    return {
      searchkey: "",
      videolist: [],
      page: 1,
      limit: 6,
      countAll: 0
    };
  },
  created() {
    this.initPage();
  },
  Mounted() {},
  methods: {
    initPage() {
      const that = this;
      that.page = 1;
      this.axios
        .post("/api/index.php/tutorial/getVideoList", {
          searchkey: that.searchstring,
          page: that.page,
          limit: that.limit
        })
        .then(res => {
          if (res.data.code) {
            that.countAll = res.data.countAll;
            this.videolist = res.data.data;
            that.videolist.sort(function(a, b) {
              return Date.parse(b.tv_date) - Date.parse(a.tv_date); //时间倒序
            });
          }
        });
    },
    handleOpen() {
      this.$refs.upload.handleOpen();
    },
    handleSearch($search) {
      //子组件搜索
      const that = this;
      this.page = 1;
      this.axios
        .post("/api/index.php/tutorial/getVideoList", {
          searchkey: $search,
          page: that.page,
          limit: that.limit
        })
        .then(res => {
          if (res.data.code == 1 || res.data.code == 0) {
            this.videolist = res.data.data;
            that.countAll = res.data.countAll;
          }
        });
    },
    handleSort($sort) {
      const that = this;
      switch ($sort) {
        case "date":
          {
            that.videolist.sort(function(a, b) {
              return Date.parse(b.tv_date) - Date.parse(a.tv_date); //时间倒序
            });
          }
          break;
        case "hot":
          {
            that.videolist.sort(function(a, b) {
              return b.tv_play - a.tv_play; //时间倒序
            });
          }
          break;
        default:
          break;
      }
    },
    handlePage() {
      const that = this;
      that.page = parseInt(that.page + 1);
      this.axios
        .post("/api/index.php/tutorial/getVideoList", {
          searchkey: that.searchstring,
          page: that.page,
          limit: that.limit
        })
        .then(res => {
          if (res.data.code) {
            this.videolist = this.videolist.concat(res.data.data);
            that.videolist.sort(function(a, b) {
              return Date.parse(b.tv_date) - Date.parse(a.tv_date); //时间倒序
            });
          }
        });
    }
  },
  components: {
    Video,
    Top
    // Upload,
    // Typelist
  },
  props: {
    searchstring: ""
  }
};
</script>
<style>
</style>