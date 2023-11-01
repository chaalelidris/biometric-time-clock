import express from "express"
import { getEmployees, createEmployee, getEmployeesByDate, checkIn, checkOut } from "../controllers/employee.controller.js";

export const router = express.Router();

router.post('/create', createEmployee);
router.get('/list', getEmployees);
router.get('/listByDate', getEmployeesByDate);

router.post('/check-in', checkIn);
router.post('/check-out', checkOut);

export default router