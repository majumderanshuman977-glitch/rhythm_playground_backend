// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadDir = "./uploads/admin/instructor_images";

// // ✅ Ensure upload directory exists (at startup)
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // ✅ Configure Multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // ✅ Double-check at upload time (in case folder was deleted)
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         const ext = path.extname(file.originalname);
//         cb(null, `instructor-${uniqueSuffix}${ext}`);
//     },
// });

// // ✅ File filter for image validation
// const fileFilter = (req, file, cb) => {
//     const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
//     if (allowed.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only images are allowed"), false);
//     }
// };

// // ✅ Export Multer instance
// export const uploadInstructorImage = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 },
// });



import multer from "multer";
import path from "path";
import fs from "fs";

// ------------------------
// Helper to ensure folder exists
// ------------------------
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// ------------------------
// File filter for images
// ------------------------
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only images are allowed"), false);
};

// ------------------------
// Generic storage generator
// ------------------------
const createStorage = (uploadDir, prefix) => {
    ensureDir(uploadDir);
    return multer.diskStorage({
        destination: (req, file, cb) => {
            ensureDir(uploadDir); // ensure again at runtime
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            cb(null, `${prefix}-${uniqueSuffix}${ext}`);
        },
    });
};

// ------------------------
// Upload instances
// ------------------------

// 1️⃣ User Profile Images
const userUploadDir = "./uploads/users/profile_images";
export const uploadUserProfile = multer({
    storage: createStorage(userUploadDir, "user"),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// 2️⃣ Instructor Images
const instructorUploadDir = "./uploads/admin/instructor_images";
export const uploadInstructorImage = multer({
    storage: createStorage(instructorUploadDir, "instructor"),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

// 3️⃣ Class Type Images
const classTypeUploadDir = "./uploads/admin/class_types";
export const uploadClassTypeImage = multer({
    storage: createStorage(classTypeUploadDir, "classtype"),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});


