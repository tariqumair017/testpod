import express, { Router } from "express";
const router = Router();
import path from "path";  
import FlagDetectiveGame from "../../models/flagDetectiveGame.js";
import connectEnsureLogin from "connect-ensure-login"; 
import asyncHandler from "express-async-handler"; 

//Client: Flag Detective Regions  Page 
router.get("/flag-detective-regions", asyncHandler(async (req, res, next) => {
  const flagDetective = [
    {
      continent: "Asia",
      level: "Low",
      continentImage: "Asia.svg",
    },
    {
      continent: "Antarctica",
      level: "Low",
      continentImage: "antarctica.svg",
    },
    {
      continent: "Africa",
      level: "Low",
      continentImage: "africa.svg",
    },
    {
      continent: "Europe",
      level: "Low",
      continentImage: "europe.svg",
    },
    {
      continent: "North america",
      level: "Low",
      continentImage: "northamerica.svg",
    },
    {
      continent: "South America",
      level: "Low",
      continentImage: "southamerica.svg",
    },
  ];
    res.render("Client/FlagDetectiveGame/FlagDetectiveRegions", { data: flagDetective });
}));

//Client: Flag Detective Regions  Page 
router.get("/flag-detective-game",  asyncHandler(async (req, res) => {
  res.render("Client/FlagDetectiveGame/FlagDetectiveGame");
}));


export default router;
