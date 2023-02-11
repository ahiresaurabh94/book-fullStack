const router = require('express').Router()
const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt')

router.post("/register", async (req, res) => {
    try {
        const { userName, password, confirmPassword } = req.body

        const IsUser = await userModel.findOne({ userName: userName })

        if (IsUser) {
            return res.status(400).json({
                status: "Failed",
                message: "User Exists with given userName"
            })
        }
        else {
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(400).json({
                        status: "Failed",
                        message: err.message
                    })
                } else {
                    if (password === confirmPassword) {
                        const user = await userModel.create({
                            userName: userName,
                            password: hash
                        })
                        res.json({
                            status: "User registered Successfully",
                            user
                        })
                    }
                    else {
                        res.status(400).json({
                            status: "Failed",
                            message: "Password doesn't match"
                        })
                    }

                }
            })

        }

    } 
    
    catch (e) {
        return res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }

})



module.exports = router;