<template>
<div class="register">
    <el-row>
        <el-col :xs="0" :sm="2" :md="4" :lg="5">
            <div class="grid-content">
                <br>
            </div>
        </el-col>

        <el-col :xs="24" :sm="20" :md="16" :lg="14">
            <div class="wrapper">

                <el-row>
                    <el-col :xs="0" :sm="2" :md="4" :lg="5">
                        <div class="grid-content">
                            <br>
                        </div>
                    </el-col>

                    <el-col :xs="24" :sm="20" :md="16" :lg="14">
                        <div class="register">
                            <div class="form">
                                <label>用户名</label>
                                <el-input v-model="registerName" placeholder="请输入用户名"></el-input><br>
                                <label>密码</label>
                                <el-input type="password" v-model="registerPassword" placeholder="请输入密码"></el-input><br>
                                <label>确认密码</label>
                                <el-input type="password" v-model="registerPassword2" placeholder="请输入6-10位"></el-input><br>
                            </div>
                            <div class="btnwrap">
                                <el-button type="primary" @click="register()">提交</el-button>
                                <el-button @click="reset()">重置</el-button>
                            </div>
                        </div>
                    </el-col>

                    <el-col :xs="0" :sm="2" :md="4" :lg="5">
                        <div class="grid-content"></div>
                    </el-col>
                </el-row>

                
            </div>
        </el-col>

        <el-col :xs="0" :sm="2" :md="4" :lg="5">
            <div class="grid-content"></div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import axios from 'axios'
import bus from '../../store'
import { Register } from '../../api/api.js'
export default {
    data() {
        return {
            registerName: '',
            registerPassword: '',
            registerPassword2:''
        }
    },
    methods: {
        reset() {
            this.registerPassword = ''
            this.registerPassword2 = ''
            this.registerName = ''
        },
        register() {
            if(this.registerPassword == ''|| this.registerPassword2 == '' || this.registerName == ''){
                this.$message({
                    message: '用户名或密码不能为空！',
                    type: 'warning'
                })
                return
            }
            if (this.registerPassword !== this.registerPassword2) {
                this.registerPassword = ''
                this.registerPassword2 = ''
                this.$message({
                    message: '两次输入的密码不一致！',
                    type: 'warning'
                })
                return
            }
            // 密码格式不对  显示消息框
            if (this.registerPassword.length < 6 || this.registerPassword.length > 10) {
                this.registerPassword = ''
                this.$message({
                    message: '请重新输入密码',
                    type: 'warning'
                })
                return
            }
            Register({ registerName: this.registerName, registerPassword: this.registerPassword }).then((res) => {
                // 注册失败
                if (res.data.code) {
                    this.$message.error('注册失败，请重试');
                    // 注册成功
                } else {
                    this.$message({
                        message: '注册成功',
                        type: 'success'
                    })
                    bus.$emit('login', {
                        username: this.registerName,
                        id: res.data.id
                    })
                    // 储存用户信息到本地
                    window.sessionStorage.user = JSON.stringify({
                        username: this.registerName,
                        id: res.data.id
                    })
                    bus.user = {
                        username: this.registerName,
                        id: res.data.id
                    }
                    // 跳转至个人中心
                    this.$router.push({ path: `/user/${res.data.id}` })
                }
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
  .register
    margin 0 auto
    padding 20px
    .form 
      margin-top 90px
      label
        width 30%
        display inline-block
        text-align center
        height 36px
        line-height 36px
      .el-input 
        display inline-block
        width 60%
        margin-bottom 10px
    .btnwrap
      margin-top 20px
</style>
