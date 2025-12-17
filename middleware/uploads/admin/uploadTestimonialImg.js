import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./uploads/testimonials";

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 999999);
    cb(null, `testimonial-${unique}${path.extname(file.originalname)}`);
  }
});

// Optional: file size and type validation
const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 *1024}, // 2MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  }
});

export default upload;
