import ShortVideo from "../../models/shortVideos.js";
import fs from "fs";
import path from "path";
import ClassType from "../../models/classTypeModel.js";



export const addShortVideoPage = async (req, res) => {
    try {
        let classTypes  = [];
        classTypes  = await ClassType.findAll({
            attributes: ["id", "name"],
            order: [["name", "ASC"]],
        });

        res.render("short_videos/add", { 
            title: "Add Short Video", 
            success: null, 
            errors: [], 
            classTypes  
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};



export const addShortVideo = async (req, res) => {
  try {
    // Check uploaded files
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.render("short_videos/add", {
        title: "Add Short Video",
        success: null,
        errors: ["Both video and thumbnail files are required"],
        classTypes: await ClassType.findAll({ attributes: ["id", "name"], order: [["name", "ASC"]] }),
      });
    }

    const { service_id, status } = req.body;
    const videoFile = req.files.video[0].filename;
    const thumbnailFile = req.files.thumbnail[0].filename;

    await ShortVideo.create({
      service_id: service_id || null, // optional
      video: "/uploads/admin/short_video/videos/" + videoFile,
      thumbnail: "/uploads/admin/short_video/thumbnails/" + thumbnailFile,
      status: status === "active" ? "active" : "inactive",
    });

    // Fetch all short videos for listing
    const short_videos = await ShortVideo.findAll({ order: [["id", "DESC"]] });

    // res.render("short_videos/list", {
    //   title: "Short Videos List",
    //   success: "Short video added successfully",
    //   short_videos,
    //   errors: [],
    // });
    res.redirect("/admin/short-videos?success=Short video added successfully");

  } catch (error) {
    console.error(error);
    res.render("short_videos/add", {
      title: "Add Short Video",
      success: null,
      errors: [error.message],
      classTypes: await ClassType.findAll({ attributes: ["id", "name"], order: [["name", "ASC"]] }),
    });
  }
};


export const ShortVideoListPage = async (req, res) => {
    try {
        const short_videos = await ShortVideo.findAll({
            include: [
                {
                    model: ClassType,
                    as: "classType",      // must match the alias in your model
                    attributes: ["name"], // only fetch the name
                },
            ],
            order: [["id", "DESC"]],
        });
        

        res.render("short_videos/list", { 
            title: "Short Videos List", 
            short_videos, 
            success: null, 
            errors: [] 
        });
    } catch (error) {
        console.error(error);
        res.redirect("/admin/short_videos?error=" + error.message);
    }
};

export const editShortVideoPage = async (req, res) => {
    console.log(req.params.id);
    try {
        // Fetch the short video with its associated class type
        const short_video = await ShortVideo.findByPk(req.params.id, {
            include: [
                {
                    model: ClassType,
                    as: "classType",
                    attributes: ["id", "name"]
                }
            ]
        });

        if (!short_video) {
            return res.redirect("/admin/short-videos?error=Short video not found");
        }

        // Fetch all class types for the dropdown
        const classTypes = await ClassType.findAll({
            attributes: ["id", "name"],
            order: [["name", "ASC"]]
        });

   
        // res.redirect("/admin/short-videos", {
        //     title: "Edit Short Video",
        //     short_video,
        //     classTypes,
        //     success: null,
        //     errors: []
        // });
        res.render("short_videos/edit", {
            title: "Edit Short Video",
            short_video,
            classTypes,
            success: null,
            errors: []
        })
    } catch (error) {
        console.error(error);
        res.redirect("/admin/short-videos?error=" + error.message);
    }
};

export const updateShortVideo = async (req, res) => {
    try {
        const short_video = await ShortVideo.findByPk(req.params.id);
        if (!short_video) {
            return res.redirect("/admin/short_videos?error=Short Video not found");
        }

        const { service_id, status } = req.body;

        let updatedData = {
            service_id: service_id || null, // nullable
            status: status === "active" ? "active" : "inactive",
        };

        // Video upload
        if (req.files && req.files.video) {
            const videoFile = req.files.video[0];
            const newVideoPath = "/uploads/admin/short_video/" + videoFile.filename;

            if (short_video.video) {
                const oldPath = path.join("./", short_video.video);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }

            updatedData.video = newVideoPath;
        }

        // Thumbnail upload
        if (req.files && req.files.thumbnail) {
            const thumbFile = req.files.thumbnail[0];
            const newThumbPath = "/uploads/admin/short_video/" + thumbFile.filename;

            if (short_video.thumbnail) {
                const oldThumbPath = path.join("./", short_video.thumbnail);
                if (fs.existsSync(oldThumbPath)) fs.unlinkSync(oldThumbPath);
            }

            updatedData.thumbnail = newThumbPath;
        }

        await short_video.update(updatedData);

        res.redirect("/admin/short-videos?success=Short Video updated successfully");

    } catch (error) {
        console.error(error);
        res.redirect("/admin/short_videos?error=" + error.message);
    }
};

export const deleteShortVideo = async (req, res) => {
    try {
        const short_video = await ShortVideo.findByPk(req.params.id);

        if (!short_video)
            return res.json({ success: false, message: "Short Video not found" });

        // delete file
        const filePath = "./" + short_video.video; // stored as /uploads/admin/banners/....
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        const thumbnailPath = "./" + short_video.thumbnail; // stored as /uploads/admin/banners/....
        if (fs.existsSync(thumbnailPath)) {
            fs.unlinkSync(thumbnailPath);
        }

        await short_video.destroy();

        return res.json({ success: true, message: "Short Video deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};


export const ShortVideoShowPage = async (req, res) => {
  try {
    const short_video = await ShortVideo.findByPk(req.params.id);

    if (!short_video) {
      return res.redirect("/admin/short_videos?error=Short Video not found");
    }

    res.render("short_videos/show", {
      title: "Short Video Details",
      banner,
      success: null,
      errors: []
    });

  } catch (err) {
    console.error(err);
    res.redirect("/admin/short_videos?error=" + err.message);
  }
};






