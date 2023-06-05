import express, { Router } from "express";
const router = Router();
import path from "path";
import GuessFlagGame from "../../models/guessFlagGame.js";
import asyncHandler from "express-async-handler";


//Client: Guess Flag Regions  Page 
router.get("/guess-flag/regions", asyncHandler(async (req, res, next) => {
  try {
    const DBcontinent = await GuessFlagGame.distinct("region");
    var final = [];
    for (let i = 0; i < DBcontinent.length; i++) {
      final.push(await GuessFlagGame.findOne({ region: DBcontinent[i] }));
    }

    res.render("Client/GuessFlagGame/GuessFlagRegions", { data: final, title: "Regions" });
  } catch (error) {
    return next(error.message);
  }
}));

//Client:  fetch All Guess Flage Data for Guess-Flag
router.get("/guess-flag-game/:region/:level", asyncHandler(async (req, res, next) => {
  try {
    const currentLevel = Number(req.params.level);
    const data = await GuessFlagGame.find({ region: req.params.region, level: currentLevel });
    res.send(data);
  } catch (error) {
    return next(error.message);
  }
}));

//Client GuessFlags
router.get("/guess-flag/:region/:level", asyncHandler(async (req, res, next) => {
  try {
    var currentLevel;

    if (req.params.level == 'easy') { currentLevel = 0 }
    else if (req.params.level == 'normal') { currentLevel = 1 }
    else if (req.params.level == 'hard') { currentLevel = 2 }
    else if (req.params.level == 'extreme') { currentLevel = 3 }
    else { currentLevel = 4 }

    const currentRegion = req.params.region.charAt(0).toUpperCase() + req.params.region.slice(1);
    const data = await GuessFlagGame.findOne({ region: currentRegion, level: currentLevel });

    if (!data) {
      if (currentLevel > 3) {
        return res.redirect("/guess-flag/regions");
      }

      if (currentLevel == 0) {
        return res.redirect(`/guess-flag/${req.params.region}/normal`);
      } else if (currentLevel == 1) {
        return res.redirect(`/guess-flag/${req.params.region}/hard`);
      } else if (currentLevel == 2) {
        return res.redirect(`/guess-flag/${req.params.region}/extreme`);
      } else if (currentLevel == 3) {
        return res.redirect("/guess-flag/regions");
      }
    }

    res.render("Client/GuessFlagGame/GuessFlagGame", { data, title: "Guess Flag Game" });
  } catch (error) {
    return next(error.message);
  }
}));



export default router;