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

    type User{
        id:ID
        firstName:String
        lastName:String
        email:String
    }

    type Mutation{
        SignUpUser(input:UserCreationInput!):User
    }

   
`

module.exports ={
    typeDefs
};