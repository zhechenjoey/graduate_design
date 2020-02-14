<template>
    <div style="display:flex;flex-wrap:wrap;">
      <a
        :href="'more.html#/player?tv_id='+item.tv_id"
        target="_blank"
        v-for="item in videolist"
        :key="item.tv_id"
      >
        <Video style="margin:10px 11px;" :data="item"></Video>
      </a>
    </div>
</template>
<script>
import Video from "../../components/tutorial/video.vue";
export default {
  data(){
    return {
      videolist:[]
    }
  },
  created(){
 
    this.initPage();
  },
  components:{
    Video
  },
  methods:{
    initPage() {
      const that = this;
      this.axios
        .post("/api/index.php/rs/rsvideo",{searchkey:that.searchkey,limit:that.limit})
        .then(res => {
          if (res.data.code===1) {
            this.videolist = res.data.data;
            that.videolist.sort(function(a, b) {
              return Date.parse(b.tv_date) - Date.parse(a.tv_date); //时间倒序
            });
          }
        });
    }
  },
  props:{
    searchkey:'',
    limit:3
  }
};
</script>