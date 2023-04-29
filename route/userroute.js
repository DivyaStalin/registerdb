const UserSchema = require("../model/usermodel");
const e = require("express");
const { Router } = require('express');
const express = require("express");
const route = require('express').Router();
route.use(express.json());
route.post("/register",async (req,res)=>{
     let userName = req.body.userName;
     let email = req.body.email;
     let mobileno = req.body.mobileno;

    const user =  UserSchema(req.body);
    
    const result = await user.save();
    if(result != "" ){
    return res.status(200)
    .json({status:true,message:'success',result:result});}
    else {
        return res.status(400).json({status: false,message:"failed",});
    }
});
route.get('/getall',async(req,res)=>{
    const alluser = await UserSchema.find().exec();

    if(alluser){
        res.status(200)
        .json({status:true,message:'success',result:alluser});   
    }
    else{
        res.status(400)
        .json({status:false,message:'failed'});
    }
});
route.get("/getone",async(req,res) => {
    let user = req.body.userName;
    const alluser = await UserSchema.findOne({userName:user}).exec();
    console.log("user det",alluser);
    if(alluser){
        res.status(200)
        .json({status:true,message:'success',result:alluser});   
    }
    else{
        res.status(400)
        .json({status:false,message:'failed'});
    }
});
route.put("/updateuser",async (req, res) => {
let user = req.body.userName;
let mail = req.body.email;
const User = await UserSchema.findOne({ userName:user}).exec();
if (User){
    const updateMail = await UserSchema.findOneAndUpdate({email:mail}).exec();
    res.status(200)
    .json({
        status:true,
        message:"successfully updated",
        result: updateMail,
    });
}
else{
    res.status(400).json({
        status:false,
        message:"no user found"
    });
}
});
route.delete("/delete",async (req,res)=>{
    let mail = req.body.email;
    console.log("mail",mail);
    const User = await UserSchema.findOne({email:mail}).exec();
    console.log("user",User);
    if(User){
        const deleteuser = await UserSchema.deleteOne({email:mail}).exec();

        res.status(200).json({
            status:true,
            message:"deleted successfully",
        });
    }else{
        res.status(400)
        .json({status:false,
        message:"No user found",
    });
    }
})
module.exports = route;