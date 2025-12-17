import express from "express";
import {
    listClassTypes,
    createClassTypePage,
    createClassType,
    editClassTypePage,
    updateClassType,
    deleteClassType,
    showClassType
} from "../../controllers/admin/classTypeController.js";

import { uploadClassTypeImage } from "../../middleware/uploads/admin/adminUpload.js";
import { isAdminAuthenticated } from "../../middleware/admin/adminAuthMiddleware.js";

const router = express.Router();

// List all class types
router.get("/list", listClassTypes);

// Show form to add a new class type
router.get("/add", createClassTypePage);

// Handle creation
router.post("/add", uploadClassTypeImage.single("image"), createClassType);

// Show single class type
// router.get("/:id", showClassType);
router.get("/:id", isAdminAuthenticated, showClassType);
// Show edit form
router.get("/edit/:id", editClassTypePage);

// Handle update
router.post("/edit/:id", uploadClassTypeImage.single("image"), updateClassType);

// Delete class type
router.delete("/delete/:id", deleteClassType);

export default router;
