import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Instructor from "./instructorModel.js";
import ClassType from "./classTypeModel.js";

const Video = sequelize.define(
    "Video",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        instructor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Instructor, key: "id" },
        },

        class_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: ClassType, key: "id" },
        },

        video: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        duration: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "videos",
        timestamps: true,
    }
);


Video.belongsTo(Instructor, { foreignKey: "instructor_id", as: "instructor" });
Video.belongsTo(ClassType, { foreignKey: "class_id", as: "classType" });

export default Video;
