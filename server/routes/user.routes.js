import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { getSuggestedUsers, getUserProfile, followUnfollowUser, updateUserProfile, searchUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:userName", protectedRoute, getUserProfile)
router.get("/suggested", protectedRoute, getSuggestedUsers)
router.get("/search", protectedRoute, searchUser)
router.post("/follow/:id", protectedRoute, followUnfollowUser)
router.put("/update", protectedRoute, updateUserProfile) 

export default router;