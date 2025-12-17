import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Testimonial = sequelize.define("Testimonial", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    tableName: "testimonials",
    timestamps: true,
});

export default Testimonial;