import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

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