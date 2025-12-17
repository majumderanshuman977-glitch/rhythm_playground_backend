import express from "express";
import { TestimonialListPage,AddTestimonialPage,createTestimonial,EditTestimonialPage,updateTestimonial,deleteTestimonial } from "../../controllers/admin/adminTestimonialController.js";
import uploads from "../../middleware/uploads/admin/uploadTestimonialImg.js";
const router = express.Router();

router.get("/", TestimonialListPage);
router.get("/add",AddTestimonialPage);
router.post("/add", uploads.single("image"),createTestimonial);
router.get("/edit/:id",EditTestimonialPage);
router.post("/update/:id", uploads.single("image"),updateTestimonial);
router.delete("/delete/:id",deleteTestimonial);
export default router;