import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import CountryFlagGame from "../../models/guessCountryGame.js"; 
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login"; 

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
    const data = await CountryFlagGame.findOne({region: req.params.region, level: req.params.level});
    res.send(data);
}));

//Client Guess-Country by id page
router.get("/guess-country/:name/:region/game", asyncHandler(async (req, res, next) => { 
    req.session.newResultIDForGame = undefined; 

    const EasyLevel = await CountryFlagGame.findOne({region: req.params.region, level: "Easy"});
  if(EasyLevel)
  { 
    res.render("Client/GuessCountryGame/"+req.params.name, {data: EasyLevel});
  }
  else
  {
    const normalLevel = await CountryFlagGame.findOne({region: req.params.region, level: "Normal"});
    if(normalLevel)
    { 
      res.render("Client/GuessCountryGame/"+req.params.name, {data: normalLevel});
    }
    else
    {
      const HardLevel = await CountryFlagGame.findOne({region: req.params.region, level: "Hard"});
      if(HardLevel)
      { 
        res.render("Client/GuessCountryGame/"+req.params.name, {data: HardLevel});
      }
      else
      {
        const extremeLevel = await CountryFlagGame.findOne({region: req.params.region, level: "Extreme"});
        if(extremeLevel)
        {
          res.render("Client/GuessCountryGame/"+req.params.name, {data: extremeLevel});
        }
        else
        {
          res.redirect("/guess-country");
        }
      }
    }
  }
}));



export default router;
