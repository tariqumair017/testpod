import express, { Router } from "express";
const router = Router(); 
import QuestionModel from "../models/questions.js";
import asyncHandler from "express-async-handler";  
// import connectEnsureLogin from "connect-ensure-login";



router.get("/", asyncHandler(async (req, res) => { 
    res.render("Client/index");
}));

router.get("/quiz", asyncHandler(async (req, res) => { 
    const data = await QuestionModel.find({});   
    res.render("Client/Quiz", { data });
}));


// //Total Income for Landing Page
// router.get("/totalIncomeForLandingPage", asyncHandler(async (req, res) => {
//     const data = await Income.find({}); 
//     res.send(data);
// }));

// router.get("/income", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
//     res.render("Income");
// }));
  
// router.post("/income", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {   
  
//   if(req.body.IncomeData.incomeDate != '')
//   {
//     const date1 = new Date(req.body.IncomeData.incomeDate); 
//     req.body.IncomeData.incomeDate = date1; 
//   }
//   else
//   {
//     const date1 = new Date(); 
//     req.body.IncomeData.incomeDate = date1;
//   }

//     const IncomeToSave = new Income(req.body.IncomeData);
//     await IncomeToSave.save();
//     console.log("Income Added Successfully");
//     req.flash("success", "Income Added Successfully");
//     res.redirect("/income");
// }));

// router.get("/show-income", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
//     res.render("ShowIncome");
// })); 

// router.get('/show-income/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
//         const data = await Income.findById(req.params.id);
//         res.render("EditIncome", {data});  
// }));


// router.put("/show-income/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
//     await Income.findByIdAndUpdate(req.params.id, req.body.IncomeData);
//     res.redirect("/show-income"); 
// }));

// router.delete("/show-income/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {
//     await Income.findByIdAndDelete(req.params.id);
//     res.send("/show-income"); 
// }));

 
// router.get("/filteredIncome", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {

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
//         const data = await Income.find({});
//         res.send(data);
//       } else if (fromDate != "" && toDate != "") {
//         console.log("From-date To to-date");
//         const data1 = await Income.find({ 
//           $and: [
//             { incomeDate: { $gte: fromDate } },
//             { incomeDate: { $lte: toDate } },
//           ],
//         });
//         res.send(data1);
//       }
// }));

 
export default router;