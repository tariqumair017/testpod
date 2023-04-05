import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import CountryFlagGame from "../../models/guessCountryGame.js";
import LogModel from "../../models/logs.js";
import ResultModel from "../../models/result.js";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login"; 
 
 
//Admin: Add Flag Game Page
router.get("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/GuessCountryGame/AddFlagGame");
}));
  
//Admin: Add Flag Game Handel
router.post("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 

  const find = await CountryFlagGame.findOne({gameName: {$regex : req.body.gameName.toString(), "$options": "i" }});

  if(!find)
  {  
    var testFileName = Date.now() + '-' + req.files.testImg.name;
    const newPath1  = path.join(process.cwd(), '/public/upload-images', testFileName);
    req.files.testImg.mv(newPath1);

    if(typeof(req.body.correct) == "string")
    { 
      var flagFileName = Date.now() + '-' + req.files.flag.name;
      const newPath  = path.join(process.cwd(), '/public/upload-images', flagFileName);
      req.files.flag.mv(newPath);
      const question = {flag: flagFileName, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint}; 
      const singleQuiz = new CountryFlagGame({
        gameName: req.body.gameName,
        gameDetail: req.body.gameDetail, 
        testImg: testFileName,
        questions: question
      });
      await singleQuiz.save();
      console.log("Single Quiz Added Successfully"); 
      res.redirect("/admin/guess-country-game/manage");
    }
    else if(typeof(req.body.correct) == "object")
    {
      const newQuestions = [];
      for (let i = 0; i < req.files.flag.length; i++) {  

        var questionFileName = Date.now() + '-' + req.files.flag[i].name;
        const newPath  = path.join(process.cwd(), '/public/upload-images', questionFileName);
        req.files.flag[i].mv(newPath); 
        
          const newQuestion = {
            flag: questionFileName, 
            optionA: req.body.optionA[i],
            optionB: req.body.optionB[i],
            optionC: req.body.optionC[i],
            optionD: req.body.optionD[i],
            correct: req.body.correct[i],
            hint: req.body.hint[i]
          }
  
        newQuestions.push(newQuestion);
      }
      const newQuiz = new CountryFlagGame({
        gameName: req.body.gameName,
        gameDetail: req.body.gameDetail, 
        testImg: testFileName,
        questions: newQuestions
      });
      await newQuiz.save(); 
      console.log("Multiple Quiz Added Successfully"); 
      res.redirect("/admin/guess-country-game/manage");
    }  
  }
  else
  {   
    req.flash("error", `${find.gameName} is already exist`);
    res.redirect("/admin/guess-country-game/add"); 
  }
}));
  
 
//Admin: Manage Flag Page
router.get("/manage", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await CountryFlagGame.find({});
    res.render("Admin/GuessCountryGame/ManageFlagGames", { data });
  }));
  
//Admin - Delete Whole Flag Game
router.delete("/manage/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  const { id } = req.params;
  await CountryFlagGame.findByIdAndDelete(id);
  console.log("Whole Flag Game Deleted Successfully"); 
  res.send({url: "/admin/guess-country-game/manage"}); 
}));
  
  //Admin: Show All Questions of Game Edit Icon
  router.get("/manage/:id/all-questions", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {
    const data = await CountryFlagGame.findById(req.params.id);
    if(!data)
    {
      req.flash("error", "Game not Found");
      return res.redirect(`/admin/guess-country-game/manage`);
    }
    res.render("Admin/GuessCountryGame/AllFlagsGames", { data });
  }));
  
  //Admin - Edit Game Name
  router.put("/manage/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    await CountryFlagGame.updateOne({_id: req.params.id}, {$set:{"gameName": req.body.gameName}});
    res.redirect(`/admin/guess-country-game/manage/${req.params.id}/all-questions`); 
  }));
  
  // Admin: Add new Question in Game
  router.post('/manage/:id/new', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    
    var find = await CountryFlagGame.findById(req.params.id);
  
      if(find)
      { 
        var questionFileName = Date.now() + '-' + req.files.flag.name;
        const newPath  = path.join(process.cwd(), '/public/upload-images', questionFileName);
        req.files.flag.mv(newPath);
  
        const question = {flag: questionFileName, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint}; 
        await CountryFlagGame.updateOne({_id: find._id}, {$push:{questions: question}});
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
    const data = await CountryFlagGame.findById(req.params.id);
    res.send(data);  
  }));
  
  //Admin: Update Question of a Game
  router.put("/manage/:cid/:pid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {   
    var question;
    if(req.files)
    {
      const flagFileName = Date.now() + '-' + req.files.flag.name;
      const newPath  = path.join(process.cwd(), '/public/upload-images', flagFileName);
      req.files.flag.mv(newPath);
      question = {flag: flagFileName, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint}; 
      await CountryFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
    }
    else
    {
      await CountryFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.optionA": req.body.optionA, "questions.$.optionB": req.body.optionB, "questions.$.optionC": req.body.optionC, "questions.$.optionD": req.body.optionD, "questions.$.correct": req.body.correct, "questions.$.hint": req.body.hint}});
    }
   
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/admin/guess-country-game/manage/${req.params.pid}/all-questions`);
  }));
  
  //Admin: Delete Question of a Game
  router.delete("/manage/:pid/:cid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
    await CountryFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
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
     const findGame = await CountryFlagGame.findById(req.params.id); 
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
     const findGame = await CountryFlagGame.findById(req.params.id); 
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
