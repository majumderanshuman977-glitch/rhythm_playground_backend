import Banner from "../../models/bannerModel.js";
import fs from "fs";
import path from "path";



export const addBannerPage =async(req,res)=>{
    res.render("banners/add", { title: "Add Banner", success: null, errors: [] });
}


// export const addBanner = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.redirect("/admin/banners/add?error=Video file is required");
//         }

//         const { title, is_active } = req.body;

//         // Convert to proper boolean (or integer if needed)
//         const activeValue = is_active === "true" ? 1 : 0;
//     //incorporating boolean .changing part was wrong 

//         // Save uploaded file path
//         const bannerPath = "/uploads/admin/banners/" + req.file.filename;

//         await Banner.create({
//             title,
//             banner: bannerPath,
//             is_active: activeValue
//         });

//         res.redirect("/admin/banners?success=Banner added successfully");

//     } catch (error) {
//         console.error(error);
//         res.redirect("/admin/banners/add?error=" + error.message);
//     }
// };
export const addBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }

    const { title, is_active } = req.body;
    const activeValue = is_active === "true" || is_active === true ? 1 : 0;
    const bannerPath = "/uploads/admin/banners/" + req.file.filename;

    await Banner.create({
      title,
      banner: bannerPath,
      is_active: activeValue,
    });

    // Fetch all banners again
    const banners = await Banner.findAll({ order: [["id", "DESC"]] });

    res.render("banners/list", {
      title: "Banner List",
      success: "Banner added successfully",
      banners,  // <--- FIX
      errors: []
    });

  } catch (error) {
    console.error(error);
    res.render("banners/add", {
      title: "Add Banner",
      success: null,
      errors: [error.message],
      banners: [] // safe fallback
    });
  }
};


export const BannerListPage = async (req, res) => {
    try {
        const banners = await Banner.findAll({
            order: [["id", "DESC"]],
        });
        

        res.render("banners/list", { 
            title: "Banner List", 
            banners, 
            success: null, 
            errors: [] 
        });
    } catch (error) {
        console.error(error);
        res.redirect("/admin/banners?error=" + error.message);
    }
};

export const editBannerPage = async(req,res)=>{
    try{
        const banner = await Banner.findByPk(req.params.id);
        if(!banner) return res.redirect("/admin/banners?error=Banner not found");
        res.render("banners/edit", { title: "Edit Banner", banner, success: null, errors: [] });
    }catch(error){
        console.error(error);
        res.redirect("/admin/banners?error=" + error.message);
    }
}

export const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id);
        if (!banner) {
            return res.redirect("/admin/banners?error=Banner not found");
        }

        const { title, is_active } = req.body;
        console.log(is_active);
     
        let updatedData = {
            title,
            is_active: is_active
        };

        // If new video uploaded
        if (req.file) {
            const newPath = "/uploads/admin/banners/" + req.file.filename;

            // Delete old video (if exists)
            if (banner.banner) {
                const oldFilePath = path.join("./", banner.banner);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            updatedData.banner = newPath;
        }

        await banner.update(updatedData);

        res.redirect("/admin/banners?success=Banner updated successfully");

    } catch (error) {
        console.error(error);
        res.redirect("/admin/banners?error=" + error.message);
    }
};

export const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id);

        if (!banner)
            return res.json({ success: false, message: "Banner not found" });

        // delete file
        const filePath = "./" + banner.banner; // stored as /uploads/admin/banners/....
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await banner.destroy();

        return res.json({ success: true, message: "Banner deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};


export const BannerShowPage = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      return res.redirect("/admin/banners?error=Banner not found");
    }

    res.render("banners/show", {
      title: "Banner Details",
      banner,
      success: null,
      errors: []
    });

  } catch (err) {
    console.error(err);
    res.redirect("/admin/banners?error=" + err.message);
  }
};





export const streamBannerVideo = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) return res.status(404).send("Video not found");

    const filePath = path.join("uploads/admin/banners", banner.banner);

    if (!fs.existsSync(filePath)) return res.status(404).send("File missing");

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", "inline"); // play in browser

    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
