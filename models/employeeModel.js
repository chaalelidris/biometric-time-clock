import mongoose from "mongoose";

mongoose

const employeeSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    dateCreated: { type: Date, default: Date.now },
    department: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee
