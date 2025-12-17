 import express from "express";
import { isAdminAuthenticated } from "../../middleware/admin/adminAuthMiddleware.js";
import { addShortVideoPage, addShortVideo, ShortVideoListPage, editShortVideoPage,updateShortVideo,deleteShortVideo,ShortVideoShowPage } from "../../controllers/admin/adminShortVideosController.js";

import adminShortVideoUpload from "../../middleware/uploads/admin/adminShortVideoUpload.js";

const router = express.Router();


router.get("/", isAdminAuthenticated, ShortVideoListPage);
router.get("/add", isAdminAuthenticated, addShortVideoPage);
router.post("/add", isAdminAuthenticated,adminShortVideoUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]), addShortVideo);
router.get("/:id", isAdminAuthenticated,ShortVideoShowPage );
router.get("/edit/:id", isAdminAuthenticated, editShortVideoPage);
router.post("/update/:id", isAdminAuthenticated,adminShortVideoUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]), updateShortVideo);
router.delete("/delete/:id", isAdminAuthenticated, deleteShortVideo);


export default router;  