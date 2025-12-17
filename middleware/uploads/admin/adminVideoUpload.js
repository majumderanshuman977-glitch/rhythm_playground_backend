import multer from "multer";
import path from "path";
import fs from "fs";

const videoDir = "./uploads/admin/video_files";
const thumbDir = "./uploads/admin/video_thumbnails";

// ensure folders exist
[videoDir, thumbDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "video") cb(null, videoDir);
        else cb(null, thumbDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
});

export default multer({ storage });
