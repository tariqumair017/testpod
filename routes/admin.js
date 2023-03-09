import express, { Router } from "express";
const router = Router();
import passport from "passport";
import bcryptjs from "bcryptjs";
import path from "path";
import QuestionModel from "../models/questions.js";
import Admin from "../models/admin.js";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login";
import { Console } from "console";

// Sign Up 
// router.get("/sign-up", asyncHandler(async (req, res) => { 
//   res.render("Admin/SignUp");
// }));

//Handel Sign Up Logic
// router.post('/sign-up', asyncHandler(async function(req, res, next) {  
//     const newAdmin = new Admin({username: req.body.username, password: req.body.password, name: req.body.name})
//     const salt = await bcryptjs.genSalt(10);
//     const hash = await bcryptjs.hash(newAdmin.password, salt); 
//     newAdmin.password = hash;
//     await newAdmin.save();
//     res.redirect("/login");
// }));
 
// Login Page 
router.get("/login", connectEnsureLogin.ensureLoggedOut("/dashboard"), asyncHandler(async (req, res) => { 
  res.render("Admin/Login");
}));

//Handel Login Logic
router.post("/login", connectEnsureLogin.ensureLoggedOut("/dashboard"), passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: true,
}),(req, res) => {   
  res.redirect("/dashboard"); 
});

//Admin: Dashboard Page
router.get("/dashboard", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/Dashboard");
}));
 
//Admin: Add Question page
router.get("/add-test", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  // const data = await QuestionModel.distinct("stateName");  
  res.render("Admin/AddTest");
}));
  
//Admin:  State and Category Filter
// router.get("/add-test/:state/state", asyncHandler(async (req, res) => { 
//   const data = await QuestionModel.find({country: req.params.state});  
//   res.send(data);
// })) 

//Admin: Add Questions
router.post("/add-test", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
   
  const find = await QuestionModel.findOne({country: req.body.country, stateName: req.body.stateName, quizName: req.body.quizName});
 
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
      const singleQuiz = new QuestionModel({
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
      const newQuiz = new QuestionModel({
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
  const data = await QuestionModel.find({}); 
  res.render("Admin/ManageQuiz", { data });
}));

//Admin - Edit Test Name
router.put("/manage-quiz/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  await QuestionModel.updateOne({_id: req.params.id}, {$set:{"quizName": req.body.testName}});
  res.redirect(`/manage-quiz/${req.params.id}/all-quiz`); 
}));

//Admin - Destroy Whole Question
router.delete("/manage-quiz/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  const { id } = req.params;
  await QuestionModel.findByIdAndDelete(id);
  console.log("Whole Question Deleted Successfully"); 
  res.send({url: "/manage-quiz"}); 
}));

//Admin: show All Question
router.get("/manage-quiz/:id/all-quiz", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {
  const data = await QuestionModel.findById(req.params.id);
  res.render("Admin/AllQuiz", { data });
}));

// Admin: Add new Question in Test
router.post('/manage-quiz/:id/new', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  
  var find = await QuestionModel.findById(req.params.id);

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
      await QuestionModel.updateOne({_id: find._id}, {$push:{questions: question}});
      console.log("New Question Added"); 
      req.flash("success", "New Question Added");
      res.redirect(`/manage-quiz/${req.params.id}/all-quiz`);
    }
    else
    {
      req.flash("error", "Test not found");
      res.redirect(`/manage-quiz/${req.params.id}/all-quiz`);
    }
    // else if(typeof(req.body.question) == "object")
    // { 
    //   const newQuestions = [];
    //   for (let i = 0; i < req.body.question.length; i++) { 

    //     var questionFileName = '';  
    //     if(req.files[`questionImg${i}`] != undefined)
    //     {
    //       questionFileName = Date.now() + '-' + req.files[`questionImg${i}`].name;
    //       const newPath  = path.join(process.cwd(), '/public/upload-images', questionFileName);
    //       req.files[`questionImg${i}`].mv(newPath);
    //     }

    //       const newQuestion = {
    //         question: req.body.question[i], 
    //         optionA: req.body.optionA[i],
    //         optionB: req.body.optionB[i],
    //         optionC: req.body.optionC[i],
    //         optionD: req.body.optionD[i],
    //         correct: req.body.correct[i],
    //         hint: req.body.hint[i],
    //         questionImg: questionFileName
    //       }
  
    //     newQuestions.push(newQuestion);
    //   }

    //   await QuestionModel.updateMany({_id: find._id}, {$push:{questions: newQuestions}});
    //   console.log("Many Questions Updated Successfully"); 
    //   res.redirect("/manage-quiz"); 
    // }   
}));

// Admin: Edit Question
router.get('/all-quiz/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  const data = await QuestionModel.findById(req.params.id);
  res.send(data);  
}));

//Admin: Update Question
router.put("/all-quiz/:cid/:pid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {    
await QuestionModel.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": req.body.Question}});
console.log("Quiz Updated Successfully");
res.redirect(`/manage-quiz/${req.params.pid}/all-quiz`); 
}));

//Admin: Delete Question
router.delete("/all-quiz/:pid/:cid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {  
await QuestionModel.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
console.log("Quiz Deleted Successfully");
res.redirect(`/manage-quiz/${req.params.pid}/all-quiz`);  
}));

//Admin: Analytics Page
router.get("/analytics", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/Analytics");
}));

//Admin: Blog Management Page
router.get("/blogs-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/BlogsManagement");
}));

//Admin: Content Management Page
router.get("/content-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/ContentManagement");
}));

//Admin: Game Management Page
router.get("/game-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/GameManagement");
}));

//Admin: Add Flag Page
router.get("/game-management/add-flags-games", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/AddFlagsGames");
}));

//Admin: Manage Flag Page
router.get("/game-management/manage-flags-games", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/ManageFlagsGame");
}));

//Admin: Result Management Page
router.get("/result-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/ResultManagement");
}));

//Admin: User Management Page
router.get("/user-management", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/UserManagement");
}));

//Admin: Web Analytics Page
router.get("/web-analytics", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  res.render("Admin/WebAnalytics");
}));

//Logout
router.get('/logout', connectEnsureLogin.ensureLoggedIn("/"), function(req, res, next) { 
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


export default router;