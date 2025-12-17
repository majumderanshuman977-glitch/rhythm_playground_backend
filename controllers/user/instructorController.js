import Instructor from "../../models/instructorModel.js";


export const getAllInstructors = async (req, res) => {
    try {
        // Get pagination params
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let offset = (page - 1) * limit;

        const { count, rows } = await Instructor.findAndCountAll({
            offset,
            limit,
            attributes:[
                "id",
                "first_name",
                "last_name",
                "email",
                "bio",
                "experience_years",
                "specialization",
                "rating",
                "phone",
                "image",
                "status"
            ],
            order: [["id", "DESC"]],
        });

            // Add full image path
        const baseURL = `${req.protocol}://${req.get("host")}/uploads/admin/instructor_images/`;
        
        const formattedData = rows.map(instructor => ({
            ...instructor.toJSON(),
            image: instructor.image 
                ? baseURL + instructor.image 
                : null
        }));

        res.status(200).json({
            success: true,
            data: formattedData,
            pagination: {
                total_items: count,
                current_page: page,
                per_page: limit,
                total_pages: Math.ceil(count / limit),
            },
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch instructors",
            error: error.message,
        });
    }
};



export const getInstructorById = async (req, res) => {
    try {
        const instructor = await Instructor.findByPk(req.params.id);

        const baseURL = `${req.protocol}://${req.get("host")}/uploads/admin/instructor_images/`;

        if (instructor) {
            if (instructor.image) {
                instructor.image = baseURL + instructor.image;
            }
        }
        if (!instructor) {
            return res.status(404).json({ success: false, message: "Instructor not found" });
        }
        res.status(200).json({ success: true, data: instructor });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch instructor", error: error.message });
    }
}


