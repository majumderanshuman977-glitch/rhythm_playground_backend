import express from "express";
import { getAllInstructors,getInstructorById } from "../../controllers/user/instructorController.js";


const router = express.Router();

router.get("/", getAllInstructors);
router.get("/:id", getInstructorById);

export default router;