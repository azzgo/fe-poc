<template>
  <div class="warpper row center-xs">
    <div class="creator col-xs-6">
      <NoteCreator @createNote="handleCreateNote" />
    </div>
    <div class="notes col-xs-8">
      <div className="row between-xs">
        <NoteCard
          v-for="note in notes"
          :key="note.id"
          class="col-xs-4"
          :note="note"
          @check="handleNoteDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NoteCreator from "@/components/NoteCreator.vue";
import NoteCard from "@/components/NoteCard.vue";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  components: {
    NoteCreator,
    NoteCard,
  },
  setup() {
    const notes = reactive([]);
    function handleCreateNote(event) {
      notes.push(event);
    }

    function handleNoteDelete(note) {
      notes.splice(notes.indexOf(note));
    }

    return { notes, handleCreateNote, handleNoteDelete };
  },
});
</script>


<style lang="scss" scoped>
.warpper {
  margin-top: 50px;
}

.notes {
  padding-top: 50px;
}

.creator {
  margin-bottom: 40px;
}
</style>

