var express = require('express');
var graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./GraphQLSchema');

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));