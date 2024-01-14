const pc= require("@prisma/client");
const ApolloServer  = require("apollo-server");
const prisma = new pc.PrismaClient();
const ApolloError = ApolloServer.ApolloError;
const AuthenticationError = ApolloServer.AuthenticationError;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
    Query:{
        
    },
    
    Mutation:{
        SignUpUser:async (_,{userInput})=>{
            const user = await prisma.user.findUnique({
                where: {
                  Email: userInput.Email,
                },
              });
            if (user)
            {
                throw new AuthenticationError("User already exists");
            }
            const hashedPass = await bcrypt.hash(userInput.Password, 10);
            const newUser = await prisma.user.create({
                data:{
                    ...userInput,
                    Password:hashedPass,
                }
            });
            return newUser;

        },

        SingInUser:async (_,{userInput})=> {
            const user = await prisma.user.findUnique({
                where: {
                  Email: userInput.Email,
                },
              });
            if (!user) 
            {
                throw new AuthenticationError("User doesn't exist with that email");
            }
            const match = await bcrypt.compare(userInput.Password, user.Password);
            if (!match)
            {
                throw new AuthenticationError("Email or password is invalid");
            }
            const token = jwt.sign({userId:user.Id}, process.env.JWT_SECRET_KEY); 
            return {token};

        }


    }
}

module.exports ={
    resolvers
};