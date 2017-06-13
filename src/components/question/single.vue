<template>
    <div class="single">
        <h2>
          <div>Q{{index+1}}</div>
          <div>
            <p v-if='!titleModify' @click="showTitleInput">{{content.title}}</p>
            <input v-else ref="titleInput" type="text" :value="content.title" @blur="modifyTitle($event)">
          </div>
        </h2>
        <div class="options">
          <div class="optionItemContainer" v-for="(option, index) in content.options" :key="index">
            <input type="radio" style="width:10px; height:10px">
            <div class="optionContent">
              <p v-if="!optionsInput[index]" @click="showOptionInput(index)">{{option}}</p>
              <input v-else :ref="'optionsInput'+index" @blur="hiddenOptionInput(index, $event)" type="text" :value="option">
            </div>
            <div class="optionsDelBtn" @click="deleteOption(index)">
                X
            </div>
          </div>
        </div>
        <div class="direct">
          <span @click="addOption" class="left">添加选项</span>         
          <span @click="deleteQuestion" class="right">删除</span>
          <span @click="repeatQuestion" class="right">复用</span>
          <span @click="toDown" class="right" v-if="index!==alllen-1">下移</span>
          <span @click="toUp" class="right" v-if="index!==0">上移</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: ['content', 'index', 'alllen'],
    data () {
        return {
            titleModify: false,
            optionsInput: []
        }
    },
    watch: {
        content: {
            handler () {
                this.optionsInput = []
                for (let i = 0, j = this.content.options.length; i < j; i++) {
                    this.optionsInput.push(false)
                }
            },
            deep: true
        }
    },
    methods: {
        // 显示title输入框
        showTitleInput () {
            this.titleModify = true
            this.$nextTick(() => {
                this.$refs.titleInput.focus()
            })
        },
        // 显示option输入框
        showOptionInput (index) {
            this.optionsInput.splice(index, 1, true)
            this.$nextTick(() => {
                this.$refs['optionsInput' + index][0].focus()
            })
        },
        // 改变title值
        modifyTitle (ev) {
            this.$emit('modifyQuestionTitle', ev.target.value, this.index)
            this.titleModify = false
        },
        // 改变options的值
        hiddenOptionInput (index, ev) {
            this.$emit('modifyOptionTitle', ev.target.value, index, this.index)
            this.optionsInput.splice(index, 1, false)
        },
        // 删除option
        deleteOption (index) {
            this.$emit('deleteOption', index, this.index)
        },
        // 添加选项
        addOption () {
            this.$emit('addOption', this.index)
        },
        // 删除问题
        deleteQuestion () {
            this.$emit('deleteQuestion', this.index)
        },
        // 复用问题
        repeatQuestion () {
            this.$emit('repeatQuestion', this.index)
        },
        // 下移
        toDown () {
            this.$emit('toDown', this.index)
        },
        // 上移
        toUp () {
            this.$emit('toUp', this.index)
        }
    }
}

</script>

<style lang="stylus" scoped>
.single
  position relative
  padding 10px 15px 40px
  border-bottom 1px solid #8492A6
  &:hover
    background #EFF2F7
    .direct
      display block
  h2
    height 30px
    div
      margin-left 6px
      float left
      height 30px
      line-height 30px
      font-size 16px
      &:nth-child(1)
        width 6%
      &:nth-child(2)
        width 85%
        p
          margin-left 12px
          text-align left
          width 100%
        input
          font-size 16px
          display block
          width 100%
          height 100%
          border none
          outline none
  .options
    padding-left 30px
    .optionItemContainer
      width 100%
      height 30px
      &.optionsDelBtn
        display block
      input[type=radio]
        width  15px
        height 15px
        float left
        margin-top 8px
      .optionContent
        float left
        width 80%
        height 30px
        line-height 30px
        p
          margin-left 8px
          text-align left
          width 100%
          height 100%
        input
          margin-left 5px
          display block
          width 100%
          height 100%
          border none
          outline none
          font-size 16px
      .optionsDelBtn
        float left
        width 3%
        height 30px
        line-height 30px
        text-align center
        cursor pointer
  .direct
    position absolute
    display none
    left 3%
    bottom 4px
    width 94%
    height 20px
    span 
      cursor pointer
    .left 
      float left
    .right
      float right 
      margin-left 10px
</style>
