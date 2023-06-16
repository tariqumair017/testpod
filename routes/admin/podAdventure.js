import express, { Router } from "express";
const router = Router();  
import path from "path";  
import AWS from "aws-sdk"; 
import PodAdventureGame from "../../models/podAdventure.js"; 
import asyncHandler from "express-async-handler";  
import middleware from "../../middleware/index.js";

 
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }); 


//Admin Create-Pod-Adventure-Game Step1
router.get("/add/step1", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
    res.render("Admin/PodAdventure/AddPodAdventureStep1", {title: "Create-PodAdventure-Step1"});
}));

//Admin: Create-Pod-Adventure-Game Step1 Handel
router.post("/add/step1", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
        req.body.unit = req.body.unit.toLowerCase();
        const arr = req.body.unit.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); 
        }
        let currentUnit = arr.join(" ");

        const unitExist = await PodAdventureGame.findOne({unit: currentUnit});
        if(unitExist)
        {
          req.flash("error", `${req.body.unit} is already exist`);
          return res.redirect("/admin/pod-adventure/add/step1"); 
        }

        // const unitAndModuleExist = await PodAdventureGame.findOne({unit: req.body.unit, modules: req.body.module});
        // if(unitAndModuleExist)
        // { 
        //   res.redirect("/admin/pod-adventure/add/step2"); 
        // }

        const newGame = new PodAdventureGame({
          unit: currentUnit
        });   
        newGame.modules.push(req.body.module);
 
        if(req.body.module == "flag quest game"){             
          for (let i = 0; i < req.body.country.length; i++) {
            let incorrectFlagsUrl = [];
            for (let j = 0; j < req.files[`IcorrectImg[${i}]`].length; j++) { 
              try {
                await s3.upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: "pod-adventure/" + req.files[`IcorrectImg[${i}]`][j]['name'],
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
            const newQuestion = {country: req.body.country[i], Icountry: req.body.Icountry[i], correctImg: req.body.correctImg[i], IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint[i], detail: req.body.detail[i], region: req.body.region};           
            newGame.flagQuest.push(newQuestion); 
          }
          await newGame.save();
          console.log("PodAdventureGame Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step2/${newGame.unit.toLowerCase().replace(/\s/g, '-')}`);
        }
        else if(req.body.module == "guess country game"){
          for (let i = 0; i < req.body.country.length; i++) {   
                const newQuestion = {
                  country: req.body.country[i], 
                  flag: req.body.flag[i], 
                  optionA: req.body.optionA[i], 
                  optionB: req.body.optionB[i],  
                  correct: req.body.correct[i], 
                  hint: req.body.hint[i],
                  detail: req.body.detail[i],
                  region: req.body.region
                } 
                newGame.guessCountry.push(newQuestion); 
          }
  
          await newGame.save(); 
          console.log("PodAdventureGame Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step2/${newGame.unit.toLowerCase().replace(/\s/g, '-')}`);
        }
        else if(req.body.module == "guess flag game"){

          for (let i = 0; i < req.body.country.length; i++) { 
              await s3.upload({
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: `pod-adventure/${req.files.IcorrectImg[i].name}`,
                  Body: req.files.IcorrectImg[i].data,
                  ContentType: req.files.IcorrectImg[i].mimetype,
                  ACL: 'public-read'
                }).promise().then((data) => { 
                  const newQuestion = {
                    country: req.body.country[i], 
                    Icountry: req.body.Icountry[i], 
                    correctImg: req.body.correctImg[i], 
                    IcorrectImg: data.Location, 
                    hint: req.body.hint[i],
                    detail: req.body.detail[i],
                    region: req.body.region
                  }; 
                  newGame.guessFlag.push(newQuestion); 
                });  
          }        

          await newGame.save(); 
          console.log("PodAdventureGame Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step2/${newGame.unit.toLowerCase().replace(/\s/g, '-')}`);
        }
        else if(req.body.module == "flag detective game"){
 
          for (let i = 0; i < req.body.country.length; i++) {  
              const newQuestion = {
                country: req.body.country[i], 
                flagUrl: req.body.flagUrl[i],
                hint: req.body.hint[i], 
                detail: req.body.detail[i],
                region: req.body.region
              } 
              newGame.flagDetective.push(newQuestion);
          } 

          await newGame.save(); 
          console.log("PodAdventureGame Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step2/${newGame.unit.toLowerCase().replace(/\s/g, '-')}`);
        }
        else if(req.body.module == "flag puzzle game"){
           
          for (let i = 0; i < req.body.country.length; i++) { 
            const newQuestion = {
              country: req.body.country[i], 
              flag: req.body.flag[i], 
              hint: req.body.hint[i],
              detail: req.body.detail[i],
              region: req.body.region
            }; 
            
            newGame.flagPuzzle.push(newQuestion);
          }   

          await newGame.save(); 
          console.log("PodAdventureGame Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step2/${newGame.unit.toLowerCase().replace(/\s/g, '-')}`); 
        }
 
  } catch (error) {
    return next(error.message);
  }
}));

//Admin Create-Pod-Adventure-Game Step2
router.get("/add/step2/:unit", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  var currentUnit = req.params.unit.replace(/-/g," ");
  const arr = currentUnit.split(" ");
  for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); 
  }
  currentUnit = arr.join(" ");
  
  const unitExist = await PodAdventureGame.findOne({unit: currentUnit});
  if(!unitExist)
  { 
    return res.redirect("/admin/pod-adventure/add/step1"); 
  }
  
  if(unitExist.modules.length >= 2)
  {
    return res.redirect(`/admin/pod-adventure/add/step3/${unitExist.unit.toLowerCase().replace(/\s/g, '-')}`);
  }
  
  res.render("Admin/PodAdventure/AddPodAdventureStep2", { data: unitExist, title: "Create-PodAdventure-Step2"});
}));

//Admin: Create-Pod-Adventure-Game Step2 Handel
router.post("/add/step2", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
        req.body.unit = req.body.unit.toLowerCase();
        const arr = req.body.unit.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); 
        }
        let currentUnit = arr.join(" ");

        const unitExist = await PodAdventureGame.findOne({unit: currentUnit});
        if(!unitExist)
        {
          req.flash("error", `Unit not found`);
          return res.redirect(`/admin/pod-adventure/add/step2/${currentUnit.toLowerCase().replace(/\s/g, '-')}`); 
        }

        // const unitAndModuleExist = await PodAdventureGame.findOne({unit: req.body.unit, modules: req.body.module});
        // if(unitAndModuleExist)
        // { 
        //   res.redirect("/admin/pod-adventure/add/step2"); 
        // }
 
        unitExist.modules.push(req.body.module);
 
        if(req.body.module == "flag quest game"){             
          for (let i = 0; i < req.body.country.length; i++) {
            let incorrectFlagsUrl = [];
            for (let j = 0; j < req.files[`IcorrectImg[${i}]`].length; j++) { 
              try {
                await s3.upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: "pod-adventure/" + req.files[`IcorrectImg[${i}]`][j]['name'],
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
            const newQuestion = {country: req.body.country[i], Icountry: req.body.Icountry[i], correctImg: req.body.correctImg[i], IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint[i], detail: req.body.detail[i], region: req.body.region};           
            unitExist.flagQuest.push(newQuestion); 
          }
          await unitExist.save();
          console.log("PodAdventureGame Step2 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step3/${unitExist.unit.toLowerCase().replace(/\s/g, '-')}`);
        }
        else if(req.body.module == "guess country game"){
          for (let i = 0; i < req.body.country.length; i++) {   
                const newQuestion = {
                  country: req.body.country[i], 
                  flag: req.body.flag[i], 
                  optionA: req.body.optionA[i], 
                  optionB: req.body.optionB[i],  
                  correct: req.body.correct[i], 
                  hint: req.body.hint[i],
                  detail: req.body.detail[i],
                  region: req.body.region
                } 
                unitExist.guessCountry.push(newQuestion); 
          }
  
          await unitExist.save(); 
          console.log("PodAdventureGame Step2 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step3/${unitExist.unit.toLowerCase().replace(/\s/g, '-')}`);
        }
        else if(req.body.module == "guess flag game"){

          for (let i = 0; i < req.body.country.length; i++) { 
              await s3.upload({
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: `pod-adventure/${req.files.IcorrectImg[i].name}`,
                  Body: req.files.IcorrectImg[i].data,
                  ContentType: req.files.IcorrectImg[i].mimetype,
                  ACL: 'public-read'
                }).promise().then((data) => { 
                  const newQuestion = {
                    country: req.body.country[i], 
                    Icountry: req.body.Icountry[i], 
                    correctImg: req.body.correctImg[i], 
                    IcorrectImg: data.Location, 
                    hint: req.body.hint[i],
                    detail: req.body.detail[i],
                    region: req.body.region
                  }; 
                  unitExist.guessFlag.push(newQuestion); 
                });  
          }        

          await unitExist.save(); 
          console.log("PodAdventureGame Step2 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step3/${unitExist.unit.toLowerCase().replace(/\s/g, '-')}`);
        }
        else if(req.body.module == "flag detective game"){
 
          for (let i = 0; i < req.body.country.length; i++) {  
              const newQuestion = {
                country: req.body.country[i], 
                flagUrl: req.body.flagUrl[i],
                hint: req.body.hint[i], 
                detail: req.body.detail[i],
                region: req.body.region
              } 
              unitExist.flagDetective.push(newQuestion);
          } 

          await unitExist.save(); 
          console.log("PodAdventureGame Step2 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step3/${unitExist.unit.toLowerCase().replace(/\s/g, '-')}`);
        }
        else if(req.body.module == "flag puzzle game"){
           
          for (let i = 0; i < req.body.country.length; i++) { 
            const newQuestion = {
              country: req.body.country[i], 
              flag: req.body.flag[i], 
              hint: req.body.hint[i],
              detail: req.body.detail[i],
              region: req.body.region
            }; 
            
            unitExist.flagPuzzle.push(newQuestion);
          }   

          await unitExist.save(); 
          console.log("PodAdventureGame Step2 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/add/step3/${unitExist.unit.toLowerCase().replace(/\s/g, '-')}`);
        }
 
  } catch (error) {
    return next(error.message);
  }
}));

//Admin Create-Pod-Adventure-Game Step3
router.get("/add/step3/:unit", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  var currentUnit = req.params.unit.replace(/-/g," ");
  const arr = currentUnit.split(" ");
  for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); 
  }
  currentUnit = arr.join(" ");
  
  const unitExist = await PodAdventureGame.findOne({unit: currentUnit});
  if(!unitExist)
  { 
    return res.redirect("/admin/pod-adventure/add/step1"); 
  }

  if(unitExist.modules.length >= 3)
  {
    return res.redirect(`/admin/pod-adventure/add/step1`);
  }

  res.render("Admin/PodAdventure/AddPodAdventureStep3", { data: unitExist, title: "Create-PodAdventure-Step3"});
}));
     
//Admin: Create-Pod-Adventure-Game Step2 Handel
router.post("/add/step3", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
        req.body.unit = req.body.unit.toLowerCase();
        const arr = req.body.unit.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); 
        }
        let currentUnit = arr.join(" ");

        const unitExist = await PodAdventureGame.findOne({unit: currentUnit});
        if(!unitExist)
        {
          req.flash("error", `Unit not found`);
          return res.redirect(`/admin/pod-adventure/add/step2/${currentUnit.toLowerCase().replace(/\s/g, '-')}`); 
        }

        // const unitAndModuleExist = await PodAdventureGame.findOne({unit: req.body.unit, modules: req.body.module});
        // if(unitAndModuleExist)
        // { 
        //   res.redirect("/admin/pod-adventure/add/step2"); 
        // }
 
        unitExist.modules.push(req.body.module);
 
        if(req.body.module == "flag quest game"){             
          for (let i = 0; i < req.body.country.length; i++) {
            let incorrectFlagsUrl = [];
            for (let j = 0; j < req.files[`IcorrectImg[${i}]`].length; j++) { 
              try {
                await s3.upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: "pod-adventure/" + req.files[`IcorrectImg[${i}]`][j]['name'],
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
            const newQuestion = {country: req.body.country[i], Icountry: req.body.Icountry[i], correctImg: req.body.correctImg[i], IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint[i], detail: req.body.detail[i], region: req.body.region};           
            unitExist.flagQuest.push(newQuestion); 
          }
          await unitExist.save();
          console.log("PodAdventureGame Step3 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/manage`);
        }
        else if(req.body.module == "guess country game"){
          for (let i = 0; i < req.body.country.length; i++) {   
                const newQuestion = {
                  country: req.body.country[i], 
                  flag: req.body.flag[i], 
                  optionA: req.body.optionA[i], 
                  optionB: req.body.optionB[i],  
                  correct: req.body.correct[i], 
                  hint: req.body.hint[i],
                  detail: req.body.detail[i],
                  region: req.body.region
                } 
                unitExist.guessCountry.push(newQuestion); 
          }
  
          await unitExist.save(); 
          console.log("PodAdventureGame Step3 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/manage`);
        }
        else if(req.body.module == "guess flag game"){

          for (let i = 0; i < req.body.country.length; i++) { 
              await s3.upload({
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: `pod-adventure/${req.files.IcorrectImg[i].name}`,
                  Body: req.files.IcorrectImg[i].data,
                  ContentType: req.files.IcorrectImg[i].mimetype,
                  ACL: 'public-read'
                }).promise().then((data) => { 
                  const newQuestion = {
                    country: req.body.country[i], 
                    Icountry: req.body.Icountry[i], 
                    correctImg: req.body.correctImg[i], 
                    IcorrectImg: data.Location, 
                    hint: req.body.hint[i],
                    detail: req.body.detail[i],
                    region: req.body.region
                  }; 
                  unitExist.guessFlag.push(newQuestion); 
                });  
          }        

          await unitExist.save(); 
          console.log("PodAdventureGame Step3 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/manage`);
        }
        else if(req.body.module == "flag detective game"){
 
          for (let i = 0; i < req.body.country.length; i++) {  
              const newQuestion = {
                country: req.body.country[i], 
                flagUrl: req.body.flagUrl[i],
                hint: req.body.hint[i], 
                detail: req.body.detail[i],
                region: req.body.region
              } 
              unitExist.flagDetective.push(newQuestion);
          } 

          await unitExist.save(); 
          console.log("PodAdventureGame Step3 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/manage`);
        }
        else if(req.body.module == "flag puzzle game"){
           
          for (let i = 0; i < req.body.country.length; i++) { 
            const newQuestion = {
              country: req.body.country[i], 
              flag: req.body.flag[i], 
              hint: req.body.hint[i],
              detail: req.body.detail[i],
              region: req.body.region
            }; 
            
            unitExist.flagPuzzle.push(newQuestion);
          }   

          await unitExist.save(); 
          console.log("PodAdventureGame Step3 Added Successfully"); 
          res.redirect(`/admin/pod-adventure/manage`);
        }
 
  } catch (error) {
    return next(error.message);
  }
}));

//Admin: Search Region Api for Manage Page
// router.get("/search/:region",  asyncHandler(async (req, res, next) => {  
//   try {
//     const data = await PodAdventureGame.find({region: req.params.region}); 
//     res.send(data); 
//   } catch (error) {
//     return next(error.message);
//   }
// }));

//Admin Manage-Guess-Flag page
router.get("/manage", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await PodAdventureGame.find({});
    res.render("Admin/PodAdventure/ManagePodAdventure", { data, title: "Manage-PodAdventure" });
  } catch (error) {
    return next(error.message);
  }
}));

//Admin - Delete Whole Guess Flag Game
router.delete("/manage/delete", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const { id } = req.body;
    await PodAdventureGame.findByIdAndDelete(id);
    console.log("PodAdventure Game Deleted Successfully");  
    req.flash("success", `Game Deleted Successfully`);
    res.redirect("/admin/pod-adventure/manage");
  } catch (error) {
    return next(error.message);
  }
}));

//Admin: Show All Questions of PodAdventure Game
router.get("/manage/:id/all-questions", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
      const data = await PodAdventureGame.findById(req.params.id); 
      if(!data)
      {
        req.flash("error", "Game not found");
        return res.redirect("/admin/pod-adventure/manage");
      }
      res.render("Admin/PodAdventure/AllPodAdventure", { data, title: "Manage-PodAdventure-Questions" }); 
    } catch (error) {
      return next(error.message);
    }
}));

//Admin - Edit Game Name
// router.put("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
//     await PodAdventureGame.updateOne({_id: req.params.id}, {$set:{"gameName": req.body.gameName}});
//     res.redirect(`/admin/guess-flag-game/manage/${req.params.id}/all-questions`); 
// }));
  
//Admin: Update Question of a Game
router.put("/manage/:module/:cid/:pid",  asyncHandler(async (req, res, next) => {   
  try { 
    if(req.files)
    { 
      if(req.params.module == 'guess-flag') {
        let key_name = req.body.IcorrectImgDelete.split('/'); 
       
        var params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `pod-adventure/${key_name[key_name.length-1]}`,
        }; 
        await s3.deleteObject(params).promise();
  
        await s3.upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `pod-adventure/${req.files.IcorrectImg.name}`,
          Body: req.files.IcorrectImg.data,
          ContentType: req.files.IcorrectImg.mimetype,
          ACL: 'public-read'
        }).promise().then( async (data) => {
          await PodAdventureGame.findOneAndUpdate({"guessFlag._id": req.params.cid}, {$set:{"guessFlag.$.country": req.body.country, "guessFlag.$.Icountry": req.body.Icountry, "guessFlag.$.correctImg": req.body.correctImg, "guessFlag.$.IcorrectImg": data.Location, "guessFlag.$.hint": req.body.hint, "guessFlag.$.detail": req.body.detail}});
        }); 
      }
    }
    else
    {
      if(req.params.module == 'flag-quest') {
        await PodAdventureGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.country": req.body.country, "questions.$.Icountry": req.body.Icountry, "questions.$.correctImg": req.body.correctImg, "questions.$.hint": req.body.hint}});
      } else if(req.params.module == 'flag-detective') {
        await PodAdventureGame.findOneAndUpdate({"flagDetective._id": req.params.cid}, {$set:{"flagDetective.$.country": req.body.country, "flagDetective.$.flagUrl": req.body.flagUrl, "flagDetective.$.hint": req.body.hint, "flagDetective.$.detail": req.body.detail}});
      } else if(req.params.module == 'flag-puzzle') {
        await PodAdventureGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.country": req.body.country, "questions.$.Icountry": req.body.Icountry, "questions.$.correctImg": req.body.correctImg, "questions.$.hint": req.body.hint}});
      } else if(req.params.module == 'guess-country') {
        await PodAdventureGame.findOneAndUpdate({"guessCountry._id": req.params.cid}, {$set:{"guessCountry.$.country": req.body.country, "guessCountry.$.flag": req.body.flag, "guessCountry.$.optionA": req.body.optionA, "guessCountry.$.optionB": req.body.optionB, "guessCountry.$.correct": req.body.correct, "guessCountry.$.hint": req.body.hint, "guessCountry.$.detail": req.body.detail}});
      } else if(req.params.module == 'guess-flag') {
        await PodAdventureGame.findOneAndUpdate({"guessFlag._id": req.params.cid}, {$set:{"guessFlag.$.country": req.body.country, "guessFlag.$.Icountry": req.body.Icountry, "guessFlag.$.correctImg": req.body.correctImg, "guessFlag.$.hint": req.body.hint, "guessFlag.$.detail": req.body.detail}});
      }
    }
   
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/admin/pod-adventure/manage/${req.params.pid}/all-questions`); 
  } catch (error) {
    return next(error.message);
  }
}));


// Admin: Delete Question of Flag-Quest-Game
router.delete("/manage/:module/:pid/:cid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    if(req.params.module == 'flag-quest') {
      await PodAdventureGame.findOneAndUpdate({"flagQuest._id": req.params.cid}, {$pull:{"flagQuest":{_id: req.params.cid}}});
      console.log("Flag Quest Question Deleted Successfully");
      req.flash("success", "Flag Quest Question Deleted Successfully");
      res.redirect(`/admin/pod-adventure/manage/${req.params.pid}/all-questions`);
    } else if(req.params.module == 'flag-detective') {
      await PodAdventureGame.findOneAndUpdate({"flagDetective._id": req.params.cid}, {$pull:{"flagDetective":{_id: req.params.cid}}});
      console.log("Flag Detective Question Deleted Successfully");
      req.flash("success", "Flag Detective Question Deleted Successfully");
      res.redirect(`/admin/pod-adventure/manage/${req.params.pid}/all-questions`);
    } else if(req.params.module == 'flag-puzzle') {
      await PodAdventureGame.findOneAndUpdate({"flagPuzzle._id": req.params.cid}, {$pull:{"flagPuzzle":{_id: req.params.cid}}});
      console.log("Flag Puzzle Question Deleted Successfully");
      req.flash("success", "Flag Puzzle Question Deleted Successfully");
      res.redirect(`/admin/pod-adventure/manage/${req.params.pid}/all-questions`);
    } else if(req.params.module == 'guess-country') {
      await PodAdventureGame.findOneAndUpdate({"guessCountry._id": req.params.cid}, {$pull:{"guessCountry":{_id: req.params.cid}}});
      console.log("Guess-Country Question Deleted Successfully");
      req.flash("success", "Guess-Country Question Deleted Successfully");
      res.redirect(`/admin/pod-adventure/manage/${req.params.pid}/all-questions`);
    } else if(req.params.module == 'guess-flag') {
      await PodAdventureGame.findOneAndUpdate({"guessFlag._id": req.params.cid}, {$pull:{"guessFlag":{_id: req.params.cid}}});
      console.log("Guess-Flag Question Deleted Successfully");
      req.flash("success", "Guess-Flag Question Deleted Successfully");
      res.redirect(`/admin/pod-adventure/manage/${req.params.pid}/all-questions`);
    }

  } catch (error) {
    return next(error.message);
  }
}));



//=====================================
// User Activity For Draw Flag Game 
//=====================================



export default router;