<template>
  <div>
    <form id="moodForm">
      <div>
        <textarea rows="5" v-model="thisData.mood_body" style="padding:10px;box-sizing:border-box;"></textarea>
      </div>
      <div style="position:relative;display:flex;align-items:center;">
        <img
          src="http://localhost:8088/src/data/10611/img/image.jpg"
          style="width:40px;height:40px;cursor:pointer;display:inline-block;"
          @click="handleChoose"
        />
        <input type="file" id="imageInput" multiple="multiple" @change="picListChange" style="display:none;" />
        <!-- <input type="checkbox" name="pictype" title="风光" />风光
        <input type="checkbox" name="pictype" title="纪实" />纪实
        <input type="checkbox" name="pictype" title="人像" />人像 -->
        <input v-model="thisData.mood_tag" type="text" class="gd-input input80" style="display:inline-block;margin-left:10px;" placeholder="请输入标签 ( 多个标签用 ; 隔开 )">
        <button class="btn blue" type="button" @click="handleClick" style="float:right;">发送</button>
      </div>
      <div
        id="uploadPicList"
        style="margin-top:10px;height:51px;display:flex;flex-wrap:nowrap;overflow:auto;display:none;"
      ></div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      thisData: {}
    };
  },
  created() {},
  Mounted() {},
  methods: {
    handleChoose() {
      $("#imageInput").click();
    },
    picListChange() {
      //$("#picNum").html("");
      $("#uploadPicList").html("");
      var file = document.getElementById("imageInput").files;
      var $errorNum = 0;
      for (var i = 0; i < file.length; i++) {
        if (i >= 9) {
          $errorNum++;
          continue;
        } else {
          if (file[i].size >= 10242880) {
            this.errorFlag = 1;
            this.errorMsg = "图片大小不能超过5M,已为您自动过滤";
            $errorNum++;
          } else {
            //创建读取文件对象
            var reader = new FileReader();
            //读取文件
            reader.readAsDataURL(file[i]);

            //在回调函数中修改Img的src属性
            reader.onload = function() {
              var img = document.createElement("img");
              img.width = 50;
              img.height = 50;
              img.setAttribute("width", "50px");
              img.setAttribute("height", "50px");
              img.style.marginRight = "2px";
              img.src = this.result;
              $("#uploadPicList").append(img);
              $("#uploadPicList").css("display", "flex");
              img = null;
            };
          }
        }
      }

      // setTimeout(function() {
      //   this.errorFlag = false;
      //   this.errorMsg = "";
      // }, 3000); //隐藏错误提醒
      // $("#picNum").prepend(
      //   "<p>已选择" + parseInt(file.length - $errorNum) + "张图片</p>"
      // );
    },
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
    sendDate() {
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
        month +
        strDate +
        date
          .getHours()
          .toString()
          .padStart(2, "0") +
        date
          .getMinutes()
          .toString()
          .padStart(2, "0") +
        date
          .getSeconds()
          .toString()
          .padStart(2, "0");
      return currentdate;
    },
    handleClick() {
      var file1 = document.getElementById("imageInput").files;
      if (this.thisData.mood_body == undefined && file1.length == 0) {
        return;
      } else {
        var formdata = new FormData();
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
        var moodPic = [];
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
        for (var i = 0; i < file1.length; i++) {
          if (i >= 9) {
            continue; //图片数目不能大于9
          } else {
            if (file1[i].size <= 10242880) {
              //上传图片不能超过5M
              formdata.append("mood_pic[]", file1[i]);
            }
          }
        }
        if (this.thisData.mood_body === undefined) {
          this.thisData.mood_body = "";
        }
        const that = this;
        formdata.append("user_id", that.$store.state.userid);
        formdata.append("mood_body", that.thisData.mood_body);
        formdata.append("mood_date", that.thisDate());
        //this.thisData.mood_tag = "";
        // $("input[name=pictype]").each(function(index, item) {
        //   if ($(this).is(":checked")) {
        //     that.thisData.mood_tag += item.title + ";";
        //   }
        // });
        // this.thisData.mood_tag = this.thisData.mood_tag.substr(
        //   0,
        //   this.thisData.mood_tag.length - 1
        // );
        formdata.append("mood_tag", this.thisData.mood_tag);
        instance
          .post("/api/index.php/community/sendMood", formdata)
          .then(res => {
            if (res.data.code === 1) {
              $("#imageInput").val("");
              $("#uploadPicList").html("");
              $("#uploadPicList").css("display", "none");
              this.thisData = {};
              //this.$emit("sendok");
              this.$parent.handleSend();
              $("input[name=pictype]").each(function(index, item) {
                if ($(this).is(":checked")) {
                  $(this).prop("checked", "");
                }
              });
            } else {
              console.log(res.data.msg);
            }
          });
      }
    }
  }
};
</script>
<style>
textarea {
  width: 100%;
  resize: none;
  border: 1px solid lightgray;
  border-radius: 10px;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  transition: all 0.5s ease;
  cursor: pointer;
  color: white;
  border-radius: 0 0;
}
</style>