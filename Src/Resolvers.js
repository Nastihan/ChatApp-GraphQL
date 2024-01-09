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
        SignUpUser:async (_,{input})=>{
            const user = await prisma.user.findUnique({where:{email:input.email}});
            if (user)
            {
                throw new AuthenticationError("User already exists");
            }
            const hashedPass = await bcrypt.hash(input.password, 10);
            const newUser = await prisma.user.create({
                data:{
                    ...input,
                    password:hashedPass
                }
            });
            return newUser;

        }

    }
}

module.exports ={
    resolvers
};