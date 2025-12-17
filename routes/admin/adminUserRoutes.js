import express from "express";
import { isAdminAuthenticated } from "../../middleware/admin/adminAuthMiddleware.js";
import { listUsers, editUserPage, showUser, updateUser, deleteUser } from "../../controllers/admin/adminUserController.js";

const router = express.Router();

router.get("/", isAdminAuthenticated, listUsers);
router.get("/edit/:id", isAdminAuthenticated, editUserPage);
router.get("/:id", isAdminAuthenticated, showUser);
router.post("/update/:id", isAdminAuthenticated, updateUser);
router.delete("/delete/:id", isAdminAuthenticated, deleteUser);

export default router;
