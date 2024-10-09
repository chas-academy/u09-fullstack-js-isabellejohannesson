import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { getSuggestedUsers, getUserProfile, followUnfollowUser, updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:userName", protectedRoute, getUserProfile)
router.get("/suggested", protectedRoute, getSuggestedUsers)
router.post("/follow/:id", protectedRoute, followUnfollowUser)
router.post("/update", protectedRoute, updateUserProfile) 

export default router;