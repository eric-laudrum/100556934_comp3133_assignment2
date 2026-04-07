import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected successfully")
    } catch(err){
        console.log("Error: Mongo DB connection failed: ", err.message)
        process.exit(1);
    }
};


export default connectDB;