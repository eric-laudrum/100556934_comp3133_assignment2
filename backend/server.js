import 'dotenv/config';
import connectDB from './config/db.js'
import jwt from 'jsonwebtoken';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import userResolvers from './resolvers/UserResolver.js';
import { employeeResolvers } from './resolvers/EmployeeResolver.js';


import { typeDefs } from './schemas/typeDefs.js';


// Connect to MongoDB
connectDB();


const resolvers = {
    Query: {
        ...userResolvers.Query, 
        ...employeeResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...employeeResolvers.Mutation
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


// Start server
const { url } = await startStandaloneServer(server, {
    listen: {
        port: process.env.PORT || 4000
    },
    
    context: async ({ req }) => {
        const auth = req.headers.authorization || '';
        if (auth) {
            try {
                const token = auth.replace('Bearer ', '');
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return { user };
            } catch (e) {
                return {}; 
            }
        }
        return {};
    },
});


console.log("Server running at: ", url)
