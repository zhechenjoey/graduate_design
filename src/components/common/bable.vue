<template>
  <div>
    <div class="gd-form-item" style="align-items:center;">
      <div v-if="thisData!==''&&thisData!==[]">
        <span v-for="item in thisData" :key="item">
          <span class="bable white">
            {{ item }}&nbsp;
            <span @click="handleDelete(item)">X</span>
          </span>&nbsp;
        </span>
      </div>
      <br v-if="thisData!==''&&thisData!==[]">
      <input
        type="text"
        placeholder="请输入标签"
        class="gd-input input80"
        name
        id
        ref="inputBable"
        @keyup.space="handleInputBable"
      />
      <span class="tip">多个标签请用空格隔开</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        thisData:[]
    };
  },
  props: ['data'],
  create() {
      alert(this.data)
  },
  Mounted() {
      alert(this.data)
  },
  watch: {
        data: function(newVal,oldVal){
            this.thisData = newVal;  //newVal即是chartData
        } //监听data，赋值给thisData
    },
  methods: {
    handleInputBable() {
      const that = this;  
      if(that.$refs.inputBable.value==" "||that.$refs.inputBable.value==""){
          that.$refs.inputBable.value = "";
          return ;
      }
      if (that.$refs.inputBable.value !== "") {
        if (that.thisData.indexOf(that.$refs.inputBable.value) !== -1) {
          that.$refs.inputBable.value = "";
        } else {
          that.thisData.push(that.$refs.inputBable.value);
          that.$refs.inputBable.value = "";
        }
      }
      this.handleEmitParent();
    },
    handleDelete(thisData) {
      if (thisData !== "") {
        const that = this;
        this.thisData.forEach((item, index) => {
          if (item == thisData) {
            that.thisData.splice(index, 1);
          }
        });
      }
      this.handleEmitParent();
    },
    handleEmitParent() {
      if (this.thisData !== "") {
        var newtag = "";
        for (var i = 0; i < this.thisData.length; i++) {
          if (i !== this.thisData.length - 1) {
            newtag = newtag + this.thisData[i] + ";";
          } else {
            newtag = newtag + this.thisData[i];
          }
        }
        this.$parent.thisData.new_tag = newtag; // 把新的值通过thisData.new_tag传给父组件
        newtag = null;
      }
    }
  }
};
</script>
<style>
</style>