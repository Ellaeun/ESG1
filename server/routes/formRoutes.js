import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { submitApplication } from "../controllers/formController.js";

const router = express.Router();

router.post("/submit-application", authMiddleware, submitApplication);

export default router;
