import express, { Router } from "express";
const router = Router();
import passport from "passport"; 
import asyncHandler from "express-async-handler";  
import Admin from "../models/admin.js";
import QuizModel from "../models/quizs.js";  
import CountryFlagGame from "../models/selectCountryFlagGame.js"; 
import connectEnsureLogin from "connect-ensure-login"; 

// Sign Up 
// router.get("/sign-up", asyncHandler(async (req, res) => { 
//   res.render("Admin/SignUp");
// }));

//Handel Sign Up Logic
// router.post('/sign-up', asyncHandler(async (req, res) => {  
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
router.get("/login", connectEnsureLogin.ensureLoggedOut("/dashboard"), asyncHandler(async (req, res) => { 
  res.render("Admin/Login");
}));

//Handel Login Logic
router.post("/login", connectEnsureLogin.ensureLoggedOut("/dashboard"), passport.authenticate("admin", {
  failureFlash: true,
  failureRedirect: "/login"
}), (req, res) => {   
  res.redirect("/dashboard"); 
});

//Admin: Dashboard Page
router.get("/dashboard", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/Dashboard");
}));

//Admin: Analytics Page
router.get("/analytics", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/Analytics");
}));

//Admin: Content Management Page
router.get("/content-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/ContentManagement");
}));

// Analysis : Analysis-Quizzes 
router.get("/web-analytics/quizzes", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  const data = await QuizModel.find().populate("logs").populate("results");  
  res.render("Admin/Analysis-Quizzes", { data });
}));

// Analysis : Analysis-Flag-Game 
router.get("/web-analytics/flag-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  const data = await CountryFlagGame.find().populate("logs").populate("results");
  res.render("Admin/Analysis-Flag-Game", { data });
}));

 
//Admin: Result Management Page
router.get("/result-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/ResultManagement");
}));

//Admin: User Management Page
router.get("/user-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/UserManagement");
}));

//Logout
router.get('/logout', connectEnsureLogin.ensureLoggedIn("/"), function(req, res, next) { 
  req.logout(function (err){
    if (err) { return next(err); }
    res.redirect('/');
  });
});


export default router;