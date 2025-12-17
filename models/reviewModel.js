import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Reviews = sequelize.define("Reviews", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instructor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ratings: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    comment: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    tableName: "reviews",
    timestamps: true
});


export default Reviews;

