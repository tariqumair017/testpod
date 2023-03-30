import express, { Router } from "express";
const router = Router();  
import path from "path";  
import GuessFlagGame from "../models/guessFlag.js";
import connectEnsureLogin from "connect-ensure-login";
import asyncHandler from "express-async-handler";  


//=====================================
// Admin Side Routes 
//=====================================

//Admin: Fetch all countries Api
router.get("/game-management/create-guess-flag-game/allCountries", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler( async(req, res, next) => {
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

//Admin Create-Guess-Flag page
router.get("/game-management/create-guess-flag-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/AddGuessFlagsGame");
}));

//Admin: Create-Guess-Flag Handel
router.post("/game-management/create-guess-flag-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 

    const find = await GuessFlagGame.findOne({gameName: {$regex : req.body.gameName.toString(), "$options": "i" }});
  
    if(!find)
    {  
        if(typeof(req.body.country) == "string")
        {  
            var correctFileName = Date.now() + '-' + req.files.correctImg.name;
            const newPath1  = path.join(process.cwd(), '/public/upload-images', correctFileName);
            req.files.correctImg.mv(newPath1);
    
            var IcorrectFileName = Date.now() + '-' + req.files.IcorrectImg.name;
            const newPath2  = path.join(process.cwd(), '/public/upload-images', IcorrectFileName);
            req.files.IcorrectImg.mv(newPath2);

          var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: correctFileName, IcorrectImg: IcorrectFileName, questionDetail: req.body.questionDetail}; 
          const singleGame = new GuessFlagGame({
              gameName: req.body.gameName,
              level: req.body.level,
              gameDetail: req.body.gameDetail, 
              questions: question
          });
          await singleGame.save();
          console.log("GuessFlagGame Added Successfully"); 
          res.redirect("/game-management/manage-guess-flag-game");
        }
        else if(typeof(req.body.country) == "object")
        {
          const newQuestions = [];
          for (let i = 0; i < req.body.country.length; i++) {  

            var correctFileName = Date.now() + '-' + req.files.correctImg[i].name;
            const newPath1  = path.join(process.cwd(), '/public/upload-images', correctFileName);
            req.files.correctImg[i].mv(newPath1);

            var IcorrectFileName = Date.now() + '-' + req.files.IcorrectImg[i].name;
            const newPath2  = path.join(process.cwd(), '/public/upload-images', IcorrectFileName);
            req.files.IcorrectImg[i].mv(newPath2);  

              const newQuestion = {
                country: req.body.country[i], 
                Icountry: req.body.Icountry[i], 
                correctImg: correctFileName, 
                IcorrectImg: IcorrectFileName, 
                questionDetail: req.body.questionDetail[i]
            }; 
  
              newQuestions.push(newQuestion);
          }
          const newGame = new GuessFlagGame({
            gameName: req.body.gameName,
            level: req.body.level,
            gameDetail: req.body.gameDetail, 
            questions: newQuestions
        });
          await newGame.save(); 
          console.log("Multiple GuessFlagGame Added Successfully"); 
          res.redirect("/game-management/manage-guess-flag-game");
        }  
    }
    else
    {   
        req.flash("error", `${find.gameName} is already exist`);
        res.redirect("/game-management/create-guess-flag-game"); 
    }
}));
    

//Admin Manage-Guess-Flag page
router.get("/game-management/manage-guess-flag-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await GuessFlagGame.find({});
    res.render("Admin/ManageGuessFlagGame", { data });
}));

//Admin - Delete Whole Guess Flag Game
router.delete("/game-management/manage-guess-flag-game/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const { id } = req.params;
    await GuessFlagGame.findByIdAndDelete(id);
    console.log("GuessFlagGame Deleted Successfully");  
    req.flash("success", `Game Deleted Successfully`);
    res.send({url: "/game-management/manage-guess-flag-game"}); 
}));

//Admin: Show All Questions of Guess Flag Game
router.get("/game-management/manage-guess-flag-game/:id/all-questions", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await GuessFlagGame.findById(req.params.id); 
    if(!data)
    {
      req.flash("error", "Game not found");
      return res.redirect("/game-management/manage-guess-flag-game");
    }
    res.render("Admin/AllGuessFlagsGames", { data }); 
}));

//Admin - Edit Game Name
router.put("/game-management/manage-guess-flag-game/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    await GuessFlagGame.updateOne({_id: req.params.id}, {$set:{"gameName": req.body.gameName}});
    res.redirect(`/game-management/manage-guess-flag-game/${req.params.id}/all-questions`); 
}));

// Admin: Add new Question in Game
router.post('/game-management/manage-guess-flag-game/:id/new', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  
    var find = await GuessFlagGame.findById(req.params.id);
  
      if(find)
      { 
        var correctFileName = Date.now() + '-' + req.files.correctImg.name;
        const newPath1  = path.join(process.cwd(), '/public/upload-images', correctFileName);
        req.files.correctImg.mv(newPath1);

        var IcorrectFileName = Date.now() + '-' + req.files.IcorrectImg.name;
        const newPath2  = path.join(process.cwd(), '/public/upload-images', IcorrectFileName);
        req.files.IcorrectImg.mv(newPath2);

        var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: correctFileName, IcorrectImg: IcorrectFileName, questionDetail: req.body.questionDetail}; 
          
        await GuessFlagGame.updateOne({_id: find._id}, {$push:{questions: question}});
        console.log("New Question Added"); 
        req.flash("success", "New Question Added");
        res.redirect(`/game-management/manage-guess-flag-game/${req.params.id}/all-questions`); 
      }
      else
      {
        req.flash("error", "Game not found");
        res.redirect(`/game-management/manage-guess-flag-game/${req.params.id}/all-questions`); 
      }
}));


 // Admin: Edit Question of a Guess Flag Game
 router.get('/game-management/manage-guess-flag-game/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await GuessFlagGame.findById(req.params.id);
    res.send(data);  
}));
  
//Admin: Update Question of a Game
router.put("/game-management/manage-guess-flag-game/:cid/:pid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {   
    var question;
    if(req.files)
    {
        var correctFileName = Date.now() + '-' + req.files.correctImg.name;
        const newPath1  = path.join(process.cwd(), '/public/upload-images', correctFileName);
        req.files.correctImg.mv(newPath1);

        var IcorrectFileName = Date.now() + '-' + req.files.IcorrectImg.name;
        const newPath2  = path.join(process.cwd(), '/public/upload-images', IcorrectFileName);
        req.files.IcorrectImg.mv(newPath2);

        question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: correctFileName, IcorrectImg: IcorrectFileName, questionDetail: req.body.questionDetail}; 
        await GuessFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
    }
    else
    {
      await GuessFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.country": req.body.country, "questions.$.Icountry": req.body.Icountry, "questions.$.questionDetail": req.body.questionDetail}});
    }
   
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/game-management/manage-guess-flag-game/${req.params.pid}/all-questions`); 
}));


//Admin: Delete Question of Game
router.delete("/game-management/manage-guess-flag-game/:pid/:cid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
    await GuessFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Question Deleted Successfully");
    req.flash("success", "Question Deleted Successfully");
    res.redirect(`/game-management/manage-guess-flag-game/${req.params.pid}/all-questions`);
}));
  

//=====================================
// Client Side Routes 
//=====================================



//=====================================
// User Activity For Draw Flag Game 
//=====================================


export default router;