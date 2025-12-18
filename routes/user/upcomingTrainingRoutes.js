import express from "express";

const router = express.Router();

import {UpcominTraining } from "../../controllers/user/upcominTrainingController.js";

router.get("/", UpcominTraining);


export default router;