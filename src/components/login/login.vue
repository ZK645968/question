<template>
    <transition name="logshow">
      <div class="login">
        <el-form :model="ruleForm2"
                 :rules="rules2"
                 ref="ruleForm2"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-container"
                 >
        
          <el-form-item prop="account">
            <el-input type="text"
                      v-model="ruleForm2.loginName"
                      auto-complete="off"
                      placeholder="账号"></el-input>
          </el-form-item>
  
          <el-form-item prop="checkPass">
            <el-input type="password"
                      v-model="ruleForm2.loginPassword"
                      auto-complete="off"
                      placeholder="密码"></el-input>
          </el-form-item>
  
          <el-checkbox v-model="checked"
                       checked
                       class="remember">记住密码</el-checkbox>

          <label class="register" @click=""><a href="register" style="text-decoration: none">立即注册</a></label>

          <el-form-item style="width:100%;">
            <el-button type="primary"
                       style="width:100%;"
                       @click.native.prevent="login"
                       :loading="logining">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
</template>

<script>
import axios from 'axios'
import bus from '../../store/index.js'
import { Login } from '../../api/api.js'
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        loginName: '',
        loginPassword: ''
      },
      rules2: {
        loginName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        loginPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: true
    };
  },
  computed: {
    
  },
  methods: {
    login () {
       if (!this.ruleForm2.loginName || !this.ruleForm2.loginPassword) {
          this.$message({
              message: '用户名或密码不能为空',
              type: 'warning'
          })
          return
       }
        Login({loginName: this.ruleForm2.loginName, loginPassword: this.ruleForm2.loginPassword}).then((res) => {
            // 登陆失败
            if (res.data.code) {
                this.$message.error('登录失败，请重试');
            } else {
                this.$message({
                    message: '登录成功',
                    type: 'success'
                })
                bus.$emit('login', {
                    username: this.ruleForm2.loginName,
                    id: res.data.id
                })
                console.log("登录成功，状态-在线")
                // 储存用户信息到本地
                window.sessionStorage.user = JSON.stringify({
                    username: this.ruleForm2.loginName,
                    id: res.data.id
                })
                bus.user = {
                    username:this.ruleForm2.loginName,
                    id: res.data.id
                }
                // 跳转至个人中心
                this.$router.push({path: `/user/${res.data.id}`})
            }
        }).catch((err) => {
          this.$message.error('登录失败，请重试');
        })
    }
  }
}

</script>

<style lang="stylus" scoped>
    .login
      position: absolute
      margin 0 auto
      top: 0; left: 0; bottom: 0; right: 0;
      &.logshow-enter-active, &.logshow-leave-active 
         transition: opacity .5s
      &.logshow-enter, &.logshow-leave-active 
        opacity: 0
      
      .login-container
        //rgba(0, 0, 0, 0.06)
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06) , 0 1px 0px 0 rgba(0, 0, 0, 0.06)
        -webkit-border-radius: 5px
        border-radius: 5px
        -moz-border-radius: 5px
        background-clip: padding-box
        margin: 200px auto
        width: 270px
        z-index 10
        padding: 35px 35px 15px 35px
        /*background:#fff*/
        border: 1px solid #eaeaea
        box-shadow: 0 0 25px #cac6c6
        position: relative
        .title 
          margin: 0px auto 40px auto
          text-align: center
          color: #505458
        .remember 
          margin: 0px 0px 35px 0px
          color: white
          float left
        .register
          margin-left 123px
          a
            color white
            font-size 14px
</style>