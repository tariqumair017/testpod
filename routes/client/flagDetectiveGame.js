import express, { Router } from "express";
const router = Router(); 
import FlagDetectiveGame from "../../models/flagDetectiveGame.js";  
import asyncHandler from "express-async-handler"; 

//Client: Flag Detective Regions  Page 
router.get("/flag-detective/regions", asyncHandler(async (req, res, next) => {

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
     const data = await FlagDetectiveGame.findOne({continent: DBcontinent[i]});
     final.push(data);
  }

  res.render("Client/FlagDetectiveGame/FlagDetectiveRegions", { data: final, title: "Regions" });

}));

//Client: Flag Detective Game Data Api
router.get("/flag-detective-game/:continent/:level", asyncHandler(async (req, res, next) => {
  const currentLevel = Number(req.params.level);
  const data = await FlagDetectiveGame.findOne({continent: req.params.continent, level: currentLevel});
  res.send(data);
}));

//Client: Flag Detective Regions Page 
router.get("/flag-detective/:continent/:level",  asyncHandler(async (req, res) => { 
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

  const currentRegion = req.params.continent.charAt(0).toUpperCase() + req.params.continent.slice(1);
  const data = await FlagDetectiveGame.findOne({continent: currentRegion, level: currentLevel});

  if(!data)
  { 
    if(currentLevel > 3)
    {
      return res.redirect("/flag-detective/regions");
    }

    if (currentLevel == 0) {
      return res.redirect(`/flag-detective/${req.params.continent}/normal`); 
    } else if(currentLevel == 1) {
      return res.redirect(`/flag-detective/${req.params.continent}/hard`);  
    } else if(currentLevel == 2) {
      return res.redirect(`/flag-detective/${req.params.continent}/extreme`);  
    } else if(currentLevel == 3) {
      return res.redirect("/flag-detective/regions");
    } 
  }
  
  res.render("Client/FlagDetectiveGame/FlagDetectiveGame", { data, title: "Flag-Detective-Game" });
}));


export default router;
