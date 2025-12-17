import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const classSeat = sequelize.define("classSeat", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seat_number: {
        type: DataTypes.STRING,

    }, is_reserved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    tableName: "class_seats",
    timestamps: true
});

export default classSeat;