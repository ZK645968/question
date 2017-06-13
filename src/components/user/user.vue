<template>
  <div class="wapp">
    <el-row :gutter="0">
      <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"><br></div></el-col>

      <el-col :xs="24" :sm="20" :md="16" :lg="14"><div class="grid-content">
        <div class="user">

          <div class="createBar" v-if="!items.length">  
            <router-link :to="{name:'create'}">
              <el-button type="primary"><i class="el-icon-plus"></i>新建问卷</el-button>
            </router-link>
          </div>

          <div class="items" v-else>
            <table v-loading="load">
                <thead>
                  <tr>
                    <th></th>
                    <th>标题</th>
                    <th>时间</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items"  :class="{selected : item.selected}">
                      <td>
                          <el-checkbox v-model="item.selected" @click=""></el-checkbox>
                      </td>
                      <td>{{item.title}}</td>
                      <td>{{item.createTime | toTime}}</td>
                      <td :class="{active: state[index]=='发布中'}">{{state[index]}}</td>
                      <td>
                        <el-button v-if="!item.edit" size="small"  :disabled="true">编辑</el-button>
                        <router-link v-else :to="{path: `/update/${item.id}`}">
                          <el-button size="small"  :plain="true" type="success">编辑</el-button>
                        </router-link>
                        <el-button size="small"  type="danger" @click="delOne(item.id, index)">删除</el-button>
                        <router-link :to="{path: `/data/${item.id}`}" v-if="!item.edit">
                          <el-button size="small">查看数据</el-button>
                        </router-link>
                        <router-link :to="{path: `/check/${item.id}`}" v-else>
                            <el-button size="small">预览问卷</el-button>
                        </router-link>
                      </td>        
                    </tr>
                </tbody>
            </table>

            <p class="deleteAll">
                <el-checkbox v-model="allDone">全选</el-checkbox>
                <!--<a href="javascript::" @click="delAll">删除</a>-->
                <!--<el-button size="middle"  type="danger" @click="delAll">删除</el-button>-->
                <el-popover
                  ref="popover4"
                  placement="top"
                  width="160"
                  v-model="visible2">
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="delAll">确定</el-button>
                  </div>
                </el-popover>
                
                <el-button v-popover:popover4 size="middle"  type="danger">删除</el-button>
            </p>

             <router-link class="create" :to="{path:'/create'}">
                <el-button type="primary"><i class="el-icon-plus"></i>新建问卷</el-button>
            </router-link>
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
import axios from 'axios'
import { Delete } from '../../api/api.js'
export default {
  data () {
    return {
      items: [],
      load: true,
      visible2:false
    }
  },
   computed: {
       state () {
          let arr = []
          this.items.forEach((item) => {
            if (item.edit) {
                arr.push('未发布')
            } else if (new Date().getTime() > item.deadTime) {
                arr.push('已结束')
            } else {
                arr.push('已发布')
            }
          })
          return arr
        },
        allDone: {
            get() {
              for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].selected === false) {
                  return false
                }
              }
              return true
            },
            set(value) {
              this.items.forEach((item) => {
                item.selected = value
              })
            }
        },
        delId() {
          var arrId = []
          this.items.forEach((item) => {
            if (item.selected) {
                arrId.push(item.id)
            }
          })
          return arrId
        }
    },
    methods: {
        // 删除一个
        delOne (id, index) {
          Delete({idArr: [id]})
            .then((data) => {
              if (data.data.code) {
                // 删除失败
                console.log("删除失败")
              } else {
                console.log("删除成功")
                // 删除数据
                this.items.splice(index, 1)
              }
            })
        },
        // 全部删除
        delAll () {
          Delete({idArr: this.delId})
            .then((data) => {
                if (data.data.code) {
                  console.log("删除失败，请重试")
                } else {
                  console.log("删除成功")
                  // 删除数据
                  for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].selected) {
                      this.items.splice(i, 1)
                      // 注意这里需要i--
                      i--
                    }
                  }
                }
            })
          this.visible2 = false
          this.$message({
          message: '删除成功',
          type: 'success'
        });
        }
    },
    beforeMount  () {
      let id = bus.user.id
      axios.get(`/api/getAllByUser?id=${id}`)
        .then((data) => {
          if (data.data.code) {
            console.log("获取问卷失败，请重试")
          } else {
            console.log("获取问卷成功")
            this.items = data.data.items
            this.items.forEach((item) => {
                // 响应式添加
                this.$set(item, 'selected', false)
            })
          }
        })
      // 处理加载的动画
      setTimeout(function () {
        this.load = false
      }.bind(this), 400);
      
    },
    filters: {
      toTime: function (timeStamp) {
        var date, Y, M, D, h, m, s
        date = new Date(Number(timeStamp))
        Y = date.getFullYear() + '-'
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        D = date.getDate() + ' '
        h = date.getHours() + ':'
        m = date.getMinutes() + ':'
        s = date.getSeconds()
        return (Y + M + D + h + m + s)
      }
    }
}
</script>
<style lang="stylus">
  .user
    .createBar
      box-sizing border-box
      margin 80px auto 0
      width 80%
      height 200px
      background #E5E9F2
      padding-top 85px
      .el-icon-plus
        margin-right 10px
    .items
      width 100%
      border-top 1px solid #C0CCDA
      margin 0px auto 0
      .create
        display inline-block
        margin-top 10px
        float right
        margin-right 15px
      table
        width 100%
        font-size 14px
        .el-button+.el-button
          margin-left 0
        thead
          th
            line-height 30px
            &:nth-child(1)
              width : 7% 
            &:nth-child(2)
              width : 20% 
            &:nth-child(3)
              width : 30% 
            &:nth-child(4)
              width : 10%  
            &:nth-child(5)
              width : 33%   
        tbody
          background #F9FAFC
          tr
            border-bottom 1px solid #c9c3be
            &:hover
              background #EFF2F7
            td
              line-height 50px
              text-align center
              &.active
                color : #ee7419
                &.cantedit
                    opacity : 0.6
      .deleteAll
        display inline-block
        float left
        background : #fff 
        padding : 10px 0 0px 18px
        font-size : 14px
        line-height : 20px
        input 
            margin-right : 6px
      .create
        i
          margin-right 6px
</style>
