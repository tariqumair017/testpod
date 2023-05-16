import express, { Router } from "express";
const router = Router();
import passport from "passport"; 
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login"; 

// Sign Up 
// router.get("/admin/sign-up", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
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
router.get("/login", connectEnsureLogin.ensureLoggedOut("/admin/dashboard"), asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/Login");
}));

//Handel Login Logic
router.post("/login", connectEnsureLogin.ensureLoggedOut("/admin/dashboard"), passport.authenticate("admin", {
  failureFlash: true,
  failureRedirect: "/login"
}), (req, res) => {  
  res.redirect("/admin/dashboard"); 
});

//Admin: Dashboard Page
router.get("/admin/dashboard", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/Dashboard", {title: "Admin-Dashboard"});
}));

//Admin: Content Management Page
router.get("/admin/content-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/ContentManagement", {title: "Content-Management"});
}));
 
//Admin: Result Management Page
router.get("/admin/result-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/ResultManagement", {title: "Result-Management"});
}));

//Admin: User Management Page
router.get("/admin/user-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  res.render("Admin/index/UserManagement", {title: "User-Management"});
}));

//Admin: Analytics Page
router.get("/admin/analytics", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
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