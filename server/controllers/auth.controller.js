import User from '../models/user.model.js';
import {genSalt, hash, genSaltSync, compareSync} from 'bcrypt-ts';
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const {fullName, userName, email, password} = req.body;

        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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

        //Hash password

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
    res.json({
        data: "This is login"
    });
}

export const logout = async (req, res) => {
    res.json({
        data: "This is log out"
    });
}