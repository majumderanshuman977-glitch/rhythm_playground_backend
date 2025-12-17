
import fs from "fs";
import path from "path";
import User from "../../models/userModel.js";


export const listUsers = async (req, res) => {
    try {
        const users = await User.findAll({ order: [["createdAt", "DESC"]] });
        res.render("users/list_users", {
            title: "User List",
            users,
            baseUrl: process.env.BASE_URL,
            success: req.query.success,
            error: req.query.error,
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Server Error");
    }
};


export const editUserPage = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).render("404", { message: "User not found" });

        res.render("users/edit_user", {
            title: "Edit User",
            user,
            baseUrl: process.env.BASE_URL,
        });
    } catch (err) {
        console.error("Edit user error:", err);
        res.status(500).send("Server error");
    }
};

export const showUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find user by primary key
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).render("404", { message: "User not found" });
        }

        res.render("users/show_user", {
            title: `User Details - ${user.first_name} ${user.last_name}`,
            user,
            success: req.query.success || null,
            errors: [],
            BASE_URL: process.env.BASE_URL || "", // for profile_image
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).render("users/show_user", {
            title: "User Details",
            user: {},
            success: null,
            errors: [error.message],
            BASE_URL: process.env.BASE_URL || "",
        });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            first_name,
            last_name,
            email,
            phone,
            gender,
            city,
            state,
            country,
            zip_code,
            address,
            status,
        } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).send("User not found");

        await user.update({
            first_name,
            last_name,
            email,
            phone,
            gender,
            city,
            state,
            country,
            zip_code,
            address,
            status,
        });

        return res.redirect("/admin/users?success=User updated successfully");
    } catch (err) {
        console.error("Update user error:", err);
        res.status(500).send("Error updating user");
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete avatar file if it exists
        if (user.profile_image) {
            const avatarPath = path.join(process.cwd(), user.profile_image.startsWith("/")
                ? user.profile_image.slice(1)
                : user.profile_image
            );

            try {
                if (fs.existsSync(avatarPath)) {
                    fs.unlinkSync(avatarPath);
                    console.log(`Deleted avatar file: ${avatarPath}`);
                }
            } catch (fileErr) {
                console.warn(`Failed to delete avatar: ${fileErr.message}`);
            }
        }

        // Delete the user from DB
        await user.destroy();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (err) {
        console.error("Delete user error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: err.message,
        });
    }
};
