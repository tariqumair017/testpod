import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import CountryFlagGame from "../../models/guessCountryGame.js"; 
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";   

//Client Guess-Country page
router.get("/guess-country", asyncHandler(async (req, res, next) => {  
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
    

    const DBcontinent = await CountryFlagGame.distinct("region");  

    var final = [];
    for (let i = 0; i < DBcontinent.length; i++) { 
       final.push(await CountryFlagGame.findOne({region: DBcontinent[i]}));
    }

    res.render("Client/GuessCountryGame/Guess-Country", { data: final });
     
}));

//Client fetch All Games for Select-CountryFlag-Game
router.get("/game/all/:region/:level", asyncHandler(async (req, res, next) => {  
  const currentLevel = Number(req.params.level);
  const data = await CountryFlagGame.findOne({region: req.params.region, level: currentLevel});
  res.send(data);
}));

//Client Guess-Country by id page
router.get("/guess-country/:name/:region/game/:level", asyncHandler(async (req, res, next) => { 
    req.session.newResultIDForGame = undefined; 
    var currentLevel = Number(req.params.level);

  const data = await CountryFlagGame.findOne({region: req.params.region, level: currentLevel});
  if(!data)
  { 
    if(currentLevel > 3)
    {
      return res.redirect("/guess-country");
    }
    return res.redirect(`/guess-country/${req.params.name}/${req.params.region}/game/${currentLevel + 1}`);
  }

  res.render("Client/GuessCountryGame/"+req.params.name, { data });

}));



export default router;
