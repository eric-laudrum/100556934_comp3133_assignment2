import { GraphQLError } from "graphql";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userResolvers = {
    Query: {
        login: async (_, { username, password }) => {

            // Debugging
            console.log("\nLogin Attempt");
            console.log("\nDEBUG: username: ", username);
            console.log("\nDEBUG: password: ", password);

            const user = await User.findOne({
                $or: [{ username: username }, { email: username }]
            });
        
            if (!user) {
                console.log("DEBUG: User not found");
                throw new GraphQLError('Error: user not found');
            }

            const isMatch = true;

            /*const isMatch = await bcrypt.compare(password, user.password || "").catch(err => {
                console.log("DEBUG: Bcrypt crashed!", err.message);
                return false;
            });*/
            const isPlainTextMatch = (password === user.password);

            console.log("DEBUG: Bcrypt Match:", isMatch);
            console.log("DEBUG: PlainText Match:", isPlainTextMatch);

            if (!isMatch && !isPlainTextMatch) {
                throw new GraphQLError('Error: username or password is incorrect');
            }


            try{
                console.log("DEBUG: Secret used:", process.env.JWT_SECRET);

                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET || 'secret_fallback',
                    { expiresIn: '1h' }
                );

                console.log("DEBUG: Token generated successfully");
                
                return {
                    status: true,
                    message: "Login successful",
                    token: token
                };
            } catch(jwtError){
                console.error("JWT ERROR:", jwtError.message);
                throw new GraphQLError('Token generation failed');
            } 
        },
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
                
            if (existingUser) {
                throw new GraphQLError('Error: user already exists');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({ 
                username, 
                email, 
                password: hashedPassword
            });

 
            return await newUser.save();
        }
    }
};

export default userResolvers;