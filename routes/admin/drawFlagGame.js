import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import DrawFlagGameModel from "../../models/drawFlagGame.js";
import DrawNewFlagModel from "../../models/drawNewFlag.js";
import asyncHandler from "express-async-handler";   
import middleware from "../../middleware/index.js";

//Admin: Get document of selected country
router.get("/game-management/draw-flags-games/countryName/:country", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await DrawNewFlagModel.findOne({country: req.params.country});
    res.send(data);
  } catch (error) {
    return next(error.message);
  }
})); 

//Admin: Add Draw Flag Game Page
router.get("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
    try {
      var data = await DrawNewFlagModel.find({});
      res.render("Admin/DrawFlagGame/AddDrawFlagGame", { data, title: "Create-DrawFlagGame" });
    } catch (error) {
      return next(error.message);
    }
}));
  
//Admin: Add Draw Flag Game Handel
router.post("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const find = await DrawFlagGameModel.findOne({gameName: {$regex : req.body.gameName.toString(), "$options": "i" }});

    if(!find)
    {  
        var countryFileName = '';
        if(req.files)
        {
          countryFileName = Date.now() + '-' + req.files.countryImg.name;
          const newPath1  = path.join(process.cwd(), '/public/upload-images', countryFileName);
          req.files.countryImg.mv(newPath1);
        }

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
          res.redirect("/admin/draw-flag-game/manage");
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
          res.redirect("/admin/draw-flag-game/manage");
        }  
    }
    else
    {   
        req.flash("error", `${find.gameName} is already exist`);
        res.redirect("/admin/draw-flag-game/add"); 
    }
  } catch (error) {
    return next(error.message);
  }
}));
  
//Admin: Manage Flag Page
router.get("/manage", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await DrawFlagGameModel.find({}); 
    res.render("Admin/DrawFlagGame/ManageDrawFlagGame", { data, title: "Manage-DrawFlagGame" });
  } catch (error) {
    return next(error.message);
  }
}));
 
//Admin - Delete Whole Flag Game
router.delete("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const { id } = req.params;
    await DrawFlagGameModel.findByIdAndDelete(id);
    console.log("DrawFlagGame Deleted Successfully");  
    res.send({url: "/admin/draw-flag-game/manage"});
  } catch (error) {
    return next(error.message);
  } 
}));

//Admin: Show All Questions of Game 
router.get("/manage/:id/all-questions", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {
  try {
    const data = await DrawFlagGameModel.findById(req.params.id);
    var allFlags = await DrawNewFlagModel.find({}); 
    if(!data)
    {
      req.flash("error", "Cannot find this Game!");
      return res.redirect("/admin/draw-flag-game/manage");
    } 
    res.render("Admin/DrawFlagGame/AllDrawFlagsGames", {data: data, allFlags: allFlags, title: "Manage-DrawFlagGame-Questions"});
  } catch (error) {
    return next(error.message);
  }
}));
  
//Admin - Edit Game Name
router.put("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    await DrawFlagGameModel.updateOne({_id: req.params.id}, {$set:{"gameName": req.body.gameName}});
    res.redirect(`/admin/draw-flag-game/manage/${req.params.id}/all-questions`);
  } catch (error) {
    return next(error.message);
  }
}));
  
// Admin: Add new Question in Game
router.post('/manage/:id/new', middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    var find = await DrawFlagGameModel.findById(req.params.id);

    if(find)
    { 
      const selectedColors = req.body.correctColors.split(",");
      const question = {country: req.body.country, flagUrl: req.body.flagUrl, flagDetails: req.body.flagDetails, shapeImg: req.body.shapeImg, correctColors: selectedColors, arrangement: req.body.arrangement}; 
      await DrawFlagGameModel.updateOne({_id: find._id}, {$push:{questions: question}});
      console.log("New Question Added"); 
      req.flash("success", "New Question Added");
      res.redirect(`/admin/draw-flag-game/manage/${req.params.id}/all-questions`);
    }
    else
    {
      req.flash("error", "Game not found");
      res.redirect(`/admin/draw-flag-game/manage/${req.params.id}/all-questions`);
    }
  } catch (error) {
    return next(error.message);
  }
}));
  
//Admin: Delete Question of a Game
router.delete("/manage/:pid/:cid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    await DrawFlagGameModel.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Question Deleted Successfully");
    req.flash("success", "Question Deleted Successfully");
    res.redirect(`/admin/draw-flag-game/manage/${req.params.pid}/all-questions`);
  } catch (error) {
    return next(error.message);
  }
}));


//=====================================
// User Activity For Draw Flag Game 
//=====================================
 
// router.post("/track-drawflag-game/:id", asyncHandler(async (req, res, next) => {  
//   const { views } = req.body; 
//    //find the Game Using ID
//    const findGame = await CountryFlagGame.findById(req.params.id); 
//    if(findGame.logs)
//    { 
//       const data = await LogModel.updateOne({_id: findGame.logs}, { $inc: { views: 1 }});
//       res.send("Done"); 
//    }
//    else
//    {
//       const newLog = new LogModel({views:views});
//       await newLog.save(); 
//       findGame.logs = newLog._id;
//       await findGame.save();
//       res.send("Done"); 
//    }
// }));
 

//======================
// Game Result
//======================
 
router.post("/drawflag-game-result/:id", asyncHandler(async (req, res, next) => {  
  try {
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
  } catch (error) {
    return next(error.message);
  }
}));



export default router;
