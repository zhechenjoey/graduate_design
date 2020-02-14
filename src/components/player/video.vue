<template>
  <div class="box gd-flex">
    <a :href="'more.html#/player?tv_id='+data.tv_id" target="_blank">
      <div class="ui videobox">
        <!-- <a class="ui left teal corner label">
        <i class="heart icon"></i>
        </a>-->
        <div class="shadow">
          <i
            v-show="data.tv_path!==null"
            class="gd-play"
            style="width:50px;height:50px;background-size:50px 50px;"
          ></i>
          <i
            v-show="data.tv_path==null"
            class="gd-book"
            style="width:50px;height:50px;background-size:50px 50px;"
          ></i>
        </div>
        <div class="vdata">
          <p class="bable cyan" v-show="data.tv_path==null">文</p>
          <p class="bable blue" v-show="data.tv_path!==null">
            <i class="gd-play" style="width:15px;height:15px;background-size:15px 15px;"></i>
          </p>
          <!-- <div class="gd-flex" style="align-items:center;">
          <i class="gd-video" style="background-size:16px 16px;"></i>
          <span class="tip">{{ data.tv_play }}</span>
          <i class="gd-liked" style="background-size:16px 16px;"></i>
          <span class="tip">{{ data.tv_like }}</span>
          <i class="gd-chat" style="background-size:16px 16px;"></i>
          <span class="tip">{{ data.tv_cmt }}</span>
          </div>-->
        </div>
        <!-- <video style="background:black;width:100%;height:100%;" width="200" height="112" :src="'/api/src/data/' + videoinfo.tv_author + '/video/' + videoinfo.tv_path" ></video> -->

        <img :src="data.tv_cover" alt="封面已失效" style="background:black;width:100%;height:100%;" />
      </div>
    </a>
    <div class="vinfo">
      <a style="color:inherit;" :href="'more.html#/player?tv_id='+data.tv_id" target="_blank">
        <p class="vtitle" style="margin-bottom:0px;" :title="data.tv_name">{{ data.tv_name }}</p>
      </a>
      <a style="color:inherit;margin-left:5px;" href="javascript:void;">
        <p class="vtitle gd-flex" style="align-items:center;" :title="data.user_name">
          <i class="gd-author icon-sm"></i>
          {{ data.user_name }}
        </p>
      </a>
      <div>
        <!-- <div class="vauthor">{{data.tv_author}}</div> -->
        <div class="vicon gd-flex" style="align-items:center;">
          <i class="gd-free icon-sm" style="background-size:18px 18px;" title="该视频可免费观看"></i>
          <span class="tip">播放:{{ data.tv_play }}</span>
          <span class="tip">评论:{{ data.tv_cmt }}</span>
          <!-- <i class="gd-like icon-sm"  style="opacity:0.6;" title="收藏视频"></i> -->
        </div>
      </div>
    </div>
    <!-- <p>
      <span v-show="item!==''" v-for="item in data.tv_tag" :key="item" class="tag">{{item}}</span>
    </p>-->
    <!-- <p class="vinfo"> {{ data.tv_tag }}</p> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoinfo: {},
      loading: true
    };
  },
  created() {
    //this.getVideo();
    // if (typeof this.data.tv_tag !== Object && this.data.tv_tag !== "" && this.data.tv_tag !== null) {
    //   this.data.tv_tag = this.data.tv_tag.split(";");
    // }
  },
  Mounted() {
    this.getVideo();
  },
  methods: {
    getVideo() {
      const that = this;
      this.axios
        .post("/api/index.php/tutorial/getVideo", { tv_id: that.data.tv_id })
        .then(res => {
          if (res.data.code) {
            that.videoinfo = res.data.data[0];
            that.loading = false;
          }
        });
    }
  },
  props: {
    data: {}
  }
};
</script>
<style scoped>
.box {
  margin: 10px 0;
  /* box-shadow: 1px 1px 1px 0px lightgray; */
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  /* background: rgba(230, 230, 230, 0.5); */
}
.box a{
    margin:0 0;
    padding:0 0;
}
.videobox {
  background: lightgray;
  /*border-radius: 5px;*/
  position: relative;
  overflow: hidden;
  font-size: 0.9rem;
  width: 200px;
  height: 112.5px;
  cursor: pointer;
}
.videobox img {
  width: 100%;
  height: 100%;
}
.icon {
  margin-top: -20px;
}
.shadow {
  display: flex;
  z-index: 999;
  justify-content: center;
  align-items: center;
}
.videobox:hover .shadow {
  opacity: 0.7 !important;
}
.videobox:hover .vdata {
  opacity: 0;
}
.videobox .shadow {
  opacity: 0;
  transition: all 0.3s ease;
  width: 200px;
  height: 112px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 3rem;
  background: rgba(0, 0, 0, 0.3);
}
.videobox .vdata {
  color: white;
  opacity: 0.8;
  transition: all 0.3s ease;
  position: absolute;
  bottom: 5px;
  right: 10px;
}

.vinfo {
  width: 200px;
  /* height: 60px; */
  box-sizing: border-box;
  /* margin-top: 5px; */
  margin: 0 0!important;
  transition: all 0.3s ease;
  font-size: 12px;

  color: rgb(100, 100, 100);
  padding: 10px;
  padding-left: 0px;
}
.vtitle {
    height:20px;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0;
  margin: 0 0;
}
.vtitle:hover {
  text-decoration: underline;
}
.tag {
  margin: 0 3px;
  cursor: pointer;
  font-size: 8px;
  padding: 2px 4px;
  opacity: 0.5;
  color: rgb(80, 80, 80);
  box-shadow: 0.5px 0.5px 3px 0px gray;
}
.tag:hover {
  opacity: 0.8;
}
.vicon {
  position: relative;
}
</style>