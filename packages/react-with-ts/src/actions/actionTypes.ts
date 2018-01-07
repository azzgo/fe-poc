import { createTypesByEnum } from 'src/utils/typeRelated'

enum actionTypes {
  fetchNotes,
  saveNotes,
  createNote,
  deleteNote,
}

export default createTypesByEnum(actionTypes)
