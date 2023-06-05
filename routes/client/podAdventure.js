import express, { Router } from "express";
const router = Router();
import GuessFlagGame from "../../models/guessFlagGame.js"
import asyncHandler from "express-async-handler";




//Client pod-adtenture
router.get("/pod-adtenture", asyncHandler(async (req, res, next) => {
    try {
        const DBcontinent = await GuessFlagGame.distinct("region");
        var final = [];
        for (let i = 0; i < DBcontinent.length; i++) {
            final.push(await GuessFlagGame.findOne({ region: DBcontinent[i] }));
        }
        res.render("Client/PodAdventure/PodAdventureGame",{data: final, title: "Regions"});
    } catch (error) {
        return next(error.message);
    }
}));


export default router;
