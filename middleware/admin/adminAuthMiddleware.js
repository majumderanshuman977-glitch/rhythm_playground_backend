import dotenv from "dotenv";

dotenv.config();



export const isAdminAuthenticated = (req, res, next) => {
     res.locals.Adminuser = req.session.user;
    if (!req.session.user) {
        return res.redirect('/admin/login');
    }
    next();
};


