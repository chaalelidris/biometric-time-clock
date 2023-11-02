import Attendance from "../models/attendance-model.js";
import Employee from "../models/employee-model.js";



const checkIn = async (req, res) => {
    try {
        const { employeeId, comment } = req.body;

        // Find the employee by ID
        const employee = await Employee.findById(employeeId);

        // Check if the employee exists
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        // Find the latest attendance record for the employee
        const latestAttendance = await Attendance.findOne({ employee: employeeId }).sort({ checkIn: -1 });

        // Check if the employee has checked in before
        if (latestAttendance && !latestAttendance.checkOut) {
            return res.status(400).json({ error: 'Employee is already checked in.' });
        }

        // Perform check-in
        const attendance = new Attendance({
            employee: employeeId,
            checkIn: new Date(),
            comment,
        });

        await attendance.save();

        res.status(200).json(attendance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error" });
    }
};



const checkOut = async (req, res) => {
    try {
        const { employeeId, comment } = req.body;

        // Find the latest attendance record for the employee
        const latestAttendance = await Attendance.findOne({ employee: employeeId }).sort({ checkIn: -1 });

        // Check if the employee has checked in before
        if (!latestAttendance || latestAttendance.checkOut) {
            return res.status(400).json({ error: 'Employee has not checked in or already checked out.' });
        }

        // Perform check-out and calculate duration
        latestAttendance.checkOut = new Date();
        latestAttendance.comment = comment;

        const durationInMinutes = Math.floor(
            (latestAttendance.checkOut - latestAttendance.checkIn) / (1000 * 60)
        );

        latestAttendance.duration = durationInMinutes;


        await latestAttendance.save();

        res.status(200).json(latestAttendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    checkIn, checkOut
}