import { GraphQLError } from "graphql";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userResolvers = {
    Query: {
        login: async (_, { username, password }) => {

            const user = await User.findOne({
                $or: [{ username: username }, { email: username }]
            });

            if (!user) {
                throw new GraphQLError('Error: user not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new GraphQLError('Error: username or password is incorrect');
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return {
                status: true,
                message: "Login successful",
                token: token
            };
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