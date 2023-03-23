import express, { Router } from "express";
const router = Router(); 
import QuizModel from "../models/quizs.js";
import CountryFlagGame from "../models/selectCountryFlagGame.js"; 
import DrawFlagGameModel from "../models/drawFlagGame.js";
import asyncHandler from "express-async-handler";  


//Admin Create-Guess-Flag page
router.get("/game-management/create-guess-flag-game", asyncHandler(async (req, res) => { 
    res.render("Admin/AddGuessFlagsGame");
}));

//Admin Manage-Guess-Flag page
router.get("/game-management/manage-guess-flag-game", asyncHandler(async (req, res) => { 
    res.render("Admin/ManageGuessFlagGame");
}));

//Admin Leavel-Guess-Flag page
router.get("/game-management/all-guess-flag-game", asyncHandler(async (req, res) => { 
    res.render("Admin/AllGuessFlagsGames");
}));


export default router;