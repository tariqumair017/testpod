import express, { Router } from "express";
const router = Router();
import passport from "passport"; 
import asyncHandler from "express-async-handler";  
import QuizModel from "../models/quizs.js";  
import connectEnsureLogin from "connect-ensure-login";
import { Console } from "console";

// Sign Up 
// router.get("/sign-up", asyncHandler(async (req, res) => { 
//   res.render("Admin/SignUp");
// }));

//Handel Sign Up Logic
// router.post('/sign-up', asyncHandler(async function(req, res, next) {  
//     const newAdmin = new Admin({username: req.body.username, password: req.body.password, name: req.body.name})
//     const salt = await bcryptjs.genSalt(10);
//     const hash = await bcryptjs.hash(newAdmin.password, salt); 
//     newAdmin.password = hash;
//     await newAdmin.save();
//     res.redirect("/login");
// }));

// Login Page 
router.get("/login", connectEnsureLogin.ensureLoggedOut("/dashboard"), asyncHandler(async (req, res) => { 
  res.render("Admin/Login");
}));

//Handel Login Logic
router.post("/login", connectEnsureLogin.ensureLoggedOut("/dashboard"), passport.authenticate("Admin", {
  failureRedirect: "/login",
  failureFlash: true,
}),(req, res) => {   
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

//Admin: Blog Management Page
router.get("/blogs-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/BlogsManagement");
}));

//Admin: Content Management Page
router.get("/content-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/ContentManagement");
}));

// Analysis : Analysis-Quizzes 
router.get("/web-analytics/quizzes", asyncHandler(async (req, res) => { 
  const data = await QuizModel.find().populate("logs"); 
  res.render("Admin/Analysis-Quizzes", { data });
}));

// Analysis : Analysis-Flag-Game 
router.get("/web-analytics/flag-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/Analysis-Flag-Game");
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
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


export default router;