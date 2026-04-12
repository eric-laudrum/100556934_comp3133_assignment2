import 'dotenv/config';
import connectDB from './config/db.js'
import jwt from 'jsonwebtoken';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import userResolvers from './resolvers/UserResolver.js';
import { employeeResolvers } from './resolvers/EmployeeResolver.js';
import { typeDefs } from './schemas/typeDefs.js';
import { startServerAndCreateNextHandler } from '@as-integrations/next';


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

/*
// Run locally
const { url } = await startStandaloneServer(server, {
    listen: {
        port: process.env.PORT || 4000
    },
    
    context: async ({ req }) => {

        // Get auth token
        const auth = req.headers.authorization || '';

        if (auth.startsWith('Bearer ')){
            const token = auth.split(' ')[1];

            try {
                const user = jwt.verify(token, process.env.JWT_SECRET || 'secret_fallback');

                // Return user to resolvers
                return { user };

            } catch (e) {
                console.error("JWT Verification failed:", e.message);
                return {user: null}; 
            }
        }
        // No token
        return { user: null};
    },
});
console.log("Server running at: ", url)
*/

export default startServerAndCreateNextHandler(server, {
    context: async (req) => {
        const auth = req.headers.authorization || '';
        if (auth.startsWith('Bearer ')) {
            const token = auth.split(' ')[1];
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET || 'secret_fallback');
                return { user };
            } catch (e) {
                return { user: null };
            }
        }
        return { user: null };
    },
});





