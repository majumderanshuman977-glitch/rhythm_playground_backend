import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserMembership = sequelize.define("UserMembership", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    membership_id: { type: DataTypes.INTEGER, allowNull: false },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.ENUM("active", "expired", "cancelled"), defaultValue: "active" },
    payment_id: { type: DataTypes.INTEGER, allowNull: true },
}, {
    tableName: "user_memberships",
    timestamps: true,
});

export default UserMembership;
