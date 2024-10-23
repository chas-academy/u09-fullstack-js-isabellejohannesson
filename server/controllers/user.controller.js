import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import {compare, genSalt, hash} from 'bcrypt-ts';
import {v2 as cloudinary} from 'cloudinary';

export const getUserProfile = async (req, res) => {
    const {userName} = req.params;

    try {
        const user = await User.findOne({userName}).select("-password");
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile: ", error.message);
        res.status(500).json({error:error.message});
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()) {
            return res.status(400).json({error: "You can not follow yourself"})
        }

        if (!currentUser || !userToModify) {
            return res.status(404).json({ error: "User not found" });
        }

        const isFollowing = currentUser.following.includes(userToModify._id);

        if (isFollowing) {
            // Unfollow
            currentUser.following.pull(id);
            userToModify.followers.pull(req.user._id);
            await Promise.all([currentUser.save(), userToModify.save()]);
            res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            // Follow
            currentUser.following.push(id);
            userToModify.followers.push(req.user._id);
            await Promise.all([currentUser.save(), userToModify.save()]);

            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id,
            });

            await newNotification.save();

            //TODO: return the id of the user as a response
            res.status(200).json({message: "User followed successfully"});
        }
    
    } catch (error) {
        console.log("Error in followUnfollow controller: ", error.message);
        res.status(500).json({error:error.message});
    }
}

export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        const usersAlreadyFollowed = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: {$ne:userId}
                }
            },
            {$sample:{size:10}}
        ])

        const filteredUsers = users.filter(user=>!usersAlreadyFollowed.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0,4)

        suggestedUsers.forEach(user=>user.password=null)

        res.status(200).json(suggestedUsers);


    } catch (error) {
        console.log("Error in getSuggestedUsers:", error.message);
        res.status(500).json({ error: error.message});
        
    }
}

export const updateUserProfile = async (req, res) => {
    const {fullName, email, userName, currentPassword, newPassword, bio} = req.body;
    let {profileImg} = req.body;

    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
         if((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({error: "Please provide both current password and new password"});
         }

        if(currentPassword && newPassword) {
            const isMatch = await compare(currentPassword, user.password);
            if(!isMatch) {
                return res.status(400).json({ error: "Password is incorrect"});
            }
            if(newPassword.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters"});
            }

            const salt = await genSalt(10);
            user.password = await hash(newPassword, salt);
        }

        if(profileImg) {
            if(user.profileImg) {
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }
           const uploadedImg = await cloudinary.uploader.upload(profileImg)
           profileImg = uploadedImg.secure_url;
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.userName = userName || user.userName;
        user.bio = bio || user.bio;
        user.profileImg = profileImg || user.profileImg;

        user = await user.save();

        user.password = null;

        return res.status(200).json(user);

    } catch (error) {
        console.log("Error in update profile", error.message);
        res.status(500).json({ error: error.message}); 
        
    }
}

export const searchUser = async (req, res) => {
    const {q} = req.query;

    try {
        const users = await User.find({
            $or: [
                { username: { $regex: String(q), $options: 'i' } }, 
                { fullName: { $regex: String(q), $options: 'i' } } 
            ]
        });
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}