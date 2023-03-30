import express, { Router } from "express";
const router = Router(); 
import QuizModel from "../models/quizs.js";
import CountryFlagGame from "../models/selectCountryFlagGame.js"; 
import DrawFlagGameModel from "../models/drawFlagGame.js";
import GuessFlagGame from "../models/guessFlag.js";
import asyncHandler from "express-async-handler";   
 
//Client Index page
router.get("/", asyncHandler(async (req, res, next) => { 
    const data = await CountryFlagGame.find({}); 
    res.render("Client/index", {data});
}));

//Client Guess-Country page
router.get("/guess-country", asyncHandler(async (req, res, next) => { 
    const data = await CountryFlagGame.find({}); 
    res.render("Client/Guess-Country", {data});
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
    res.render("Client/"+req.params.name, { data });
}));

//Client GuessFlags
router.get("/guess-flags", asyncHandler(async (req, res, next) => { 
    res.render("Client/Guess-Flags");
}));

//Client:  fetch All Guess Flage Data for Guess-Flag
router.get("/game-management/guess-flags/all", asyncHandler(async (req, res, next) => {  
    const data = await GuessFlagGame.find({});
    res.send(data);
}));

//Client Learn-About-Flags
router.get("/learn-about-flags", asyncHandler(async (req, res, next) => { 
    res.render("Client/Learn-About-Flags");
}));

//Client fetch All Flages for Draw-Flag
router.get("/draw-flags/all", asyncHandler(async (req, res, next) => {  
    const data = await DrawFlagGameModel.find({});
    res.send(data);
}));
 

//Client Draw Flag
router.get("/draw-flags", asyncHandler(async (req, res, next) => { 
    const data = await DrawFlagGameModel.find({})
    res.render("Client/Draw-Flags",{data});
}));
 
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

//Client Select Country
// router.get("/game/:name/:id", asyncHandler(async (req, res, next) => { 
//     req.session.newResultIDForGame = undefined;
//     const data = await CountryFlagGame.findById(req.params.id); 
//     if(!data)
//     {
//         req.flash("error", "Cannot find that Game!");
//         return res.redirect("/guess-country");
//     }
//     console.log(data)
//     res.render("Client/"+req.params.name, { data });
// }));
   
//Client: All States Page
router.get("/test/states", asyncHandler(async (req, res, next) => { 
    const data = await QuizModel.distinct("stateName");  
    res.render("Client/States", { data }); 
}));


//Client Specific State Page
router.get("/test/states/:stateName", asyncHandler(async (req, res, next) => { 
    const data = await QuizModel.find({stateName: req.params.stateName});  
    if(!data)
    {
        req.flash("error", "Cannot find that State!");
        return res.redirect("/test/states");
    }
    res.render("Client/Test-City", { data }); 
}));



//Quizes by state id all-quizes.js (client) 
router.get("/quiz-list/:id", asyncHandler(async (req, res, next) => {  
    const data = await QuizModel.findById(req.params.id);     
    res.send(data);
})); 
 
//Client all-quiz js file 
router.get("/quiz-citys/all-quiz/:id", asyncHandler(async (req, res, next) => {  
    const data = await QuizModel.findById(req.params.id);   
    res.send(data);
}));


//Client Quiz page
router.get("/test/states/:stateName/:id", asyncHandler(async (req, res, next) => {  
    req.session.newResultIDForQuiz = undefined;
    const data = await QuizModel.findById(req.params.id);   
    var allTests = await QuizModel.find({});   
    if(!data)
    {
        req.flash("error", "Cannot find that Test!");
        return res.redirect("/test/states/"+req.params.stateName);
    } 
    res.render("Client/Test", { data: data, allTests: allTests });
}));
 
//Client About page
router.get("/about", asyncHandler(async (req, res, next) => {  
    res.render("Client/About");
}));

//Client Blog-Details page
router.get("/blog-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/Blog-Details");
}));
 
//Client Blog page
router.get("/blog", asyncHandler(async (req, res, next) => {  
    res.render("Client/Blog");
}));

//Client Contact page
router.get("/contact", asyncHandler(async (req, res, next) => {  
    res.render("Client/Contact");
}));

//Client Courses-Details page
router.get("/courses-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/Courses-Details");
}));

//Client Courses page
router.get("/courses", asyncHandler(async (req, res, next) => {  
    res.render("Client/Courses");
}));

//Client FAQ page
router.get("/faq", asyncHandler(async (req, res, next) => {  
    res.render("Client/FAQ");
}));

//Client Pricing page
router.get("/pricing", asyncHandler(async (req, res, next) => {  
    res.render("Client/Pricing");
}));

//Client Services-Details page
router.get("/services-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/Services-Details");
}));

//Client Services page
router.get("/services", asyncHandler(async (req, res, next) => {  
    res.render("Client/Services");
}));

//Client Shop-Details page
router.get("/shop-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/Shop-Details");
}));

//Client Shop page
router.get("/shop", asyncHandler(async (req, res, next) => {  
    res.render("Client/Shop");
}));

//Client Team-Details page
router.get("/team-details", asyncHandler(async (req, res, next) => {  
    res.render("Client/Team-Details");
}));

//Client Team page
router.get("/team", asyncHandler(async (req, res, next) => {  
    res.render("Client/Team");
}));

//Client Team page
router.get("/thank-you", asyncHandler(async (req, res, next) => {  
    res.render("Client/Thank-You");
}));



export default router;