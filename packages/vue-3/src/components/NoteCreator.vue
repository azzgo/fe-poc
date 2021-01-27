<template>
  <div class="note-creator shadow-2">
    <form class="row" @submit="handleSubmit">
      <input
        type="text"
        name="newNoteTitle"
        placeholder="Title"
        class="col-xs-10 title"
        autoComplete="off"
        v-model="title"
      />
      <input
        type="text"
        name="newNoteValue"
        placeholder="Take a note..."
        class="col-xs-10"
        autoComplete="off"
        v-model="value"
      />
      <div class="actions col-xs-12 row between-xs">
        <button type="submit" class="btn-light">Done</button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { nanoid } from 'nanoid'

export default defineComponent({
  setup(props, ctx) {
    const noteForm = reactive({
      title: "",
      value: "",
    });

    /**
    @param {UIEvent} event
    **/
    function handleSubmit(event) {
      event.preventDefault();

      if (!noteForm.title || !noteForm.value) {
        alert("Note Title or Content should not be empty!");
        return;
      }

      ctx.emit("createNote", {
        id: nanoid(10),
        ...noteForm,
      });

      noteForm.title = "";
      noteForm.value = "";
    }

    return { ...toRefs(noteForm), handleSubmit };
  },
});
</script>

<style lang="scss" scoped>
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
