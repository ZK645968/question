<template>
  <div class="div_zhuye">
    <div class="bgwrapper" style="z-index:-1;position:absolute;">
      <bg></bg>
    </div>
    <div class="zhuye"></div>
    <div class="title">
      <span>问卷管理系统</span>
    </div>
    <login class="login"></login>
  </div>
</template>

<script>

import bg from './Background'
import login from "./Login"
export default {
  components: {
     login,
     bg
  }
}
</script>

<style type="text/css" scoped>
.div_zhuye {
  z-index: 199;
  position: relative;
  margin-top: -40px;
}
.zhuye {
  width: 100%;
  height:897px;
  -moz-background-size: 100% 100%;
}
 .bgwrapper { 
  width: 100%;
  height: 100%;
  } 
.title {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 160px;
}
.title span {
  display: block;
  height: 100px;
  margin: 30px auto;
  color: #fff;
  text-align: center;
  font-size: 35px;
  line-height: 100px;
  display: block;
  font-family: "微软雅黑"
}
</style>