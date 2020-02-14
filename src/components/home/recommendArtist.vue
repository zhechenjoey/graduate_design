<template>
  <div id="recommendArtist" class="ui">
    <div class="topic">
      <a class="ui red tag medium label">热门摄影师</a>
      <div class="ui left mini labeled icon button">
        <router-link tag="span" to="/zone">更多</router-link>
        <i class="right arrow icon"></i>
      </div>
    </div>
    <hr>
    <div class="ui ordered horizontal list">
      <div class="item">
        <img class="ui avatar image" src="/images/avatar/small/tom.jpg" />
        <div class="content">
          <div class="header">Steve Jobes</div>50 Points
        </div>
      </div>
      <div class="item">
        <img class="ui avatar image" src="/images/avatar/small/stevie.jpg" />
        <div class="content">
          <div class="header">Stevie Feliciano</div>44 Points
        </div>
      </div>
      <div class="item">
        <img class="ui avatar image" src="/images/avatar/small/jenny.jpg" />
        <div class="content">
          <div class="header">Jenny Hess</div>11 Points
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>