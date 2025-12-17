import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define("Payment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    method: { type: DataTypes.ENUM("stripe", "razorpay", "paypal", "cash"), allowNull: false },
    transaction_id: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: { type: DataTypes.ENUM("pending", "success", "failed", "refunded"), defaultValue: "pending" },
    paid_for: { type: DataTypes.ENUM("order", "booking", "membership"), allowNull: false },
    paid_at: { type: DataTypes.DATE, allowNull: true },
}, {
    tableName: "payments",
    timestamps: true,
});

export default Payment;
