import express, { Router } from "express";
const router = Router(); 
import QuizModel from "../../models/test.js";
import CountryFlagGame from "../../models/guessCountryGame.js"; 
import DrawFlagGameModel from "../../models/drawFlagGame.js";
import GuessFlagGame from "../../models/guessFlagGame.js";
import asyncHandler from "express-async-handler"; 


//Client Learn-About-Flags
router.get("/learn-about-flags", asyncHandler(async (req, res, next) => { 
    res.render("Client/LearnFlagGame/Learn-About-Flags", {title: "Learn About Flags"});
}));


export default router;
