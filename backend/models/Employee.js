import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: [true, "First name is required"], 
        trim: true 
    },
    last_name: { 
        type: String, 
        required: [true, "Last name is required"],
        trim: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: [true, "Email is required"],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'],
        required: true 
    },
    designation: { 
        type: String, 
        required: true 
    },
    salary: { 
        type: Number, 
        required: true, 
        min: [1000, "Salary must be 1000 or greater"]
    },
    date_of_joining: { 
        type: Date, 
        required: true 
    },
    department: { 
        type: String, 
        required: true 
    },
    // Cloudinary
    employee_photo: { 
        type: String  
    }
}, { 
    timestamps: true
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;