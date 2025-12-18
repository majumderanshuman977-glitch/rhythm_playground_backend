import { Op,fn, col, where } from "sequelize";

import ClassSession from "../../models/classSessionModel.js";
import Instructor from "../../models/instructorModel.js";

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



// export const getClassSessionsByDate = async (req, res) => {
//   try {
//     const { date } = req.query;

//     const baseURL = `${req.protocol}://${req.get("host")}/uploads/admin/instructor_images/`;

//     // WHERE condition
//     const whereCondition = {
//       status: "scheduled",
//     };

//     // If date is provided → filter by that date
//     if (date) {
//       whereCondition.class_date = date; // yyyy-mm-dd
//     }

//     const sessions = await ClassSession.findAll({
//       attributes: [
//         "id",
//         "title",
//         "class_type_id",
//         "instructor_name",
//         "instructor_id",
//         "duration_minutes",
//         "class_time",
//         "class_date",
//       ],
//       where: whereCondition,
//       include: [
//         {
//           model: Instructor,
//           attributes: ["id", "first_name", "image", "status"],
//         },
//       ],
//       order: [
//         ["class_date", "ASC"],
//         ["class_time", "ASC"],
//       ],
//     });

//     // Format response
//     const formattedData = sessions.map((item) => {
//       const data = item.toJSON();

//       // Instructor image
//       if (data.Instructor?.image) {
//         data.Instructor.image = baseURL + data.Instructor.image;
//       }

//       // Format date
//       const classDate = new Date(data.class_date);
//       data.formatted_date = classDate.toLocaleDateString("en-US", {
//         weekday: "short",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       });

//       // Format time
//       const timeStr = data.class_time || "00:00:00";
//       const [h, m, s] = timeStr.split(":");

//       const timeObj = new Date();
//       timeObj.setHours(+h, +m, +s || 0);

//       const formattedTime = timeObj.toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });

//       data.formatted_time = `${formattedTime} (${data.duration_minutes} mins)`;

//       // Remove raw fields
//       delete data.class_time;
//       delete data.class_date;

//       return data;
//     });

//     return success(res, "Class sessions fetched successfully", formattedData);
//   } catch (err) {
//     console.error("Error fetching class sessions:", err);
//     return error(res, "Error fetching class sessions", 500);
//   }
// };


export const getClassSessionsByDate = async (req, res) => {
  try {
    let { date } = req.query; // YYYY-MM-DD

    // ✅ Default to today's date if not provided
    if (!date) {
      const today = new Date();
      date = today.toISOString().slice(0, 10);
    }

    const baseURL = `${req.protocol}://${req.get("host")}/uploads/admin/instructor_images/`;

    const sessions = await ClassSession.findAll({
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
      where: where(fn("DATE", col("class_date")), date), // ✅ date match
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
    });

    const formattedData = sessions.map((item) => {
      const data = item.toJSON();

      // Instructor image
      if (data.Instructor?.image) {
        data.Instructor.image = baseURL + data.Instructor.image;
      }

      // Formatted date
      const classDate = new Date(data.class_date);
      data.formatted_date = classDate.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // Formatted time
      const timeStr = data.class_time || "00:00:00";
      const [h, m, s] = timeStr.split(":");

      const timeObj = new Date();
      timeObj.setHours(+h, +m, +s || 0);

      const formattedTime = timeObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      data.formatted_time = `${formattedTime} (${data.duration_minutes} mins)`;

      delete data.class_time;
      delete data.class_date;

      return data;
    });

    return success(res, "Class sessions fetched successfully", formattedData);
  } catch (err) {
    console.error("Error fetching class sessions:", err);
    return error(res, "Error fetching class sessions", 500);
  }
};