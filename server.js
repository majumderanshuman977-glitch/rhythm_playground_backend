import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import path from "path";
import authRoutes from "./routes/user/authRoutes.js"
import profileRoutes from "./routes/user/profileRoutes.js"

import adminRoutes from "./routes/admin/adminRoutes.js"
import adminInstructorRoutes from "./routes/admin/adminInstructorRoutes.js"
import adminUserRoutes from "./routes/admin/adminUserRoutes.js"
import adminClassTypeRoutes from "./routes/admin/classTypeRoutes.js"
import adminStudioRoutes from "./routes/admin/adminStudioRoutes.js"
import classSessionRoutes from "./routes/admin/classSessionRoutes.js";
import adminVideoRoutes from "./routes/admin/adminVideoRoutes.js"
import adminBannerRoutes from "./routes/admin/adminBannerRoutes.js"
import adminShortVideoRoutes from "./routes/admin/adminShortVideoRoutes.js"
import InstructorRoutes from "./routes/user/instructorRoutes.js"
import BannerRoutes from "./routes/user/bannerRoutes.js";
import TestimonialRoutes from "./routes/user/testimonialRoutes.js"
import UpcominTraining from "./routes/user/upcomingTrainingRoutes.js"
import Services from "./routes/user/servicesRoutes.js"
import ShortVideoServices from "./routes/user/shortVideosRoutes.js"
import {swaggerDocs} from "./swagger.js"
import { fileURLToPath } from "url";
import session from "express-session";
import { isAdminAuthenticated } from "./middleware/admin/adminAuthMiddleware.js";
import { streamVideo } from "./middleware/user/streamVideo.js";
import { streamShortVideo } from "./middleware/user/streamShortVideo.js";
import adminTestimonialRoutes from "./routes/admin/adminTestimonialsRoutes.js";
import classSchedules from "./routes/user/classSchedulesRoutes.js";
import cors from "cors";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({origin:"*",credentials:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Static files (AdminLTE, CSS, JS)

app.use(express.static(path.join(__dirname, "public")));


app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));
swaggerDocs(app);


app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Rythm Ride Backend API" });
});

app.get("/admin/login", (req, res) => {
    res.render("login", {
        title: "Admin Login",
        message: "Please login to access the admin panel",
    });
});


app.get("/admin/dashboard", isAdminAuthenticated, (req, res) => {
    res.render("index", {
        title: "Dashboard",
        message: `Welcome ${req.session.user?.name || "Admin"}!`,
        // user: req.session.user 
    });
});
app.get("/stream/:filename", streamVideo);

app.use("/admin", adminRoutes);
app.use("/admin/instructors", adminInstructorRoutes);
app.use("/admin/users", adminUserRoutes);
app.use("/admin/studios", adminStudioRoutes);
app.use("/admin/class-type",isAdminAuthenticated, adminClassTypeRoutes);
app.use("/admin/class-sessions", classSessionRoutes);
app.use("/admin/videos", adminVideoRoutes);
app.use("/admin/banners", adminBannerRoutes);
app.use("/admin/short-videos",adminShortVideoRoutes);
app.use("/admin/testimonials",isAdminAuthenticated,adminTestimonialRoutes);


// routes for users 
app.get("/stream/short-video/:filename", streamShortVideo);

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api/instructor", InstructorRoutes);
app.use("/", BannerRoutes);
app.use("/api/testimonials",TestimonialRoutes);
app.use("/api/services",Services);
app.use("/api/upcoming-training",UpcominTraining);
app.use("/api/short-videos",ShortVideoServices);
app.use("/api/class-schedules",classSchedules);



//admin panel 
// app.use("/admin", express.static(path.join(__dirname, "../admin-panel/dist")));


sequelize.sync().then(() => console.log(`Database synced`));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));