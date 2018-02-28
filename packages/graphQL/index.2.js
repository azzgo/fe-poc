const { graphql, buildSchema  } = require('graphql');
const express = require('express')
const graphqlHTTP = require('express-graphql')
const shortid = require('shortid')
const cors = require('cors')
const db = require('./model')

const schema = buildSchema(`
  type Query {
    notes: [Note]
  }

  type Note {
    id: String!,
    title: String!,
    value: String!,
  }

  type Mutation {
    createNote(title: String!, value: String!): [Note]
    completeNote(id: String!): [Note]
  }
`)

const resolver = {
  notes() {
    return db.get('notes').value()
  },
  createNote({title, value}) {
    return db
      .get('notes')
      .push({ id: shortid.generate(), title, value })
      .write()
  },
  completeNote({id}) {
    db.get('notes')
    .remove({ id })
    .write()

    return db
      .get('notes')
      .value()
  }
}


const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({ schema, rootValue: resolver, graphiql: true }))

app.listen(3000)

console.log('App runs at: http://localhost:3000/graphql ')

