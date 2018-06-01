<template>
  <div v-if="visible" class="overlay" v-traverseToBody>
    <div class="overlay-mask" @click="$emit('maskClick')"></div>
    <div class="overlay-container"><slot></slot></div>
  </div>
</template>

<script>
export default {
  directives: {
    traverseToBody: {
      inserted(el) {
        if (el) {
          document.body.appendChild(el)
        }
      },
    },
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(val) {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.overlay-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(1, 1, 1, 0.3);
  z-index: 1000;
}

.overlay-container {
  z-index: 1000;
  overflow: auto;
}
</style>
