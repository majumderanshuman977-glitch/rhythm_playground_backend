import express from "express";
import { isAdminAuthenticated } from "../../middleware/admin/adminAuthMiddleware.js";
import { addBanner, addBannerPage, deleteBanner, editBannerPage,updateBanner,BannerShowPage,BannerListPage } from "../../controllers/admin/adminBannerController.js";
import adminBannerUpload from "../../middleware/uploads/admin/adminBannerUpload.js";
const router = express.Router();

router.get("/", isAdminAuthenticated, BannerListPage);
router.get("/add", isAdminAuthenticated, addBannerPage);
router.post("/add", isAdminAuthenticated,adminBannerUpload.single("banner"), addBanner);
router.get("/:id", isAdminAuthenticated,BannerShowPage );
router.get("/edit/:id", isAdminAuthenticated, editBannerPage);
router.post("/update/:id", isAdminAuthenticated,adminBannerUpload.single("banner"), updateBanner);
router.delete("/delete/:id", isAdminAuthenticated, deleteBanner);

export default router;  