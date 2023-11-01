import Employee from "../models/employeeModel.js";

export const createEmployee = async (req, res) => {
    try {
        const { lastName, firstName, department } = req.body;
        const employee = new Employee({ lastName, firstName, department });
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const { creationDate } = req.query;
        const filter = creationDate ? { dateCreated: creationDate } : {};
        const employees = await Employee.find(filter);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
