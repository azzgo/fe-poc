<template>
  <div>
    <h1>Home Page</h1>
    <div>
      <h4>Post Data</h4>
      <article v-for="(post, index) in posts" :key="index">
        <h5>{{post.title}}</h5>
        <div class="content">
          {{post.body}}
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import apiClient from 'src/utils/api'

export default {
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    apiClient.get('http://jsonplaceholder.typicode.com/posts').then((res) => {
      this.posts = res.data
    })
  },
}
</script>
