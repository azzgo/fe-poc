<template>
  <div class="wrapper">
    <div>
      <svg width="200px" heigth="10px" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 0 L 200 0" stroke="#40b883" stroke-dashoffset="20" stroke-dasharray="200" stroke-width="10">
          <animate attributeType="XML" attributeName="stroke-dashoffset" from="200" to="0" dur="1.5s" repeatCount="indefinite"/>
        </path>
      </svg>
    </div>
    <div>
      <label for="progress">progress(%): </label>
      <input id="progress" type="number" v-model="progress">
    </div>
    <button @click="setProgress()">Set Loading Progress</button>
    <button @click="startLoading()">start Loading</button>
    <button @click="hideLoading()">stop Loading</button>
    <div ref="loadingContainer"></div>
  </div>
</template>

<script>
import progressLoading from 'src/utils/progressLoading'


let loadingInstance

export default {
  data() {
    return {
      progress: 0
    }
  },
  methods: {
    startLoading() {
      if (!loadingInstance) {
        loadingInstance = progressLoading.show(this.$refs.loadingContainer)
      }
    },
    setProgress() {
      loadingInstance.setProgress(Number(this.progress))
    },
    hideLoading() {
      loadingInstance && loadingInstance.destroy()
      loadingInstance = null
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
