import express, { Router } from "express";
const router = Router();
import User from "../../models/user.js";
import passport from "passport"; 
import asyncHandler from "express-async-handler";   
import middleware from "../../middleware/index.js";
import connectEnsureLogin from "connect-ensure-login";


// Sign Up 
router.get("/sign-up", asyncHandler(async (req, res, next) => { 
    res.render("Client/UserManagement/SignUp");
}));
  
//Handel Sign Up Logic
router.post('/sign-up', asyncHandler(async (req, res, next) => {  
    try {
        if(req.body.password != req.body.confirmPassword)
        {
            req.flash("error", "Password and Confirm Password not matched!");
            return res.redirect("/sign-up");
        }

        if(req.body.password.length < 6)
        {
            req.flash("error", "Password must be 6 Character!");
            return res.redirect("/sign-up");
        }

        const newUser = new User(req.body);
        const registeredUser = await User.register(newUser, req.body.password); 
        res.redirect("/login");
    } catch (error) { 
    req.flash("error", error.message);
    return res.redirect("/sign-up");
    }
}));
  
// Login Page 
router.get("/login", connectEnsureLogin.ensureLoggedOut("/"), asyncHandler(async (req, res, next) => { 
    res.render("Client/UserManagement/Login");
}));
 
//Handel Login Logic
router.post("/login", connectEnsureLogin.ensureLoggedOut("/"), passport.authenticate("user", {
    failureFlash: true,
    failureRedirect: "/login"
  }), (req, res) => {   
    res.redirect("/"); 
});


// Profile Page
router.get("/profile", middleware.isUserLoggedin, asyncHandler(async (req, res, next) => {
    const data = await User.findById(req.user._id);
    res.render("Client/UserManagement/Profile", { data });
}));

// Edit Profile Page
router.put("/profile/:id", middleware.isUserLoggedin, asyncHandler(async (req, res, next) => {
    const { id } = req.params; 
    await User.findByIdAndUpdate(id, { ...req.body.data }, {new: true}); 
    console.log("Profile Updated Successfully!");
    // req.flash("success", "Profile Updated!");
    res.redirect("/profile");
}));

// Edit Profile Image
router.put("/profile/profileImage/:id", middleware.isUserLoggedin, asyncHandler(async (req, res, next) => {
    const { id } = req.params; 
    const { profileImg } = req.body;
    console.log(id);
    console.log(req.files);  
    // await User.findByIdAndUpdate(id, { ...req.body.data }, {new: true}); 
    // console.log("Profile Updated Successfully!");
    // req.flash("success", "Profile Updated!");
    // res.redirect("/profile");
}));

//Logput
router.post('/logout', connectEnsureLogin.ensureLoggedIn("/"), function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
});


export default router;