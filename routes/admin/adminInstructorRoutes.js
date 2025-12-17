import express from "express";
import {
    listInstructors,
    getInstructorById,
    editInstructorPage,
    updateInstructor,
    deleteInstructor,
    createInstructor
} from "../../controllers/admin/adminInstructorController.js";
import { uploadInstructorImage } from "../../middleware/uploads/admin/adminUpload.js";
import { isAdminAuthenticated } from "../../middleware/admin/adminAuthMiddleware.js";
import ClassType from "../../models/classTypeModel.js";
const router = express.Router();


router.get("/", isAdminAuthenticated,async (req, res) => {
    const { success, error } = req.query;
      const classTypes = await ClassType.findAll({
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    });

    res.render("instructors/instructors", {
        classTypes,
        title: "Instructors Management",
        message: `Manage Instructors Here, ${req.session.user?.name || "Admin"}!`,
        success,
        error,
        baseUrl: process.env.BASE_URL,
        errors: null,
        oldInput: {},
    });
});

router.post("/", isAdminAuthenticated, uploadInstructorImage.single("image"), createInstructor);
router.get("/list", isAdminAuthenticated, listInstructors);
router.get("/:id", isAdminAuthenticated, getInstructorById);
router.get("/edit/:id", isAdminAuthenticated, editInstructorPage);
router.post("/update/:id", isAdminAuthenticated, uploadInstructorImage.single("image"), updateInstructor);
router.delete("/delete/:id", isAdminAuthenticated, deleteInstructor);

export default router;
