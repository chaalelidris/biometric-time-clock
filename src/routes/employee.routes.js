import express from "express"
import { getEmployees, createEmployee, getEmployeesByDate } from "../controllers/employee.controller.js";

export const router = express.Router();

router.post('/create', createEmployee);
router.get('/', getEmployees);


export default router