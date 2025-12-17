import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Bookings = sequelize.define("Bookings", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    booking_status: {
        type: DataTypes.ENUM,
        defaultValue: false
    },
    booking_status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    payment_status: {
        type: DataTypes.ENUM('unpaid', 'paid', 'refunded'),
        allowNull: false,
        defaultValue: 'unpaid'
    },
    booking_date: {
        type: DataTypes.DATE,
    }

}, {
    tableName: "bookings",
    timestamps: true
});

export default Bookings;