import express, { Router } from "express";
const router = Router();
import passport from "passport";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login";
 
router.get("/", (req, res) => { 
    res.render("Landing");
});   

//Handel Sign Up Logic
// router.post('/register', asyncHandler(async function(req, res, next) {  
//     const newUser = new User({username: req.body.username, password: req.body.password, name: req.body.name})
//     const salt = await bcryptjs.genSalt(10);
//     const hash = await bcryptjs.hash(newUser.password, salt); 
//     newUser.password = hash;
//     await newUser.save();
//     res.redirect("/login");
// }));
 
router.get("/login", connectEnsureLogin.ensureLoggedOut("/"), (req, res) => {
    res.render("Login");
});

//Handel Login Logic
router.post("/login", connectEnsureLogin.ensureLoggedOut("/"), passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),(req, res) => {   
    res.redirect("/"); 
});

router.post('/logout', connectEnsureLogin.ensureLoggedIn("/"), function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});


export default router;
