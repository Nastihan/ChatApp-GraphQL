const gql = require('apollo-server').gql;

const typeDefs = gql`
    type Query{
        users:[User]
        user(id:ID!):User
    }

    input UserCreationInput{
        FirstName:String!
        LastName:String!
        Email:String! 
        Password:String!
    }

    type User{
        Id:ID
        FirstName:String
        LastName:String
        Email:String
    }

    type Mutation{
        SignUpUser(userInput:UserCreationInput!):User
    }

   
`

module.exports ={
    typeDefs
};