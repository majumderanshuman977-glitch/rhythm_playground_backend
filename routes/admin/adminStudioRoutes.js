import express from "express";
import {
    addStudioPage,
    getStudioById,
    createStudio,
    listStudios,
    editStudioPage,
    updateStudio,
    deleteStudio,
} from "../../controllers/admin/adminStudioController.js";
import { isAdminAuthenticated } from "../../middleware/admin/adminAuthMiddleware.js";

const router = express.Router();

router.get("/list", isAdminAuthenticated, listStudios);
router.post("/add", isAdminAuthenticated, createStudio);
router.get("/add", isAdminAuthenticated, addStudioPage);
router.get("/:id", isAdminAuthenticated, getStudioById);
router.get("/edit/:id", isAdminAuthenticated, editStudioPage);
router.post("/update/:id", isAdminAuthenticated, updateStudio);
router.delete("/delete/:id", isAdminAuthenticated, deleteStudio);

export default router;
