import Vue from 'vue'
import LoadingDemo from './loadingDemo.vue'

new Vue({
  el: '#app',
  render(h) {
    return h(LoadingDemo)
  }
})