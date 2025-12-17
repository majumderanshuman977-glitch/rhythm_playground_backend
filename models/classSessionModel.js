import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ClassType from "./classTypeModel.js";
import Instructor from "./instructorModel.js";
import Studio from "./studioModel.js";

const ClassSession = sequelize.define(
    "ClassSession",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        class_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: ClassType, key: "id" },
        },
        instructor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Instructor, key: "id" },
        },
        studio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Studio, key: "id" },
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duration_minutes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        booked_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("scheduled", "completed", "cancelled"),
            defaultValue: "scheduled",
        },
    },
    {
        tableName: "class_sessions",
        timestamps: true,
    }
);

// Relationships
ClassSession.belongsTo(ClassType, { foreignKey: "class_type_id", as: "classType" });
ClassSession.belongsTo(Instructor, { foreignKey: "instructor_id", as: "instructor" });
ClassSession.belongsTo(Studio, { foreignKey: "studio_id", as: "studio" });

export default ClassSession;
