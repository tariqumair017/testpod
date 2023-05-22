import express, { Router } from "express";
const router = Router();   
import CountryFlagGame from "../../models/guessCountryGame.js"; 
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";   

//Client Guess-Country page
router.get("/guess-country/regions", asyncHandler(async (req, res, next) => {  
//=== IP Address (Can get only When Site is deployed) ====//  
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
    // if (ip.substr(0, 7) == "::ffff:") {
    // ip = ip.substr(7)
    // }
//=== This is a Package to detect IP Address ====//  
    // const ClientIP = await ipify({useIPv6: false});
    // console.log(ClientIP);
//=== Fetch Location through IP Address ====//
    // const response = await fetch(`http://ipwho.is/${ip}`);
    // const location = await response.json();   
    

   try {
    const DBcontinent = await CountryFlagGame.distinct("region");  

    var final = [];
    for (let i = 0; i < DBcontinent.length; i++) { 
       final.push(await CountryFlagGame.findOne({region: DBcontinent[i]}));
    }

    res.render("Client/GuessCountryGame/GuessCountryRegion", { data: final, title: "Regions" });
   } catch (error) {
      return next(error.message);
   }
     
}));

//Client fetch All Games for Select-CountryFlag-Game
router.get("/game/all/:region/:level", asyncHandler(async (req, res, next) => {  
  try {
    const currentLevel = Number(req.params.level);
    const data = await CountryFlagGame.findOne({region: req.params.region, level: currentLevel});
    res.send(data);
  } catch (error) {
    return next(error.message);
  }
}));

//Client Guess-Country by id page
router.get("/guess-country/:region/:level", asyncHandler(async (req, res, next) => { 
    try {
      req.session.newResultIDForGame = undefined;  
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
    const data = await CountryFlagGame.findOne({region: currentRegion, level: currentLevel});
    if(!data)
    { 
      if(currentLevel > 3)
      {
        return res.redirect("/guess-country/regions");
      }

      if (currentLevel == 0) {
        return res.redirect(`/guess-country/${req.params.region}/normal`);
      } else if(currentLevel == 1) {
        return res.redirect(`/guess-country/${req.params.region}/hard`);
      } else if(currentLevel == 2) {
        return res.redirect(`/guess-country/${req.params.region}/extreme`);
      } else if(currentLevel == 3) {
        return res.redirect("/guess-country/regions");
      } 
    }

    res.render("Client/GuessCountryGame/GuessCountryGame", { data, title: "Guess Country Game" });
    } catch (error) {
      return next(error.message);
    }
}));



export default router;
