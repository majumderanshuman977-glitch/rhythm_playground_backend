import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js"
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { success,error } from "../../utils/apiResponse.js";
const generateReferralCode = async () => {
    let code;
    let exists = true;

    while (exists) {
        // Example format: RR-AB12CD
        code = "RR-" + Math.random().toString(36).substring(2, 8).toUpperCase();

        // Check if already taken
        const existing = await User.findOne({ where: { referral_code: code } });
        if (!existing) exists = false;
    }

    return code;
};

export const register = async (req, res) => {
    try {
        let {
            first_name, //check
            last_name,  //check 
            email,      //check 
            password_hash, //check
            instagram_handle,
            address_1,
            address_2,
            shoe_size,
            town,  //check 
            state, //check 
            zip_code, //check 
            country,   //check 
            phone,    //check
            gender,
            dob    //check 
        } = req.body;

        // Normalize possible array/object values
        const normalizeField = (val) => {
            if (Array.isArray(val)) return val.join(", ");
            if (typeof val === "object" && val !== null) return JSON.stringify(val);
            return val;
        };
        state = normalizeField(state);
        country = normalizeField(country);
        town = normalizeField(town);

        //  Basic validation
    //  if (!first_name || !last_name || !email || !password_hash) {
    //   return error(res, "First name, last name, email, and password are required.", 400);
    // }
    let validationErrors = {};

    // Required fields
    if (!first_name) validationErrors.first_name = "First name is required";
    if (!last_name) validationErrors.last_name = "Last name is required";
    if (!email) validationErrors.email = "Email is required";
    if (!password_hash) validationErrors.password_hash = "Password is required";

    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) {
      validationErrors.email = "Invalid email format";
    }


    if (Object.keys(validationErrors).length > 0) {
      return error(res, "Validation failed", 400, validationErrors);
    }

        //  Check if email exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
             return error(res, "Email already registered", 400);

        //  Hash password safely
        const hashedPassword = await bcrypt.hash(password_hash, 10);


        //  Generate referral code
        const referral_code = await generateReferralCode();

        //  Build full address for geocoding
        const fullAddress = `${address_1 || ""} ${address_2 || ""} ${town || ""} ${state || ""} ${zip_code || ""} ${country || ""}`.trim();

        let latitude = null;
        let longitude = null;

        //  Fetch coordinates using LocationIQ
        if (fullAddress && process.env.LOCATIONIQ_API_KEY) {
            try {
                const geoRes = await axios.get("https://us1.locationiq.com/v1/search", {
                    params: {
                        key: process.env.LOCATIONIQ_API_KEY,
                        q: fullAddress,
                        format: "json",
                        limit: 1,
                    },
                });

                if (geoRes.data && geoRes.data.length > 0) {
                    latitude = parseFloat(geoRes.data[0].lat);
                    longitude = parseFloat(geoRes.data[0].lon);
                }
            } catch (geoError) {
                console.warn("LocationIQ geocoding failed:", geoError.response?.data || geoError.message);
            }
        }


        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password_hash: hashedPassword,
            instagram_handle,
            address_1,
            address_2,
            shoe_size,
            city: town,
            state,
            zip_code: zip_code,
            country,
            phone,
            gender,
            dob,
        //     profile_image: profileImagePath,
            referral_code,
            latitude,
            longitude,
        });


        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        });

        const userResponse = { ...newUser.dataValues };
        delete userResponse.password_hash;

       return success(res, "User registered successfully", {
      token,
      user:{
        first_name: userResponse.first_name,
        last_name: userResponse.last_name,
        email: userResponse.email,
        phone: userResponse.phone,
        profile_image: userResponse.profile_image
      },
    });
    } catch (err) {
        console.error(" Registration error:", err);
        return error(res, "Registration failed", 500, err.message);
    }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // -------------------------
    // Validation
    // -------------------------
    let validationErrors = {};

    if (!email || !email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!password || !password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      return error(res, "Validation failed", 422, validationErrors);
    }

    // -------------------------
    // Find user (only needed fields + password_hash)
    // -------------------------
    const user = await User.findOne({
      where: { email },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone",
        "dob",
        "city",
        "state",
        "country",
        "zip_code",
        "profile_image",
        "shoe_size",
        "status",
        "latitude",
        "longitude",
        "password_hash" // needed for compare only
      ]
    });

    if (!user) {
      return error(res, "Invalid email or password", 400);
    }

    // -------------------------
    // Password check
    // -------------------------
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return error(res, "Invalid email or password", 400);
    }

    // -------------------------
    // Token
    // -------------------------
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // -------------------------
    // Remove password_hash from response
    // -------------------------
    const userResponse = { ...user.dataValues };
    delete userResponse.password_hash;

    // -------------------------
    // Success
    // -------------------------
    return success(res, "User logged in successfully", {
      token,
      user:{
        first_name: userResponse.first_name,
        last_name: userResponse.last_name,
        email: userResponse.email,
        phone: userResponse.phone,
        dob: userResponse.dob,
        profile_image: userResponse.profile_image,
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    return error(res, "Login failed", 500);
  }
};





export const logout = (req, res) => {
   
    res.status(200).json({ message: "User logged out successfully" });
}


export const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch profile", error: error.message });
    }
}