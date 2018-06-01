<template>
  <overlay :visible="visible" @maskClick="maskClosable && $emit('close')">
    <div class="modal">
      <div class="modal-header">{{title}}</div>
      <div class="modal-body"><slot></slot></div>
      <div class="modal-footer">
        <button class="alert-button" @click="$emit('close')">{{alertButtonText}}</button>
      </div>
    </div>
  </overlay>
</template>

<script>
import Overlay from './Overlay.vue'

export default {
  components: {
    Overlay,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '提示框',
    },
    alertButtonText: {
      type: String,
      default: '确定',
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  box-sizing: border-box;
  top: 10%;
  margin: auto;
  background-color: #fff;
  width: 600px;
  border-radius: 5px;
  position: relative;
  z-index: 1000;
}

.modal-header {
  box-sizing: border-box;
  height: 55px;
  padding: 15px;
  font-size: 18px;
  line-height: 1.42857143;
  margin: 0;
}

.modal-body {
  padding: 15px;
}

.modal-footer {
  box-sizing: border-box;
  height: 65px;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  .alert-button {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
  }
}
</style>
