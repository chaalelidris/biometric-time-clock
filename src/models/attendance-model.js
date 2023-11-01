// models/attendanceModel.js

import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    checkIn: { type: Date },
    checkOut: { type: Date },
    comment: { type: String },
    duration: { type: Number }, //duration in minutes
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
