import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import DrawNewFlagModel from "../../models/drawNewFlag.js"; 
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login";

  
//Admin: Draw-New-Flags Page
router.get("/", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await DrawNewFlagModel.find({});
    res.render("Admin/NewFlag/Draw-New-Flags", { data, title: "Create-NewFlag" });
}));
   
//Admin: Draw-New-Flags Page Handel
router.post("/", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
        
    const find = await DrawNewFlagModel.findOne({country: {$regex : req.body.country.toString(), "$options": "i" }});

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
            correctColors: JSON.parse(req.body.selectedColors),
            arrangement: req.body.arrangement
        });
        await newFlag.save();
        console.log("New Flag Added Successfully"); 
        req.flash("success", `New Flag Added Successfully`);
        res.send({url: "/admin/draw-flag-game/add-new-flag"}); 
    }
    else
    {   
        console.log(`${find.country} is already exist`); 
        req.flash("error", `${find.country} is already exist`);
        res.send({url: "/admin/draw-flag-game/add-new-flag"}); 
    }
}));  

// Admin: Edit Flag
router.get('/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await DrawNewFlagModel.findById(req.params.id);
    res.send(data);  
}));
  
//Admin - Edit Game Name
router.put("/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
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
            correctColors: JSON.parse(req.body.selectedColors),
            arrangement: req.body.arrangement
        });
        req.flash("success", `Flag Updated Successfully`);
        res.send({url: "/admin/draw-flag-game/add-new-flag"}); 
    }
    else
    {
        await DrawNewFlagModel.findByIdAndUpdate(req.params.id, {
            country: req.body.country,
            flagUrl: req.body.flagUrl,
            flagDetails: req.body.flagDetails,  
            correctColors: JSON.parse(req.body.selectedColors),
            arrangement: req.body.arrangement
        });
        req.flash("success", `Flag Updated Successfully`);
        res.send({url: "/admin/draw-flag-game/add-new-flag"}); 
    }
}));
 

//Admin - Delete Flag 
router.delete("/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const { id } = req.params;
    await DrawNewFlagModel.findByIdAndDelete(id);
    console.log("Flag Deleted Successfully"); 
    req.flash("success", `Flag Deleted Successfully`);
    res.redirect("/admin/draw-flag-game/add-new-flag");  
}));
  

export default router;
