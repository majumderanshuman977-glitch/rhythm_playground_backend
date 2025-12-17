import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ClassType from "./classTypeModel.js";
const Instructor = sequelize.define(
    "Instructor",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "First name is required." },
                len: {
                    args: [2, 50],
                    msg: "First name must be between 2 and 50 characters.",
                },
            },
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Last name is required." },
                len: {
                    args: [2, 50],
                    msg: "Last name must be between 2 and 50 characters.",
                },
            },
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { msg: "Email already exists." },
            validate: {
                notEmpty: { msg: "Email is required." },
                isEmail: { msg: "Please provide a valid email address." },
            },
        },

        password_hash: {
            type: DataTypes.STRING,
            allowNull: true,
        
        },

        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 500],
                    msg: "Bio cannot exceed 500 characters.",
                },
            },
        },

        experience_years: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: { args: [0], msg: "Experience years cannot be negative." },
                max: { args: [60], msg: "Experience years is too high." },
                isInt: { msg: "Experience years must be an integer." },
            },
        },

         service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "class_types", // ✅ best practice
        key: "id",
      },
    },

        

        specialization: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        rating: {
            type: DataTypes.DECIMAL(3, 2),
            defaultValue: 0.0,
            validate: {
                min: { args: [0], msg: "Rating cannot be negative." },
                max: { args: [5], msg: "Rating cannot exceed 5.0." },
                isDecimal: { msg: "Rating must be a decimal number." },
            },
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^[0-9]{10,15}$/,
                    msg: "Phone number must be 10–15 digits.",
                },
            },
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: "Image must be a valid URL if provided.",
                },
            },
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
    },
    {
        tableName: "instructors",
        timestamps: true,
    }
);
Instructor.belongsTo(ClassType, {
  foreignKey: "service_id",
  as: "classType",
});

export default Instructor;
