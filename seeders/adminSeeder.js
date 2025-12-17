import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";
import Admin from "../models/adminModel.js";

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log(" Database connected for seeding admin.");


        await Admin.sync({ alter: true });

        const existing = await Admin.findOne({ where: { email: "admin@example.com" } });
        if (existing) {
            console.log("  Admin already exists. Skipping seed.");
            process.exit(0);
        }

        const passwordHash = await bcrypt.hash("Admin@123", 10);

        await Admin.create({
            first_name: "Super",
            last_name: "Admin",
            email: "admin@example.com",
            password_hash: passwordHash,
            role: "super_admin",
            status: "active"
        });

        console.log(" Admin seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error(" Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
