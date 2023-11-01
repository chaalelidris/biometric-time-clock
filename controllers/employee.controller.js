import Employee from "../models/employee-model.js";

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



export { createEmployee, getEmployees, getEmployeesByDate };
