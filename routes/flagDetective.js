import express, { Router } from "express";
const router = Router();
import path from "path";  
import FlagDetectiveGame from "../models/flagDetective.js";
import connectEnsureLogin from "connect-ensure-login"; 
import asyncHandler from "express-async-handler";


//=====================================
// Admin Side Routes 
//=====================================


//Admin: Fetch all countries Api
router.get("/game-management/create-flag-detective-game/allCountries/detectiveGame", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler( async(req, res, next) => {
  const options = {
     method: 'GET',
     headers: {
         'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
         'X-RapidAPI-Host': 'ajayakv-rest-countries-v1.p.rapidapi.com'
     }
 };

 fetch('https://api.first.org/data/v1/countries', options)
 .then(res => res.json())
 .then(json => res.send(json.data))
 .catch(err => console.error('error:' + err));
}));

//Admin: Create Flag Detective Game Page
router.get("/game-management/create-flag-detective-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/AddFlagDetectiveGame");
}));

//Admin: Create Flag Detective Game Handel
router.post("/game-management/create-flag-detective-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 

  const find = await FlagDetectiveGame.findOne({continent: req.body.continent, level: req.body.level});

  if(!find)
  {  
    var regionFileName = Date.now() + '-' + req.files.regionImg.name;
    const newPath1  = path.join(process.cwd(), '/public/upload-images', regionFileName);
    req.files.regionImg.mv(newPath1);

    if(typeof(req.body.flagName) == "string")
    { 
      var flagFileName = Date.now() + '-' + req.files.flagImg.name;
      const newPath  = path.join(process.cwd(), '/public/upload-images', flagFileName);
      req.files.flagImg.mv(newPath);
      const question = {flagName: req.body.flagName, hint: req.body.hint, flagImg: flagFileName}; 
      const singleQuestion = new FlagDetectiveGame({
        continent: req.body.continent,
        level: req.body.level, 
        gameDetail: req.body.gameDetail,
        regionImg: regionFileName,
        questions: question
      });
      await singleQuestion.save();
      console.log("Single Quiz Added Successfully"); 
      res.redirect("/game-management/manage-flag-detective-game");
    }
    else if(typeof(req.body.flagName) == "object")
    {
      const newQuestions = [];
      for (let i = 0; i < req.body.flagName.length; i++) {  

        var flagFileName = Date.now() + '-' + req.files.flagImg[i].name;
        const newPath  = path.join(process.cwd(), '/public/upload-images', flagFileName);
        req.files.flagImg[i].mv(newPath);
        
          const newQuestion = {
            flagName: req.body.flagName[i], 
            hint: req.body.hint[i], 
            flagImg: flagFileName
          }
  
        newQuestions.push(newQuestion);
      }
      const newQuiz = new FlagDetectiveGame({
        continent: req.body.continent,
        level: req.body.level, 
        gameDetail: req.body.gameDetail,
        regionImg: regionFileName,
        questions: newQuestions
      });
      await newQuiz.save(); 
      console.log("Multiple Quiz Added Successfully"); 
      res.redirect("/game-management/manage-flag-detective-game");
    }  
  }
  else
  {   
    req.flash("error", `${find.continent.toUpperCase()} with ${find.level.toUpperCase()} level is already exist`);
    res.redirect("/game-management/create-flag-detective-game"); 
  }
}));


//Admin: Manage Flag Detective Game Page
router.get("/game-management/manage-flag-detective-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await FlagDetectiveGame.find({});
    res.render("Admin/ManageFlagDetectiveGame", { data });
}));

//Admin - Delete Flag Detective Game
router.delete("/game-management/manage-flag-detective-game/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  const { id } = req.params;
  await FlagDetectiveGame.findByIdAndDelete(id);
  console.log("FlagDetectiveGame Deleted Successfully");  
  res.send({url: "/game-management/manage-flag-detective-game"}); 
}));
 
//Admin: Show All Questions of Flag Detective Game 
router.get("/game-management/manage-flag-detective-game/:id/all-questions", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {
  const data = await FlagDetectiveGame.findById(req.params.id); 
  if(!data)
  {
    req.flash("error", "Cannot find this Game!");
    return res.redirect("/game-management/manage-flag-detective-game");
  } 
  res.render("Admin/AllFlagDetectiveGame", { data });
}));

//Admin - Edit Game Name
router.put("/game-management/manage-flag-detective-game/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  await FlagDetectiveGame.updateOne({_id: req.params.id}, {$set:{"continent": req.body.continent}});
  res.redirect(`/game-management/manage-flag-detective-game/${req.params.id}/all-questions`); 
}));

// Admin: Add new Question in Game
router.post('/game-management/manage-flag-detective-game/:id/new', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  
  var find = await FlagDetectiveGame.findById(req.params.id);

    if(find)
    {  
      var flagFileName = Date.now() + '-' + req.files.flagImg.name;
      const newPath  = path.join(process.cwd(), '/public/upload-images', flagFileName);
      req.files.flagImg.mv(newPath);
      const question = {flagName: req.body.flagName, hint: req.body.hint, flagImg: flagFileName}; 

      await FlagDetectiveGame.updateOne({_id: find._id}, {$push:{questions: question}});
      console.log("New Question Added"); 
      req.flash("success", "New Question Added");
      res.redirect(`/game-management/manage-flag-detective-game/${req.params.id}/all-questions`); 
    }
    else
    {
      req.flash("error", "Game not found");
      res.redirect(`/game-management/manage-flag-detective-game/${req.params.id}/all-questions`); 
    }
}));


// Admin: Edit Question of Flag Detective Game
router.get('/game-management/manage-flag-detective-game/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  const data = await FlagDetectiveGame.findById(req.params.id);
  res.send(data);  
}));

//Admin: Update Question of Flag Detective Game
router.put("/game-management/manage-flag-detective-game/:cid/:pid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {   
  var question;
  if(req.files)
  {
    var flagFileName = Date.now() + '-' + req.files.flagImg.name;
    const newPath  = path.join(process.cwd(), '/public/upload-images', flagFileName);
    req.files.flagImg.mv(newPath);
    question = {flagName: req.body.flagName, hint: req.body.hint, flagImg: flagFileName}; 
    await FlagDetectiveGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
  }
  else
  {
    await FlagDetectiveGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.flagName": req.body.flagName, "questions.$.hint": req.body.hint}});
  }
 
  console.log("Question Updated");
  req.flash("success", "Question Updated Successfully");
  res.redirect(`/game-management/manage-flag-detective-game/${req.params.pid}/all-questions`); 
}));


//Admin: Delete Question of a Game
router.delete("/game-management/manage-flag-detective-game/:pid/:cid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
  await FlagDetectiveGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
  console.log("Question Deleted Successfully");
  req.flash("success", "Question Deleted Successfully");
  res.redirect(`/game-management/manage-flag-detective-game/${req.params.pid}/all-questions`);
}));
  

//=====================================
// Client Side Routes 
//=====================================



//=====================================
// User Activity For Draw Flag Game 
//=====================================


export default router;
