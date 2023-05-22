import express, { Router } from "express";
const router = Router();
import passport from "passport"; 
import asyncHandler from "express-async-handler";   
import QuizModel from "../../models/test.js";  
import CountryFlagGame from "../../models/guessCountryGame.js"; 
import connectEnsureLogin from "connect-ensure-login"; 


// Analysis : Analysis-Quizzes 
router.get("/quizzes", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  try {
    const data = await QuizModel.find().populate("logs").populate("results");  
    res.render("Admin/WebAnalytics/Test-Analytics", { data, title: "Test-Analytics" });
  } catch (error) {
    return next(error.message);
  }
}));
  
// Analysis : Analysis-Flag-Game 
router.get("/guess-flag-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  try {
    const data = await CountryFlagGame.find().populate("logs").populate("results");
    res.render("Admin/WebAnalytics/FlagGame-Analytics", { data, title: "FlagGame-Analytics" });
  } catch (error) {
    return next(error.message);
  }
}));

export default router;
