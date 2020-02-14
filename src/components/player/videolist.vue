<template>
  <div style="display:flex;flex-wrap:wrap;">
    
      <Video v-for="item in videolist" :key="item.tv_id" style="margin:10px 11px;" :data="item"></Video>
  </div>
</template>
<script>
import Video from "../../components/player/video.vue";
export default {
  data() {
    return {
      videolist: []
    };
  },
  created() {
    this.initPage();
  },
  components: {
    Video
  },
  methods: {
    initPage() {
      const that = this;
      this.axios
        .post("/api/index.php/rs/rsvideo", {
          searchkey: that.searchkey,
          limit: that.limit
        })
        .then(res => {
          if (res.data.code === 1) {
              const that = this;
            this.videolist = res.data.data;
            this.videolist.forEach((item,index) => {
                if(item.tv_id = that.$route.query.tv_id){
                    this.videolist.splice(index,1);
                }
            });
            that.videolist.sort(function(a, b) {
              return Date.parse(b.tv_date) - Date.parse(a.tv_date); //时间倒序
            });
          }
        });
    }
  },
  props: {
    searchkey: "",
    limit: 0
  }
};
</script>