import { createTypesByEnum } from 'src/utils/typeRelated'

enum actionTypes {
  fetchNotes,
  saveNotes,
}

export default createTypesByEnum(actionTypes)
