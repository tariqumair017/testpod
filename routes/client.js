import express, { Router } from "express";
const router = Router(); 
import QuestionModel from "../models/questions.js";
import asyncHandler from "express-async-handler";  
// import connectEnsureLogin from "connect-ensure-login";


//Client Index page
router.get("/", asyncHandler(async (req, res) => { 
    res.render("Client/index");
}));

//Client Select Country
router.get("/select-country", asyncHandler(async (req, res) => { 
    res.render("Client/Select-Country");
}));

//Client Quiz page
router.get("/quiz", asyncHandler(async (req, res) => { 
    const data = await QuestionModel.find({});   
    res.render("Client/Quiz", { data });
}));

//Client Quiz-Citys page
router.get("/quiz-citys", asyncHandler(async (req, res) => { 
    const data = await QuestionModel.find({});   
    res.render("Client/Quiz-Citys", { data });
}));

//All Quizes for all-quizes.js (client) 
router.get("/quiz-list", asyncHandler(async (req, res) => { 
    const data = await QuestionModel.find({});   
    res.send(data);
})); 

//Client About page
router.get("/about", asyncHandler(async (req, res) => {  
    res.render("Client/About");
}));

//Client Blog-Details page
router.get("/blog-details", asyncHandler(async (req, res) => {  
    res.render("Client/Blog-Details");
}));
 
//Client Blog page
router.get("/blog", asyncHandler(async (req, res) => {  
    res.render("Client/Blog");
}));

//Client Contact page
router.get("/contact", asyncHandler(async (req, res) => {  
    res.render("Client/Contact");
}));

//Client Courses-Details page
router.get("/courses-details", asyncHandler(async (req, res) => {  
    res.render("Client/Courses-Details");
}));

//Client Courses page
router.get("/courses", asyncHandler(async (req, res) => {  
    res.render("Client/Courses");
}));

//Client FAQ page
router.get("/faq", asyncHandler(async (req, res) => {  
    res.render("Client/FAQ");
}));

//Client Pricing page
router.get("/pricing", asyncHandler(async (req, res) => {  
    res.render("Client/Pricing");
}));

//Client Services-Details page
router.get("/services-details", asyncHandler(async (req, res) => {  
    res.render("Client/Services-Details");
}));

//Client Services page
router.get("/services", asyncHandler(async (req, res) => {  
    res.render("Client/Services");
}));

//Client Shop-Details page
router.get("/shop-details", asyncHandler(async (req, res) => {  
    res.render("Client/Shop-Details");
}));

//Client Shop page
router.get("/shop", asyncHandler(async (req, res) => {  
    res.render("Client/Shop");
}));

//Client Team-Details page
router.get("/team-details", asyncHandler(async (req, res) => {  
    res.render("Client/Team-Details");
}));

//Client Team page
router.get("/team", asyncHandler(async (req, res) => {  
    res.render("Client/Team");
}));

//Client Team page
router.get("/thank-you", asyncHandler(async (req, res) => {  
    res.render("Client/Thank-You");
}));

 
export default router;