<template>
<div class="allwrap">
  <el-row :gutter="0">
      <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"><br></div></el-col>

      <el-col :xs="24" :sm="20" :md="16" :lg="14"><div class="grid-content">
          <div class="all">
            <div class="items">
              <table>
                <thead>
                  <tr>
                    <th>标题</th>
                    <th>时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items">
                    <td><router-link :to="{path:`/questionaire/${item.id}`}">{{item.title}}</router-link></td>
                    <td>{{item.createTime | toTime}}</td>
                  </tr>
                </tbody>
              </table>
            </div>

             <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="200">
              </el-pagination>
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
import { All } from '../../api/api.js'
export default {
  data () {
    return {
      items:[]
    }
  },
  mounted () {
    All('/api/all').then((data) => {
      if(data.data.code) {
       this.warning()
      }else {
        this.items = data.data.questionaires
      }
    })
  },
  methods: {
    warning() {
      this.$notify.error({
        title: '错误',
        message: '获取问卷失败！'
      })
    }
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
<style lang='stylus'>
.all
  background #EFF2F7
  min-height 500px
  .items
    width 100%
    border-top 1px solid #D3DCE6
    margin  auto 
    table
      margin-top 40px
      width 100%
      font-size 14px
      thead
        th 
          line-height 30px
          &:nth-child(2)
            width 45%
      tbody
        background #fff
        tr
          border-bottom 1px solid #E5E9F2
          &:hover
            background #F9FAFC
          td
            line-height 40px
            text-align center
  table
    padding 20px
    a
      text-decoration none
      color cornflowerblue
      word-wrap wrap
</style>
