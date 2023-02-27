import express, { Router } from "express";
const router = Router();
import QuestionModel from "../models/questions.js";
import asyncHandler from "express-async-handler";  
// import connectEnsureLogin from "connect-ensure-login";

 
//Admin Dashboard
router.get("/dashboard", asyncHandler(async (req, res) => { 
  res.render("Admin/Dashboard");
}));

//Admin show All Question
router.get("/all-quiz", asyncHandler(async (req, res) => {
  const data = await QuestionModel.find({});  
  res.render("Admin/AllQuiz", { data });
}));

//Admin Add Question show page
router.get("/add-quiz", asyncHandler(async (req, res) => { 
  res.render("Admin/AddQuiz");
}));
  
//Admin Add Questions
router.post("/add-quiz", asyncHandler(async (req, res) => {   
 
  if(typeof(req.body.question) == "string")
  {
    const singleQuiz = new QuestionModel(req.body);
    await singleQuiz.save();
    console.log("Single Quiz Added Successfully"); 
    res.redirect("/all-quiz");
  }
  else if(typeof(req.body.question) == "object")
  {
    for (let i = 0; i < req.body.question.length; i++) { 
        const newQuiz = new QuestionModel({
          question: req.body.question[i], 
          optionA: req.body.optionA[i],
          optionB: req.body.optionB[i],
          optionC: req.body.optionC[i],
          optionD: req.body.optionD[i],
          correct: req.body.correct[i]
        });
        await newQuiz.save(); 
    }
    console.log("Multiple Quiz Added Successfully"); 
    res.redirect("/all-quiz");
  } 

}));
 
// Admin Edit Question
router.get('/all-quiz/:id/edit', asyncHandler(async (req, res) => { 
    const data = await QuestionModel.findById(req.params.id);
    res.send(data);  
}));
 
//Admin Update Question
router.put("/all-quiz/:id", asyncHandler(async (req, res) => {  
  await QuestionModel.findByIdAndUpdate(req.params.id, req.body.Question);
  console.log("Quiz Updated Successfully");
  res.redirect("/all-quiz"); 
}));

//Admin Delete Question
router.delete("/all-quiz/:id", asyncHandler(async (req, res) => {
    await QuestionModel.findByIdAndDelete(req.params.id);
    console.log("Quiz Deleted Successfully");
    res.redirect("/all-quiz"); 
}));

//Admin Manage Quiz Page
router.get("/manage-quiz", asyncHandler(async (req, res) => { 
  res.render("Admin/ManageQuiz");
}));

//Admin Analytics Page
router.get("/analytics", asyncHandler(async (req, res) => { 
  res.render("Admin/Analytics");
}));

//Admin Blog Management Page
router.get("/blogs-management", asyncHandler(async (req, res) => { 
  res.render("Admin/BlogsManagement");
}));

//Admin Content Management Page
router.get("/content-management", asyncHandler(async (req, res) => { 
  res.render("Admin/ContentManagement");
}));

//Admin Game Management Page
router.get("/game-management", asyncHandler(async (req, res) => { 
  res.render("Admin/GameManagement");
}));

//Admin Result Management Page
router.get("/result-management", asyncHandler(async (req, res) => { 
  res.render("Admin/ResultManagement");
}));

//Admin User Management Page
router.get("/user-management", asyncHandler(async (req, res) => { 
  res.render("Admin/UserManagement");
}));

//Admin Web Analytics Page
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