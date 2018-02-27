const { graphql, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList  } = require('graphql');
const express = require('express')
const graphqlHTTP = require('express-graphql')
const shortid = require('shortid')
const cors = require('cors')
const db = require('./model')

const noteType = new GraphQLObjectType({
  name: 'note',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    value: { type: GraphQLString },
  }
})


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      notes: {
        type: GraphQLList(noteType),
        resolve() {
          return db.get('notes').value()
        }
      },
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createNote: {
        type: GraphQLList(noteType),
        args: {
          title: { type: GraphQLNonNull(GraphQLString) },
          value: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve(_, { title, value }) {
          return db
            .get('notes')
            .push({ id: shortid.generate(), title, value })
            .write()
        }
      },
      completeNote: {
        type: GraphQLList(noteType),
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve(_, { id }) {
          db.get('notes')
            .remove({ id })
            .write()

          return db
            .get('notes')
            .value()
        }
      }
    },
  })
})


const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

app.listen(3000)

console.log('App runs at: http://localhost:3000/graphql ')

