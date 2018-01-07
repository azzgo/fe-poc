import { createTypesByEnum } from 'src/utils/typeRelated'

enum actionTypes {
  fetchNotes,
  saveNotes,
  createNote,
  deleteNote,
  login,
  saveAuthInfo,
}

export default createTypesByEnum(actionTypes)
