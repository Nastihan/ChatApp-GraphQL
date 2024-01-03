const apolloServer = require('apollo-server');
const { appendFile } = require('fs');
const gql = apolloServer.gql;

const users = [
    {
        id:1,
        firstName:"John",
        lastName:"Paul",
        email:"john@gmail.com",
        password:"12345"
    },
    {
        id:2,
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
    }
}

const server = new apolloServer.ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`);
})