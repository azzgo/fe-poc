<template>
  <div>
    <header class="app-bar row middle-xs">
      <a href="/" class="logo col-xs-10">
        Retain
      </a>
      <nav class="col-xs-2">
        <div class="row middle-xs between-xs">
          <a class="link" to="/app/about">About</a>
        </div>
      </nav>
    </header>
    <div class="warpper row center-xs">
      <div class="creator col-xs-6">
        <new-note-form @onCreateNewNote="createNote"></new-note-form>
      </div>
      <div class="notes col-xs-8">
        <note-list :notes="notes" @onCheckNote="checkNote"></note-list>
      </div>
    </div>
  </div>
</template>

<style type="text/less" scoped>
  .app-bar {
    height: 65px;
    padding: 5px 30px;
    background-color: #00BCD4;
  }
  .logo {
    color: white;
    font-size: 30px;
    font-weight: 300;
    cursor: pointer;
  }
  .link {
    color: white;
    font-size: 24px;
    font-weight: 400;
    cursor: pointer;
  }

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

<script type="text/javascript">
import axios from 'axios'
import NewNoteForm from './NewNoteForm'
import NoteList from './NoteList'

export default {
  data() {
    return {
      notes: []
    }
  },
  mounted() {
    axios.post('http://localhost:3000/graphql', {
      query: `
        query {
          notes {
            id
            title
            value
          }
        }
      `
    }).then((res) => {
      this.notes = res.data.data.notes
    })
  },
  methods: {
    createNote(newNote) {
      axios.post('http://localhost:3000/graphql', {
        query: `
          mutation createNote($title: String!, $value: String!) {
            createNote(title: $title, value: $value) {
              id
              title
              value
            }
          }
        `,
        variables: {
          title: newNote.title,
          value: newNote.value,
        }
      }).then((res) => {
        this.notes = res.data.data.createNote
      })
    },
    checkNote({id}) {
      axios.post('http://localhost:3000/graphql', {
        query: `
          mutation checkNote($id: String!) {
            completeNote(id: $id) {
              id
              title
              value
            }
          }
        `,
        variables: {
          id,
        }
      }).then((res) => {
        this.notes = res.data.data.completeNote
      })
    },
  },
  components: {
    'new-note-form': NewNoteForm,
    'note-list': NoteList,
  }
}
</script>