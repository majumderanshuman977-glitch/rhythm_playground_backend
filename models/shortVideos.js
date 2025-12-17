import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ClassType from "./classTypeModel.js";

const ShortVideo = sequelize.define("shortVideos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
    validate: {
      isIn: {
        args: [["active", "inactive"]],
        msg: "Status must be either active or inactive.",
      },
    },
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // <-- nullable now
    references: {
      model: "class_type", // make sure this matches your table name
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL", // optional: set to null if the referenced class is deleted
  },
});


// Association
ShortVideo.belongsTo(ClassType, {
  foreignKey: "service_id",
  as: "classType",
});

export default ShortVideo;
