import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import DrawNewFlagModel from "../models/drawNewFlag.js"; 
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login";
import { Console } from "console";
 
 
//Admin: Draw-New-Flags Page
router.get("/game-management/draw-new-flags", asyncHandler(async (req, res) => { 
const data = await DrawNewFlagModel.find({});
    res.render("Admin/Draw-New-Flags", { data });
}));
   
//Admin: Draw-New-Flags Page Handel
router.post("/game-management/draw-new-flags", asyncHandler(async (req, res) => { 

const find = await DrawNewFlagModel.findOne({country: req.body.country});

if(!find)
{    
    var shapeFileName = Date.now() + '-' + req.files.shapeImg.name;
    const newPath  = path.join(process.cwd(), '/public/upload-images', shapeFileName);
    req.files.shapeImg.mv(newPath);

   const newFlag = new DrawNewFlagModel({
        country: req.body.country,
        flagUrl: req.body.flagUrl,
        flagDetails: req.body.flagDetails, 
        shapeImg: shapeFileName,
        correctColors: req.body.correctColors,
        arrangement: req.body.arrangement
    });
    await newFlag.save();
    console.log("New Flag Added Successfully"); 
    req.flash("success", `New Flag Added Successfully`);
    res.redirect("/game-management/draw-new-flags");
}
else
{   
    req.flash("error", `${find.country} is already exist`);
    res.redirect("/game-management/draw-new-flags"); 
}
}));  

// Admin: Edit Flag
router.get('/game-management/draw-new-flags/:id/edit', asyncHandler(async (req, res) => { 
    const data = await DrawNewFlagModel.findById(req.params.id);
    res.send(data);  
}));
  
//Admin - Edit Game Name
router.put("/game-management/draw-new-flags/:id", asyncHandler(async (req, res) => { 
    if(req.files)
    {
        const shapeFileName = Date.now() + '-' + req.files.shapeImg.name;
        const newPath  = path.join(process.cwd(), '/public/upload-images', shapeFileName);
        req.files.shapeImg.mv(newPath);

        await DrawNewFlagModel.findByIdAndUpdate(req.params.id, {
            country: req.body.country,
            flagUrl: req.body.flagUrl,
            flagDetails: req.body.flagDetails, 
            shapeImg: shapeFileName,
            correctColors: req.body.correctColors,
            arrangement: req.body.arrangement
        });
        req.flash("success", `Flag Updated Successfully`);
        res.redirect("/game-management/draw-new-flags");
    }
    else
    {
        await DrawNewFlagModel.findByIdAndUpdate(req.params.id, {
            country: req.body.country,
            flagUrl: req.body.flagUrl,
            flagDetails: req.body.flagDetails,  
            correctColors: req.body.correctColors,
            arrangement: req.body.arrangement
        });
        req.flash("success", `Flag Updated Successfully`);
        res.redirect("/game-management/draw-new-flags");
    }
}));
 

//Admin - Delete Flag 
router.delete("/game-management/draw-new-flags/:id", asyncHandler(async (req, res) => { 
    const { id } = req.params;
    await DrawNewFlagModel.findByIdAndDelete(id);
    console.log("Flag Deleted Successfully"); 
    req.flash("success", `Flag Deleted Successfully`);
    res.redirect("/game-management/draw-new-flags");  
}));
  

export default router;
