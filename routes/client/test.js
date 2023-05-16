import express, { Router } from "express";
const router = Router(); 
import path from "path";
import QuizModel from "../../models/test.js";  
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";   
 

//Quizes by state id all-quizes.js (client) 
router.get("/quiz-list/:id", asyncHandler(async (req, res, next) => {  
    const data = await QuizModel.findById(req.params.id);      
    res.send(data);
})); 


//Client: All States Page
router.get("/dmv-test/states", asyncHandler(async (req, res, next) => { 
    const data = await QuizModel.distinct("stateName");  
    res.render("Client/Test/States", { data, title: "Test-States"}); 
}));


//Client Specific State Page
router.get("/dmv-test/:stateName", asyncHandler(async (req, res, next) => { 
    const data = await QuizModel.find({stateName: req.params.stateName});  
    if(!data)
    {
        req.flash("error", "Cannot find that State!");
        return res.redirect("/dmv-test/states");
    } 
    res.render("Client/Test/Test-City", { data, title: "State-Tests" }); 
}));
 

//Client Quiz page
// router.get("/dmv-test/states/:stateName/:id", asyncHandler(async (req, res, next) => {  
//     req.session.newResultIDForQuiz = undefined;
//     const data = await QuizModel.findById(req.params.id);   
//     var allTests = await QuizModel.find({});   
//     if(!data)
//     {
//         req.flash("error", "Cannot find that Test!");
//         return res.redirect("/dmv-test/states/"+req.params.stateName);
//     } 
//     res.render("Client/Test/Test", { data: data, allTests: allTests });
// }));


//Client new Quiz page 
router.get("/dmv-test/:stateName/:quizName", asyncHandler(async (req, res, next) => {  
    try {
        var nameOfQuiz = req.params.quizName.replace(/-/g," ");

        req.session.newResultIDForQuiz = undefined;
        const data = await QuizModel.findOne({quizName: {$regex : nameOfQuiz.toString(), "$options": "i" }});   
        // var allTests = await QuizModel.find({});   
        
        if(!data)
        {
            req.flash("error", "Cannot find that Test!");
            return res.redirect("/dmv-test/"+req.params.stateName);
        } 
        res.render("Client/Test/NewTest", { data, title: "State-Quiz" });
    } catch (error) {
        console.log(error.message);
    }
}));


 

export default router;