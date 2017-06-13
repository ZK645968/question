<template>
  <div class="singleData">
    <h2>
      <div>Q{{index+1}}</div>
      <div>
        <p>{{title}}</p>
      </div>
    </h2>

    <div class="graph" ref="graph"></div>
  </div>
</template>

<script type="text/ecmascript-6">
let echarts = require('echarts')
require('./walden.js')
export default {
  // title 问题的标题
  // index 索引
  // optionNum 
  props: ['optionNum', 'optionTxt', 'title', 'index'],
    mounted () {
      echarts.init(this.$refs.graph,'walden').setOption({
        tooltip: {},
        xAxis: {
            data: this.optionTxt
        },
        yAxis: {
            interval: 1,
            min: 0,
            max: 'dataMax'
        },
        series: [{
            name: '数量',
            type: 'bar',
            data: this.optionNum
        }]
      })
    }
}
</script>

<style lang='stylus'>
  .singleData 
    padding 10px 15px
    &:hover
      background-color #EFF2F7
    h2
      height 25px
      div
        float left
        height 25px
        font-size 16px
        line-height 25px
        &:nth-child(1)
          width 10%
        &:nth-child(2)
          width 90%
          p
            width 100%
    .graph 
      width : 100%
      height : 200px
      margin : 0 auto
      border 1px solid #F9FAFC
      div
        width 90px
        canvas
          width 100%
</style>
