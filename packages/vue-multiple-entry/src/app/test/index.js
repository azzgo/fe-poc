import Vue from 'vue'
import Test from './components/test.vue'

new Vue({
  el: '#app',
  render(h) {
    return h(Test)
  },
})
