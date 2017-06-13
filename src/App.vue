<template>
  <div id="app">
    <vheader></vheader>
    <router-view></router-view>
    <backtop></backtop>
  </div>
</template>

<script>
import vheader from './components/util/header'
import backtop from './components/backTop/backTop'

export default {
  data () {
    return {

    }
  },
  computed: {
    
  },
  components: {
    vheader,
    backtop
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
