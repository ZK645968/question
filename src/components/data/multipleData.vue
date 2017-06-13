<template>
<div class="singleDataPanel">
    <h2>
      <div>Q{{index+1}}</div>
      <div>
          <p>{{title}}</p>
      </div>
    </h2>
    <div class="graph" ref="graph">

    </div>
</div>
</template>

<script type="text/ecmascript-6">
let echarts = require('echarts')
require('./walden.js')
export default {
    props: ['optionNum', 'optionTxt', 'title', 'index'],
    mounted () {
      let data = []
      for (let i = 0; i < this.optionNum.length; i++) {
        data.push({
            name: this.optionTxt[i],
            value: this.optionNum[i]
        })
      }
      echarts.init(this.$refs.graph,'walden').setOption({
        series: [
          {
              type: 'pie',
              radius: '75%',
              data: data
          }
        ],
        itemStyle: {
            normal: {
                // 阴影的大小
                shadowBlur: 50,
                // 阴影水平方向上的偏移
                shadowOffsetX: 0,
                // 阴影垂直方向上的偏移
                shadowOffsetY: 0,
                // 阴影颜色
                shadowColor: 'rgba(0, 0, 0, 0.2)'
            }
        }
      })
    }
}
</script>

<style lang="stylus">
.singleDataPanel
    padding : 10px 20px 20px
    &:hover
        background-color #EFF2F7
    h2 
        height : 30px
        div 
            float : left
            height : 30px
            font-size : 16px
            line-height : 30px
            &:nth-child(1) 
                width : 6%
            &:nth-child(2)
                width : 94%
                p 
                    width : 100% 
    .graph 
      width : 100%
      height : 230px
      margin : 0 auto
      border 1px solid #F9FAFC
      
</style>
