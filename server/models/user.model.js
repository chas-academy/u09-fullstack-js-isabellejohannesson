import { kStringMaxLength } from "buffer";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:"User",
            default: [] //User has 0 followers on signup
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:"User",
            default: [] //User follows 0 people on signup
        }
    ],
    profileImg: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: []
        },
    ],

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
