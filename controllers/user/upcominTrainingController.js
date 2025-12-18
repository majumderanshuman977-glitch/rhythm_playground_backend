import { Op } from "sequelize";
import ClassSession from "../../models/classSessionModel.js";
import Instructor from "../../models/instructorModel.js";
import Studio from "../../models/studioModel.js";
import { success, error } from "../../utils/apiResponse.js";

// Make sure relationships are defined
ClassSession.belongsTo(Instructor, { foreignKey: "instructor_id" });

export const UpcominTraining = async (req, res) => {
  try {
    const baseURL = `${req.protocol}://${req.get("host")}/uploads/admin/instructor_images/`;

    // Fetch upcoming class sessions
    const upcoming_training = await ClassSession.findAll({
      attributes: [
        "id",
        "title",
        "class_type_id",
        "instructor_name",
        "instructor_id",
        "duration_minutes",
        "class_time",
        "class_date",
      ],
      where: {
        class_date: {
          [Op.gte]: new Date(), // only today or later
        },
        status: "scheduled",
      },
      include: [
        {
          model: Instructor,
          attributes: ["id", "first_name", "image", "status"],
        },
      ],
      order: [
        ["class_date", "ASC"],
        ["class_time", "ASC"],
      ],
      limit: 3,
    });

    // Format data: instructor image + formatted date & time
    const formattedData = upcoming_training.map((item) => {
      const data = item.toJSON();

      // Prepend base URL to instructor image
      if (data.Instructor?.image) {
        data.Instructor.image = baseURL + data.Instructor.image;
      }

      // Format date from class_date - "Fri 19th December 2025"
      const classDate = new Date(data.class_date);
      data.formatted_date = classDate.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // Format time from class_time - "12:30 PM (60 mins)"
      const classTimeStr =
        typeof data.class_time === "string" ? data.class_time : "00:00:00";
      const classTimeParts = classTimeStr.split(":");
      
      const classTime = new Date();
      classTime.setHours(
        parseInt(classTimeParts[0], 10),
        parseInt(classTimeParts[1], 10),
        parseInt(classTimeParts[2] || "0", 10)
      );

      const formattedTime = classTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      data.formatted_time = `${formattedTime} (${data.duration_minutes} mins)`;

      // Optional: remove raw fields
      delete data.class_time;
      delete data.class_date;

      return data;
    });

    return success(res, "Upcoming trainings fetched successfully", formattedData);
  } catch (err) {
    console.error("Error fetching upcoming training:", err);
    return error(res, "Error fetching upcoming training", 500);
  }
};