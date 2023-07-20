import bcrypt from 'bcrypt';
import express from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register" , async(req, res) => {
    const { username, password }  = req.body;
    const user = await UserModel.findOne({ username });

    if(user){
        return res.json({message:  "User already exists " })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // creating a new instance of the model
    const newUser = new UserModel({ username ,  password: hashedPassword })
    await newUser.save();

    res.json({ message : "User registered successfully "});
})

router.post("/login", async(req, res) => {
    const { username , password }  = req.body;
    const user = await UserModel.findOne({ username });

    if(!user) return res.json({ message : "User doesn't exist"});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({ message: "Username or password is incorrect "})
    }

    // creating a token using jwt
    const token = jwt.sign({ id: user._id}, "secret");
    res.json({ token , userId: user._id});
})


export { router as UserRouter };

