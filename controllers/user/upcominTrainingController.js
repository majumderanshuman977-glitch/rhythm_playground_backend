import { Op } from "sequelize";
import ClassSession from "../../models/classSessionModel.js";
import Instructor from "../../models/instructorModel.js";
import Studio from "../../models/studioModel.js";
import { success,error } from "../../utils/apiResponse.js";
// Make sure relationships are defined
ClassSession.belongsTo(Instructor, { foreignKey: "instructor_id" });
ClassSession.belongsTo(Studio, { foreignKey: "studio_id" });

export const UpcominTraining = async (req, res) => {
     try {
        const baseURL = `${req.protocol}://${req.get("host")}/uploads/admin/instructor_images/`;
          const upcoming_training = await ClassSession.findAll({
               attributes:[ 'id',
                  'class_type_id',
                  'instructor_id',
                  'studio_id',
                  'duration_minutes',
                  'start_time'],
               where: {
                    start_time: {
                         [Op.gte]: new Date() 
                    },
                    status: "scheduled"
               },
               include: [
                    {
                         model: Instructor,
                         attributes: ["id", "first_name","image","status"],
                    },
                    {
                         model: Studio,
                         attributes: ["id", "name", "address", "city","state","country"],
                    },
               ],
               order: [["start_time", "ASC"]], // latest upcoming first
               limit: 3, // Only last 3
          });

             const formattedData = upcoming_training.map(item => {
               if (item.Instructor?.image) {
                    item.Instructor.image = baseURL +  item.Instructor.image;
               }
               return item;
          });

          // return res.status(200).json({
          //      success: true,
          //      count: upcoming_training.length,
          //      data: formattedData,
          // });
          return success(res,"Upcoming trainings fetched successfully",formattedData);

     } catch (err) {
          console.log("Error fetching upcoming training:", err);
          // return res.status(500).json({
          //      success: false,
          //      message: "Internal Server Error",
          // });
          return error(res,"Error fetching upcoming training",err.message)
     }
};
