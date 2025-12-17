import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./uploads/admin/banners";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `banner-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedVideos = [
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ];

  if (allowedVideos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"), false);
  }
};

const adminBannerUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 200 }, // 200MB
});

export default adminBannerUpload;

// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadDir = "./uploads/admin/banners"; // keep same folder

// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, `banner-${uniqueSuffix}${ext}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedVideos = [
//     "video/mp4",
//     "video/mpeg",
//     "video/ogg",
//     "video/webm",
//     "video/quicktime",
//     "video/x-msvideo",
//     "video/x-matroska",
//   ];

//   allowedVideos.includes(file.mimetype)
//     ? cb(null, true)
//     : cb(new Error("Only video files are allowed"), false);
// };

// export const adminBannerUpload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 200 },
// });

// export default adminBannerUpload;
