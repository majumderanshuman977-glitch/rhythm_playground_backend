import ClassSession from "../../models/classSessionModel.js";
import ClassType from "../../models/classTypeModel.js";
import Instructor from "../../models/instructorModel.js";
import Studio from "../../models/studioModel.js";


export const listClassSessions = async (req, res) => {
    try {
        const sessions = await ClassSession.findAll({
            include: ["classType", "instructor", "studio"],
            order: [["createdAt", "DESC"]],
        });

        res.render("class_sessions/list", {
            title: "Manage Class Sessions",
            sessions,
            success: req.query.success || null,
            errors: [],
        });
    } catch (error) {
        console.error(error);
        res.render("class_sessions/list", {
            title: "Manage Class Sessions",
            sessions: [],
            errors: [error.message],
            success: null,
        });
    }
};


export const addClassSessionPage = async (req, res) => {
    const classTypes = await ClassType.findAll();
    const instructors = await Instructor.findAll();
    const studios = await Studio.findAll();

    res.render("class_sessions/add", {
        title: "Add Class Session",
        classTypes,
        instructors,
        studios,
        errors: [],
        oldInput: {},
    });
};


export const createClassSession = async (req, res) => {
    try {
        const { class_type_id, instructor_id, studio_id, capacity, duration_minutes, start_time, end_time, price, status } = req.body;

        await ClassSession.create({
            class_type_id,
            instructor_id,
            studio_id,
            capacity,
            duration_minutes,
            start_time,
            end_time,
            price,
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
            include: ["classType", "instructor", "studio"],
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
        console.log('');
        console.log(req.params);
        const { id } = req.params;
        const classSession = await ClassSession.findByPk(id);
        console.log(classSession);
        if (!classSession) return res.redirect("/admin/class-sessions?error=Session not found");

        const [classTypes, instructors, studios] = await Promise.all([
            ClassType.findAll(),
            Instructor.findAll(),
            Studio.findAll(),
        ]);

        res.render("class_sessions/edit", {
            title: "Edit Class Session",
            classSession,
            classTypes,
            instructors,
            studios,
            success: null,
            errors: [],
        });
    } catch (error) {
        res.redirect("/admin/class-sessions?error=" + error.message);
    }
};


export const updateClassSession = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await ClassSession.findByPk(id);
        if (!session) return res.redirect("/admin/class-sessions?error=Session not found");

        await session.update(req.body);
        res.redirect("/admin/class-sessions?success=Class session updated successfully");
    } catch (error) {
        console.error("Error updating session:", error);
        res.redirect("/admin/class-sessions?error=" + error.message);
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
