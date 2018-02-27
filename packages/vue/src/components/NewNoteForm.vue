<template>
<div class="note-creator shadow-2">
  <form class="row" @submit="onSubmit">
    <input class="col-xs-10 title" type="text" v-model="noteTitle" placeholder="Note Title">
    <input class="col-xs-10" type="text" v-model="noteContent" placeholder="Note Content">
    <div class="actions col-xs-12 row between-xs">
      <button type="submit" class="btn-light">Done</button>
    </div>
  </form>
</div>
</template>

<style lang="less" scoped>
.note-creator {
  padding: 20px;
  background-color: white;
  border-radius: 3px;
}

.title {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
}
</style>


<script>
export default {
  data() {
    return {
      noteTitle: '',
      noteContent: '',
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      if (!this.noteTitle || !this.noteContent) {
        console.warn('New note title or content can not be empty.')
        return
      }
      this.$emit('onCreateNewNote', {
        title: this.noteTitle,
        value: this.noteContent
      })

      // reset
      this.noteTitle = ''
      this.noteContent = ''
    }
  }
}
</script>

