const userModel = require('../Models/userModel');

const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const secret = "Saurabh"


router.post('/login' , async(req,res)=>{
    try{
        const {userName , password} = req.body
        
        const Isuser = await userModel.findOne({userName:userName})
        // console.log(Isuser)

        if(!Isuser){
            return res.status(400).json({
                status: 400,
                message: "Wrong username"
            })
        }else{
            bcrypt.compare(password , Isuser.password, function(err,result){
                if(err){
                    return res.status(400).json({
                        status : "Failed",
                        message :err.message
                    })
                }

                if(result){
                const token = jwt.sign({
                        exp:Math.floor(Date.now() / 1000)+(60*60),
                        data:Isuser._id
                    },secret);
                    return res.status(200).json({
                        Message:"Logged In",
                        userName : Isuser.userName,
                        token :token
                    })
                }else{
                    return res.status(400).json({
                        status: 401,
                        message: "Invalid credentials"
                    })
                }
            })

        }

    }
    catch(e){
        return res.status(400).json({
            status : "Failed",
            message:e.message
        })
    }

})

router.get("/" ,(req,res)=>{
    res.json({
        "Message":"404 not found"
    })
})

module.exports = router