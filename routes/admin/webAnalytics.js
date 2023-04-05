import express, { Router } from "express";
const router = Router();
import passport from "passport"; 
import asyncHandler from "express-async-handler";   
import QuizModel from "../../models/test.js";  
import CountryFlagGame from "../../models/guessCountryGame.js"; 
import connectEnsureLogin from "connect-ensure-login"; 


// Analysis : Analysis-Quizzes 
router.get("/quizzes", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await QuizModel.find().populate("logs").populate("results");  
    res.render("Admin/WebAnalytics/Test-Analytics", { data });
  }));
  
  // Analysis : Analysis-Flag-Game 
  router.get("/guess-flag-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await CountryFlagGame.find().populate("logs").populate("results");
    res.render("Admin/WebAnalytics/FlagGame-Analytics", { data });
  }));

export default router;
