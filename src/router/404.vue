<template>
  <div class="content_404">
    <div class="errno_img">
      <img src="../img/404/404.png">
      <Button type="primary"
              shape="circle"
              size="default"
              @click="goindex">返回首页</Button>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goindex() {
      window.location.href = './';
    }
  },
  beforeCreate() {
    this.$Message.error('页面没有发现');
  }
}
</script>

<style type="text/css" scoped>
.content_404 {
  margin: 0px auto;
}

.errno_img img {
  opacity: .7;
   width: 100%;
  height: 100%;
}
.errno_img button{
  position: absolute;
  left: 100px;
  top: 15px;
  line-height:30px;
}
</style>