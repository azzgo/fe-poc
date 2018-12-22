<template>
  <div
    class="pulling-wrapper"
    @touchstart="handleTouchStart($event)"
    @touchend="handleTouchEnd($event)"
    @touchmove="handleTouchMove($event)"
  >
    <div class="pulling-body"
      :style="{transform: 'translate(0, '+ ySpan +'px)'}"
    >
      <div class="pull-down-section">
        <slot name="pull-down-ing">
          <template v-if="pullingState === 'pullingDown'">
            pulling Down
          </template>
        </slot>
        <slot name="pull-down-ed">
          <template v-if="pullingState === 'pulledDown'">
            pulled
          </template>
        </slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <div class="pull-up-section"
      :style="{transform: 'translate(0, '+ (isBottomScreen ? ySpan : 0 )+ 'px)'}"
    >
      <slot name="pull-up-ing">
        <template v-if="pullingState === 'pullingUp'">
          pulling up
        </template>
      </slot>
      <slot name="pull-up-ed">
        <template v-if="pullingState === 'pulledUp'">
          pulled up
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollPullingScreen',
  data() {
    return {
      isTouching: false,
      startPoint: { x: 0, y: 0 },
      startScrollTop: null,
      ySpan: 0,
      isBottomScreen: false,
      pullingState: ''
    }
  },
  methods: {
    /**
     * @param {TouchEvent} $event
     */
    handleTouchStart($event) {
      const scrollTop = this.$el.scrollTop
      const scrollHeight = this.$el.scrollHeight
      const offsetHeight = this.$el.offsetHeight
      this.isBottomScreen = scrollTop + offsetHeight === scrollHeight
      if (scrollTop > 0 && !this.isBottomScreen) {
        return
      }
      this.startScrollTop = scrollTop
      this.startPoint = {
        x: $event.targetTouches[0].pageX,
        y: $event.targetTouches[0].pageY,
      }
      this.isTouching = true
    },
    handleTouchEnd() {
      if (this.ySpan > 40) {
        this.$emit('onPulledDown')
      }

      if (this.ySpan < -40) {
        this.$emit('onPulledUp')
      }
      this.ySpan = 0
      this.isTouching = false
      this.isBottomScreen = false
    },
    /**
     * @param {TouchEvent} $event
     */
    handleTouchMove($event) {
      if (!this.isTouching) {
        return
      }

      const currentPoint = {
        x: $event.targetTouches[0].pageX,
        y: $event.targetTouches[0].pageY,
      }

      const touchingDistance = currentPoint.y - this.startPoint.y
      // 阻尼效果的移动距离
      const dampDistance = Math.pow(Math.abs(touchingDistance) - 40, 0.8)
      // 如果是向下滚动
      if (touchingDistance > 0 && this.startScrollTop === 0) {
        $event.preventDefault()
        const isPullingDown = touchingDistance < 40
        this.ySpan = isPullingDown ? touchingDistance : 40 + dampDistance
        this.pullingState = isPullingDown ? 'pullingDown' : 'pulledDown'
        return
      }

      // 如果是向上滚动，切到到达最后一屏
      if (touchingDistance < 0 && this.isBottomScreen) {
        $event.preventDefault()
        const isPullingUp = touchingDistance > -40
        this.ySpan = isPullingUp ? touchingDistance : -40 - dampDistance
        this.pullingState = isPullingUp ? 'pullingUp' : 'pulledUp'
        return
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pulling-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  .pulling-body {
    // transition-duration: 300ms;
    position: relative;
  }

  .pull-down-section {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: -40px;
    height: 40px;
  }

  .pull-up-section {
    display: flex;
    align-items: center;
    justify-content: center;
    // transition-duration: 300ms;
    position: fixed;
    left: 0;
    right: 0;
    bottom: -40px;
    height: 40px;
  }

  .content {
    padding: 1px;
    box-sizing: border-box;
  }
}
</style>
