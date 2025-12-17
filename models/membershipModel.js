import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Membership = sequelize.define("Membership", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    duration_days: { type: DataTypes.INTEGER, allowNull: false },
    max_classes: { type: DataTypes.INTEGER, allowNull: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    tableName: "memberships",
    timestamps: true,
});

export default Membership;
