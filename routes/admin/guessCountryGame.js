import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import GuessCountryGame from "../../models/guessCountryGame.js";
import AllFlagsData from "../../models/allFlagsData.js"; 
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login"; 
 

//Admin: Distinct Region form All Flags Data
router.get("/all-flags-data", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
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
 
//Admin: Add Flag Game Page
router.get("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/GuessCountryGame/AddFlagGame");
}));
  
//Admin: Add Flag Game Handel
router.post("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 

  const find = await GuessCountryGame.findOne({region: req.body.region, level: req.body.level});

  if(!find)
  {    
    if(typeof(req.body.country) == "string")
    { 
      const question = {country: req.body.country, flag: req.body.flag, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint}; 
      const singleQuiz = new GuessCountryGame({
        region: req.body.region,
        level: req.body.level,  
        questions: question
      });
      await singleQuiz.save();
      console.log("Single Quiz Added Successfully"); 
      res.redirect("/admin/guess-country-game/manage");
    }
    else if(typeof(req.body.country) == "object")
    {
      const newQuestions = [];
      for (let i = 0; i < req.body.country.length; i++) {   
        
          const newQuestion = {
            country: req.body.country[i], 
            flag: req.body.flag[i], 
            optionA: req.body.optionA[i], 
            optionB: req.body.optionB[i], 
            optionC: req.body.optionC[i], 
            optionD: req.body.optionD[i], 
            correct: req.body.correct[i], 
            hint: req.body.hint[i]
          }
  
        newQuestions.push(newQuestion);
      }
      const newQuiz = new GuessCountryGame({
        region: req.body.region,
        level: req.body.level,   
        questions: newQuestions
      });
      await newQuiz.save(); 
      console.log("Multiple Quiz Added Successfully"); 
      res.redirect("/admin/guess-country-game/manage");
    }  
  }
  else
  {   
    req.flash("error", `${find.region.toUpperCase()} with ${find.level} level is already exist`);
    res.redirect("/admin/guess-country-game/add"); 
  }
}));
  
 
//Admin: Manage Flag Page
router.get("/manage", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await GuessCountryGame.find({});
    res.render("Admin/GuessCountryGame/ManageFlagGames", { data });
  }));
  
//Admin - Delete Whole Flag Game
router.delete("/manage/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  const { id } = req.params;
  await GuessCountryGame.findByIdAndDelete(id);
  console.log("Whole Flag Game Deleted Successfully"); 
  res.send({url: "/admin/guess-country-game/manage"}); 
}));
  
  //Admin: Show All Questions of Game Edit Icon
  router.get("/manage/:id/all-questions", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {
    const data = await GuessCountryGame.findById(req.params.id);
    if(!data)
    {
      req.flash("error", "Game not Found");
      return res.redirect(`/admin/guess-country-game/manage`);
    }
    res.render("Admin/GuessCountryGame/AllFlagsGames", { data });
  }));
  
  //Admin - Edit Game Name
  // router.put("/manage/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  //   await GuessCountryGame.updateOne({_id: req.params.id}, {$set:{"region": req.body.region}});
  //   res.redirect(`/admin/guess-country-game/manage/${req.params.id}/all-questions`); 
  // }));
  
  // Admin: Add new Question in Game
  router.post('/manage/:id/new', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    
    var find = await GuessCountryGame.findById(req.params.id);
  
      if(find)
      {  
        const question = {country: req.body.country, flag: req.body.flag, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint}; 
        await GuessCountryGame.updateOne({_id: find._id}, {$push:{questions: question}});
        console.log("New Question Added"); 
        req.flash("success", "New Question Added");
        res.redirect(`/admin/guess-country-game/manage/${req.params.id}/all-questions`);
      }
      else
      {
        req.flash("error", "Game not found");
        res.redirect(`/admin/guess-country-game/manage/${req.params.id}/all-questions`);
      }
  }));
  
  // Admin: Edit Question of a Game
  router.get('/manage/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await GuessCountryGame.findById(req.params.id);
    res.send(data);  
  }));
  
  //Admin: Update Question of a Game
  router.put("/manage/:cid/:pid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {   
    const question = {country: req.body.country, flag: req.body.flag, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint}; 
    await GuessCountryGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
  
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/admin/guess-country-game/manage/${req.params.pid}/all-questions`);
  }));
  
  //Admin: Delete Question of a Game
  router.delete("/manage/:pid/:cid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
    await GuessCountryGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Question Deleted Successfully");
    req.flash("success", "Question Deleted Successfully");
    res.redirect(`/admin/guess-country-game/manage/${req.params.pid}/all-questions`);
  }));
  


//=====================================
// User Activity For Country Flag Game 
//=====================================
 
router.post("/track-game/:id", asyncHandler(async (req, res, next) => {  
    const { views } = req.body; 
     //find the Game Using ID
     const findGame = await GuessCountryGame.findById(req.params.id); 
     if(findGame.logs)
     { 
        const data = await LogModel.updateOne({_id: findGame.logs}, { $inc: { views: 1 }});
        res.send("Done"); 
     }
     else
     {
        const newLog = new LogModel({views:views});
        await newLog.save(); 
        findGame.logs = newLog._id;
        await findGame.save();
        res.send("Done"); 
     }
}));
 

//======================
// Game Result
//======================
 
router.post("/game-result/:id", asyncHandler(async (req, res, next) => {  
    const { objToStore } = req.body;  
     //find the Game Using ID
     const findGame = await GuessCountryGame.findById(req.params.id); 
    if(objToStore.attempted == findGame.questions.length)
    {
        objToStore.status = "complete";
    }
    else
    {
        objToStore.status = "Incomplete";
    }


    const ResultExist = await ResultModel.findById(req.session.newResultIDForGame);

    if(!ResultExist)
    {
        const newResult = new ResultModel(objToStore);
        await newResult.save();
        req.session.newResultIDForGame = newResult._id;
        //Push newResult to results field in Game
        await findGame.results.push(newResult);
        await findGame.save();
        res.send("Done"); 
    } 
    else
    {
      await ResultModel.replaceOne({_id: ResultExist._id}, objToStore);
      res.send("Done"); 
    }
})); 


export default router;
