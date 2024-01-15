const apolloServer = require('apollo-server');
const gql = apolloServer.gql;
const jwt = require("jsonwebtoken");
const {typeDefs} = require("./TypeDefs");
const {resolvers} = require("./Resolvers");
const { introspectionFromSchema } = require('graphql');







const server = new apolloServer.ApolloServer(
    {
    typeDefs,
    resolvers,
    context:({req})=>
    {
        const {authorization} = req.headers;
        if(authorization)
        {
            
            const {userId} = jwt.verify(authorization, process.env.JWT_SECRET_KEY);
            return {userId};
        }
    }
    }
);

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`);
});