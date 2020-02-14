<template>
  <div id="type">
    <ul>
      <li
        style="font-size:12px;margin-bottom:5px;color:gray;overflow:hidden;"
        v-for="item in typelist"
        :key="item.type_id"
        @click="handleOpen(item.type_name)"
      >
        {{ item.type_name }}
        <span class="bable yellow" style="float:right;">{{ item.type_time }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typelist: []
    };
  },
  created() {
    this.initPage();
  },
  Mounted() {},
  methods: {
    initPage() {
      const that = this;
      this.axios.get("/api/index.php/community/getType").then(res => {
        if (res.data.code) {
          that.typelist = res.data.data;
        }
      });
    },
    handleOpen(n){
      if(n!==''&&n!==null&&n!==undefined&&n!=='undefined'&&n!==" "){
        window.open("more.html#/search?searchkey="+n)
      } else {
        alert("话题不存在")
      }
      
    }
  }
};
</script>
<style>
#type h3{
    margin:0 0;
}
#type li {
  list-style-type: none;
  cursor: pointer;
}
#type li:hover {
  text-decoration: underline;
}
#type{
  position: relative;
  width: 100%;
  /* height: 400px; */
  padding:10px;
  box-sizing: border-box;
  overflow: hidden;
  /* box-shadow: 0px 0px 2px 0px lightgray; */
  border-radius: 10px;
  /* border: 1px solid rgb(230, 230, 230); */

}
</style>