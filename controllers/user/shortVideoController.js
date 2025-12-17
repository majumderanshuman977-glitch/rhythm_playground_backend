import path from "path";
import ShortVideo from "../../models/shortVideos.js";
import ClassType from "../../models/classTypeModel.js";
import { success, error } from "../../utils/apiResponse.js";

export const getShortVideos = async (req, res) => {
  try {
    const baseURL = `${req.protocol}://${req.get("host")}`;
    
   
    const { service_id } = req.query;


    const whereClause = { status: "active" };
    
    // ✅ Add service_id filter if provided
    if (service_id) {
      whereClause.service_id = service_id;
    }

    const short_videos = await ShortVideo.findAll({
      attributes: ["id", "service_id", "video", "thumbnail", "status"],
      where: whereClause, // ✅ Use dynamic where clause
      include: [
        {
          model: ClassType,
          as: "classType",
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedData = short_videos.map(video => {
      const videoFile = video.video
        ? path.basename(video.video)
        : null;

      return {
        id: video.id,
        service_id: video.service_id,
        status: video.status,
        video: videoFile
          ? `${baseURL}/stream/short-video/${videoFile}`
          : null,
        thumbnail: video.thumbnail
          ? `${baseURL}${video.thumbnail}`
          : null,
        classType: video.classType
          ? {
              id: video.classType.id,
              name: video.classType.name,
            }
          : null,
      };
    });

    return success(res, "Short videos fetched successfully", formattedData);

  } catch (err) {
    console.error("Error fetching short videos:", err);
    return error(res, "Error fetching short videos", 500, err.message);
  }
};