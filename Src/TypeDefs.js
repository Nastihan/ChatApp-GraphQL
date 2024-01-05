const gql = require('apollo-server').gql;

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
    }

    type User{
        id:ID
        firstName:String
        lastName:String
        email:String
    }
`

module.exports ={
    typeDefs
};