import express, { Router } from "express";
const router = Router();  
import path from "path";  
import asyncHandler from "express-async-handler";  




//Client: Flag Quest Flag Page 
router.get("/flag-quest-game", asyncHandler(async (req, res, next) => {
    res.render("Client/FlagQuestGames/FlagQuestGame");
}));


//Client: Flag Quest Flag Regions  Page 
router.get("/flag-quest-regions", asyncHandler(async (req, res, next) => {
    res.render("Client/FlagQuestGames/FlagQuestGameRegions");
}));


export default router