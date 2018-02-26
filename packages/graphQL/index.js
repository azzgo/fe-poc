const { graphql, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList  } = require('graphql');
const db = require('./model')

const noteType = new GraphQLObjectType({
  name: 'note',
  fields: {
    id: { type: GraphQLInt },
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
  })
})

graphql(schema, `query { notes { title, value } }`).then((result) => {
  console.log('result: ', JSON.stringify(result))
})
