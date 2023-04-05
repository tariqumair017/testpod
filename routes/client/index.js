import express, { Router } from "express";
const router = Router(); 
import QuizModel from "../../models/test.js";
import CountryFlagGame from "../../models/guessCountryGame.js"; 
import DrawFlagGameModel from "../../models/drawFlagGame.js";
import GuessFlagGame from "../../models/guessFlagGame.js";
import asyncHandler from "express-async-handler";   
 

//Client Index page
router.get("/", asyncHandler(async (req, res, next) => { 
    const data = await CountryFlagGame.find({}); 
    res.render("Client/index/index", {data});
}));

//Client About page
router.get("/about", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/About");
}));

//Client Blog-Details page
router.get("/blog-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Blog-Details");
}));
 
//Client Blog page
router.get("/blog", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Blog");
}));

//Client Contact page
router.get("/contact", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Contact");
}));

//Client Courses-Details page
router.get("/courses-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Courses-Details");
}));

//Client Courses page
router.get("/courses", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Courses");
}));

//Client FAQ page
router.get("/faq", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/FAQ");
}));

//Client Pricing page
router.get("/pricing", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Pricing");
}));

//Client Services-Details page
router.get("/services-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Services-Details");
}));

//Client Services page
router.get("/services", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Services");
}));

//Client Shop-Details page
router.get("/shop-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Shop-Details");
}));

//Client Shop page
router.get("/shop", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Shop");
}));

//Client Team-Details page
router.get("/team-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Team-Details");
}));

//Client Team page
router.get("/team", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Team");
}));

//Client Team page
router.get("/thank-you", asyncHandler(async (req, res, next) => {  
    res.render("Client/index/Thank-You");
}));



export default router;