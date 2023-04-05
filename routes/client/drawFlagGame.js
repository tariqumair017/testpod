import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import DrawFlagGameModel from "../../models/drawFlagGame.js";
import DrawNewFlagModel from "../../models/drawNewFlag.js";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login"; 
  


//Client fetch All Flages for Draw-Flag
router.get("/draw-flags/all", asyncHandler(async (req, res, next) => {  
    const data = await DrawFlagGameModel.find({});
    res.send(data);
}));

//Client Draw Flag
router.get("/draw-flags", asyncHandler(async (req, res, next) => { 
    const data = await DrawFlagGameModel.find({})
    res.render("Client/DrawFlagGame/Draw-Flags",{data});
}));
 


export default router;
