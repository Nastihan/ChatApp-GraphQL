const apolloServer = require('apollo-server');
const { appendFile } = require('fs');
const gql = apolloServer.gql;

const typeDefs = gql`
    type Query{
        greet:String
    }
`

const resolvers = {
    Query:{
        greet:()=> `Hello World!`
    }
}

const server = new apolloServer.ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`);
})