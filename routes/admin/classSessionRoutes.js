import express from "express";
import {
    listClassSessions,
    addClassSessionPage,
    createClassSession,
    showClassSession,
    deleteClassSession,
    editClassSessionPage,
    updateClassSession
} from "../../controllers/admin/classSessionController.js";
import { isAdminAuthenticated } from "../../middleware/admin/adminAuthMiddleware.js";

const router = express.Router();

router.get("/", isAdminAuthenticated, listClassSessions);
router.get("/add", isAdminAuthenticated, addClassSessionPage);
router.post("/add", isAdminAuthenticated, createClassSession);
router.get("/:id", isAdminAuthenticated, showClassSession);
router.get("/edit/:id", isAdminAuthenticated, editClassSessionPage);
router.post("/edit/:id", isAdminAuthenticated, updateClassSession);
router.delete("/delete/:id", isAdminAuthenticated, deleteClassSession);

export default router;
