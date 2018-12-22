<template>
  <transition :name="pullDirection" tag="div" @after-leave="pullDirection = '';showTransition = false">
    <scroll-pulling-screen v-if="!showTransition" key="main-content" @onPulledDown="handlePulledDown" @onPulledUp="handlePulledUp">
      <div>
        <h1>Home Page</h1>
        <div>
          <h4>Post Data</h4>
          <article v-for="(post, index) in posts" :key="index">
            <h5>{{post.title}}</h5>
            <div class="content">
              {{post.content}}
            </div>
          </article>
        </div>
      </div>
    </scroll-pulling-screen>
    <div v-if="showTransition" key="placeholder" class="placeholder-screen">
    </div>
  </transition>
</template>
<script>
import apiClient from 'src/utils/api'
import ScrollPullingScreen from 'src/components/ScrollPullingScreen.vue'

export default {
  components: {
    ScrollPullingScreen,
  },
  data() {
    return {
      posts: [],
      showTransition: false,
      pullDirection: '',
    }
  },
  mounted() {
    const store = localStorage.getItem('posts')
    if (store) {
      this.posts = JSON.parse(store)
    } else {
      apiClient.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
        this.posts = res.data
        localStorage.setItem('posts', JSON.stringify(this.posts))
      })
    }
  },
  methods: {
    handlePulledDown() {
      this.pullDirection = 'down'
      this.showTransition = true
    },
    handlePulledUp() {
      this.pullDirection = 'up'
      this.showTransition = true
    }
  }
}
</script>

<style lang="scss" scoped>
.up-enter-active {
  animation: .6s linear moveUpIn;
}

.up-leave-active {
  animation: .6s linear moveUpOut;
}

.down-enter-active {
  animation: .6s linear moveDownIn;
}

.down-leave-active {
  animation: .6s linear moveDownOut;
}

.placeholder-screen {
  background-color: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

@keyframes moveUpIn {
  from {
    transform: translateY(100%)
  }
}

@keyframes moveUpOut {
  to {
    transform: translateY(-100%);
  }
}

@keyframes moveDownIn {
  from {
    transform: translateY(-100%)
  }
}

@keyframes moveDownOut {
  to {
    transform: translateY(100%)
  }
}
</style>
