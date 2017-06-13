<template>
  <div class="updatewrap">  
      <el-row :gutter="0">
      <el-col :xs="0" :sm="2" :md="4" :lg="5"><div class="grid-content"><br></div></el-col>

      <el-col :xs="24" :sm="20" :md="16" :lg="14"><div class="grid-content"  style="background:#6fc">
        <div class="updatePage">

            <div class="updateHeader">
              <h1 v-if="!titleModify" @click="modifyTitle">{{questionaire.title}}</h1>
              <input type="text" v-else @blur="titleModify = false" ref=titleInput v-model="questionaire.title">
            </div>

            <div class="createBody">
            <component v-for="(question,index) in questionaire.questions" 
              :is="question.type" 
              :content="question.content" 
              :index="index" 
              :alllen="questionaire.questions.length" :key="index"
              @modifyQuestionTitle="modifyQuestionTitle"
                @modifyOptionTitle="modifyOptionTitle"
                @deleteOption="deleteOption" 
                  @addOption="addOption" 
                    @deleteQuestion="deleteQuestion" 
                    @repeatQuestion="repeatQuestion" 
                      @toDown="toDown" 
                      @toUp="toUp"></component>

            <!--添加问题的模块-->
            <div class="createBtn">
              <div class="questionOption">
                <el-button :plain="true" type="success" @click="createSingle">单选题</el-button>
                <el-button :plain="true" type="warning" @click="createMultiple">多选题</el-button>
                <el-button :plain="true" type="info" @click="createText">文本题</el-button>
              </div>
                <div class="newQuestion" :style="{top:btnTop + 'px'}" @click="btnTop = 40">
                    <span>+</span> 
                    <span>添加问题</span>
                </div>
            </div>
          </div>
          

          <div class="createFooter">
              <div class="footerContainer">
                <div class="calander">
                  <span>问卷截止日期</span>
                  <!--<span @click="calanderShow=ture">{{date}}</span>-->
                  <div class="block">
                    <!--<span class="demonstration">默认</span>-->
                    <el-date-picker v-model="date" align="right" type="date" format placeholder="选择日期" :picker-options="pickerOptions1">
                    </el-date-picker>
                  </div>
                </div>
                <div class="saveGroup">
                  <el-button  @click="save" type="primary">保存问卷</el-button>
                  <el-popover @show="getrealdate"ref="popover5" placement="top" width="160" v-model="visible2">
                    <p>确定发布吗，截止日期为{{da}}</p>
                    <!--{{this.date.getFullYear() +"-"+ Number(this.date.getMonth()+1) +"-"+this.date.getDate()}}-->
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="cancel">取消</el-button>
                      <el-button type="primary" size="mini" @click="publish">确定</el-button>
                    </div>
                  </el-popover>
                  <el-button  type="success" v-popover:popover5>发布问卷</el-button>
                </div>
              </div>
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
import single from '../question/single'
import multiple from '../question/multiple'
import txt from '../question/text'
import axios from 'axios'
import { Update } from '../../api/api.js'

export default {
  data () {
    return {
      ower:'',
      questionaire:{
        title:'',
        questions:[]
      },
      titleModify:false,
      btnTop:-14,
      date:'',
      da:'',
      visible2:false,
      pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
          shortcuts: [{
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '三天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
    }
  },
    mounted() {
      this.ower = bus.user.id
      axios.get(`/api/questionaire/${this.$route.params.id}`)
        .then((res) => {
          console.log(res.data);
          if(res.data.code){
            this.$message.error('获取问卷失败，请重试');
          }else{
            this.questionaire = res.data.questionaire;
          }
        });
    },
    methods: {
      // 修改标题
      modifyTitle() {
        this.titleModify = true
        this.$nextTick(() => {
          this.$refs.titleInput.focus()
        })
      },
      createSingle() {
        this.questionaire.questions.push({
          type:'single',
          content:{
            title:'单选题',
            options:[
              '选项一',
              '选项二'
            ]
          }
        })
        this.btnTop = -14
      },
      createMultiple() {
        this.questionaire.questions.push({
          type: 'multiple',
            content: {
              title: '多选题',
              options: [
                  '选项1',
                  '选项2'
              ]
            }
        })
        this.btnTop = -14
      },
      createText () {
        this.questionaire.questions.push({
          type: 'txt',
          content: {
              title: '文本题',
              required: true
          }
        })
        this.btnTop = -14
        },
        //发布问卷
      publish() {
        this.pub()
        this.visible2 = false
      },
      pub() {
        function NewDate(str) { 
          str = str.split('-'); 
          var date = new Date(); 
          date.setUTCFullYear(str[0], str[1] - 1, str[2]); 
          date.setUTCHours(0, 0, 0, 0); 
          return date; 
        } 
        this.getrealdate()
        console.log("update请求之前")
        // 发布问卷
        // this.$once('pub', () => {console.log("qingqiujiesu")})
        let id = this.$route.params.id
        var _date = this.date.getFullYear() +"-"+ Number(this.date.getMonth()+1) +"-"+this.date.getDate();
        Update({
          id: id, // 问卷ID
          newQuestionaire:{
            ower: this.ower,
            createTime: new Date().getTime(),     // 创建日期
            deadTime: new NewDate(_date).getTime(), // 截止日期
            edit: 0,  // 是否允许编辑
            questionaire: this.questionaire
          }
        }).then((res) => {
          if(res.data.code) {
            this.$notify.error({
              title: '错误',
              message: '发布失败，请重试'
            });
          }else {
            this.$notify({
              title: '成功',
              message: '发布成功',
              type: 'success'
            });
            this.$router.push({path:`/user/${this.ower}`})
          }
        })
      },
      // 保存问卷
      save() {
        function NewDate(str) { 
          str = str.split('-'); 
          var date = new Date(); 
          date.setUTCFullYear(str[0], str[1] - 1, str[2]); 
          date.setUTCHours(0, 0, 0, 0); 
          return date; 
        } 
        this.getrealdate()
        let id = this.$route.params.id
        var _date = this.date.getFullYear() +"-"+ Number(this.date.getMonth()+1) +"-"+this.date.getDate();
        Update({
          id:id,
          newQuestionaire: {
            ower: this.ower,
            createTime: new Date().getTime(),
            deadTime: new NewDate(_date).getTime(), // 截止日期
            edit:1,
            questionaire: this.questionaire
          }
        }).then((res) => {
          if(res.data.code) {
            this.$message.error('保存失败，请重试');
          }else {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.$router.push({path: `/user/${this.ower}`})
          }
        }).catch((err) => {
          console.log(err)
        })
        
      },
      // 修改选项标题
      modifyQuestionTitle (val, indexP) {
          this.questionaire.questions[indexP].content.title = val
      },
      // 修改选项内容
      modifyOptionTitle (val, indexC, indexP) {
          this.questionaire.questions[indexP].content.options.splice(indexC, 1, val)
      },
      // 删除选项
      deleteOption (indexC, indexP) {
          this.questionaire.questions[indexP].content.options.splice(indexC, 1)
      },
      // 增加选项
      addOption (indexP) {
        this.questionaire.questions[indexP].content.options.push('新的选项')
      },
      // 删除问题
      deleteQuestion (indexP) {
          this.questionaire.questions.splice(indexP, 1)
      },
      // 复用问题
      repeatQuestion (indexP) {
          var newObj = JSON.parse(JSON.stringify(this.questionaire.questions[indexP]))
          this.questionaire.questions.splice(indexP + 1, 0, newObj)
      },
      // 问题下移
      toDown (indexP) {
          var temp = this.questionaire.questions.splice(indexP, 1)[0]
          this.questionaire.questions.splice(indexP + 1, 0, temp)
      },
      // 问题上移
      toUp (indexP) {
          var temp = this.questionaire.questions.splice(indexP, 1)[0]
          this.questionaire.questions.splice(indexP - 1, 0, temp)
      },
      cancel(){
        this.$message({ message: '取消发布',type: 'warning'});
        this.visible2 = false
      },
      getrealdate(){
        if(!this.date) {
          //提示输入截止日期
          this.$message({
            message: '请输入截止日期',
            type: 'warning'
          });
          this.visible2 = false
        }
        this.da = document.getElementsByClassName('el-input__inner')[0]._value
        // return document.getElementsByClassName('el-input__inner')[0]._value
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
.updatePage
  box-sizing border-box
  width 100%
  background #EFF2F7
  margin 40px auto 
  margin-top 0
  padding 20px
  .updateHeader
    h1
      margin 20px
      height  40px
      font-size 18px
      line-height 40px
      text-align center
      font-weight bolder
      color #324057
      &:hover
        background rgba(153,169,191,.3)
    input
      dispaly:block 
      width : 94%
      height : 40px
      margin : 20px
      font-size : 18px
      line-height : 40px
      text-align : center
      font-weight : bolder
      border : none
      background #EFF2F7
      outline : none   
  .createBody
    padding 15px
    border-top 1px solid #8492A6
    border-bottom 1px solid #8492A6 
    .createBtn
      width 110%
      margin-left -5%
      position relative
      height 60px
      margin-top 20px
      margin-bottom 25px
      .questionOption
        text-align center
        span
          display inline-block 
      .newQuestion  
        border-radius 10px  
        position absolute
        left 0px
        top -14px
        width 100%
        height 60px
        font-size 16px
        text-align center
        line-height 60px
        background  rgba(153,169,191,.85)
        color #666
        transition .4s
        cursor pointer
  .createFooter
    width 100%
    position relative
    padding 20px 10px
    height 50px
    color #6a6a6a
    .calander 
      float left
      width 60%
      height 30px
      span
        display block
        float left
        &:nth-child(1)
          width 120px
          height 30px
          font-size 16px
          line-height 30px
          margin-bottom 10px
        &:nth-child(2)
          width 140px
          height 28px
          line-height 28px
          border 1px solid #ced1d2
          text-indent 10px
          cursor pointer
      .block
        margin-left 7px
        text-align left
    .saveGroup
      float right
      width 40%
      height 30px
      line-height 30px
      text-align center
      .el-button--primary
        margin-right 3px
       .el-button--primary
        margin-bottom 5px

</style>
