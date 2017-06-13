<template>
<div class="wrap">
    <el-row :gutter="0">
      <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"><br></div></el-col>

      <el-col :xs="24" :sm="20" :md="16" :lg="14"><div class="grid-content"  style="background:#6fc">
        <div id="head">
          <span class="mark"><i class="el-icon-document"></i></span>
          <router-link :to="{name:'all'}" class="title" style="text-decoration:none">问卷主页</router-link>
          <router-link :to="{path:`/user/${user.id}`}" class="myquestionaire" style="text-decoration:none">我的问卷</router-link>
          
          <!--右边的，是否登录显示两种状态-->
          <div class="logGroup">
            <!--未登录状态-->
            <div class="loginGroup" v-if="!user.username">
              <router-link :to="{name:'login'}">登录</router-link>
              <span>|</span>
              <router-link :to="{name:'register'}">注册</router-link>
            </div>
            <!--已登录状态-->
            <div class="logoutGroup" v-else @click="panelShow = !panelShow">
                <span class="icon—user">{{user.username}}</span>
                <transition name="el-zoom-in-top">
                  <div class="panel" v-show="panelShow" >
                    <router-link :to="{path: `/user/${user.id}`}">我的发布</router-link>
                    <a @click="logout">退出</a>
                  </div>
                </transition>
            </div>
          </div>
        </div>
      </div>
      </el-col>

      <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"></div></el-col>
    </el-row>
</div>
</template>

<script type="text/ecmascript-6">
import bus from '../../store'
export default {
  data () {
    return {
      user:{},
      panelShow: false
    }
  },
  mounted () {
    // 登录状态的保存。防止刷新丢失
    if(bus.user) {
      this.user = bus.user
    }
    // 接受登录请求
    bus.$on('login', (user) => {
      this.user = user
    }) 
  },
  methods: {
    logout() {
      this.show = false,
      this.user = {},
      bus.user = {},
      window.sessionStorage.removeItem('user')
      this.$router.push({name:'all'})
    }
  }
}
</script>

<style lang="stylus" scoped>
#head
  height 20px
  padding 10px 0 10px 20px
  font-size 15px
  line-height 15px
  background-color #20A0FF
  .mark
    display inline-block
    width 20px
    height 20px
    border-radius 10px
    text-align center
    color white
    float left
    i
      width 20px
      height 20px
      line-height 20px
      font-size 17px
  .title
    color #fff
    float left
    margin-left 10px
    line-height 20px
  .myquestionaire
    color #fff
    line-height 20px
  .logGroup
    display inline-block
    float right 
    width 110px
    text-align center
    color #fff
    cursor pointer
    line-height 20px
    a
      text-decoration none
      color #fff
    .logoutGroup
      position relative
      .panel
        display block
        padding 6px 0  
        position absolute
        top 25px
        left 0px
        width 100px
        z-index 100
        background #58B7FF
        border-radius 5px
        a
          display block
          padding-top 2px
          font-size 14px
          line-height 19px
          text-align center
          cursor pointer
          &:nth-child(1)
            border-bottom 1px solid #fff
            padding-bottom 3px

  </style>
