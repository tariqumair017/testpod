import express, { Router } from "express";
const router = Router();  
import DrawFlagGameModel from "../../models/drawFlagGame.js"; 
import asyncHandler from "express-async-handler";   
  


//Client fetch All Flages for Draw-Flag
router.get("/draw-flags/all", asyncHandler(async (req, res, next) => { 
    try {
        const data = await DrawFlagGameModel.find({});
        res.send(data);
    } catch (error) {
        return next(error.message); 
    } 
}));

//Client Draw Flag
router.get("/draw-flags", asyncHandler(async (req, res, next) => { 
    try {
        const data = await DrawFlagGameModel.find({})
        res.render("Client/DrawFlagGame/Draw-Flags",{data, title: "Draw Flag Game"});
    } catch (error) {
        return next(error.message);
    }
}));
 


export default router;
