import express, { Router } from "express";
const router = Router(); 
import QuizModel from "../../models/test.js";
import CountryFlagGame from "../../models/guessCountryGame.js";  
import AllFlagsData from "../../models/allFlagsData.js";
import asyncHandler from "express-async-handler";   
 

//Client Index page
router.get("/", asyncHandler(async (req, res, next) => { 
//Store All Flags Data
    // const all = await fetch("https://restcountries.com/v3.1/all");
    // const allFlags = await all.json(); 
    
    // allFlags.forEach(async(element) => {  
    //     const newData = new AllFlagsData({ country: element.name.common, flag: element.flags.svg, region: element.region });
    //     await newData.save(); 
    // });   

//Update All Flags Data
    // var allFlags = await AllFlagsData.find({}); 
    // console.log(allFlags.length);

    // allFlags.forEach(async(element) => { 
    //     if(element.region == 'Americas')
    //     { 
    //         await AllFlagsData.updateOne({_id: element._id}, {$set:{"region": 'America'}});
    //     }
    // });

 
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