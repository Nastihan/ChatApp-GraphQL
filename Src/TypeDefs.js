const gql = require('apollo-server').gql;

const typeDefs = gql`
    type Query{
        users:[User]
    }

    input UserCreationInput{
        FirstName:String!
        LastName:String!
        Email:String! 
        Password:String!
    }

    type Token{
        token:String!
    }

    input UserSingInInput{
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
        SingInUser(userInput:UserSingInInput!):Token
    }

   
`

module.exports ={
    typeDefs
};