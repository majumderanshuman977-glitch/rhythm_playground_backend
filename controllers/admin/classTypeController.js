import ClassType from "../../models/classTypeModel.js";
import fs from "fs";
import path from "path";

// List all class types
export const listClassTypes = async (req, res) => {
    try {
        const classTypes = await ClassType.findAll({ order: [["createdAt", "DESC"]] });
        res.render("class_types/list", {
            title: "Class Types",
            classTypes,
            success: req.query.success || null,
            errors: [],
            baseUrl: req.protocol + "://" + req.get("host")
        });
    } catch (error) {
        res.render("class_types/list", {
            title: "Class Types",
            classTypes: [],
            success: null,
            errors: [error.message],
            baseUrl: req.protocol + "://" + req.get("host")
        });
    }
};



// Show create page
export const createClassTypePage = (req, res) => {

    res.render("class_types/add", {
        title: "Add Class Type",
        errors: [],
        success: null,
        error: null,
        oldInput: {}
    });
};


// Create new class type
export const createClassType = async (req, res) => {
    try {
        const { name, description, duration_minutes, is_active } = req.body;

        let image = null;
        if (req.file) image = `/uploads/admin/class_types/${req.file.filename}`;

        await ClassType.create({
            name,
            description,
            duration_minutes,
            image,
            is_active: is_active,
        });

        res.redirect("/admin/class-type/list?success=Class type created successfully");
    } catch (error) {
        console.error(error);
        res.render("class_types/add", {
            title: "Add Class Type",
            errors: [error.message],
            success: null,
            oldInput: req.body,
        });
    }
};


export const showClassType = async (req, res) => {
    try {
        const { id } = req.params;
        const classType = await ClassType.findByPk(id);

        if (!classType) {
            return res.status(404).render("class_types/show", {
                title: "Class Type Not Found",
                classType: null,
                errors: ["Class type not found."],
            });
        }

        res.render("class_types/show", {
            title: `View Class Type - ${classType.name}`,
            classType,
            errors: [],
        });
    } catch (error) {
        console.error("Error showing class type:", error);
        res.status(500).render("class_types/show", {
            title: "Error",
            classType: null,
            errors: [error.message],
        });
    }
};


// Show edit page
export const editClassTypePage = async (req, res) => {
    try {
        const classType = await ClassType.findByPk(req.params.id);
        if (!classType) return res.status(404).render("404", { message: "Class type not found" });

        res.render("class_types/edit", { title: "Edit Class Type", classType, errors: null, success: null, baseUrl: process.env.BASE_URL || "http://127.0.0.1:5000", });
    } catch (error) {
        console.error(error);
        res.status(500).render("class_types/edit", { title: "Edit Class Type", classType: null, errors: [error.message], success: null });
    }
};

// Update class type
export const updateClassType = async (req, res) => {
    try {
        const classType = await ClassType.findByPk(req.params.id);
        if (!classType) return res.status(404).render("404", { message: "Class type not found" });

        const { name, description, duration_minutes, is_active } = req.body;
        console.log(is_active);
        let image = classType.image;
        if (req.file) {
            // Delete old image if exists
            if (classType.image) {
                const oldPath = path.join(process.cwd(), classType.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            image = `/uploads/admin/class_types/${req.file.filename}`;
        }

        await classType.update({
            name,
            description,
            duration_minutes,
            image,
            is_active: is_active,
        });

        res.redirect("/admin/class-type/list?success=Class type updated successfully");
    } catch (error) {
        console.error(error);
        res.render("class_types/edit", { title: "Edit Class Type", classType: await ClassType.findByPk(req.params.id), errors: [error.message], success: null });
    }
};

// Delete class type
export const deleteClassType = async (req, res) => {
    try {
        const classType = await ClassType.findByPk(req.params.id);
        if (!classType) return res.status(404).json({ success: false, message: "Class type not found" });

        // Delete image if exists
        if (classType.image) {
            const imagePath = path.join(process.cwd(), classType.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await classType.destroy();
        res.json({ success: true, message: "Class type deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete class type" });
    }
};


