<template>
  <scroll-pulling-screen>
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
}
</script>
