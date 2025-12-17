import express from "express";
import { upload } from "../../middleware/uploads/user/upload.js";
import { register, login, logout } from "../../controllers/user/authController.js";

const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;