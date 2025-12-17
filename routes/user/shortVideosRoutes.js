import express from "express";

const router = express.Router();

import { getShortVideos } from "../../controllers/user/shortVideoController.js";

router.get("/", getShortVideos);

export default router;