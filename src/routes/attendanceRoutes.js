import express from "express";
import { checkIn, checkOut } from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);

export default router;