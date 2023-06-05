import express, { Router } from "express";
const router = Router();
import GuessFlagGame from "../../models/guessFlagGame.js";
import PodAdventureGame from "../../models/podAdventure.js";
import asyncHandler from "express-async-handler";



//Client pod-adtenture
router.get("/pod-adtenture", asyncHandler(async (req, res, next) => {
    try {
        const data = await PodAdventureGame.find({}); 
        res.render("Client/PodAdventure/PodAdventureGame",{data, title: "Pod Adventure Game"});
    } catch (error) {
        return next(error.message);
    }
}));


export default router;
