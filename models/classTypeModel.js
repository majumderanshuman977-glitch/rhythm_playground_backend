import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ClassType = sequelize.define("ClassType", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Class name is required" },
            len: { args: [2, 100], msg: "Class name must be between 2 and 100 characters" },
        },
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: { args: [0, 500], msg: "Description can be up to 500 characters" },
        },
    },

    duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "Duration must be an integer" },
            min: { args: [1], msg: "Duration must be at least 1 minute" },
        },
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrlOrEmpty(value) {
                if (value && !/^https?:\/\/|^\/uploads\//.test(value)) {
                    throw new Error("Image must be a valid URL or uploaded path");
                }
            },
        },
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        validate: {
            isIn: { args: [[true, false]], msg: "is_active must be true or false" },
        },
    },
}, {
    tableName: "class_type",
    timestamps: true,
});

export default ClassType;
