import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Studio = sequelize.define("Studio", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Studio name is required" },
            len: { args: [2, 100], msg: "Studio name must be between 2 and 100 characters" },
        },
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Address is required" },
            len: { args: [5, 255], msg: "Address must be at least 5 characters long" },
        },
    },

    city: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: { args: [2, 100], msg: "City name must be between 2 and 100 characters" },
        },
    },

    state: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: { args: [2, 100], msg: "State name must be between 2 and 100 characters" },
        },
    },

    country: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: { args: [2, 100], msg: "Country name must be between 2 and 100 characters" },
        },
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

    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: {
                args: /^[0-9]{8,15}$/,
                msg: "Phone number must contain only digits (8–15 digits)",
            },
        },
    },

    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
            msg: "This email address is already in use",
        },
        validate: {
            isEmail: { msg: "Please enter a valid email address" },
        },
    },

    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
            notNull: { msg: "Active status must be specified" },
        },
    },
}, {
    tableName: "studios",
    timestamps: true,
    underscored: true,
});

export default Studio;
