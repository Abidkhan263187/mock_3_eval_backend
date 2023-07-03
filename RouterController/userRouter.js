const { Router } = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../Models/userModel");
const jwt = require('jsonwebtoken');




const userRouter = Router();

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // 
    const user = await userModel.findOne({ email: email });
    try {
        if (!user) {
            return res.status(404).json({ mssg: "user not found" })
        }
        else {
            const verify = bcrypt.compareSync(password, user.password);
            if (!verify) {
                res.status(404).json({ mssg: "incorrect password" })
            }
            else {
                const token = jwt.sign({ userID: user._id }, process.env.SECRET);
                res.status(200).json({ mssg: "login successful", token })
                console.log("login successful")
            }
        }
    } catch (error) {
        req.status(500).json({ mssg: "login failed", error })
        console.log("login failed", error)
    }
})


userRouter.post('/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const hash_password = bcrypt.hashSync(password, 8);
    try {
        const userSignup = await userModel({
            email,
            password: hash_password,
            confirmPassword: hash_password
        })
        await userSignup.save()
        res.status(200).json({ msssg: "signup successful" })
        console.log("signup successful")
    } catch (error) {
        res.status(500).json({ mssg: "error while signup", error })
        console.log("error while signup", error)
    }
})

module.exports = { userRouter }