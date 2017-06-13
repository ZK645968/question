<template>
<div class="datawrap">
<el-row :gutter="0">
      <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"><br></div></el-col>

      <el-col :xs="24" :sm="20" :md="16" :lg="14"><div class="grid-content"  style="background:#6fc">
          <div class="data">
            <div class="dataHeader">
              <h1>{{title}}</h1>
            </div>
            <div class="dataBody">
              <component v-for="(optiontext, index) in optionTxt" :is="optiontext.type" 
              :optionNum="optionData[index].optionNum" 
              :title="optionData[index].title" 
              :optionTxt="optiontext.content.options" 
              :index="index" :key="index"></component>
            </div>
            <div class="dataFooter">

            </div>
          </div>
      </div>
      </el-col>

      <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"></div></el-col>
    </el-row>

</div>
</template>
<script>
import single from './singleData'
import multiple from './multipleData'
import txt from './textData'
import axios from 'axios'
import bus from '../../store'

export default {
  data () {
    return {
      ower:'',
      title:'',
      optionData:[],
      optionTxt:[]    // 问卷的所有问题
    }
  },
  mounted () {
    this.ower = bus.user.id
    let id = this.$route.params.id
    // 获取问卷的信息
    axios.get(`/api/questionaire/${id}`)
      .then((res) => {
        if(res.data.code){
           this.$message.error('获取数据失败，请重试！');
        }else{
          this.optionTxt = res.data.questionaire.questions
        }
      })
    // 获取回答的数据
    axios.get(`/api/data/${id}`)
      .then((res) => {
        if(res.data.code){
           this.$message.error('获取数据失败，请重试！');
        }else{
          console.log(res.data)
          // res.data.finalData如下
          // {"title":'问卷标题' ,"questionData":[{"optionNum":[1,0],'title':'单选题'},{"optionNum":[1,0],'title':'单选题'},{}]}
          // let data = res.data.finalData
          this.title = res.data.finalData.title
          this.optionData = res.data.finalData.questionData // 所有问题的回答数据
        }
      })
  },
  components: {
    single,
    multiple,
    txt
  }
}
</script>
<style lang="stylus">
  .data
    box-sizing border-box
    width : 100%
    padding : 20px
    margin : 40px auto
    background : #fff
    .dataHeader
      h1 
        margin : 20px
        height : 40px
        font-size : 18px
        line-height : 40px
        text-align : center
        font-weight : bolder
        color : #65584f     
    .dataBody
      padding : 20px
      border-top : 1px solid #aeaeae
      border-bottom : 1px solid #aeaeae
    .dataFooter
      padding : 20px 0 
      a 
        display : block
        margin : 0 auto
        width : 140px
        height : 30px
        text-align : center
        line-height : 30px
        border : 1px solid #aeaeae
        cursor : pointer
</style>
