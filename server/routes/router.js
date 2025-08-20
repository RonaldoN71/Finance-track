const express = require("express");
const userdb = require("../models/Usermodel.js");

const router = express.Router();
router.get("/getAllByUserID/:userId",async(req,res)=>{
    try{
        const userId = req.params.userId;
        const records = await userdb.find({userId:userId});

        if(records.length !==0){
            res.status(200).send(records);
        }else{
            return res.status(404).send("No records found for the user.")
        }
    } catch(err){
        console.error("Error in /getAllByUserID route:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message })
    }
})

router.post("/",async(req,res)=>{
    try{
        const newRecordBody = req.body;
        const newRecord = new userdb(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
        console.log(savedRecord);
    }catch(err){
        res.status(500).send(err);
    }
});

router.put("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await userdb.findByIdAndUpdate(id,newRecordBody,{
            new: true,
        });
        if(!record) return res.status(404).send();
        res.status(200).send(record);
    }catch(err){
        res.status(500).send(err);
    }
});
router.delete("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const record = await userdb.findByIdAndDelete(id);
        if(!record) return res.status(404).send();
        res.status(200).send(record);
    }catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;
