import express, { Router } from "express";
const router = Router(); 
import path from "path";
import QuizModel from "../../models/test.js";  
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login"; 
 



//Client: All States Page
router.get("/test/states", asyncHandler(async (req, res, next) => { 
    const data = await QuizModel.distinct("stateName");  
    res.render("Client/Test/States", { data }); 
}));


//Client Specific State Page
router.get("/test/states/:stateName", asyncHandler(async (req, res, next) => { 
    const data = await QuizModel.find({stateName: req.params.stateName});  
    if(!data)
    {
        req.flash("error", "Cannot find that State!");
        return res.redirect("/test/states");
    }
    res.render("Client/Test/Test-City", { data }); 
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
// router.get("/test/states/:stateName/:id", asyncHandler(async (req, res, next) => {  
//     req.session.newResultIDForQuiz = undefined;
//     const data = await QuizModel.findById(req.params.id);   
//     var allTests = await QuizModel.find({});   
//     if(!data)
//     {
//         req.flash("error", "Cannot find that Test!");
//         return res.redirect("/test/states/"+req.params.stateName);
//     } 
//     res.render("Client/Test/Test", { data: data, allTests: allTests });
// }));

//Client new Quiz page 
router.get("/test/states/:stateName/:id", asyncHandler(async (req, res, next) => {  
    req.session.newResultIDForQuiz = undefined;
    const data = await QuizModel.findById(req.params.id);   
    var allTests = await QuizModel.find({});   
    if(!data)
    {
        req.flash("error", "Cannot find that Test!");
        return res.redirect("/test/states/"+req.params.stateName);
    } 
    res.render("Client/Test/NewTest", { data: data, allTests: allTests });
}));


 

export default router;