import express from "express"
import { isAdminAuthenticated } from "../../middleware/admin/adminAuthMiddleware.js";
import { createVideo, createVideoPage, deleteVideo, editVideoPage, listVideos, showVideo, updateVideo } from "../../controllers/admin/adminVideoController.js";
import upload from "../../middleware/uploads/admin/adminVideoUpload.js";
const router = express.Router();



router.get("/", isAdminAuthenticated, listVideos);


router.get("/add", isAdminAuthenticated, createVideoPage);


router.post(
    "/add",
    isAdminAuthenticated,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
    ]),
    createVideo
);


router.get("/:id", isAdminAuthenticated, showVideo);


router.get("/edit/:id", isAdminAuthenticated, editVideoPage);


router.post(
    "/edit/:id",
    isAdminAuthenticated,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
    ]),
    updateVideo
);


router.delete("/delete/:id", isAdminAuthenticated, deleteVideo);


export default router;