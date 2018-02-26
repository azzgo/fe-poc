const low = require('lowdb')
const Memory = require('lowdb/adapters/Memory')

const db = low(new Memory())


db.defaults({
  notes: [
    {
      id: 1,
      title: 'Note1',
      value: 'Note1 content',
    },
    {
      id: 2,
      title: 'Note2',
      value: 'Note2 content',
    }
  ]
})
.write()


module.exports = db

