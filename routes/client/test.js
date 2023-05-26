import express, { Router } from "express";
const router = Router(); 
import path from "path";
import mongoosePaginate from "mongoose-paginate";
import QuizModel from "../../models/test.js";  
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";   
 

//Quizes by state id all-quizes.js (client) 
router.get("/quiz-list/:id", asyncHandler(async (req, res, next) => {  
    try {
        const data = await QuizModel.findById(req.params.id);      
        res.send(data);
    } catch (error) {
        return next(error.message);
    }
})); 


//Client: All States Page
router.get("/dmv-test/states", asyncHandler(async (req, res, next) => { 
    try {
        const data = await QuizModel.distinct("stateName");  
        res.render("Client/Test/States", { data, title: "States - DMV Tests"});
    } catch (error) {
        return next(error.message);
    } 
}));


//Client Specific State Page
router.get("/dmv-test/:stateName", asyncHandler(async (req, res, next) => { 
    try {
        const pageNumber = Number(req.query.page) || 1; // Get the current page number from the query parameters
        const pageSize = 8; // Number of items per page

        QuizModel.paginate({stateName: req.params.stateName}, { page: pageNumber, limit: pageSize }, (err, result) => {
            if (err) {
                console.log('Error occurred while fetching Tests'); 
            }

            const { docs, total, limit, page, pages } = result;
            res.render("Client/Test/Test-City", { data: docs, total, limit, page, pages, title: `${docs[0]?.stateName.toUpperCase()} - DMV Tests` });  
        });
    } catch (error) {
        return next(error.message);
    }    
}));


//Client new Quiz page 
router.get("/dmv-test/:stateName/:quizName", asyncHandler(async (req, res, next) => {  
    try {
        var nameOfQuiz = req.params.quizName.replace(/-/g," ");
        const arr = nameOfQuiz.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); 
        }
        nameOfQuiz = arr.join(" ");
        req.session.newResultIDForQuiz = undefined;

        const data = await QuizModel.findOne({stateName: req.params.stateName, quizName: nameOfQuiz});   
        // var allTests = await QuizModel.find({});   
        
        if(!data)
        {
            req.flash("error", "Cannot find that Test!");
            return res.redirect("/dmv-test/"+req.params.stateName);
        } 
        res.render("Client/Test/NewTest", { data, title: "Test - DMV Tests" });
    } catch (error) {
        return next(error.message);
    }
}));


 

export default router;