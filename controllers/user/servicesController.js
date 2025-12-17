import ClassType from "../../models/classTypeModel.js";
import { success, error } from "../../utils/apiResponse.js";

export const getClassTypes = async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL; 

    const classTypes = await ClassType.findAll({
      attributes: ['id','name', 'image'],  
      where:{
        is_active: 1,
      },
      limit:4
    }) ;

    // prepend base URL to image
    const result = classTypes.map(ct => ({
      id: ct.id,
      name: ct.name,
      image: ct.image ? baseUrl + ct.image : null
    }));

    return success(res, "Class Types", result);
  } catch (err) {
    return error(res, "Failed to fetch class types", err.message);
  }
};

