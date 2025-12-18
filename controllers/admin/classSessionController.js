import ClassSession from "../../models/classSessionModel.js";
import ClassType from "../../models/classTypeModel.js";
import Instructor from "../../models/instructorModel.js";



// export const listClassSessions = async (req, res) => {
//   try {
//     const sessions = await ClassSession.findAll({
//       include: [
//         {
//           model: ClassType,
//           as: "classType",
//           attributes: ["id", "name"],
//         },
//         {
//           model: Instructor,
//           as: "instructor",
//           attributes: ["id", "first_name", "last_name"],
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//     });

//     res.render("class_sessions/list", {
//       title: "Manage Class Sessions",
//       sessions,
//       success: req.query.success || null,
//       errors: [],
//     });
//   } catch (error) {
//     console.error(error);
//     res.render("class_sessions/list", {
//       title: "Manage Class Sessions",
//       sessions: [],
//       errors: [error.message],
//       success: null,
//     });
//   }
// };


// export const addClassSessionPage = async (req, res) => {
//     const classTypes = await ClassType.findAll();
//     const instructors = await Instructor.findAll();
//     const studios = await Studio.findAll();

//     res.render("class_sessions/add", {
//         title: "Add Class Session",
//         classTypes,
//         instructors,
//         errors: [],
//         oldInput: {},
//     });
// };
export const listClassSessions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   // current page
    const limit = 10;                             // sessions per page
    const offset = (page - 1) * limit;

    const { count, rows: sessions } = await ClassSession.findAndCountAll({
      include: [
        {
          model: ClassType,
          as: "classType",
          attributes: ["id", "name"],
        },
        {
          model: Instructor,
          as: "instructor",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.render("class_sessions/list", {
      title: "Manage Class Sessions",
      sessions,
      currentPage: page,
      totalPages,
      success: req.query.success || null,
      errors: [],
    });
  } catch (error) {
    console.error(error);
    res.render("class_sessions/list", {
      title: "Manage Class Sessions",
      sessions: [],
      currentPage: 1,
      totalPages: 1,
      errors: [error.message],
      success: null,
    });
  }
};

export const addClassSessionPage = async (req, res) => {
  try {
    const classTypes = await ClassType.findAll({
      where: { is_active: 1}, 
      order: [["name", "ASC"]],
    });

    const instructors = await Instructor.findAll({
      where: { status: "active" },
      order: [["first_name", "ASC"]],
    });

    res.render("class_sessions/add", {
      title: "Add Class Session",
      classTypes,  
      instructors, 
      errors: [],
    });
  } catch (error) {
    console.error(error);
    res.render("class_sessions/add", {
      title: "Add Class Session",
      classTypes: [],   // prevent crash
      instructors: [],
      errors: [error.message],
    });
  }
};


export const createClassSession = async (req, res) => {
    try {
        const { class_type_id, instructor_id, capacity,title,description, duration_minutes, class_date, class_time, meeting_link, status } = req.body;
         console.log(req.body);
        const instructor = await Instructor.findByPk(instructor_id);



const instructor_name = `${instructor.first_name} ${instructor.last_name}`;
  const startDateTime = new Date(`${class_date}T${class_time}:00`);
        await ClassSession.create({
            class_type_id,
            instructor_id,
            instructor_name: instructor_name,
            title,
            description,
            capacity,
            duration_minutes,
            class_time:startDateTime,
            class_date,
            booked_count: 0,
            meeting_link,
            status,
        });

        res.redirect("/admin/class-sessions?success=Class session added successfully!");
    } catch (error) {
        console.error(error);
        res.render("class_sessions/add", {
            title: "Add Class Session",
            errors: [error.message],
            oldInput: req.body,
        });
    }
};


export const showClassSession = async (req, res) => {
    try {
        const session = await ClassSession.findByPk(req.params.id, {
            include: ["classType", "instructor"],
        });

        if (!session) {
            return res.render("class_sessions/show", {
                title: "Session Not Found",
                errors: ["Class session not found"],
                session: null,
            });
        }

        res.render("class_sessions/show", {
            title: `View Class Session #${session.id}`,
            session,
            errors: [],
        });
    } catch (error) {
        res.render("class_sessions/show", {
            title: "Error",
            errors: [error.message],
            session: null,
        });
    }
};



export const editClassSessionPage = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const classSession = await ClassSession.findByPk(id);
       
        if (!classSession) return res.redirect("/admin/class-sessions?error=Session not found");

        const [classTypes, instructors] = await Promise.all([
            ClassType.findAll(),
            Instructor.findAll(),
        ]);

        res.render("class_sessions/edit", {
            title: "Edit Class Session",
            classSession,
            classTypes,
            instructors,
            success: null,
            errors: [],
        });
    } catch (error) {
        res.redirect("/admin/class-sessions?error=" + error.message);
    }
};


// export const updateClassSession = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const session = await ClassSession.findByPk(id);
//         if (!session) return res.redirect("/admin/class-sessions?error=Session not found");

//         await session.update(req.body);
//         res.redirect("/admin/class-sessions?success=Class session updated successfully");
//     } catch (error) {
//         console.error("Error updating session:", error);
//         res.redirect("/admin/class-sessions?error=" + error.message);
//     }
// };
export const updateClassSession = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Incoming class_time:", req.body.class_time);

    const session = await ClassSession.findByPk(id);
    if (!session) {
      return res.redirect("/admin/class-sessions?error=Session not found");
    }
    
    const {
      title,
      class_date,
      class_time,
      duration_minutes,
      description,
      instructor_id,
      capacity,
      status,
      meeting_link,
    } = req.body;

    // Format time properly
    
    
   let formattedTime;

if (class_time && /^\d{2}:\d{2}$/.test(class_time)) {
  // input type="time" → HH:mm
  formattedTime = `${class_time}:00`;
} else {
  // fallback: keep existing value
  formattedTime = session.class_time;
}
console.log("Formatted class_time:", formattedTime);

    
    const instructor = await Instructor.findByPk(instructor_id);
    const instructor_name = `${instructor.first_name} ${instructor.last_name}`;

    await session.update({
      title,
      class_date,
      class_time: formattedTime,
      duration_minutes,
      description,
      instructor_id,
      instructor_name,
      capacity,
      status,
      meeting_link,
    });

    return res.redirect(
      "/admin/class-sessions?success=Class session updated successfully"
    );
  } catch (err) {
    console.error("Error updating session:", err);
    return res.redirect(
      "/admin/class-sessions?error=Failed to update class session"
    );
  }
};


export const deleteClassSession = async (req, res) => {
    try {
        const session = await ClassSession.findByPk(req.params.id);
        if (!session) return res.status(404).json({ success: false, message: "Session not found" });

        await session.destroy();
        res.json({ success: true, message: "Class session deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
