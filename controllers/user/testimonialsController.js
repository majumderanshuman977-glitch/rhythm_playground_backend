import Testimonial from "../../models/testimonialModel.js";
import { success,error } from "../../utils/apiResponse.js";
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [["id", "DESC"]]
    });

    const host = req.protocol + "://" + req.get("host"); // base URL

    const data = testimonials.map(t => ({
      id: t.id,
      name: t.name,
      role: t.role || null,
      review: t.description,
      is_active: t.is_active,
      image_url: t.image ? `${host}/uploads/testimonials/${t.image}` : null
    }));


    success(res, "Testimonials fetched successfully", data);
  } catch (err) {
    console.error(err);
  
    error(res, "Failed to fetch testimonials", 500, err.message);
  }
};