import express from "express";

const router = express.Router();

import { getAllTestimonials } from "../../controllers/user/testimonialsController.js";

router.get("/", getAllTestimonials);

export default router;