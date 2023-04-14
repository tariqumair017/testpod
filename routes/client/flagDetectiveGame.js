import express, { Router } from "express";
const router = Router(); 
import FlagDetectiveGame from "../../models/flagDetectiveGame.js"; 
import connectEnsureLogin from "connect-ensure-login"; 
import asyncHandler from "express-async-handler"; 

//Client: Flag Detective Regions  Page 
router.get("/flag-detective-regions", asyncHandler(async (req, res, next) => {

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
   
  const DBcontinent = await FlagDetectiveGame.distinct("continent"); 
  
  var final = [];
  for (let i = 0; i < DBcontinent.length; i++) { 
     final.push(await FlagDetectiveGame.findOne({continent: DBcontinent[i]}));
  }

  res.render("Client/FlagDetectiveGame/FlagDetectiveRegions", { data: final });

}));

//Client: Flag Detective Game Data Api
router.get("/flag-detective-game/:continent/:level", asyncHandler(async (req, res, next) => {
  const data = await FlagDetectiveGame.findOne({continent: req.params.continent, level: req.params.level});
  res.send(data);
}));

//Client: Flag Detective Regions Page 
router.get("/flag-detective-regions/:continent/game",  asyncHandler(async (req, res) => { 
  const lowLevel = await FlagDetectiveGame.findOne({continent: req.params.continent, level: "Easy"});
  if(lowLevel)
  { 
    res.render("Client/FlagDetectiveGame/FlagDetectiveGame", {data: lowLevel});
  }
  else
  {
    const mediumLevel = await FlagDetectiveGame.findOne({continent: req.params.continent, level: "Normal"});
    if(mediumLevel)
    { 
      res.render("Client/FlagDetectiveGame/FlagDetectiveGame", {data: mediumLevel});
    }
    else
    {
      const highLevel = await FlagDetectiveGame.findOne({continent: req.params.continent, level: "Hard"});
      if(highLevel)
      { 
        res.render("Client/FlagDetectiveGame/FlagDetectiveGame", {data: highLevel});
      }
      else
      {
        const extremeLevel = await FlagDetectiveGame.findOne({continent: req.params.continent, level: "Extreme"});
        if(extremeLevel)
        {
          res.render("Client/FlagDetectiveGame/FlagDetectiveGame", {data: extremeLevel});
        }
        else
        {
          res.redirect("/flag-detective-regions");
        }
      }
    }
  }
}));


export default router;
