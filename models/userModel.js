import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "First name is required" },
            len: { args: [2, 50], msg: "First name must be between 2 and 50 characters" },
        },
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Last name is required" },
            len: { args: [2, 50], msg: "Last name must be between 2 and 50 characters" },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already exists" },
        validate: {
            isEmail: { msg: "Please enter a valid email address" },
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: {
                args: /^[0-9]{10,15}$/,
                msg: "Phone number must be 10–15 digits",
            },
        },
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Password is required" },
        },
    },
    gender: { type: DataTypes.ENUM("male", "female", "other"), allowNull: true },
    dob: { type: DataTypes.DATEONLY, allowNull: true },
    address_1: { type: DataTypes.TEXT, allowNull: true },
    address_2: { type: DataTypes.TEXT, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    zip_code: { type: DataTypes.STRING, allowNull: true },
    profile_image: { type: DataTypes.STRING, allowNull: true },
    shoe_size: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive", "banned"),
        defaultValue: "active",
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
        validate: {
            isDecimal: { msg: "Latitude must be a valid decimal value" },
            min: { args: [-90], msg: "Latitude must be greater than or equal to -90" },
            max: { args: [90], msg: "Latitude must be less than or equal to 90" },
        },
    },

    longitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
        validate: {
            isDecimal: { msg: "Longitude must be a valid decimal value" },
            min: { args: [-180], msg: "Longitude must be greater than or equal to -180" },
            max: { args: [180], msg: "Longitude must be less than or equal to 180" },
        },
    },
    terms_and_conditions: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    expiry_email_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    upcoming_booking_email_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    referral_code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
}, {
    tableName: "users",
    timestamps: true,
});

export default User;
