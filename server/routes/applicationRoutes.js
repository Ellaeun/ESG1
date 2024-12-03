import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import {
	postApplication,
	getApplications,
	getStudentInfo,
	getApplicantInfo,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/post-application", authMiddleware, postApplication);
router.get("/get-applications", authMiddleware, getApplications);
router.get("/get-student-info", authMiddleware, getStudentInfo);
router.get("/get-applicant-info", authMiddleware, getApplicantInfo);

export default router;
