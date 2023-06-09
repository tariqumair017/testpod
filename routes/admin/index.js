import express, { Router } from "express";
const router = Router();
import passport from "passport"; 
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login"; 
import AllFlagsData from "../../models/allFlagsData.js";
import middleware from "../../middleware/index.js";


// Flag-Data-Apis 
//Distinct Region form All Flags Data
router.get("/admin/flag-data-api/distinct-region", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await AllFlagsData.distinct("region"); 
    res.send(data);
  } catch (error) {
    return next(error.message);
  }
}));

//Find All Countries of Selected Region
router.get("/admin/flag-data-api/country/:region", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const data = await AllFlagsData.find({region: req.params.region});
    res.send(data);
  } catch (error) {
    return next(error.message);
  }
}));

//Find Document of selected Country
router.get("/admin/flag-data-api/country-for-flag/:country", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const data = await AllFlagsData.findOne({country: req.params.country});
    res.send(data);
  } catch (error) {
    return next(error.message);
  }
}));

// Sign Up 
// router.get("/admin/sign-up", asyncHandler(async (req, res, next) => { 
//   res.render("Admin/index/SignUp");
// }));

//Handel Sign Up Logic
// router.post('/admin/sign-up', asyncHandler(async (req, res, next) => {  
//     try {
//       const newAdmin = new Admin({username: req.body.username, email: req.body.email});
//       const registeredAdmin = await Admin.register(newAdmin, req.body.password); 
//       res.redirect("/login");
//     } catch (error) { 
//       req.flash("error", error.message);
//       return res.redirect("/sign-up");
//     }
// }));


// Login Page 
router.get("/admin/login", connectEnsureLogin.ensureLoggedOut("/admin/dashboard"), asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/Login");
}));

//Handel Login Logic
router.post("/admin/login", connectEnsureLogin.ensureLoggedOut("/admin/dashboard"), passport.authenticate("admin", {
  failureFlash: true,
  failureRedirect: "/admin/login"
}), (req, res) => {  
  res.redirect("/admin/dashboard"); 
});

//Admin: Dashboard Page
router.get("/admin/dashboard", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/Dashboard", {title: "Admin-Dashboard"});
}));

//Admin: Content Management Page
router.get("/admin/content-management", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/ContentManagement", {title: "Content-Management"});
}));
 
//Admin: Result Management Page
router.get("/admin/result-management", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/ResultManagement", {title: "Result-Management"});
}));

//Admin: Analytics Page
router.get("/admin/analytics", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/Analytics", {title: "Analytics"});
}));

//Logout
router.get('/logout', connectEnsureLogin.ensureLoggedIn("/"), function(req, res, next) { 
  req.logout(function (err){
    if (err) { return next(err); }
    res.redirect('/');
  });
});


export default router;