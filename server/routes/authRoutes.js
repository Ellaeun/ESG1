import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { register, signIn, validateAccess, logOut } from "../controllers/authController.js";

const router = express.Router();

router.post("/register-student-account", register);
router.post("/sign-in", signIn);
router.post("/validate-access", authMiddleware, validateAccess);
router.post("/log-out", logOut);

export default router;
