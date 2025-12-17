import path from "path";
import Testimonial from "../../models/testimonialModel.js";
import fs from "fs";
export const TestimonialListPage = async(req,res)=>{
    try{
        const testimonials = await Testimonial.findAll();
        const baseUrl = process.env.BASE_URL;  
        res.render("testimonials/all_testimonials", { title: "Manage Testimonials", testimonials, success: req.query.success, errors:null, baseUrl });

    }catch(err){
          res.render("testimonials/all_testimonials", { title: "Manage Testimonials", testimonials: [], errors: [err.message], success: null });
    }
}



export const AddTestimonialPage = async (req, res) => {
  try {
    res.render("testimonials/add_testimonials", {
      title: "Add Testimonial",
      success: null,
      errors: null,
      oldInput: {}
    });
  } catch (error) {
    res.render("testimonials/add_testimonials", {
      title: "Add Testimonial",
     errors: [error.message]  ,
      success: null,
      oldInput: {}
    });
  }
};


export const createTestimonial = async (req, res) => {
  try {
    const { client_name, client_role,review, is_active } = req.body;
    const errors = [];

    // Validation
    if (!client_name) errors.push("Client Name is required");
    if (!review) errors.push("Client Review is required");
    if (!req.file) errors.push("Profile Image is required");

    if (errors.length > 0) {
      return res.render("testimonials/add_testimonials", {
        title: "Add Testimonial",
        errors,
        success: null,
        oldInput: { client_name, client_role,review, is_active }
      });
    }

    // Save testimonial
    await Testimonial.create({
      name:client_name,
      role:client_role,
      
      description:review,
      is_active: is_active,
      image: req.file.filename
    });

    res.render("testimonials/add_testimonials", {
      title: "Add Testimonial",
      success: "Testimonial added successfully!",
      errors: [],
      oldInput: {}
    });

  } catch (error) {
    res.render("testimonials/add_testimonials", {
      title: "Add Testimonial",
      errors: [error.message],
      success: null,
      oldInput: req.body
    });
  }
};


export const EditTestimonialPage = async(req,res)=>{
    try{
        console.log(req.params.id);
        const testimonial = await Testimonial.findByPk(req.params.id);
        const baseUrl = process.env.BASE_URL;
        if(!testimonial) return res.redirect("/admin/testimonials?error=Testimonial not found");
        res.render("testimonials/edit_testimonials", { title: "Edit Testimonial", testimonial, success: null, errors: [], oldInput: {},baseUrl });
    }catch(error){
        console.error(error);
        res.redirect("/admin/testimonials?error=" + error.message);
    }
}

export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) 
      return res.redirect("/admin/testimonials?error=Testimonial not found");

    const { client_name, client_role, review, is_active } = req.body;

    let updatedData = {
      name: client_name,
      role: client_role,
      description: review,
      is_active: is_active
    };

    // If a new image is uploaded, delete the old one
    if (req.file) {
      if (testimonial.image) {
        const oldImagePath = path.join("uploads/testimonials", testimonial.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // delete old image
        }
      }
      updatedData.image = req.file.filename;
    }

    await testimonial.update(updatedData);

    res.redirect("/admin/testimonials?success=Testimonial updated successfully");
  } catch (error) {
    console.error(error);
    res.redirect("/admin/testimonials?error=" + error.message);
  }
};

export const deleteTestimonial = async(req,res)=>{
    try{
        const testimonial = await Testimonial.findByPk(req.params.id);
        if(!testimonial) return res.redirect("/admin/testimonials?error=Testimonial not found");
        const imagePath = path.join("uploads/testimonials", testimonial.image);
        if(fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        await testimonial.destroy();
        res.redirect("/admin/testimonials?success=Testimonial deleted successfully");
    }catch(error){
        console.error(error);
        res.redirect("/admin/testimonials?error=" + error.message);
    }
};


