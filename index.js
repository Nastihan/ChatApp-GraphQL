const apolloServer = require('apollo-server');
const fs = require('fs');
const gql = apolloServer.gql;
const crypto = require("crypto");

const users = [
    {
        id:crypto.randomUUID(),
        firstName:"John",
        lastName:"Paul",
        email:"john@gmail.com",
        password:"12345"
    },
    {
        id:crypto.randomUUID(),
        firstName:"Arthur",
        lastName:"Morgan",
        email:"Arthur@gmail.com",
        password:"54321"
    }
]

const typeDefs = gql`
    type Query{
        users:[User]
        user(id:ID!):User
    }

    input UserCreationInput{
        firstName:String!
        lastName:String!
        email:String! 
        password:String!
    }

    type Mutation{
        CreateUser(input:UserCreationInput!):User
    }

    type User{
        id:ID
        firstName:String
        lastName:String
        email:String
    }
`

const resolvers = {
    Query:{
        users:()=>users,
        user:(parent, {id}, context)=>{
            console.log(id);
            return users.find(item=>item.id == id)
        }
    },
    Mutation:{
        CreateUser:(parent, {input}, context)=>{
            const newUser ={
                id:crypto.randomUUID(),
                ...input
            };
            users.push(newUser);
            console.log("new user created");
            return newUser;
        }

    }
}

const server = new apolloServer.ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`);
})