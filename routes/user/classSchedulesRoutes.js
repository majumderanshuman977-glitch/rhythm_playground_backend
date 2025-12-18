import express from "express";

const router = express.Router();
import {getClassSessionsByDate } from "../../controllers/user/upcominTrainingController.js";


router.get("/", getClassSessionsByDate);

export default router;