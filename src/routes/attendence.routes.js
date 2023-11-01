import express from "express"
import { checkIn, checkOut } from "../controllers/attendance.controller.js";

export const router = express.Router();

router.post('/check-in', checkIn);
router.post('/check-out', checkOut);

export default router