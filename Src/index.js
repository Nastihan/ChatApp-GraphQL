const apolloServer = require('apollo-server');
const gql = apolloServer.gql;

const typeDefs = require("./TypeDefs");
const resolvers = require("./Resolvers");





const server = new apolloServer.ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`);
});