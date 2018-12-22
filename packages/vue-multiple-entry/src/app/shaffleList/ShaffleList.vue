<template>
  <div>
    <button class="btn shuffle" @click="shuffle()">shuffle</button><br>
    <transition-group name="flip-list" tag="div" class="tag-list">
      <label class="tag" :key="tag.id" v-for="tag in tags">
        {{tag.name}}
      </label>
      </transition-group>
  </div>
</template>

<script>
import tags from './tagListData.js'
import _ from 'lodash'

export default {
  data() {
    return {
      tags
    }
  },
  methods: {
    shuffle() {
      this.tags = _.shuffle(this.tags)
    }
  }
}
</script>

<style scoped>

.flip-list-move {
  transition: transform 1s;
}
.btn {
  height: 30px;
  margin: 10px;
  background-color: lightblue;
  border: none;
  color: white;
  outline: none;
}
.tag {
  width: 73px;
  margin: 10px;
  height: 30px;
  background-color: #46649a;
  display: inline-block;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
}
</style>
