import express, { Router } from "express";
const router = Router();
import QuestionModel from "../models/questions.js";
import asyncHandler from "express-async-handler";  
// import connectEnsureLogin from "connect-ensure-login";

// Sign Up 
router.get("/sign-up", asyncHandler(async (req, res) => { 
  res.render("Admin/SignUp");
}));
 
// Login Page 
router.get("/login", asyncHandler(async (req, res) => { 
  res.render("Admin/Login");
}));

//Admin: Dashboard Page
router.get("/dashboard", asyncHandler(async (req, res) => { 
  res.render("Admin/Dashboard");
}));
 
//Admin: Add Question page
router.get("/add-quiz", asyncHandler(async (req, res) => { 
  // const data = await QuestionModel.distinct("stateName");  
  res.render("Admin/AddQuiz");
}));
  
//Admin:  State and Category Filter
// router.get("/add-quiz/:state/state", asyncHandler(async (req, res) => { 
//   const data = await QuestionModel.find({country: req.params.state});  
//   res.send(data);
// })) 

//Admin: Add Questions
router.post("/add-quiz", asyncHandler(async (req, res) => {   
  
  const find = await QuestionModel.findOne({country: req.body.country, stateName: req.body.stateName, category: req.body.category});
 
  if(!find)
  {
    if(typeof(req.body.questions.question) == "string")
    {
      const singleQuiz = new QuestionModel({
        quizName: req.body.quizName,
        country: req.body.country,
        stateName: req.body.stateName,
        questions: req.body.questions,
        category: req.body.category,
        quizDetail: req.body.quizDetail,
      });
      await singleQuiz.save();
      console.log("Single Quiz Added Successfully"); 
      res.redirect("/manage-quiz");
    }
    else if(typeof(req.body.questions.question) == "object")
    {
      const newQuestions = [];
      for (let i = 0; i < req.body.questions.question.length; i++) { 
          const newQuestion = {
            question: req.body.questions.question[i], 
            optionA: req.body.questions.optionA[i],
            optionB: req.body.questions.optionB[i],
            optionC: req.body.questions.optionC[i],
            optionD: req.body.questions.optionD[i],
            correct: req.body.questions.correct[i],
            hint: req.body.questions.hint[i]
          }
  
        newQuestions.push(newQuestion);
      }
      const newQuiz = new QuestionModel({
        quizName: req.body.quizName,
        country: req.body.country,
        stateName: req.body.stateName,
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
    if(typeof(req.body.questions.question) == "string")
    {
      await QuestionModel.updateMany({_id: find._id}, {$push:{questions: req.body.questions}});
      console.log("Single Questions Updated Successfully"); 
      res.redirect("/manage-quiz");
    }
    else if(typeof(req.body.questions.question) == "object")
    {
      const newQuestions = [];
      for (let i = 0; i < req.body.questions.question.length; i++) { 
          const newQuestion = {
            question: req.body.questions.question[i], 
            optionA: req.body.questions.optionA[i],
            optionB: req.body.questions.optionB[i],
            optionC: req.body.questions.optionC[i],
            optionD: req.body.questions.optionD[i],
            correct: req.body.questions.correct[i],
            hint: req.body.questions.hint[i]
          }
  
        newQuestions.push(newQuestion);
      }

      await QuestionModel.updateMany({_id: find._id}, {$push:{questions: newQuestions}});
      console.log("Many Questions Updated Successfully"); 
      res.redirect("/manage-quiz"); 
    } 
  }
 
})); 

//Admin: Manage Quiz Page
router.get("/manage-quiz", asyncHandler(async (req, res) => { 
  const data = await QuestionModel.find({}); 
  res.render("Admin/ManageQuiz", { data });
}));

//Admin: show All Question
router.get("/manage-quiz/:id/all-quiz", asyncHandler(async (req, res) => {
  const data = await QuestionModel.findById(req.params.id);
  res.render("Admin/AllQuiz", { data });
}));

// Admin: Edit Question
router.get('/all-quiz/:id/edit', asyncHandler(async (req, res) => { 
  const data = await QuestionModel.findById(req.params.id);
  res.send(data);  
}));

//Admin: Update Question
router.put("/all-quiz/:cid/:pid", asyncHandler(async (req, res) => {   
await QuestionModel.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": req.body.Question}});
console.log("Quiz Updated Successfully");
res.redirect(`/manage-quiz/${req.params.pid}/all-quiz`); 
}));

//Admin: Delete Question
router.delete("/all-quiz/:pid/:cid", asyncHandler(async (req, res) => {  
await QuestionModel.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
console.log("Quiz Deleted Successfully");
res.redirect(`/manage-quiz/${req.params.pid}/all-quiz`);  
}));

//Admin: Analytics Page
router.get("/analytics", asyncHandler(async (req, res) => { 
  res.render("Admin/Analytics");
}));

//Admin: Blog Management Page
router.get("/blogs-management", asyncHandler(async (req, res) => { 
  res.render("Admin/BlogsManagement");
}));

//Admin: Content Management Page
router.get("/content-management", asyncHandler(async (req, res) => { 
  res.render("Admin/ContentManagement");
}));

//Admin: Game Management Page
router.get("/game-management", asyncHandler(async (req, res) => { 
  res.render("Admin/GameManagement");
}));

//Admin: Result Management Page
router.get("/result-management", asyncHandler(async (req, res) => { 
  res.render("Admin/ResultManagement");
}));

//Admin: User Management Page
router.get("/user-management", asyncHandler(async (req, res) => { 
  res.render("Admin/UserManagement");
}));

//Admin: Web Analytics Page
router.get("/web-analytics", asyncHandler(async (req, res) => { 
  res.render("Admin/WebAnalytics");
}));



// router.get("/filteredExpenses", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {
//   var fromDate = '';
//   var toDate = '';

//   if(req.query.fromDate != '' && req.query.toDate != '')
//   {
//     fromDate = new Date(req.query.fromDate); 
//     toDate = new Date(req.query.toDate); 
//     toDate.setDate(toDate.getDate()+1); 
//   }
//   else
//   {
//     fromDate = req.query.fromDate;
//     toDate = req.query.toDate;
//   }

//     if (fromDate == "" && toDate == "") {
//         console.log("All Should Showing");
//         const data = await Expense.find({});
//         res.send(data);
//       } else if (fromDate != "" && toDate != "") {
//         console.log("From-date To to-date");
//         const data1 = await Expense.find({ 
//           $and: [
//             { itemDate: { $gte: fromDate } },
//             { itemDate: { $lte: toDate } },
//           ],
//         });
//         res.send(data1);
//       }
// }));


export default router;