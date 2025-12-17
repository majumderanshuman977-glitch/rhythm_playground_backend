import express from "express"
import {BannerList,getBannerById} from "../../controllers/user/bannerController.js"
const router = express.Router();

router.get("/api/banners", BannerList);
router.get("/api/banners/:id", getBannerById);

export default router;