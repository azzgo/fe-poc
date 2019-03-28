<template>
<div>
<button @click="alert()">点我</button>
</div>
</template>

<script>
import messagebox from './messagebox.js'
import Wandan from './wandan.vue'

export default {
  methods: {
    alert() {
      messagebox.alert({
        component: Wandan
      })
    }
  }
}
</script>
