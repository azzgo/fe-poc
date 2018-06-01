<template>
<div>
  <form action="">
    <input type="text" placeholder="Username">
    <input type="password" placeholder="Password">
    <button class="submit" type="submit">Submit</button>
  </form>
  <button @click="visible = true">打开模态框</button>
  <alert-modal :visible="visible" @close="visible=false">
    <span>测试测试</span>
  </alert-modal>
</div>
</template>

<script>
import AlertModal from 'src/components/AlertModal.vue'

export default {
  components: {
    AlertModal,
  },
  data() {
    return {
      visible: false,
    }
  },
}
</script>

<style lang="scss">
@import 'styles/helper.scss';

.submit {
  height: px2rem(120px);
  width: px2rem(300px);
  background: lightblue;
  color: white;
}
</style>
