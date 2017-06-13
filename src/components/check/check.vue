<template>
<div class="wrapcheck">
  <el-row :gutter="0">
        <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"><br></div></el-col>

      <el-col :xs="24" :sm="20" :md="16" :lg="14"><div class="grid-content"  style="background:#6fc">
        <div class="questionaire">
          <div class="questionaireHeader">
            <h1>{{questionaire.title}}</h1>
          </div>
          <div class="questionaireBody">
            <component v-for="(question,index) in questionaire.questions" 
                      :is="question.type"
                      :content="question.content"
                      :select="selecrData[index]"
                      :key="index"
                      :index="index"></component>
          </div>
          <div class="questionnaireFooter">
              <!--<span>提交问卷</span>-->
              <el-button :plain="true" @click="toHome" type="info">返回主页</el-button>
          </div>
        </div>
      </div>
      </el-col>

      <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"></div></el-col>
    </el-row>
</div>
</template>
<script>
import bus from '../../store'
import single from '../question/simpleSingle'
import multiple from '../question/simpleMultiple'
import txt from '../question/simpleText'
import axios from 'axios'
export default {
  data () {
    return {
      ower:'',
      questionaire:{},
      selecrData:[] // 维护一个问题类型的数组
    }
  },
  mounted () {
    // 根据问卷id获取问卷
    axios.get(`/api/questionaire/${this.$route.params.id}`)
      .then((res) => {
        if(res.data.code){
          this.$message.error('获取问卷失败，请重试');
        }else{
          console.log(res.data)
          this.questionaire = res.data.questionaire
          this.questionaire.questions.forEach((question) => {
            switch(question.type){
              case 'single': 
                this.selecrData.push({
                  option:'',
                  type:'single'
                })
                break
              case 'multiple': 
                this.selecrData.push({
                  option:[],
                  type:'multiple'
                })       
                break
              case 'txt': 
                this.selecrData.push({
                  option:'',
                  type:'txt',
                  required: question.content.required
                })
            }
          })
        }
      })
      console.log(this.selecrData)
  },
  methods: {
    toHome(){
      this.ower = bus.user.id;
      // this.$router.push({name:'user'})
      this.$router.push({path: `/user/${this.ower}`})
    }
  },
  components: {
    single,
    multiple,
    txt
  }
}
</script>
<style lang="stylus">
.questionaire
  width :100%
  background : #fff
  .questionaireHeader
    h1 
      margin : 20px
      height : 40px
      font-size : 18px
      line-height : 40px
      text-align : center
      font-weight : bolder
      color : #65584f
      &:hover 
        background #EFF2F7
  .questionaireBody
    padding : 40px
    border-top : 1px solid #aeaeae
    border-bottom : 1px solid #aeaeae
  .questionnaireFooter
    padding : 20px 0 


</style>
