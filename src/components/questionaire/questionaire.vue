<template>
  <div class="questionairewrap">
    
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
                      :select="selectData[index]"
                      :key="index"
                      :index="index"></component>
          </div>
          <div class="questionnaireFooter">
              <!--<span>提交问卷</span>-->
              <el-button type="primary" @click="submit()">提交问卷</el-button>
              <el-button @click="toHome()">返回主页</el-button>
          </div>
        </div>
      </div>
      </el-col>

      <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"></div></el-col>
    </el-row>


  </div>
</template>
<script>
import single from '../question/simpleSingle'
import multiple from '../question/simpleMultiple'
import txt from '../question/simpleText'
import axios from 'axios'
import bus from '../../store'

export default {
  data () {
    return {
      questionaire:{},
      selectData:[]
    }
  },
  mounted () {
    // 根据问卷id获取问卷
    // 根据不同的题目类型，在SelectData中创建不同的数据，例如：[{type:'single', option:''}]
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
                this.selectData.push({
                  option:'',
                  type:'single'
                })
                break
              case 'multiple': 
                this.selectData.push({
                  option:[],
                  type:'multiple'
                })       
                break
              case 'txt': 
                this.selectData.push({
                  option:'',
                  type:'txt',
                  required: question.content.required
                })
            }
          })
        }
      })
      console.log(this.selectData)
  },
  components: {
    single,
    multiple,
    txt
  },
  methods: {
    submit(){
      console.log("提交")
      // 获取到问卷id
      let questionaireId = this.$route.params.id
      // 存到localStorage
      
      let userSubmit = JSON.parse(localStorage.getItem('questionaire')) || []
      for (let i = 0, j = userSubmit.length; i < j; i++) {
        console.log(userSubmit[i])
        if (userSubmit[i] === questionaireId) {
            this.$message({
                message: '此问卷已填写过！',
                type: 'warning'
              });
            return
        }
      }
      console.log("开始检查是否全部填写")
      // 检查选项是否都已经填写
      for(let i = 0,j = this.selectData.length; i<j ;i++){
        var item = this.selectData[i]
        switch(item.type){
          case 'single': if(!item.option){
                    this.$message.error(`第${i + 1}题必填`);
                    return 
                  }
          case 'multiple': if(!item.option.length){
                    this.$message.error(`第${i + 1}题必填`);
                    return
                  }
          case 'txt' : if(item.required && !item.option){
                    this.$message.error(`第${i + 1}题必填`);
                    return 
                  }
        }
      }
      console.log("检查完成")
      
      userSubmit.push(questionaireId)
      localStorage.setItem('questionaire', JSON.stringify(userSubmit))

      axios.post('/api/submit',{id:questionaireId, data: this.selectData})
      .then((res) => {
        if(res.data.code) {
          this.$message.error(`提交问卷失败，请重试`);
        }else{
            this.$message({
            message: '提交成功，感谢您的回答',
            type: 'success'
          });
          this.$router.push({name: 'all'})
        }
      })


    },
    toHome() {
       this.$router.push({name: 'all'})
    }
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