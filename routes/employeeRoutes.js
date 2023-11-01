import express from "express"
import { getEmployees, createEmployee } from "../controllers/employeeController.js";

export const employeeRoutes = express.Router();

employeeRoutes.post('/create', createEmployee);
employeeRoutes.get('/list', getEmployees);


