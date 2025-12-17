import multer from "multer";
import path from "path";
import fs from "fs";

// Directories
const videoDir = "./uploads/admin/short_video/videos";
const thumbnailDir = "./uploads/admin/short_video/thumbnails";

// Ensure directories exist
if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });
if (!fs.existsSync(thumbnailDir)) fs.mkdirSync(thumbnailDir, { recursive: true });

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "video") cb(null, videoDir);
    else if (file.fieldname === "thumbnail") cb(null, thumbnailDir);
    else cb(new Error("Unknown field"), false);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    if (file.fieldname === "video") cb(null, `video-${uniqueSuffix}${ext}`);
    else if (file.fieldname === "thumbnail") cb(null, `thumb-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "video") {
    const allowedVideos = [
      "video/mp4",
      "video/mpeg",
      "video/ogg",
      "video/webm",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];
    allowedVideos.includes(file.mimetype) ? cb(null, true) : cb(new Error("Only video files are allowed"), false);
  } else if (file.fieldname === "thumbnail") {
    const allowedImages = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    allowedImages.includes(file.mimetype) ? cb(null, true) : cb(new Error("Only image files are allowed"), false);
  } else {
    cb(new Error("Unknown field"), false);
  }
};

// Multer upload instance
const adminShortVideoUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 200 }, // 200MB max
});

export default adminShortVideoUpload;
