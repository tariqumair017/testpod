import express, { Router } from "express";
const router = Router();
import path from "path";  
import FlagDetectiveGame from "../../models/flagDetectiveGame.js"; 
import asyncHandler from "express-async-handler";
import middleware from "../../middleware/index.js";


//Admin: Create Flag Detective Game Page
router.get("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
    res.render("Admin/FlagDetectiveGame/AddFlagDetectiveGame", { title: "Create-FlagDetectiveGame" });
}));

//Admin: Create Flag Detective Game Handel
router.post("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
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
  } catch (error) {
    return next(error.message);
  }
}));
 
//Admin: Search Region Api for Manage Page
router.get("/search/:continent", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const data = await FlagDetectiveGame.find({continent: req.params.continent}); 
    res.send(data); 
  } catch (error) {
    return next(error.message);
  }
}));
 
//Admin: Manage Flag Detective Game Page
router.get("/manage", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await FlagDetectiveGame.find({});
    res.render("Admin/FlagDetectiveGame/ManageFlagDetectiveGame", { data, title: "Manage-FlagDetectiveGame" });
  } catch (error) {
    return next(error.message);
  }
}));

//Admin - Delete Flag Detective Game
router.delete("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const { id } = req.params;
    await FlagDetectiveGame.findByIdAndDelete(id);
    console.log("FlagDetectiveGame Deleted Successfully");  
    res.send({url: "/admin/flag-detective-game/manage"});
  } catch (error) {
    return next(error.message);
  } 
}));
 
//Admin: Show All Questions of Flag Detective Game 
router.get("/manage/:id/all-questions", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {
  try {
    const data = await FlagDetectiveGame.findById(req.params.id); 
    if(!data)
    {
      req.flash("error", "Cannot find this Game!");
      return res.redirect("/admin/flag-detective-game/manage");
    } 
    res.render("Admin/FlagDetectiveGame/AllFlagDetectiveGame", { data, title: "Manage-FlagDetectiveGame-Questions" });
  } catch (error) {
    return next(error.message);
  }
}));

//Admin - Edit Game Name
// router.put("/manage/:id", asyncHandler(async (req, res, next) => { 
//   await FlagDetectiveGame.updateOne({_id: req.params.id}, {$set:{"continent": req.body.continent}});
//   res.redirect(`/admin/flag-detective-game/manage/${req.params.id}/all-questions`); 
// }));

// Admin: Add new Question in Game
router.post('/manage/:id/new', middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
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
  } catch (error) {
    return next(error.message);
  }
}));


//Admin: Update Question of Flag Detective Game
router.put("/manage/:cid/:pid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {   
  try {
    var question = {country: req.body.country, flagUrl: req.body.flagUrl, hint: req.body.hint}; 
    await FlagDetectiveGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
   
    // await FlagDetectiveGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.country": req.body.country, "questions.$.flagUrl": req.body.flagUrl, "questions.$.hint": req.body.hint}});
   
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/admin/flag-detective-game/manage/${req.params.pid}/all-questions`); 
  } catch (error) {
    return next(error.message);
  }
}));


//Admin: Delete Question of a Game
router.delete("/manage/:pid/:cid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    await FlagDetectiveGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Question Deleted Successfully");
    req.flash("success", "Question Deleted Successfully");
    res.redirect(`/admin/flag-detective-game/manage/${req.params.pid}/all-questions`);
  } catch (error) {
    return next(error.message);
  }
}));

//=====================================
// User Activity For Draw Flag Game 
//=====================================

export default router;
