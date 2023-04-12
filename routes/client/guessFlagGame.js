import express, { Router } from "express";
const router = Router();  
import path from "path";  
import GuessFlagGame from "../../models/guessFlagGame.js";
import connectEnsureLogin from "connect-ensure-login";
import asyncHandler from "express-async-handler";  


//Client GuessFlags
router.get("/guess-flags", asyncHandler(async (req, res, next) => { 
    res.render("Client/GuessFlagGame/Guess-Flags");
}));

//Client:  fetch All Guess Flage Data for Guess-Flag
router.get("/game-management/guess-flags/all", asyncHandler(async (req, res, next) => {  
    const data = await GuessFlagGame.find({});
    res.send(data);
}));

export default router;