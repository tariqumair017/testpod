
import express, { Router } from "express";
const router = Router(); 
import FlagPuzzleGame from "../../models/flagPuzzleGame.js";
import asyncHandler from "express-async-handler";  
 


//Client: Flag Puzzle Regions  Page 
router.get("/flag-puzzle/regions", asyncHandler(async (req, res, next) => {
  try {
    const DBcontinent = await FlagPuzzleGame.distinct("region"); 
    var final = [];
    for (let i = 0; i < DBcontinent.length; i++) { 
       final.push(await FlagPuzzleGame.findOne({region: DBcontinent[i]}));
    }
  
    res.render("Client/FlagPuzzleGame/PuzzleFlagRegions", { data: final, title: "Regions" });
  } catch (error) {
    return next(error.message);
  }
}));


// //Client:  fetch All Guess Flage Data for Guess-Flag
// router.get("/flag-puzzle-regions/:region/:level", asyncHandler(async (req, res, next) => {  
//     const currentLevel = Number(req.params.level);
//     const data = await FlagPuzzleGame.find({region: req.params.region, level: currentLevel});
//     res.send(data);
// }));

//Client Puzzle Flag
router.get("/flag-puzzle/:region/:level", asyncHandler(async (req, res, next) => { 
    try {
      var currentLevel;

      if(req.params.level == 'easy')
      {currentLevel = 0}
      else if(req.params.level == 'normal')
      {currentLevel = 1}
      else if(req.params.level == 'hard')
      {currentLevel = 2}
      else if(req.params.level == 'extreme')
      {currentLevel = 3} 
      else
      {currentLevel = 4}
    
      const currentRegion = req.params.region.charAt(0).toUpperCase() + req.params.region.slice(1);
      const data = await FlagPuzzleGame.findOne({region: currentRegion, level: currentLevel});
    
      if(!data)
      { 
        if(currentLevel > 3)
        {
          return res.redirect("/flag-puzzle/regions");
        }
    
        if (currentLevel == 0) {
          return res.redirect(`/flag-puzzle/${req.params.region}/normal`); 
        } else if(currentLevel == 1) {
          return res.redirect(`/flag-puzzle/${req.params.region}/hard`); 
        } else if(currentLevel == 2) {
          return res.redirect(`/flag-puzzle/${req.params.region}/extreme`);  
        } else if(currentLevel == 3) {
          return res.redirect("/flag-puzzle/regions");
        } 
      }  
      
      res.render("Client/FlagPuzzleGame/FlagPuzzle", { data, title: "Flag Puzzle Game" });
    } catch (error) {
      return next(error.message);
    }
}));





export default router;