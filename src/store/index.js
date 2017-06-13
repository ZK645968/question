import Vue from 'vue'

const bus = new Vue({
  data: {
      user: {},
      questionaire: {}
  }
})

if (window.sessionStorage.user) {
  bus.user = JSON.parse(window.sessionStorage.user)
}

export default bus