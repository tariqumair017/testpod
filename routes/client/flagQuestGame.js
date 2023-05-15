import express, { Router } from "express";
const router = Router();   
import FlagQuestGame from "../../models/flagQuestGame.js";
import asyncHandler from "express-async-handler";  


//Client: Guess Flag Regions  Page 
router.get("/flag-quest-regions", asyncHandler(async (req, res, next) => {

    const DBcontinent = await FlagQuestGame.distinct("region"); 
    var final = [];
    for (let i = 0; i < DBcontinent.length; i++) { 
       final.push(await FlagQuestGame.findOne({region: DBcontinent[i]}));
    } 
    res.render("Client/FlagQuestGames/FlagQuestGameRegions", { data: final, title: "Regions" });
}));

//Client:  fetch All Guess Flage Data for Guess-Flag
// router.get("/guess-flag-game/:region/:level", asyncHandler(async (req, res, next) => {  
//     const currentLevel = Number(req.params.level);
//     const data = await FlagQuestGame.find({region: req.params.region, level: currentLevel});
//     res.send(data);
// }));

//Client GuessFlags
router.get("/flag-quest-regions/:region/game/:level", asyncHandler(async (req, res, next) => { 
  var currentLevel = Number(req.params.level);

  if (isNaN(currentLevel)) {
    return res.redirect(`/flag-quest-regions/${req.params.region}/game/0`);
  } 

  const data = await FlagQuestGame.findOne({region: req.params.region, level: currentLevel});

  if(!data)
  { 
    if(currentLevel > 3 || currentLevel < 0)
    {
      return res.redirect("/flag-quest-regions");
    }
    return res.redirect(`/flag-quest-regions/${req.params.region}/game/${currentLevel + 1}`);
  }
    
    res.render("Client/FlagQuestGames/FlagQuestGame", { data, title: "Flag-Quest-Game" });
}));


export default router