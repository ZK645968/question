<template>
  <div class="multipleSimple">
    <h2>
      <div>Q{{index+1}}</div>
      <div>
        <p>{{content.title}}</p>
      </div>
    </h2>
    <div class="options">
      <div class="optionItemContainer" v-for="(option, index) in content.options" :key="index">
        <input type="checkbox" :value="'option'+index" v-model="select.option">
        <div class="optionContent">
          <p>{{option}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content', 'index', 'select']
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.multipleSimple
  position : relative
  padding : 10px 20px 10px
  &:hover
    background #EFF2F7
  h2 
    height : 30px
    div 
      float: left
      height: 30px
      line-height : 30px
      font-size : 16px
      &:nth-child(1) 
          width : 6%
      &:nth-child(2)
        box-sizing border-box
        padding-left 10px
        text-align left
        width : 94%
  .options 
    padding-left : 25px
    .optionItemContainer 
      width : 100% 
      height : 30px 
      input[type=checkbox]
        float: left
        width : 15px
        height 15px
        margin-top: 8px
      .optionContent 
        float: left
        width : 90% 
        height : 30px
        line-height : 30px
        p
          text-align left
          margin-left 12px
</style>
</style>