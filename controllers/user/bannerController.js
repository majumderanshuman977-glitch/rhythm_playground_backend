import Banner from "../../models/bannerModel.js";
import path from "path"; 
import { success,error } from "../../utils/apiResponse.js";
// export const BannerList = async (req, res) => {
//   try {
//     const banners = await Banner.findAll({
//       where: { is_active: 1 }
//     });

//     if (!banners || banners.length === 0) {
//       return res.status(404).json({ message: "No banner found" });
//     }

//     const baseURL = `${req.protocol}://${req.get("host")}`;

//     const result = banners.map(b => ({
//       ...b.dataValues,
//       banner_url: baseURL + b.banner  
//     }));

//     res.status(200).json(result);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const BannerList = async (req, res) => {
//   try {
    


//   const banners = await Banner.findAll({ where: { is_active: 1 } });
   

//     const baseUrl = `${req.protocol}://${req.get("host")}`;

//     const bannersWithUrl = banners.map((banner) => {
//       const data = banner.toJSON();
//       const filename = path.basename(data.banner || "");
//       return {
//         ...data,
//         videoUrl: `${baseUrl}/stream/${encodeURIComponent(filename)}`,
//       };
//     });

//     res.status(200).json({
//       success: true,
//       count: bannersWithUrl.length,
//       data: bannersWithUrl,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const BannerList = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      where: { is_active: 1 },
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const bannersWithUrl = banners.map((banner) => {
      const data = banner.toJSON();
      const filename = path.basename(data.banner || "");

      return {
        ...data,
        imageUrl: filename
          ? `${baseUrl}/uploads/admin/banners/${encodeURIComponent(filename)}`
          : null,
      };
    });
    success(res,"Banner List",bannersWithUrl)

    
  } catch (error) {
  error(res,error.message);
  }
};
// Get single banner by ID (Public API)
export const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByPk(id);
    
 
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });
    }
       const baseUrl = `${req.protocol}://${req.get("host")}`;
    const filename = path.basename(banner.banner || "");

    const bannerData = banner.toJSON();

    res.status(200).json({
      success: true,
      data: {
        ...bannerData,
     videoUrl: `${baseUrl}/stream/${encodeURIComponent(filename)}`
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


