import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import DrawFlagGameModel from "../models/drawFlagGame.js";
import DrawNewFlagModel from "../models/drawNewFlag.js";
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login";
import { Console } from "console";
 

//Admin: Get document of selected country
router.get("/game-management/draw-flags-games/countryName/:country", asyncHandler(async (req, res) => { 
  const data = await DrawNewFlagModel.findOne({country: req.params.country});
  res.send(data);
})); 

//Admin: Add Draw Flag Game Page
router.get("/game-management/draw-flags-games", asyncHandler(async (req, res) => { 
  const data = await DrawNewFlagModel.find({});
    res.render("Admin/AddDrawFlagGame", { data });
}));
  
//Admin: Add Draw Flag Game Handel
router.post("/game-management/draw-flags-games", asyncHandler(async (req, res) => { 

const find = await DrawFlagGameModel.findOne({gameName: req.body.gameName});

if(!find)
{  
    var countryFileName = Date.now() + '-' + req.files.countryImg.name;
    const newPath1  = path.join(process.cwd(), '/public/upload-images', countryFileName);
    req.files.countryImg.mv(newPath1);

    // if(typeof(req.body.country) == "string")
    // { 
    // var flagFileName = Date.now() + '-' + req.files.flag.name;
    // const newPath  = path.join(process.cwd(), '/public/upload-images', flagFileName);
    // req.files.flag.mv(newPath);
    var question = {country: req.body.country, flagUrl: req.body.flagUrl, flagDetails: req.body.flagDetails, shapeImg: req.body.shapeImg, correctColors: req.body.correctColors, arrangement: req.body.arrangement}; 
    const singleGame = new DrawFlagGameModel({
        gameName: req.body.gameName,
        gameDetail: req.body.gameDetail,
        countryImg: countryFileName, 
        questions: question
    });
    await singleGame.save();
    console.log("DrawFlagGame Added Successfully"); 
    res.redirect("/game-management/manage-draw-flag-games");
    // }
    // else if(typeof(req.body.country) == "object")
    // {
    // const newQuestions = [];
    // for (let i = 0; i < req.files.flag.length; i++) {   
    //     var questionFileName = Date.now() + '-' + req.files.flag[i].name;
    //     const newPath  = path.join(process.cwd(), '/public/upload-images', questionFileName);
    //     req.files.flag[i].mv(newPath); 
        
    //     const newQuestion = {
    //         country: req.body.country[i], 
    //         flagDetails: req.body.flagDetails[i], 
    //         correctColors: req.body.correctColors[i], 
    //         arrangement: req.body.arrangement[i], 
    //         flag: questionFileName
    //     }

    //     newQuestions.push(newQuestion);
    // }
    // const newGame = new DrawFlagGameModel({
    //     gameName: req.body.gameName,
    //     gameDetail: req.body.gameDetail, 
    //     countryImg: countryFileName, 
    //     questions: newQuestions
    // });
    // await newGame.save(); 
    // console.log("Multiple DrawFlagGame Added Successfully"); 
    // res.redirect("/game-management/draw-flags-games");
    // }  
}
else
{   
    req.flash("error", `${find.gameName} is already exist`);
    res.redirect("/game-management/draw-flags-games"); 
}
}));
  
//Admin: Manage Flag Page
router.get("/game-management/manage-draw-flag-games", asyncHandler(async (req, res) => { 
    const data = await DrawFlagGameModel.find({});
    res.render("Admin/ManageDrawFlagGame", { data });
}));

//Admin: Show All Questions of Game Edit Icon
router.get("/game-management/manage-draw-flags-games/:id/all-questions", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {
  const data = await DrawFlagGameModel.findById(req.params.id);
  res.render("Admin/AllDrawFlagsGames", { data });
}));
  
  //Admin - Delete Whole Flag Game
  // router.delete("/game-management/manage-flags-games/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  //   const { id } = req.params;
  //   await CountryFlagGame.findByIdAndDelete(id);
  //   console.log("Whole Flag Game Deleted Successfully"); 
  //   res.send({url: "/game-management/manage-flags-games"}); 
  // }));
  
  //Admin: Show All Questions of Game Edit Icon
  // router.get("/game-management/manage-flags-games/:id/all-questions", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {
  //   const data = await CountryFlagGame.findById(req.params.id);
  //   res.render("Admin/AllFlagsGames", { data });
  // }));
  
  //Admin - Edit Game Name
  // router.put("/game-management/manage-flags-games/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  //   await CountryFlagGame.updateOne({_id: req.params.id}, {$set:{"gameName": req.body.gameName}});
  //   res.redirect(`/game-management/manage-flags-games/${req.params.id}/all-questions`); 
  // }));
  
  // Admin: Add new Question in Game
  // router.post('/game-management/manage-flags-games/:id/new', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
    
  //   var find = await CountryFlagGame.findById(req.params.id);
  
  //     if(find)
  //     { 
  //       var questionFileName = Date.now() + '-' + req.files.flag.name;
  //       const newPath  = path.join(process.cwd(), '/public/upload-images', questionFileName);
  //       req.files.flag.mv(newPath);
  
  //       const question = {flag: questionFileName, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint}; 
  //       await CountryFlagGame.updateOne({_id: find._id}, {$push:{questions: question}});
  //       console.log("New Question Added"); 
  //       req.flash("success", "New Question Added");
  //       res.redirect(`/game-management/manage-flags-games/${req.params.id}/all-questions`);
  //     }
  //     else
  //     {
  //       req.flash("error", "Game not found");
  //       res.redirect(`/game-management/manage-flags-games/${req.params.id}/all-questions`);
  //     }
  // }));
  
  // Admin: Edit Question of a Game
  // router.get('/game-management/manage-flags-games/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => { 
  //   const data = await CountryFlagGame.findById(req.params.id);
  //   res.send(data);  
  // }));
  
  //Admin: Update Question of a Game
  // router.put("/game-management/manage-flags-games/:cid/:pid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {   
  //   var question;
  //   if(req.files)
  //   {
  //     const flagFileName = Date.now() + '-' + req.files.flag.name;
  //     const newPath  = path.join(process.cwd(), '/public/upload-images', flagFileName);
  //     req.files.flag.mv(newPath);
  //     question = {flag: flagFileName, optionA: req.body.optionA, optionB: req.body.optionB, optionC: req.body.optionC, optionD: req.body.optionD, correct: req.body.correct, hint: req.body.hint}; 
  //     await CountryFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
  //   }
  //   else
  //   {
  //     await CountryFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.optionA": req.body.optionA, "questions.$.optionB": req.body.optionB, "questions.$.optionC": req.body.optionC, "questions.$.optionD": req.body.optionD, "questions.$.correct": req.body.correct, "questions.$.hint": req.body.hint}});
  //   }
   
  //   console.log("Question Updated");
  //   req.flash("success", "Question Updated Successfully");
  //   res.redirect(`/game-management/manage-flags-games/${req.params.pid}/all-questions`);
  // }));
  
  //Admin: Delete Question of a Game
  // router.delete("/game-management/manage-flags-games/:pid/:cid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res) => {  
  //   await CountryFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
  //   console.log("Question Deleted Successfully");
  //   req.flash("success", "Question Deleted Successfully");
  //   res.redirect(`/game-management/manage-flags-games/${req.params.pid}/all-questions`);
  // }));
  


//=====================================
// User Activity For Country Flag Game 
//=====================================
 
// router.post("/track-game/:id", asyncHandler(async (req, res) => {  
//     const { views } = req.body; 
//      //find the Game Using ID
//      const findGame = await CountryFlagGame.findById(req.params.id); 
//      if(findGame.logs)
//      { 
//         const data = await LogModel.updateOne({_id: findGame.logs}, { $inc: { views: 1 }});
//         res.send("Done"); 
//      }
//      else
//      {
//         const newLog = new LogModel({views:views});
//         await newLog.save(); 
//         findGame.logs = newLog._id;
//         await findGame.save();
//         res.send("Done"); 
//      }
// }));
 

//======================
// Game Result
//======================
 
// router.post("/game-result/:id", asyncHandler(async (req, res) => {  
//     const { objToStore } = req.body;  
//      //find the Game Using ID
//      const findGame = await CountryFlagGame.findById(req.params.id); 
//     if(objToStore.attempted == findGame.questions.length)
//     {
//         objToStore.status = "complete";
//     }
//     else
//     {
//         objToStore.status = "Incomplete";
//     }


//     const ResultExist = await ResultModel.findById(req.session.newResultIDForGame);

//     if(!ResultExist)
//     {
//         const newResult = new ResultModel(objToStore);
//         await newResult.save();
//         req.session.newResultIDForGame = newResult._id;
//         //Push newResult to results field in Game
//         await findGame.results.push(newResult);
//         await findGame.save();
//         res.send("Done"); 
//     } 
//     else
//     {
//       await ResultModel.replaceOne({_id: ResultExist._id}, objToStore);
//       res.send("Done"); 
//     }
// }));



export default router;
