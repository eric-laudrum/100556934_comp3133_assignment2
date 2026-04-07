import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
}, { 
    timestamps: {createdAt: 'created_at', updatedAt:'updated_at' }


});

// Password hash
UserSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model('User', UserSchema);
export default User;
