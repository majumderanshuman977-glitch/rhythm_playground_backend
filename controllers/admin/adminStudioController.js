import Studio from "../../models/studioModel.js";
import fs from "fs";
import path from "path";
import axios from "axios";
export const addStudioPage = (req, res) => {
    res.render("studios/add_studio", {
        title: "Add New Studio",
        errors: [],
        success: null,
    });
};

export const createStudio = async (req, res) => {
    try {
        const {
            name,
            address,
            city,
            state,
            country,
            phone,
            email,
            active,
        } = req.body;

        // Validate required fields
        if (!name || !address) {
            return res.render("studios/add_studio", {
                title: "Add New Studio",
                errors: ["Name and Address are required fields."],
                success: null,
            });
        }

        // Combine full address for geocoding
        const fullAddress = `${address}, ${city || ""}, ${state || ""}, ${country || ""}`.trim();

        // ---  Fetch coordinates from LocationIQ ---
        let latitude = null;
        let longitude = null;

        try {
            const locationIQKey = process.env.LOCATIONIQ_API_KEY; // keep it in .env
            const geoResponse = await axios.get("https://us1.locationiq.com/v1/search", {
                params: {
                    key: locationIQKey,
                    q: fullAddress,
                    format: "json",
                    limit: 1,
                },
            });

            if (geoResponse.data && geoResponse.data.length > 0) {
                latitude = geoResponse.data[0].lat;
                longitude = geoResponse.data[0].lon;
            }
        } catch (geoError) {
            console.warn(" LocationIQ geocoding failed:", geoError.message);
        }

        // --- Save to DB ---
        await Studio.create({
            name,
            address,
            city,
            state,
            country,
            latitude,
            longitude,
            phone,
            email,
            active: active === "on",
        });

        return res.render("studios/add_studio", {
            title: "Add New Studio",
            success: "Studio added successfully!",
            errors: [],
        });
    } catch (error) {
        console.error(" Error adding studio:", error);
        res.render("studios/add_studio", {
            title: "Add New Studio",
            errors: [error.message],
            success: null,
        });
    }
};
export const listStudios = async (req, res) => {
    try {
        const studios = await Studio.findAll({ order: [["createdAt", "DESC"]] });

        res.render("studios/all_studios", {
            title: "Manage Studios",
            studios,
            baseUrl: process.env.BASE_URL,
            success: req.query.success || null,
            errors: [],
        });
    } catch (error) {
        console.error("Error fetching studios:", error);
        res.status(500).render("studios/studios_list", {
            title: "Manage Studios",
            studios: [],
            success: null,
            errors: ["Failed to fetch studios"],
        });
    }
};

export const getStudioById = async (req, res) => {
    try {
        const studio = await Studio.findByPk(req.params.id);
        if (!studio) return res.status(404).render("404", { message: "Studio not found" });

        res.render("studios/show_studio", {
            title: `Studio - ${studio.name}`,
            studio,
            success: req.query.success,
            errors: [],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching studio details");
    }
};

export const editStudioPage = async (req, res) => {
    try {
        const studio = await Studio.findByPk(req.params.id);
        if (!studio) {
            return res.status(404).render("404", { message: "Studio not found" });
        }

        res.render("studios/edit_studio", {
            title: "Edit Studio",
            studio,
            errors: [],
            success: req.query.success || null,
        });
    } catch (error) {
        console.error("Error loading edit page:", error);
        res.status(500).render("404", { message: "Error loading edit page" });
    }
};

export const updateStudio = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            address,
            city,
            state,
            country,
            phone,
            email,
            active,
        } = req.body;

        const studio = await Studio.findByPk(id);
        if (!studio) {
            return res.status(404).render("404", { message: "Studio not found" });
        }

        let latitude = studio.latitude;
        let longitude = studio.longitude;

        const locationChanged =
            address !== studio.address ||
            city !== studio.city ||
            state !== studio.state ||
            country !== studio.country;

        if (locationChanged && address) {
            const apiKey = process.env.LOCATIONIQ_API_KEY;
            if (!apiKey) {
                console.warn("⚠️ LOCATIONIQ_API_KEY is missing in .env file!");
            } else {
                try {
                    const fullAddress = `${address}, ${city || ""}, ${state || ""}, ${country || ""}`;
                    const geoResponse = await axios.get("https://us1.locationiq.com/v1/search", {
                        params: {
                            key: apiKey,
                            q: fullAddress,
                            format: "json",
                            limit: 1,
                        },
                    });

                    if (geoResponse.data && geoResponse.data.length > 0) {
                        latitude = geoResponse.data[0].lat;
                        longitude = geoResponse.data[0].lon;
                    } else {
                        console.warn("⚠️ No geocoding results found for:", fullAddress);
                    }
                } catch (geoError) {
                    console.error("❌ LocationIQ geocoding failed:", geoError.response?.data || geoError.message);
                }
            }
        }

        await studio.update({
            name,
            address,
            city,
            state,
            country,
            latitude,
            longitude,
            phone,
            email,
            active: active === "on",
        });

        return res.redirect(`/admin/studios/list?success=Studio updated successfully`);
    } catch (error) {
        console.error("❌ Error updating studio:", error);
        res.status(500).render("studios/edit_studio", {
            title: "Edit Studio",
            studio: await Studio.findByPk(req.params.id),
            errors: [error.message],
            success: null,
        });
    }
};
export const deleteStudio = async (req, res) => {
    try {
        const studio = await Studio.findByPk(req.params.id);
        if (!studio) {
            return res.status(404).json({ success: false, message: "Studio not found" });
        }

        await studio.destroy();
        res.json({ success: true, message: "Studio deleted successfully" });
    } catch (error) {
        console.error("Error deleting studio:", error);
        res.status(500).json({ success: false, message: "Failed to delete studio" });
    }
};
