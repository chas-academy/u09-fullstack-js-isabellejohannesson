import User from '../models/user.model.js';
import {genSalt, hash, compare} from 'bcrypt-ts';
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const {fullName, userName, email, password} = req.body;

        let regex = /^[^\s@]+@[^\s@]+$/;
        if (!regex.test(email)) {
            return res.status(400).json({ error: "Invalid format for email, please try again"})
        };

        const existingUser = await User.findOne({userName});
        if(existingUser) {
            return res.status(400).json({ error: "Username already exists"});
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail) {
            return res.status(400).json({ error: "An account with this email already exists"});
        }

        if(password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long"});
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
       
        const newUser = new User({
            fullName,
            userName,
            email,
            password:hashedPassword,

        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
            });
        } else {
            res.status(400).json({error: "Invalid user data"});

        }

        } catch (error) {
            console.log("Error in signup controller", error.message);
            res.status(500).json({error: "Internal server error"});
    }
};

export const login = async (req, res) => {
    try {

        const {userName, password} = req.body;
        const user = await User.findOne({userName});

        if(!user) {
            return res.status(400).json({error: "Incorrect username or password"});
        }

        const checkPassword = await compare(password, user?.password || "");

        if(!checkPassword) {
            return res.status(400).json({ error: "Incorrect username or password"});
        };

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
            res.status(500).json({error: "Internal server error"});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV !== "development",
          });
        res.status(200).json({message: "You are logged out"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const authCheck = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in authCheck controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}