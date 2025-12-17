import Instructor from "../../models/instructorModel.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import ClassType from "../../models/classTypeModel.js";

export const createInstructor = async (req, res) => {
    let classTypes = []; // ✅ declare here (outer scope)

    try {
        const {
            first_name,
            last_name,
            email,
            password_hash,
            phone,
            bio,
            experience_years,
            service_id,
            rating,
            status
        } = req.body;

        classTypes = await ClassType.findAll({
            attributes: ["id", "name"],
            order: [["name", "ASC"]],
        });

        const errors = [];
        if (!first_name || !last_name || !email) {
            errors.push("First name, last name, email are required.");
        }

        const existingInstructor = await Instructor.findOne({ where: { email } });
        if (existingInstructor) {
            errors.push("Email is already in use.");
        }

        if (errors.length > 0) {
            return res.redirect(
                "/admin/instructors/list?error=" +
                encodeURIComponent(errors[0])
            );
        }

        const service = await ClassType.findByPk(service_id);
        if (!service) {
            throw new Error("Invalid service selected.");
        }

        // ✅ HASH PASSWORD (YOU COMMENTED IT BUT STILL USE IT)
        const hashedPassword = password_hash
            ? await bcrypt.hash(password_hash, 10)
            : "";

        let imageFilename = null;
        if (req.file) {
            imageFilename = req.file.filename;
        }

        await Instructor.create({
            first_name,
            last_name,
            email,
            password_hash: hashedPassword,
            phone: phone || null,
            bio: bio || null,
            experience_years: experience_years ? Number(experience_years) : null,
            service_id: Number(service_id),
            specialization: service.name,
            rating: rating ? Number(rating) : 0.0,
            status: status || "active",
            image: imageFilename,
        });

        return res.redirect("/admin/instructors/list?success=Instructor created successfully");

    } catch (error) {
        console.error("Instructor creation error:", error);

        return res.status(500).render("instructors/instructors", {
            title: "Instructors Management",
            message: "Add New Instructor",
            errors: [error.message],
            oldInput: req.body,
            success: null,
            error: error.message,
            classTypes, // ✅ now accessible
        });
    }
};

export const listInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.findAll();
        res.render("instructors/all_instructors", { instructors, baseUrl: process.env.BASE_URL });
    } catch (err) {
        console.error("Error fetching instructors:", err);
        res.status(500).send("Server Error");
    }
};
export const getInstructorById = async (req, res) => {
    try {
        const { id } = req.params;
        const instructor = await Instructor.findByPk(id);
        res.render("instructors/show_instructor", { instructor, baseUrl: process.env.BASE_URL, });
    } catch (error) {
        console.error("Error fetching instructor:", error);
        res.status(500).send("Server Error");
    }
}

// export const editInstructorPage = async (req, res) => {
//     try {
//         const instructor = await Instructor.findByPk(req.params.id);
//         if (!instructor) {
//             return res.status(404).render("404", { message: "Instructor not found" });
//         }

//         res.render("instructors/edit_instructor", {
//             title: "Edit Instructor",
//             instructor,
//             success: req.query.success || null,
//             errors: [],
//             baseUrl: process.env.BASE_URL || "http://127.0.0.1:5000",
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server error");
//     }
// };
export const editInstructorPage = async (req, res) => {
    try {
        const instructor = await Instructor.findByPk(req.params.id);
        if (!instructor) {
            return res.status(404).render("404", { message: "Instructor not found" });
        }

        const classTypes = await ClassType.findAll({
            attributes: ["id", "name"],
            order: [["name", "ASC"]],
        });

        res.render("instructors/edit_instructor", {
            title: "Edit Instructor",
            instructor,
            classTypes,
            success: req.query.success || null,
            errors: [],
            baseUrl: process.env.BASE_URL || "http://127.0.0.1:5000",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

// export const updateInstructor = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { id } = req.params;
//         const {
//             first_name,
//             last_name,
//             email,
//             phone,
//             bio,
//             experience_years,
//             specialization,
//             rating,
//             status,
//         } = req.body;

//         // Find instructor
//         const instructor = await Instructor.findByPk(id);
//         if (!instructor) {
//             return res.status(404).render("404", { message: "Instructor not found" });
//         }

//         // Handle new image upload
//         let imageFilename = instructor.image;
//         if (req.file) {
//             const oldImagePath = path.join(
//                 process.cwd(),
//                 "uploads",
//                 "admin",
//                 "instructor_images",
//                 instructor.image || ""
//             );

//             // Delete old image if exists
//             if (instructor.image && fs.existsSync(oldImagePath)) {
//                 fs.unlinkSync(oldImagePath);
//             }

//             imageFilename = req.file.filename;
//         }

//         // Update fields
//         instructor.first_name = first_name;
//         instructor.last_name = last_name;
//         instructor.email = email;
//         instructor.phone = phone;
//         instructor.bio = bio;
//         instructor.experience_years = experience_years;
//         instructor.specialization = specialization;
//         instructor.rating = rating || instructor.rating;
//         instructor.status = status || instructor.status;
//         instructor.image = imageFilename;

//         await instructor.save();

//         // ✅ Redirect with success
//         return res.redirect(`/admin/instructors/edit/${id}?success=Instructor updated successfully`);
//     } catch (err) {
//         console.error("Error updating instructor:", err);

//         // ✅ Ensure instructor is fetched for rendering
//         let instructor = null;
//         try {
//             instructor = await Instructor.findByPk(req.params.id);
//         } catch { }

//         res.status(500).render("instructors/edit_instructor", {
//             title: "Edit Instructor",
//             instructor, // may be null but now safely handled
//             errors: [err.message],
//             success: null,
//             baseUrl: process.env.BASE_URL || "http://127.0.0.1:5000",
//         });
//     }
// };


export const updateInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            first_name,
            last_name,
            email,
            phone,
            bio,
            experience_years,
            service_id,
            rating,
            status,
        } = req.body;

        const instructor = await Instructor.findByPk(id);
        if (!instructor) {
            return res.status(404).render("404", { message: "Instructor not found" });
        }

        // 🔹 Validate service
        const service = await ClassType.findByPk(service_id);
        if (!service) {
            throw new Error("Invalid service selected");
        }

        // 🔹 Handle image update
        let imageFilename = instructor.image;

        if (req.file) {
            const oldImagePath = path.join(
                process.cwd(),
                "uploads",
                "admin",
                "instructor_images",
                instructor.image || ""
            );

            if (instructor.image && fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            imageFilename = req.file.filename;
        }

        // 🔹 Update instructor
        await instructor.update({
            first_name,
            last_name,
            email,
            phone,
            bio,
            experience_years,
            service_id,
            specialization: service.name, // ✅ always synced
            rating: rating || instructor.rating,
            status: status || instructor.status,
            image: imageFilename,
        });

        return res.redirect(`/admin/instructors/edit/${id}?success=Instructor updated successfully`);
    } catch (err) {
        console.error("Error updating instructor:", err);

        const instructor = await Instructor.findByPk(req.params.id);
        const classTypes = await ClassType.findAll();

        res.status(500).render("instructors/edit_instructor", {
            title: "Edit Instructor",
            instructor,
            classTypes,
            errors: [err.message],
            success: null,
            baseUrl: process.env.BASE_URL || "http://127.0.0.1:5000",
        });
    }
};

export const deleteInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        

        const instructor = await Instructor.findByPk(id);
         console.log(instructor);
        if (!instructor) {
            return res
                .status(404)
                .json({ success: false, message: "Instructor not found" });
        }

        // ✅ Delete the associated image file if it exists
        if (instructor.image) {
            const imagePath = path.join(
                process.cwd(),
                "uploads",
                "admin",
                "instructor_images",
                instructor.image
            );

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`Deleted instructor image: ${imagePath}`);
            }
        }

        // ✅ Delete the instructor record
        await instructor.destroy();

        return res
            .status(200)
            .json({ success: true, message: "Instructor and image deleted successfully" });

    } catch (error) {
        console.error("❌ Delete Instructor Error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to delete instructor" });
    }
};

