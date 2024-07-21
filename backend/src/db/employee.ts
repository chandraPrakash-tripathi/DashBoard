import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
        enum: ['manager', 'developer', 'designer']  
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']  
    },
    courses: {
        type: [String],  
        default: []
    },
    imageUrl: {
        type: String,
        default: ''  
    }
}, {
    timestamps: true
});

export const EmployeeModel = mongoose.model('Employee', EmployeeSchema);