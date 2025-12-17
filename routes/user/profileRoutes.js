import express from "express";
import { getProfile } from "../../controllers/user/authController.js";
import { authenticateUser } from "../../middleware/user/authMiddleware.js";

const router = express.Router();

router.get("/profile", authenticateUser, getProfile);



export default router;