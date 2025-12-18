import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ClassType from "./classTypeModel.js";
import Instructor from "./instructorModel.js";


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
        instructor_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
             type: DataTypes.TEXT,
             allowNull: false, 
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duration_minutes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        class_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        class_date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        booked_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        meeting_link:{
            type: DataTypes.STRING,
            allowNull: false
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


export default ClassSession;
