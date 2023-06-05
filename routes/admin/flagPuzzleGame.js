import express, { Router } from "express";
const router = Router();
import AllFlagsData from "../../models/allFlagsData.js";
import FlagPuzzleGame from "../../models/flagPuzzleGame.js"; 
import asyncHandler from "express-async-handler";
import middleware from "../../middleware/index.js";


//Admin: Distinct Region form All Flags Data
router.get("/all-flags-data", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await AllFlagsData.distinct("region"); 
    res.send(data);
  } catch (error) {
    return next(error.message);
  }
}));
 
//Admin: Find All Countries of Selected Region from All Flags Data
router.get("/all-flags-data/country/:region", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const data = await AllFlagsData.find({region: req.params.region});
    res.send(data);
  } catch (error) {
    return next(error.message);
  }
}));

//Admin: Find Flag of selected Country from All Flags Data
router.get("/all-flags-data/country-for-flag/:country", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const data = await AllFlagsData.findOne({country: req.params.country});
    res.send(data);
  } catch (error) {
    return next(error.message);
  }
}));

//Admin: Create Flag Puzzle Game Page
router.get("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  res.render("Admin/FlagPuzzleGame/AddPuzzleGame", {title: "Create-PuzzleGame"});
}));

//Admin: Create Flag Puzzle Game Handel
router.post("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const find = await FlagPuzzleGame.findOne({region: req.body.region, level: req.body.level});

    if(!find)
    {  
        if(typeof(req.body.country) == "string")
        { 
          var question = {country: req.body.country, flag: req.body.flag}; 
            const singleGame = new FlagPuzzleGame({
                region: req.body.region,
                level: req.body.level, 
                questions: question
            });
            await singleGame.save();
            console.log("Single FlagPuzzleGame Added Successfully"); 
            res.redirect("/admin/flag-puzzle-game/manage"); 
        }
        else if(typeof(req.body.country) == "object")
        {
          const newGame = new FlagPuzzleGame({
            region: req.body.region,
            level: req.body.level
          });  

          for (let i = 0; i < req.body.country.length; i++) { 
              const newQuestion = {
                country: req.body.country[i], 
                flag: req.body.flag[i], 
              }; 
              newGame.questions.push(newQuestion);  
          }        

          await newGame.save();
          console.log("Multiple FlagPuzzleGame Added Successfully"); 
          res.redirect("/admin/flag-puzzle-game/manage");
        }  
    }
    else
    {   
        req.flash("error", `${find.region.toUpperCase()} with Selected level is already exist`);
        res.redirect("/admin/flag-puzzle-game/add"); 
    }
  } catch (error) {
    return next(error.message);
  }
})); 

//Admin: Search Region Api for Manage Page
router.get("/search/:region", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const data = await FlagPuzzleGame.find({region: req.params.region}); 
    res.send(data); 
  } catch (error) {
    return next(error.message);
  }
}));

//Admin: Manage Flag Puzzle Game Page
router.get("/manage", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await FlagPuzzleGame.find({});
    res.render("Admin/FlagPuzzleGame/ManagePuzzleFlagGame", { data, title: "Manage-PuzzleGame" });
  } catch (error) {
    return next(error.message);
  }
}));

//Admin - Delete Flag Puzzle Game
router.delete("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const { id } = req.params;
    await FlagPuzzleGame.findByIdAndDelete(id);
    console.log("FlagPuzzleGame Deleted Successfully");  
    req.flash("success", `Game Deleted Successfully`);
    res.send({url: "/admin/flag-puzzle-game/manage"});
  } catch (error) {
    return next(error.message);
  } 
}));

//Admin: Show All Questions of Flag Puzzle Game 
router.get("/manage/:id/all-questions", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {
  try {
    const data = await FlagPuzzleGame.findById(req.params.id); 
    if(!data)
    {
      req.flash("error", "Cannot find this Game!");
      return res.redirect("/admin/flag-puzzle-game/manage");
    } 
    res.render("Admin/FlagPuzzleGame/AllPuzzleFlagGame", { data, title: "Manage-PuzzleGame-Questions" });
  } catch (error) {
    return next(error.message);
  }
}));
  
 
// Admin: Add new Question in Game
router.post('/manage/:id/new', middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    var find = await FlagPuzzleGame.findById(req.params.id);

    if(find)
    {  
      const question = {country: req.body.country, flag: req.body.flag}; 

      await FlagPuzzleGame.updateOne({_id: find._id}, {$push:{questions: question}});
      console.log("New Question Added"); 
      req.flash("success", "New Question Added");
      res.redirect(`/admin/flag-puzzle-game/manage/${req.params.id}/all-questions`); 
    }
    else
    {
      req.flash("error", "Game not found");
      res.redirect(`/admin/flag-puzzle-game/manage/${req.params.id}/all-questions`); 
    }
  } catch (error) {
    return next(error.message);
  }
}));

//Admin: Update Question of Flag Puzzle Game
router.put("/manage/:cid/:pid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {   
  try {
    var question = {country: req.body.country, flag: req.body.flag}; 
    await FlagPuzzleGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
    
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/admin/flag-puzzle-game/manage/${req.params.pid}/all-questions`);
  } catch (error) {
    return next(error.message);
  }
}));

//Admin: Delete Question of a Game
router.delete("/manage/:pid/:cid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    await FlagPuzzleGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Question Deleted Successfully");
    req.flash("success", "Question Deleted Successfully");
    res.redirect(`/admin/flag-puzzle-game/manage/${req.params.pid}/all-questions`)
  } catch (error) {
    return next(error.message);
  };
}));


export default router;
