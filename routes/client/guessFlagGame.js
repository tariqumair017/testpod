import express, { Router } from "express";
const router = Router();  
import path from "path";  
import GuessFlagGame from "../../models/guessFlagGame.js"; 
import asyncHandler from "express-async-handler";  


//Client: Guess Flag Regions  Page 
router.get("/guess-flag-regions", asyncHandler(async (req, res, next) => {

    const DBcontinent = await GuessFlagGame.distinct("region"); 
    var final = [];
    for (let i = 0; i < DBcontinent.length; i++) { 
       final.push(await GuessFlagGame.findOne({region: DBcontinent[i]}));
    }
  
    res.render("Client/GuessFlagGame/GuessFlagRegions", { data: final });
}));

//Client:  fetch All Guess Flage Data for Guess-Flag
router.get("/guess-flag-game/:region/:level", asyncHandler(async (req, res, next) => {  
    const currentLevel = Number(req.params.level);
    const data = await GuessFlagGame.find({region: req.params.region, level: currentLevel});
    res.send(data);
}));

//Client GuessFlags
router.get("/guess-flag-regions/:region/game/:level", asyncHandler(async (req, res, next) => { 
  var currentLevel = Number(req.params.level);

  if (isNaN(currentLevel)) {
    return res.redirect(`/guess-flag-regions/${req.params.region}/game/0`);
  } 

  const data = await GuessFlagGame.findOne({region: req.params.region, level: currentLevel});

  if(!data)
  { 
    if(currentLevel > 3 || currentLevel < 0)
    {
      return res.redirect("/guess-flag-regions");
    }
    return res.redirect(`/guess-flag-regions/${req.params.region}/game/${currentLevel + 1}`);
  }
   
    
    res.render("Client/GuessFlagGame/GuessFlagGame", { data });
}));



export default router;