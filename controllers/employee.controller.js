import Attendance from "../models/attendance-model.js";
import Employee from "../models/employee-model.js";
Attendance

const createEmployee = async (req, res) => {
    try {
        const { lastName, firstName, department } = req.body;
        const employee = new Employee({ lastName, firstName, department });
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmployees = async (req, res) => {
    try {
        const { creationDate } = req.query;
        const filter = creationDate ? { dateCreated: creationDate } : {};
        const employees = await Employee.find(filter);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmployeesByDate = async (req, res) => {
    try {
        const { creationDate } = req.query;
        if (!creationDate) {
            return res
                .status(400)
                .json({ error: "Creation date parameter is required." });
        }

        // Convert creationDate date to Date object
        const filterDate = new Date(creationDate);

        // Set a range for the filter to cover the entire day
        const nextDay = new Date(filterDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const employees = await Employee.find({
            dateCreated: {
                $gte: filterDate,
                $lt: nextDay,
            },
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


};

const checkIn = async (req, res) => {
    try {
        const { employeeId, comment } = req.body;

        // Find the employee by ID
        const employee = await Employee.findById(employeeId);

        // Check if the employee exists
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        // Perform check-in
        const attendance = new Attendance({
            employee: employeeId,
            checkIn: new Date(),
            comment,
        });

        await attendance.save();

        res.status(200).json({ message: 'Check-in successful.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

        res.status(200).json({ message: 'Check-out successful.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createEmployee, getEmployees, getEmployeesByDate, checkIn, checkOut };
