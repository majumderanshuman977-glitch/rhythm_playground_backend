import express from "express";
import { logout, login } from "../../controllers/admin/adminAuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);


export default router; 