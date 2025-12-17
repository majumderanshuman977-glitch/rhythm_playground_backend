

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Admin = sequelize.define("Admin", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("super_admin", "manager", "staff"), defaultValue: "staff" },
    status: { type: DataTypes.ENUM("active", "inactive"), defaultValue: "active" },
    last_login_at: { type: DataTypes.DATE, allowNull: true },
}, {
    tableName: "admins",
    timestamps: true,
});

export default Admin;


