import ClassType from "../../models/classTypeModel.js";
import Instructor from "../../models/instructorModel.js";
import Video from "../../models/videoModel.js";
import fs from 'fs';
import { promisify } from 'util';
import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';

const stat = promisify(fs.stat);

export const listVideos = async (req, res) => {
    try {
        const videos = await Video.findAll({
            include: [
                { model: Instructor, as: "instructor", attributes: ["id", "first_name", "last_name"] },
                { model: ClassType, as: "classType", attributes: ["id", "name"] },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.render("videos/list", { title: "Manage Videos", videos, success: req.query.success, errors: [] });
    } catch (error) {
        res.render("videos/list", { title: "Manage Videos", videos: [], errors: [error.message], success: null });
    }
};

export const createVideoPage = async (req, res) => {
    const instructors = await Instructor.findAll();
    const classTypes = await ClassType.findAll();
    res.render("videos/add", { title: "Add Video", instructors, classTypes, success: null, errors: [] });
};


// ✅ Create new video
// export const createVideo = async (req, res) => {
//     try {
//         const { title, description, instructor_id, class_id, duration, size } = req.body;

//         const videoPath = req.files.video ? `/uploads/admin/video_files/${req.files.video[0].filename}` : null;
//         const thumbnailPath = req.files.thumbnail ? `/uploads/admin/video_thumbnails/${req.files.thumbnail[0].filename}` : null;

//         await Video.create({
//             title,
//             description,
//             instructor_id,
//             class_id,
//             video: videoPath,
//             thumbnail: thumbnailPath,
//             duration,
//             size,
//         });

//         res.redirect("/admin/videos?success=Video uploaded successfully");
//     } catch (error) {
//         res.redirect("/admin/videos/add?error=" + error.message);
//     }
// };

export const createVideo = async (req, res) => {
    try {
        const { title, description, instructor_id, class_id } = req.body;

        const videoFile = req.files.video ? req.files.video[0] : null;
        const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

        if (!videoFile) {
            return res.redirect("/admin/videos/add?error=Video file is required");
        }

        const videoPath = `/uploads/admin/video_files/${videoFile.filename}`;
        const thumbnailPath = thumbnailFile ? `/uploads/admin/video_thumbnails/${thumbnailFile.filename}` : null;

        // Get video duration using ffprobe
        const videoFullPath = `./uploads/admin/video_files/${videoFile.filename}`;
        const probeData = await ffprobe(videoFullPath, { path: ffprobeStatic.path });
        const duration = Math.round(probeData.streams[0].duration); // in seconds

        // Get video size in MB
        const stats = await stat(videoFullPath);
        const fileSizeInBytes = stats.size;
        const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);

        await Video.create({
            title,
            description,
            instructor_id,
            class_id,
            video: videoPath,
            thumbnail: thumbnailPath,
            duration: duration, // in seconds
            size: fileSizeInMB, // in MB
        });

        res.redirect("/admin/videos?success=Video uploaded successfully");
    } catch (error) {
        console.error("Video upload error:", error);
        res.redirect("/admin/videos/add?error=" + error.message);
    }
};



export const showVideo = async (req, res) => {
    try {
        const video = await Video.findByPk(req.params.id, {
            include: [
                { model: Instructor, as: "instructor", attributes: ["first_name", "last_name"] },
                { model: ClassType, as: "classType", attributes: ["name"] },
            ],
        });
        if (!video) return res.redirect("/admin/videos?error=Video not found");
        res.render("videos/show", { title: "View Video", video, errors: [] });
    } catch (error) {
        res.redirect("/admin/videos?error=" + error.message);
    }
};




export const updateVideo = async (req, res) => {
    try {
        const { title, description, instructor_id, class_id } = req.body;

        const videoRecord = await Video.findByPk(req.params.id);
        if (!videoRecord) return res.redirect("/admin/videos?error=Video not found");

        let videoPath = videoRecord.video;
        let thumbnailPath = videoRecord.thumbnail;
        let duration = videoRecord.duration;
        let fileSizeInMB = videoRecord.size;

        // If new video uploaded → delete old file and update path, duration & size
        if (req.files.video && req.files.video.length > 0) {
            const newVideoFile = req.files.video[0];

            // Delete old video
            if (videoRecord.video) {
                const oldVideoPath = path.join(`.${videoRecord.video}`);
                if (fs.existsSync(oldVideoPath)) fs.unlinkSync(oldVideoPath);
            }

            videoPath = `/uploads/admin/video_files/${newVideoFile.filename}`;

            // Get duration
            const videoFullPath = `./uploads/admin/video_files/${newVideoFile.filename}`;
            const probeData = await ffprobe(videoFullPath, { path: ffprobeStatic.path });
            duration = Math.round(probeData.streams[0].duration);

            // Get size
            const stats = await stat(videoFullPath);
            const fileSizeInBytes = stats.size;
            fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
        }

        // If new thumbnail uploaded → delete old thumbnail
        if (req.files.thumbnail && req.files.thumbnail.length > 0) {
            const newThumbnailFile = req.files.thumbnail[0];

            // Delete old thumbnail
            if (videoRecord.thumbnail) {
                const oldThumbPath = path.join(`.${videoRecord.thumbnail}`);
                if (fs.existsSync(oldThumbPath)) fs.unlinkSync(oldThumbPath);
            }

            thumbnailPath = `/uploads/admin/video_thumbnails/${newThumbnailFile.filename}`;
        }

        await videoRecord.update({
            title,
            description,
            instructor_id,
            class_id,
            video: videoPath,
            thumbnail: thumbnailPath,
            duration,
            size: fileSizeInMB,
        });

        res.redirect("/admin/videos?success=Video updated successfully");
    } catch (error) {
        console.error("Update error:", error);
        res.redirect(`/admin/videos/edit/${req.params.id}?error=${error.message}`);
    }
};



export const editVideoPage = async (req, res) => {
    const video = await Video.findByPk(req.params.id);
    const instructors = await Instructor.findAll();
    const classTypes = await ClassType.findAll();
    if (!video) return res.redirect("/admin/videos?error=Video not found");
    res.render("videos/edit", { title: "Edit Video", video, instructors, classTypes, errors: [], success: null });
};

export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByPk(req.params.id);
        if (!video) return res.redirect("/admin/videos?error=Video not found");

        // Delete video file
        if (video.video) {
            const filePath = path.join(`.${video.video}`);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        // Delete thumbnail file
        if (video.thumbnail) {
            const thumbPath = path.join(`.${video.thumbnail}`);
            if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
        }

        await video.destroy();

        res.redirect("/admin/videos?success=Video deleted successfully");
    } catch (error) {
        console.error("Delete error:", error);
        res.redirect("/admin/videos?error=" + error.message);
    }
};
