import express, { Router } from "express";
const router = Router();
import User from "../../models/user.js";
import passport from "passport"; 
import AWS from "aws-sdk";
import asyncHandler from "express-async-handler";   
import middleware from "../../middleware/index.js";
import connectEnsureLogin from "connect-ensure-login";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }); 

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
  }), middleware.isUserLoggedin, (req, res) => {   
    res.redirect("/"); 
});


// Profile Page
router.get("/profile", middleware.isUserLoggedin, asyncHandler(async (req, res, next) => {
    const data = await User.findById(req.user._id);
    res.render("Client/UserManagement/Profile", { data });
}));

// Edit Profile Page
router.put("/profile/:id", middleware.isUserLoggedin, asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params; 
        const currentUser = await User.findByIdAndUpdate(id, { ...req.body.data }, {new: true}); 
        req.user.name = currentUser.name;
        console.log("Profile Updated Successfully!");
        // req.flash("success", "Profile Updated!");
        res.redirect("/profile");
    } catch (error) {
        console.log(error.message);
        // req.flash("error", error.message);
        return res.redirect("/profile");
    }
}));

// Edit Profile Image
router.put("/profile/profileImage/:id", middleware.isUserLoggedin, asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;    
        await s3.upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `profileImg/${req.files.profileImg.name}`,
          Body: req.files.profileImg.data,
          ContentType: req.files.profileImg.mimetype,
          ACL: 'public-read'
        }).promise().then( async (data) => { 
            const currentUser = await User.findByIdAndUpdate(id, {profileImg: data.Location}, {new: true}); 
            req.user.profileImg = currentUser.profileImg;
            console.log("Profile Picture Updated Successfully!");
            // req.flash("success", "Profile Updated!");
            res.redirect("/profile");
        });
      } catch (error) {
        console.log(error.message);
        return res.redirect("/profile");
      }
}));

// Change Password
router.post("/profile/changepassword/:id", middleware.isUserLoggedin, asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;   
        const { oldPass, newPass, confirmPass } = req.body;  
        if(newPass != confirmPass)
        {
           console.log("Password and Confirm Password not matched!");
            // req.flash("error", "Password and Confirm Password not matched!");
            return res.redirect("/profile");
        }

        if(newPass.length < 6)
        {
            console.log("Password must be 6 Character!");
            // req.flash("error", "Password must be 6 Character!");
            return res.redirect("/profile");
        }
        const user = await User.findById(id); 
        await user.changePassword(oldPass, newPass); 
        console.log("Password Changed Successfully!");
        res.redirect("/profile"); 
      } catch (error) {
        console.log(error.message);
        return res.redirect("/profile");
      }
}));

//Logput
router.post('/logout', connectEnsureLogin.ensureLoggedIn("/"), function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
});


export default router;