<template>
  <div id="carousel">
    <div class="point">
      <!--图片箭头按钮-->
      <div>
        <img class="left" src="img/left.png" />
      </div>
      <div>
        <img class="right" src="img/right.png" />
      </div>
    </div>
    <div class="carouseldiv">
      <!--轮播界面-->
      <div>
        <img src="../../../static/img/1.jpg" />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
#carousel .carouseldiv{
	width:97%;
	height:110px;
	margin-top:5px;
	background:white;
    position:relative;
    overflow:hidden;
    border-radius:10px;
    /* padding:10px;
    box-sizing:border-box; */
}
#carousel .carouseldiv div{
	width:100%;
	height:100%;
}
#carousel .carouseldiv div img{
    position:absolute;
    bottom:-120px;
    width:100%;
    height:auto;
}
.point img{
	width:75px;
	height:75px;
}
.left{
	position:absolute;
	background:lightgrey;
	left:0px;
	top:200px;
	cursor:pointer;
	opacity:0.7;
}
.right{
	position:absolute;
	background:lightgrey;
	right:0px;
	top:200px;
	cursor:pointer;
	opacity:0.7;
}
.left:hover{
	opacity:1;
}
.right:hover{
	opacity:1;
}
/* .carouseldiv >div{

} */
</style>