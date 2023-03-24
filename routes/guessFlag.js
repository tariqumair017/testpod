import express, { Router } from "express";
const router = Router();  
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

    const find = await DrawFlagGameModel.findOne({gameName: {$regex : req.body.gameName.toString(), "$options": "i" }});
  
    if(!find)
    {  
        var countryFileName = Date.now() + '-' + req.files.countryImg.name;
        const newPath1  = path.join(process.cwd(), '/public/upload-images', countryFileName);
        req.files.countryImg.mv(newPath1);
  
        if(typeof(req.body.country) == "string")
        { 
          const selectedColors = req.body.correctColors.split(",");
          var question = {country: req.body.country, flagUrl: req.body.flagUrl, flagDetails: req.body.flagDetails, shapeImg: req.body.shapeImg, correctColors: selectedColors, arrangement: req.body.arrangement}; 
          const singleGame = new DrawFlagGameModel({
              gameName: req.body.gameName,
              gameDetail: req.body.gameDetail,
              countryImg: countryFileName, 
              questions: question
          });
          await singleGame.save();
          console.log("DrawFlagGame Added Successfully"); 
          res.redirect("/game-management/manage-draw-flag-games");
        }
        else if(typeof(req.body.country) == "object")
        {
          const newQuestions = [];
          for (let i = 0; i < req.body.country.length; i++) {   
              const selectedColors = req.body.correctColors[i].split(",");
              const newQuestion = {
                country: req.body.country[i],
                flagUrl: req.body.flagUrl[i], 
                flagDetails: req.body.flagDetails[i], 
                shapeImg: req.body.shapeImg[i], 
                correctColors: selectedColors, 
                arrangement: req.body.arrangement[i]
                }; 
  
              newQuestions.push(newQuestion);
          }
          const newGame = new DrawFlagGameModel({
            gameName: req.body.gameName,
            gameDetail: req.body.gameDetail,
            countryImg: countryFileName, 
            questions: newQuestions
        });
          await newGame.save(); 
          console.log("Multiple DrawFlagGame Added Successfully"); 
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