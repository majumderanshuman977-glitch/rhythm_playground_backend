import { DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const Banner = sequelize.define("Banner",{
   id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
   banner:{type:DataTypes.STRING,allowNull:false},
   title:{type:DataTypes.STRING,allowNull:true},
   is_active:{type:DataTypes.BOOLEAN,defaultValue:false},
},{
    tableName:"banners",
    timestamps:true
});

export default Banner;