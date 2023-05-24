import express, { Router } from "express";
const router = Router();  
import path from "path";  
import AWS from "aws-sdk";
import FlagQuestGame from "../../models/flagQuestGame.js"; 
import AllFlagsData from "../../models/allFlagsData.js"; 
import asyncHandler from "express-async-handler";  
import middleware from "../../middleware/index.js";
 

try {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
} catch (error) {
  throw new Error(error.message);
}
   
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

 
//Admin Create-Guess-Flag page
router.get("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
    res.render("Admin/FlagQuestGame/AddFlagQuestGame", {title: "Create-FlagQuestGame"});
}));
 
//Admin: Create-Guess-Flag Handel
router.post("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const find = await FlagQuestGame.findOne({region: req.body.region, level: req.body.level});
  
    if(!find)
    {  
        if(typeof(req.body.country) == "string")
        {   
            let incorrectFlagsUrl = [];

            for (let i = 0; i < req.files[`IcorrectImg[0]`].length; i++) { 
                try {
                  await s3.upload({
                      Bucket: process.env.AWS_BUCKET_NAME,
                      Key: `flagQuestGame/${req.files[`IcorrectImg[0]`][i]['name']}`,
                      Body: req.files[`IcorrectImg[0]`][i]['data'],
                      ContentType: req.files[`IcorrectImg[0]`][i]['mimetype'],
                      ACL: 'public-read'
                    }).promise().then((data) => { 
                        incorrectFlagsUrl.push(data.Location);
                    }); 
                } catch (err) {
                  console.log(err)
                }
            }        
 
            var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint}; 
            const singleGame = new FlagQuestGame({
                region: req.body.region,
                level: req.body.level, 
                questions: question
            });
            await singleGame.save();
            console.log("FlagQuestGame Added Successfully"); 
            res.redirect("/admin/flag-quest-game/manage");
          
        }
        else if(typeof(req.body.country) == "object")
        {
          const newGame = new FlagQuestGame({
            region: req.body.region,
            level: req.body.level
          });  
          
          for (let i = 0; i < req.body.country.length; i++) {

            let incorrectFlagsUrl = [];
            
            for (let j = 0; j < req.files[`IcorrectImg[${i}]`].length; j++) { 
              try {
                await s3.upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: "flagQuestGame/" + req.files[`IcorrectImg[${i}]`][j]['name'],
                    Body: req.files[`IcorrectImg[${i}]`][j]['data'],
                    ContentType: req.files[`IcorrectImg[${i}]`][j]['mimetype'],
                    ACL: 'public-read'
                  }).promise().then((data) => { 
                    incorrectFlagsUrl.push(data.Location);
                  }); 
              } catch (err) {
                console.log(err)
              } 
            }

            const newQuestion = {country: req.body.country[i], Icountry: req.body.Icountry[i], correctImg: req.body.correctImg[i], IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint[i]}; 
            newGame.questions.push(newQuestion); 
          }        
 
          await newGame.save();
          console.log("Multiple FlagQuestGame Added Successfully"); 
          res.redirect("/admin/flag-quest-game/manage");
        }  
    }
    else
    {   
        req.flash("error", `${find.region.toUpperCase()} with Selected level is already exist`);
        res.redirect("/admin/flag-quest-game/add"); 
    }
  } catch (error) {
    return next(error.message);
  }
}));
     
//Admin: Search Region Api for Manage Page
router.get("/search/:region", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const data = await FlagQuestGame.find({region: req.params.region}); 
    res.send(data); 
  } catch (error) {
    return next(error.message);
  }
}));

//Admin Manage-Guess-Flag page
router.get("/manage", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await FlagQuestGame.find({});
    res.render("Admin/FlagQuestGame/ManageFlagQuestGame", { data, title: "Manage-FlagQuestGame" });
  } catch (error) {
    return next(error.message);
  }
}));

//Admin - Delete Whole Guess Flag Game
router.delete("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const { id } = req.params;
    await FlagQuestGame.findByIdAndDelete(id);
    console.log("FlagQuestGame Deleted Successfully");  
    req.flash("success", `Game Deleted Successfully`);
    res.send({url: "/admin/flag-quest-game/manage"});
  } catch (error) {
    return next(error.message);
  } 
}));

//Admin: Show All Questions of Guess Flag Game
router.get("/manage/:id/all-questions", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await FlagQuestGame.findById(req.params.id); 
    if(!data)
    {
      req.flash("error", "Game not found");
      return res.redirect("/admin/flag-quest-game/manage");
    }
    res.render("Admin/FlagQuestGame/AllFlagQuestGame", { data, title: "Manage-FlagQuestGame-Questions" }); 
  } catch (error) {
    return next(error.message);
  }
}));

//Admin - Edit Game Name
// router.put("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
//     await FlagQuestGame.updateOne({_id: req.params.id}, {$set:{"gameName": req.body.gameName}});
//     res.redirect(`/admin/flag-quest-game/manage/${req.params.id}/all-questions`); 
// }));

// Admin: Add new Question in Game
router.post('/manage/:id/new', middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
      var find = await FlagQuestGame.findById(req.params.id);
  
      if(find)
      {    
        let incorrectFlagsUrl = [];

        for (let i = 0; i < req.files.IcorrectImg.length; i++) { 
            try {
              await s3.upload({
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: `flagQuestGame/${req.files.IcorrectImg[i]['name']}`,
                  Body: req.files.IcorrectImg[i]['data'],
                  ContentType: req.files.IcorrectImg[i]['mimetype'],
                  ACL: 'public-read'
                }).promise().then((data) => { 
                    incorrectFlagsUrl.push(data.Location);
                }); 
            } catch (err) {
              console.log(err)
            }
        }        

        var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint}; 

        await FlagQuestGame.updateOne({_id: find._id}, {$push:{questions: question}});
        console.log("New Question Added"); 
        req.flash("success", "New Question Added");
        res.redirect(`/admin/flag-quest-game/manage/${req.params.id}/all-questions`);   
      }
      else
      {
        req.flash("error", "Game not found");
        res.redirect(`/admin/flag-quest-game/manage/${req.params.id}/all-questions`); 
      }
  } catch (error) {
    return next(error.message);
  }
}));
  
//Admin: Update Question of a Game
router.put("/manage/:cid/:pid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const updatedGame = await FlagQuestGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.country": req.body.country, "questions.$.Icountry": req.body.Icountry, "questions.$.correctImg": req.body.correctImg, "questions.$.hint": req.body.hint}}); 
  
    if(req.files)
    { 
      var updateQuestion;
      for (let i = 0; i < updatedGame.questions.length; i++) {
        if(req.params.cid == updatedGame.questions[i]._id){
          updateQuestion = updatedGame.questions[i];
        }
      }

      for (let i = 1; i < 4; i++) { 
        let key_name = [];  
        if(req.files[`IcorrectImg[${i}]`] && updateQuestion[`IcorrectImg${i}`] != undefined)
        {
          key_name = updateQuestion[`IcorrectImg${i}`].split('/');
        } 
        
        try { 
          var params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `flagQuestGame/${key_name[key_name.length-1]}`,
          }; 
          await s3.deleteObject(params).promise(); 
        } catch (error) {
          console.log(error);
        }
      }
         

      for (let i = 1; i < 4; i++) {  
        if(req.files[`IcorrectImg[${i}]`])
        {
          try {
            await s3.upload({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `flagQuestGame/${req.files[`IcorrectImg[${i}]`]['name']}`,
                Body: req.files[`IcorrectImg[${i}]`]['data'],
                ContentType: req.files[`IcorrectImg[${i}]`]['mimetype'],
                ACL: 'public-read'
              }).promise().then( async (data) => {  
                  if(i == 1){await FlagQuestGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.IcorrectImg1": data.Location}});}
                  if(i == 2){await FlagQuestGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.IcorrectImg2": data.Location}});}
                  if(i == 3){await FlagQuestGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.IcorrectImg3": data.Location}});}
              }); 
          } catch (err) {
            console.log(err)
          }
        }
      }                   
    } 
   
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/admin/flag-quest-game/manage/${req.params.pid}/all-questions`); 
  } catch (error) {
    return next(error.message);
  }
}));


//Admin: Delete Question of Game
router.delete("/manage/:pid/:cid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    await FlagQuestGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Question Deleted Successfully");
    req.flash("success", "Question Deleted Successfully");
    res.redirect(`/admin/flag-quest-game/manage/${req.params.pid}/all-questions`);
  } catch (error) {
    return next(error.message);
  }
}));



export default router;
