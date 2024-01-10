const pc= require("@prisma/client");
const ApolloServer  = require("apollo-server");
const prisma = new pc.PrismaClient();
const ApolloError = ApolloServer.ApolloError;
const AuthenticationError = new ApolloServer.AuthenticationError;
const bcrypt = require("bcrypt");

const resolvers = {
    Query:{
        
    },
    
    Mutation:{
        SignUpUser:async (_,{userInput})=>{
            // const user = await prisma.user.findUnique({
            //     where:{
            //         Email:input.email,
            //     },
            // });
            // if (user)
            // {
            //     throw new AuthenticationError("User already exists");
            // }
            const hashedPass = await bcrypt.hash(userInput.Password, 10);
            const newUser = await prisma.user.create({
                data:{
                    ...userInput,
                    Password:hashedPass,
                }
            });
            return newUser;

        }

    }
}

module.exports ={
    resolvers
};