import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Coupon = sequelize.define("Coupon", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    discount_type: { type: DataTypes.ENUM("fixed", "percent"), allowNull: false },
    discount_value: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    valid_from: { type: DataTypes.DATEONLY },
    valid_to: { type: DataTypes.DATEONLY },
    usage_limit: { type: DataTypes.INTEGER, defaultValue: 0 },
    used_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    tableName: "coupons",
    timestamps: true,
});

export default Coupon;
