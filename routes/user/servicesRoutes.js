import express from "express";

const router = express.Router();

import { getClassTypes } from "../../controllers/user/servicesController.js";

router.get("/", getClassTypes);

export default router;