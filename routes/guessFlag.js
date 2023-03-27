import express, { Router } from "express";
const router = Router();  
import GuessFlagGame from "../models/guessFlag.js";
import connectEnsureLogin from "connect-ensure-login";
import asyncHandler from "express-async-handler";  


//Admin: Fetch all countries Api
router.get("/game-management/create-guess-flag-game/allCountries", asyncHandler( async(req, res) => {
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
router.get("/game-management/create-guess-flag-game", asyncHandler(async (req, res) => { 
    res.render("Admin/AddGuessFlagsGame");
}));

//Admin: Create-Guess-Flag Handel
router.post("/game-management/create-guess-flag-game", asyncHandler(async (req, res) => { 

    const find = await GuessFlagGame.findOne({gameName: {$regex : req.body.gameName.toString(), "$options": "i" }});
  
    if(!find)
    {  
        var correctFileName = Date.now() + '-' + req.files.correctImg.name;
        const newPath1  = path.join(process.cwd(), '/public/upload-images', correctFileName);
        req.files.correctImg.mv(newPath1);

        var IcorrectFileName = Date.now() + '-' + req.files.IcorrectImg.name;
        const newPath2  = path.join(process.cwd(), '/public/upload-images', IcorrectFileName);
        req.files.IcorrectImg.mv(newPath2);
  
        if(typeof(req.body.country) == "string")
        {  
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
                country: req.body.country, 
                Icountry: req.body.Icountry, 
                correctImg: correctFileName, 
                IcorrectImg: IcorrectFileName, 
                questionDetail: req.body.questionDetail
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
router.get("/game-management/manage-guess-flag-game", asyncHandler(async (req, res) => { 
    res.render("Admin/ManageGuessFlagGame");
}));

//Admin Leavel-Guess-Flag page
router.get("/game-management/manage-guess-flag-game/:id/all-questions", asyncHandler(async (req, res) => { 
    res.render("Admin/AllGuessFlagsGames");
}));


export default router;