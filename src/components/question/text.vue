<template>
    <div class="text">
        <h2>
            <div>Q{{index+1}}</div>
            <div>
                <p v-if='!titleModify' @click="showTitleInput">{{content.title}}</p>
                <input v-else ref="titleInput" type="text" :value="content.title" @blur="modifyTitle($event)">
            </div>
            <div>
                <input type="checkbox" v-model="content.required" @click="changeRequire"> 
                <span>此题是否必填</span>
            </div>
        </h2>
        <div class="textContainer">
            <el-input type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="txtarea">
                </el-input>
        </div>
        <div class="direct">    
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
            txtarea:''
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
        // 改变title值
        modifyTitle (ev) {
            this.$emit('modifyQuestionTitle', ev.target.value, this.index)
            this.titleModify = false
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
        },
        // 改变是否必选
        changeRequire () {
            this.$emit('changeRequire', this.index)
        }
    }
}

</script>

<style lang="stylus">
.text
  border-bottom 1px solid #8492A6
  position : relative
  padding : 10px 20px 40px
  &:hover
    background : #EFF2F7
    .direct
      display : block
  h2 
    height : 30px
    div 
      float : left
      height : 100%
      font-size : 16px
      line-height : 30px
      &:nth-child(1) 
        width : 6%
      &:nth-child(2)
        width : 33%
        p 
          margin-left 12px
          text-align left
          width : 100% 
        input 
          display : block 
          width : 100% 
          height : 100%
          border : none
          outline : none
      &:nth-child(3)
        width: 61% 
        text-align: right
  .textContainer
    margin-top: 10px
    textarea 
      padding : 10px
      resize : none
      outline : none
  .direct
    position : absolute
    display : none
    left : 3%
    bottom : 4px
    width : 94% 
    height : 20px
    span 
      cursor : pointer
    .left
      float : left 
    .right 
      float : right
      margin-left : 10px
</style>