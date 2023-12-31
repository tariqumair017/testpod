import express, { Router } from "express";
const router = Router(); 
import path from "path";
import AWS from "aws-sdk";
import QuizModel from "../../models/test.js";  
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";   
import middleware from "../../middleware/index.js";
 
 
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }); 

 
//Admin: Add Question page
router.get("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
    res.render("Admin/Test/AddTest", {title: "Create-Test"});
}));
  
//Admin: Add Questions
router.post("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
        req.body.quizName = req.body.quizName.toLowerCase();
        const arr = req.body.quizName.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); 
        }
        var QuizName = arr.join(" ");

    const find = await QuizModel.findOne({country: {$regex : req.body.country.toString(), "$options": "i" }, stateName: {$regex : req.body.stateName.toString(), "$options": "i" }, quizName: QuizName});
  
    if(!find)
    { 
      var testImgFile;
 
      await s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `test/${req.files.testImg.name}`,
        Body: req.files.testImg.data,
        ContentType: req.files.testImg.mimetype,
        ACL: 'public-read'
      }).promise().then( async (data) => {
        testImgFile = data.Location; 
      }); 

      if(typeof(req.body.question) == "string")
      {
        var questionFileName = '';
        if(req.files.questionImg0 != undefined)
        {
          await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `test/${req.files.questionImg0.name}`,
            Body: req.files.questionImg0.data,
            ContentType: req.files.questionImg0.mimetype,
            ACL: 'public-read'
          }).promise().then( async (data) => {
            questionFileName = data.Location; 
          });  
        }

        const questions = {question: req.body.question, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint, questionImg: questionFileName}; 
        const singleQuiz = new QuizModel({
          quizName: QuizName,
          country: req.body.country,
          stateName: req.body.stateName,
          testImg: testImgFile,
          questions: questions,
          category: req.body.category,
          quizDetail: req.body.quizDetail,
        });
        await singleQuiz.save();
        console.log("Single Quiz Added Successfully"); 
        res.redirect("/admin/test/manage");
      }
      else if(typeof(req.body.question) == "object")
      {
        const newQuestions = [];
        for (let i = 0; i < req.body.question.length; i++) { 

        var questionFileName = '';  
        if(req.files[`questionImg${i}`] != undefined)
        { 
          await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `test/${req.files[`questionImg${i}`]['name']}`,
            Body: req.files[`questionImg${i}`]['data'],
            ContentType: req.files[`questionImg${i}`]['mimetype'],
            ACL: 'public-read'
          }).promise().then( async (data) => {
            questionFileName = data.Location; 
          });   
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
          quizName: QuizName,
          country: req.body.country,
          stateName: req.body.stateName,
          testImg: testImgFile,
          questions: newQuestions,
          category: req.body.category,
          quizDetail: req.body.quizDetail,
        });
        await newQuiz.save(); 
        console.log("Multiple Quiz Added Successfully"); 
        res.redirect("/admin/test/manage");
      }  
    }
    else
    {   
      req.flash("error", `${find.quizName} is already exist`);
      res.redirect("/admin/test/add"); 
    }
  } catch (error) {
    return next(error.message);
  }  
})); 

//Admin: Search State Api for Manage Page
router.get("/search/:state", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const data = await QuizModel.find({stateName: req.params.state}); 
    res.send(data); 
  } catch (error) {
    return next(error.message);
  }
}));

//Admin: Manage Quiz Page
router.get("/manage", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await QuizModel.find({}); 
    res.render("Admin/Test/ManageTest", { data, title: "Manage-Test" });
  } catch (error) {
    return next(error.message);
  }
}));

//Admin - Destroy Whole Question
router.delete("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const { id } = req.params;
    await QuizModel.findByIdAndDelete(id);
    console.log("Whole Question Deleted Successfully"); 
    res.send({url: "/admin/test/manage"}); 
  } catch (error) {
    return next(error.message);
  }
}));
  
//Admin: show All Question
router.get("/manage/:id/all-quizzes", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {
  try {
    const data = await QuizModel.findById(req.params.id);
    if(!data)
    {
        req.flash("error", "Test Not Found");
        return res.redirect("/admin/test/manage");
    }
    res.render("Admin/Test/AllQuiz", { data, title: "Manage-Test-Questions" });
  } catch (error) {
    return next(error.message);
  }
}));

//Admin - Edit Test Name
router.put("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
        req.body.quizName = req.body.quizName.toLowerCase();
        const arr = req.body.quizName.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); 
        }
        var QuizName = arr.join(" ");

      await QuizModel.updateOne({_id: req.params.id}, {$set:{"quizName": QuizName}});
      res.redirect(`/admin/test/manage/${req.params.id}/all-quizzes`);
  } catch (error) {
    return next(error.message);
  } 
}));

  // Admin: Add new Question in Test
router.post('/manage/:id/new', middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
      var find = await QuizModel.findById(req.params.id);
  
      if(find)
      {
        var questionFileName = '';
        if(req.files)
          { 
            await s3.upload({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: `test/${req.files.questionImg.name}`,
              Body: req.files.questionImg.data,
              ContentType: req.files.questionImg.mimetype,
              ACL: 'public-read'
            }).promise().then( async (data) => {
              questionFileName = data.Location; 
            });  
          }
  
        const question = {question: req.body.question, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint, questionImg: questionFileName}; 
        await QuizModel.updateOne({_id: find._id}, {$push:{questions: question}});
        console.log("New Question Added"); 
        req.flash("success", "New Question Added");
        res.redirect(`/admin/test/manage/${req.params.id}/all-quizzes`);
      }
      else
      {
        req.flash("error", "Test not found");
        res.redirect(`/admin/test/manage/${req.params.id}/all-quizzes`);
      }
  } catch (error) {
    return next(error.message);
  }
}));
  
// Admin: Edit Question
router.get('/manage/:id/edit', middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await QuizModel.findById(req.params.id);
    res.send(data);
  } catch (error) {
    return next(error.message);
  }  
}));
  
//Admin: Update Question
router.put("/manage/:cid/:pid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {    
  try {
    await QuizModel.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": req.body.Question}});
    console.log("Quiz Updated");
    req.flash("success", "Quiz Updated Successfully");
    res.redirect(`/admin/test/manage/${req.params.pid}/all-quizzes`);
  } catch (error) {
    return next(error.message);
  } 
}));
  
//Admin: Delete Question
router.delete("/manage/:pid/:cid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    await QuizModel.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Quiz Deleted Successfully");
    req.flash("success", "Quiz Deleted Successfully");
    res.redirect(`/admin/test/manage/${req.params.pid}/all-quizzes`);
  } catch (error) {
    return next(error.message);
  }  
}));



//========================
// User Activity For Quize
//========================
 
router.post("/track-quiz/:id", asyncHandler(async (req, res, next) => {  
  try {
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
  } catch (error) {
    return next(error.message);
  }
}));


//======================
// Quiz Result
//======================
 
router.post("/quiz-result/:id", asyncHandler(async (req, res, next) => {  
  try {
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
  } catch (error) {
    return next(error.message);
  }
}));

export default router;