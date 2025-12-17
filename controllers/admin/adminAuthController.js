import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../../models/adminModel.js";


export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });
        admin.password_hash = undefined;

        res.status(200).json({ success: true, message: "Admin login successful", token, admin });
    } catch (error) {
        res.status(500).json({ success: false, message: "Admin login failed", error: error.message });
    }
};


export const adminLogout = (req, res) => {
   
    res.status(200).json({ success: true, message: "Admin logged out successfully" });
};


export const showLogin = (req, res) => {
    res.render("login");
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        req.session.user = {
            id: admin.id,
            name: admin.first_name + " " + admin.last_name,
            email: admin.email
        };
        return res.redirect("/admin/dashboard");
    } catch (error) {
        res.status(500).json({ success: false, message: "Admin login failed", error: error.message });
    }


};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ success: false, message: "Logout failed" });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true, message: "Logged out successfully" });
    });
};
