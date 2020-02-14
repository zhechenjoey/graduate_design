<template>
  <div id="upload" class="gd-flex discenter">
    <div class="gd-col-8">
      <h3>
        上传视频
        <!-- <span style="float:right;cursor:pointer;" @click="handleClose">X</span> -->
      </h3>
      <div class="content">
        <div class="ui error form">
          <div v-show="thisRes == false " class="gd-tip blue">{{ msgbox }}</div>
          <div class="gd-form-item gd-flex" style="align-items:center;">
            <button type="button" class="btn cyan" @click="chooseVideo">选择文件</button>
            &nbsp;&nbsp;&nbsp;<span id="chosedFile"></span>
          </div>
          
          <div class="gd-form-item">
            <h3>教程名称</h3>
            <input
              class="gd-input input100"
              placeholder="视频名称"
              type="text"
              v-model="thisData.tv_name"
              maxlength="30"
            />
            <span class="tip">视频名称越具体越容易获得推荐哦</span>
          </div>
          <h3>教程标签</h3>
          <Bable :data="''"></Bable>
          <!-- <div class="gd-form-item">
            <input
              type="text"
              class="gd-input input100"
              placeholder="视频分类"
              v-model="thisData.tv_tag"
              maxlength="20"
            />
            <span class="tip">多个分类标签请以 ; 隔开</span>
          </div> -->
          <div class="gd-form-item" id="imagePreview">
            <div id="addPic" @click="changeImage">+</div>
            <span class="tip">添加视频封面</span>
            <input id="imageInput" type="file" hidden @change="imagePreview" />
          </div>
          <div class="gd-form-item">
            <textarea maxlength="2000" name id cols="30" rows="30" class="gd-textarea input100" placeholder="添加教程说明" v-model="thisData.tv_article"></textarea>
            <!-- <span class="tip">文字说明越详细越容易得到推荐哦</span> -->
          </div>
          <div class="field" hidden>
            <label>视频</label>
            <input type="file" id="videoInput" @change="handleChange" />
          </div>
          <div class="gd-form-item discenter">
            <button type="button" class="btn blue" @click="handleSubmit">上传</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Bable = resolve => require(["@/components/common/bable.vue"], resolve);
export default {
  data() {
    return {
      thisData: {},
      thisRes: true,
      msgbox: ""
    };
  },
  components:{
    Bable
  },
  created() {},
  Mounted() {},
  methods: {
    thisDate() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() +
        "/" +
        month +
        "/" +
        strDate +
        " " +
        date
          .getHours()
          .toString()
          .padStart(2, "0") +
        ":" +
        date
          .getMinutes()
          .toString()
          .padStart(2, "0") +
        ":" +
        date
          .getSeconds()
          .toString()
          .padStart(2, "0");
      return currentdate;
    },
    chooseVideo() {
      $("#videoInput").click();
    },
    handleChange() {
      $("#chosedFile").text(
        document.getElementById("videoInput").files[0].name
      );
    },
    handleSubmit() {
      var file = document.getElementById("videoInput").files[0];
      var tv_cover = document.getElementById("imageInput").files[0];
      if(tv_cover==null||this.thisData.tv_name==''||this.thisData.new_tag==''){
        this.thisRes = false;
            this.msgbox = "请填写完信息";
            setTimeout(() => {
              this.thisRes = true;
              this.msgbox = "";
            }, 2000);
        return ;
      }
      if(file==null && this.thisData.tv_article==null){
        this.thisRes = false;
            this.msgbox = "请上传视频或输入文字教程";
            setTimeout(() => {
              this.thisRes = true;
              this.msgbox = "";
            }, 2000);
        return ;
      }
      var formdata = new FormData();
      formdata.append("tv_file", file);
      formdata.append("tv_name", this.thisData.tv_name);
      formdata.append("tv_tag", this.thisData.new_tag);
      formdata.append("tv_article", this.thisData.tv_article);
      formdata.append("tv_author", this.$store.state.userid);
      formdata.append("tv_date", this.thisDate());
      formdata.append("tv_cover", tv_cover);
      let config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" },
        cache: false,
        processData: false,
        contentType: false,
        //添加上传进度监听事件
        onUploadProgress: e => {
          var completeProgress = (((e.loaded / e.total) * 100) | 0) + "%";
          this.progress = completeProgress;
        }
      };
      const instance = this.axios.create({
        withCredentials: true,
        transformRequest: [
          data => {
            return data instanceof FormData
              ? data
              : Qs.stringify({
                  //此处的data类型判断为重要点，
                  ...data
                });
          }
        ]
      });
      instance
        .post("/api/index.php/tutorial/upload", formdata, config)
        .then(res => {
          if (res.data.code == 1) {
            this.thisRes = false;
            this.msgbox = "上传成功";
            window.location.href="/home"
            setTimeout(() => {
              this.thisRes = true;
              this.msgbox = "";
            }, 2000);
          }
        });
    },
    handleClose() {
      $("#upload").css("display", "none");
    },
    handleOpen() {
      $("#upload").css("display", "block");
    },
    changeImage() {
      $("#imageInput").click();
    },
    imagePreview() {
      var file = document.getElementById("imageInput").files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var thisvue = this;
      //在回调函数中修改Img的src属性
      reader.onload = function() {
        var img = document.createElement("img");
        img.width = 160;
        img.height = 90;
        img.src = this.result;
        $("#addPic").html(img);
      };
    }
  }
};
</script>
<style>
#upload {
  background: white;
  transition: all 0.3s ease;
}
#addPic {
  width: 160px;
  height: 90px;
  border: 1px solid lightgray;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: lightgray;
  transition: all 0.3s ease;
  font-size: 24px;
}
#addPic:hover {
  border: 1px solid #0facf3 !important;
  color: #0facf3;
}
</style>