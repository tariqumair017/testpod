import express, { Router } from "express";
const router = Router(); 
import path from "path";
import QuizModel from "../models/quizs.js";  
import LogModel from "../models/logs.js";
import ResultModel from "../models/result.js";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login";
import { Console } from "console";
 
 
//Admin: Add Question page
router.get("/add-test", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
    // const data = await QuizModel.distinct("stateName");  
    res.render("Admin/AddTest");
  }));
    
  //Admin:  State and Category Filter
  // router.get("/add-test/:state/state", asyncHandler(async (req, res) => { 
  //   const data = await QuizModel.find({country: req.params.state});  
  //   res.send(data);
  // })) 
  
  //Admin: Add Questions
  router.post("/add-test", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
     
    const find = await QuizModel.findOne({country: {$regex : req.body.country.toString(), "$options": "i" }, stateName: {$regex : req.body.stateName.toString(), "$options": "i" }, quizName: {$regex : req.body.quizName.toString(), "$options": "i" }});
   
    if(!find)
    { 
      var stateFileName = Date.now() + '-' + req.files.stateImg.name;
      const newPath  = path.join(process.cwd(), '/public/upload-images', stateFileName);
      req.files.stateImg.mv(newPath);
  
      if(typeof(req.body.question) == "string")
      {
        var questionFileName = '';
        if(req.files.questionImg0 != undefined)
        {
          questionFileName = Date.now() + '-' + req.files.questionImg0.name;
          const newPath  = path.join(process.cwd(), '/public/upload-images', questionFileName);
          req.files.questionImg0.mv(newPath);
        }
  
        const questions = {question: req.body.question, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint, questionImg: questionFileName}; 
        const singleQuiz = new QuizModel({
          quizName: req.body.quizName,
          country: req.body.country,
          stateName: req.body.stateName,
          stateImg: stateFileName,
          questions: questions,
          category: req.body.category,
          quizDetail: req.body.quizDetail,
        });
        await singleQuiz.save();
        console.log("Single Quiz Added Successfully"); 
        res.redirect("/manage-quiz");
      }
      else if(typeof(req.body.question) == "object")
      {
        const newQuestions = [];
        for (let i = 0; i < req.body.question.length; i++) { 
  
        var questionFileName = '';  
        if(req.files[`questionImg${i}`] != undefined)
        {
          questionFileName = Date.now() + '-' + req.files[`questionImg${i}`].name;
          const newPath  = path.join(process.cwd(), '/public/upload-images', questionFileName);
          req.files[`questionImg${i}`].mv(newPath);
        }
  
            const newQuestion = {
              question: req.body.question[i], 
              optionA: req.body.optionA[i],
              optionB: req.body.optionB[i],
              optionC: req.body.optionC[i],
              optionD: req.body.optionD[i],
              correct: req.body.correct[i],
              hint: req.body.hint[i],
              questionImg: questionFileName
            }
    
          newQuestions.push(newQuestion);
        }
        const newQuiz = new QuizModel({
          quizName: req.body.quizName,
          country: req.body.country,
          stateName: req.body.stateName,
          stateImg: stateFileName,
          questions: newQuestions,
          category: req.body.category,
          quizDetail: req.body.quizDetail,
        });
        await newQuiz.save(); 
        console.log("Multiple Quiz Added Successfully"); 
        res.redirect("/manage-quiz");
      }  
    }
    else
    {   
      req.flash("error", `${find.quizName} is already exist`);
      res.redirect("/add-test"); 
    }
   
  })); 
  
  //Admin: Manage Quiz Page
  router.get("/manage-quiz", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
    const data = await QuizModel.find({}); 
    res.render("Admin/ManageQuiz", { data });
  }));
  
  //Admin - Edit Test Name
  router.put("/manage-quiz/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
    await QuizModel.updateOne({_id: req.params.id}, {$set:{"quizName": req.body.testName}});
    res.redirect(`/manage-quiz/${req.params.id}/all-quiz`); 
  }));
  
  //Admin - Destroy Whole Question
  router.delete("/manage-quiz/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
    const { id } = req.params;
    await QuizModel.findByIdAndDelete(id);
    console.log("Whole Question Deleted Successfully"); 
    res.send({url: "/manage-quiz"}); 
  }));
  
  //Admin: show All Question
  router.get("/manage-quiz/:id/all-quiz", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {
    const data = await QuizModel.findById(req.params.id);
    res.render("Admin/AllQuiz", { data });
  }));
  
  // Admin: Add new Question in Test
  router.post('/manage-quiz/:id/new', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
    
    var find = await QuizModel.findById(req.params.id);
  
      if(find)
      {
        var questionFileName = '';
       if(req.files)
       {
        questionFileName = Date.now() + '-' + req.files.questionImg.name;
        const newPath  = path.join(process.cwd(), '/public/upload-images', questionFileName);
        req.files.questionImg.mv(newPath);
       }
  
        const question = {question: req.body.question, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint, questionImg: questionFileName}; 
        await QuizModel.updateOne({_id: find._id}, {$push:{questions: question}});
        console.log("New Question Added"); 
        req.flash("success", "New Question Added");
        res.redirect(`/manage-quiz/${req.params.id}/all-quiz`);
      }
      else
      {
        req.flash("error", "Test not found");
        res.redirect(`/manage-quiz/${req.params.id}/all-quiz`);
      }
  }));
  
  // Admin: Edit Question
  router.get('/all-quiz/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
    const data = await QuizModel.findById(req.params.id);
    res.send(data);  
  }));
  
  //Admin: Update Question
  router.put("/all-quiz/:cid/:pid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {    
    await QuizModel.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": req.body.Question}});
    console.log("Quiz Updated");
    req.flash("success", "Quiz Updated Successfully");
    res.redirect(`/manage-quiz/${req.params.pid}/all-quiz`); 
  }));
  
  //Admin: Delete Question
  router.delete("/all-quiz/:pid/:cid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {  
    await QuizModel.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Quiz Deleted Successfully");
    req.flash("success", "Quiz Deleted Successfully");
    res.redirect(`/manage-quiz/${req.params.pid}/all-quiz`);  
  }));



//========================
// User Activity For Quize
//========================
 
router.post("/track-quiz/:id", asyncHandler(async (req, res) => {  
    const { views } = req.body; 
     //find the Game Using ID  
     const findQuiz = await QuizModel.findById(req.params.id); 
     if(findQuiz.logs)
     { 
        const data = await LogModel.updateOne({_id: findQuiz.logs}, { $inc: { views: 1 }});
        res.send("Done"); 
     }
     else
     {
        const newLog = new LogModel({views:views});
        await newLog.save(); 
        findQuiz.logs = newLog._id;
        await findQuiz.save();
        res.send("Done"); 
     }
}));


//======================
// Quiz Result
//======================
 
router.post("/quiz-result/:id", asyncHandler(async (req, res) => {  
    const { objToStore } = req.body;  
     //find the Game Using ID
     const findQuiz = await QuizModel.findById(req.params.id); 
    if(objToStore.attempted == findQuiz.questions.length)
    {
        objToStore.status = "complete";
    }
    else
    {
        objToStore.status = "Incomplete";
    }


    const ResultExist = await ResultModel.findById(req.session.newResultIDForQuiz);

    if(!ResultExist)
    {
        const newResult = new ResultModel(objToStore);
        await newResult.save();
        req.session.newResultIDForQuiz = newResult._id;
        //Push newResult to results field in Game
        await findQuiz.results.push(newResult);
        await findQuiz.save();
        res.send("Done"); 
    } 
    else
    {
      await ResultModel.replaceOne({_id: ResultExist._id}, objToStore);
      res.send("Done"); 
    }
}));

export default router;