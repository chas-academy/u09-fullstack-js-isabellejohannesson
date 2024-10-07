import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { getUserProfile } from "../controllers/user.controller.js";
import { followUnfollowUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:userName", protectedRoute, getUserProfile)
/* router.get("/suggested", protectedRoute, getUserProfile) */
router.post("/follow/:id", protectedRoute, followUnfollowUser)
/* router.post("/update", protectedRoute, updateUserProfile) */

export default router;