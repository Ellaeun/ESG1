import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { postAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/post-appointment", authMiddleware, postAppointment);

export default router;
