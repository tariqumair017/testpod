import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import CountryFlagGame from "../../models/guessCountryGame.js";
import ipify from "ipify";
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login"; 

//Client fetch All Games for Select-CountryFlag-Game
router.get("/game/all/:id", asyncHandler(async (req, res, next) => {  
    const data = await CountryFlagGame.findById(req.params.id);
    if(!data)
    {
        req.flash("error", "Cannot find that Game!");
        return res.redirect("/guess-country");
    }
    res.send(data);
}));


//Client Guess-Country page
router.get("/guess-country", asyncHandler(async (req, res, next) => {  

    const ClientIP = await ipify({useIPv6: false});
     console.log(ClientIP);
    const response = await fetch(`http://ipwho.is/${ClientIP}`);
    const location = await response.json();   
    
    const data = await CountryFlagGame.find({});  
    const releventData = data.filter(x => location.continent.includes(x.region))
    
    res.render("Client/GuessCountryGame/Guess-Country", {data: releventData});
}));

//Client Guess-Country by id page
router.get("/guess-country/:name/:id", asyncHandler(async (req, res, next) => { 
    req.session.newResultIDForGame = undefined;
    const data = await CountryFlagGame.findById(req.params.id); 
    if(!data)
    {
        req.flash("error", "Cannot find that Game!");
        return res.redirect("/guess-country");
    }
    res.render("Client/GuessCountryGame/"+req.params.name, { data });
}));



export default router;
