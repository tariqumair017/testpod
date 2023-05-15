
import express, { Router } from "express";
const router = Router(); 
import FlagPuzzleGame from "../../models/flagPuzzleGame.js";
import asyncHandler from "express-async-handler";  
 


//Client: Flag Puzzle Regions  Page 
router.get("/flag-puzzle-regions", asyncHandler(async (req, res, next) => {

    const DBcontinent = await FlagPuzzleGame.distinct("region"); 
    var final = [];
    for (let i = 0; i < DBcontinent.length; i++) { 
       final.push(await FlagPuzzleGame.findOne({region: DBcontinent[i]}));
    }
  
    res.render("Client/FlagPuzzleGame/PuzzleFlagRegions", { data: final, title: "Regions" });
}));


// //Client:  fetch All Guess Flage Data for Guess-Flag
// router.get("/flag-puzzle-regions/:region/:level", asyncHandler(async (req, res, next) => {  
//     const currentLevel = Number(req.params.level);
//     const data = await FlagPuzzleGame.find({region: req.params.region, level: currentLevel});
//     res.send(data);
// }));

//Client Puzzle Flag
router.get("/flag-puzzle-regions/:region/game/:level", asyncHandler(async (req, res, next) => { 
  var currentLevel = Number(req.params.level);

  if (isNaN(currentLevel)) {
    return res.redirect(`/flag-puzzle-regions/${req.params.region}/game/0`);
  } 

  const data = await FlagPuzzleGame.findOne({region: req.params.region, level: currentLevel});

  if(!data)
  { 
    if(currentLevel > 3 || currentLevel < 0)
    {
      return res.redirect("/flag-puzzle-regions");
    }
    return res.redirect(`/flag-puzzle-regions/${req.params.region}/game/${currentLevel + 1}`);
  }
   
    
    res.render("Client/FlagPuzzleGame/FlagPuzzle", { data, title: "Flag-Puzzle-Game" });
}));





export default router;