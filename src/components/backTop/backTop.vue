<template>
  <div class="backtop">
      <a href="javascript:;" id="btn"></a>
  </div>
</template>

<script>
export default {
 data () {
   return {
     
   }
 }
}
</script>

<style>
  #btn{
			width: 40px;
			height: 40px;
			position: fixed;
			right: 60px;
			bottom: 130px;
			display: none;
      opacity: .7;
      border-radius: 20px;
			background:url(top2.png) no-repeat left top;
			z-index: 500;
      animation-name: fadeIn; /*动画名称*/
      animation-duration: .7s; /*动画持续时间*/
      animation-iteration-count: 1; /*动画次数*/
      animation-delay: 0s; /*延迟时间*/
		}
		#btn:hover{
			background:url(top2.png) no-repeat left -40px;
		}

    @keyframes fadeIn {
      0% {
      opacity: 0; /*初始状态 透明度为0*/
      transform: translateY(-20px);
      }
      50% {
      opacity: .5; /*中间状态 透明度为0*/
      transform: translateY(10px);
      }
      100% {
      opacity: .7; /*结尾状态 透明度为1*/
      transform: translateY(0px);
      }
    }
</style>
