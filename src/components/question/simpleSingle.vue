<template>
    <div class="simplesingle">
        <h2>
            <div>Q{{index+1}}</div>
            <div>
                <p>{{content.title}}</p>
            </div>
        </h2>
        <div class="options">
            <div class="optionItemContainer" v-for="(option, index) in content.options" :key="index">
                <!--<el-radio class="radio" :v-model="'option'+index">备选项</el-radio>-->
                <!--v-mode使得不同的radio绑定到一起。而且绑定的内容是选中的value   -->
                <input type="radio"  :value="'option'+index" v-model="select.option">
                <div class="optionContent">
                    <p>{{option}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: ['content', 'index', 'select']
}
// select = selectData[index] = {type:'', option:''}
// content = 问题的数据 = { title:'问题标题', options:['选项A', '选项B'] }
// index 表示这是第几个问题
</script>

<style lang="stylus">
  .simplesingle
    padding 10px 20px 10px
    &:hover
      background #EFF2F7
    h2
      height 30px
      div
        float left
        height 30px
        line-height 30px
        font-size 16px
        &:nth-child(1)
          width 5%
        &:nth-child(2)
          box-sizing border-box
          padding-left 10px
          text-align left
          width 95%
    .options
      padding-left 20px
      .optionItemContainer
        width 100%
        height 30px
        input[type=radio]
          float: left
          width 15px
          height 15px
          margin-top: 8px
        .optionContent
          float left
          width 90%
          height 30px
          line-height 30px
          p
            text-align left
            margin-left 12px
</style>
