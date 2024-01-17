const pc= require("@prisma/client");
const ApolloServer  = require("apollo-server");
const prisma = new pc.PrismaClient();
const ApolloError = ApolloServer.ApolloError;
const AuthenticationError = ApolloServer.AuthenticationError;
const ForbiddenError = ApolloServer.ForbiddenError;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
    Query:{
        users:async (_,args,{userId})=>{
            console.log(userId);
            if(!userId) throw new ForbiddenError("You must be logged in");
            const users = await prisma.user.findMany({
                orderBy:{
                    CreatedAt:"desc"
                },
                where:{
                    Id:{
                        not:userId
                    }
                }
            });
            return users;
        }

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

        },

        CreateMessage: async (_,{receiverId, text},{userId}) =>{
            if(!userId) throw new ForbiddenError("You must be logged in!!");
            const message = await prisma.message.create(
                {
                    data:{
                        Text:text,
                        ReceiverId:receiverId,
                        SenderId:userId
                    }
                }
            )
            return message;
        }


    }
}

module.exports ={
    resolvers
};