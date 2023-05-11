import express, { Router } from "express";
const router = Router();
import path from "path";  
import FlagDetectiveGame from "../../models/flagDetectiveGame.js";
import AllFlagsData from "../../models/allFlagsData.js";
import connectEnsureLogin from "connect-ensure-login"; 
import asyncHandler from "express-async-handler";


//Admin: Distinct Region form All Flags Data
router.get("/data-of-allFlags", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  const data = await AllFlagsData.distinct("region"); 
  res.send(data);
}));

//Admin: Find All Countries of Selected Region from All Flags Data
router.get("/all-flags-data/country/:region", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
  const data = await AllFlagsData.find({region: req.params.region});
  res.send(data);
}));

//Admin: Find Flag of selected Country from All Flags Data
router.get("/all-flags-data/country-for-flag/:country", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
  const data = await AllFlagsData.findOne({country: req.params.country});
  res.send(data);
}));

//Admin: Create Flag Detective Game Page
router.get("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/FlagDetectiveGame/AddFlagDetectiveGame");
}));

//Admin: Create Flag Detective Game Handel
router.post("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 

  const find = await FlagDetectiveGame.findOne({continent: req.body.continent, level: req.body.level});

  if(!find)
  {  
    if(typeof(req.body.country) == "string")
    { 
      const question = {country: req.body.country, flagUrl: req.body.flagUrl, hint: req.body.hint}; 
      const singleQuestion = new FlagDetectiveGame({
        continent: req.body.continent,
        level: req.body.level,  
        questions: question
      });
      await singleQuestion.save();
      console.log("Single Quiz Added Successfully"); 
      res.redirect("/admin/flag-detective-game/manage");
    }
    else if(typeof(req.body.country) == "object")
    {
      const newQuestions = [];
      for (let i = 0; i < req.body.country.length; i++) {   
        
          const newQuestion = {
            country: req.body.country[i], 
            flagUrl: req.body.flagUrl[i],
            hint: req.body.hint[i], 
          }
  
        newQuestions.push(newQuestion);
      }
      const newQuiz = new FlagDetectiveGame({
        continent: req.body.continent,
        level: req.body.level,  
        questions: newQuestions
      });
      await newQuiz.save(); 
      console.log("Multiple Quiz Added Successfully"); 
      res.redirect("/admin/flag-detective-game/manage");
    }  
  }
  else
  {   
    req.flash("error", `${find.continent.toUpperCase()} with Selected level is already exist`);
    res.redirect("/admin/flag-detective-game/add"); 
  }
}));
 
//Admin: Search Region Api for Manage Page
router.get("/search/:continent", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
  const data = await FlagDetectiveGame.find({continent: req.params.continent}); 
  res.send(data);
}));
 
//Admin: Manage Flag Detective Game Page
router.get("/manage", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await FlagDetectiveGame.find({});
    res.render("Admin/FlagDetectiveGame/ManageFlagDetectiveGame", { data });
}));

//Admin - Delete Flag Detective Game
router.delete("/manage/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  const { id } = req.params;
  await FlagDetectiveGame.findByIdAndDelete(id);
  console.log("FlagDetectiveGame Deleted Successfully");  
  res.send({url: "/admin/flag-detective-game/manage"}); 
}));
 
//Admin: Show All Questions of Flag Detective Game 
router.get("/manage/:id/all-questions", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {
  const data = await FlagDetectiveGame.findById(req.params.id); 
  if(!data)
  {
    req.flash("error", "Cannot find this Game!");
    return res.redirect("/admin/flag-detective-game/manage");
  } 
  res.render("Admin/FlagDetectiveGame/AllFlagDetectiveGame", { data });
}));

//Admin - Edit Game Name
// router.put("/manage/:id", asyncHandler(async (req, res, next) => { 
//   await FlagDetectiveGame.updateOne({_id: req.params.id}, {$set:{"continent": req.body.continent}});
//   res.redirect(`/admin/flag-detective-game/manage/${req.params.id}/all-questions`); 
// }));

// Admin: Add new Question in Game
router.post('/manage/:id/new', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  
  var find = await FlagDetectiveGame.findById(req.params.id);

    if(find)
    {  
      const question = {country: req.body.country, flagUrl: req.body.flagUrl, hint: req.body.hint}; 

      await FlagDetectiveGame.updateOne({_id: find._id}, {$push:{questions: question}});
      console.log("New Question Added"); 
      req.flash("success", "New Question Added");
      res.redirect(`/admin/flag-detective-game/manage/${req.params.id}/all-questions`); 
    }
    else
    {
      req.flash("error", "Game not found");
      res.redirect(`/admin/flag-detective-game/manage/${req.params.id}/all-questions`); 
    }
}));


// Admin: Edit Question of Flag Detective Game
router.get('/manage/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  const data = await FlagDetectiveGame.findById(req.params.id);
  res.send(data);  
}));

//Admin: Update Question of Flag Detective Game
router.put("/manage/:cid/:pid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {   
   
  var question = {country: req.body.country, flagUrl: req.body.flagUrl, hint: req.body.hint}; 
  await FlagDetectiveGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
 
  // await FlagDetectiveGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.country": req.body.country, "questions.$.flagUrl": req.body.flagUrl, "questions.$.hint": req.body.hint}});
 
  console.log("Question Updated");
  req.flash("success", "Question Updated Successfully");
  res.redirect(`/admin/flag-detective-game/manage/${req.params.pid}/all-questions`); 
}));


//Admin: Delete Question of a Game
router.delete("/manage/:pid/:cid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
  await FlagDetectiveGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
  console.log("Question Deleted Successfully");
  req.flash("success", "Question Deleted Successfully");
  res.redirect(`/admin/flag-detective-game/manage/${req.params.pid}/all-questions`);
}));

//=====================================
// User Activity For Draw Flag Game 
//=====================================

export default router;
