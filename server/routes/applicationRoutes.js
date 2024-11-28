import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { postApplication, getApplications } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/post-application", authMiddleware, postApplication);
router.get("/get-applications", authMiddleware, getApplications);

export default router;
