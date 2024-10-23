import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { createPost, deletePost, commentPost, likeUnlikePost, 
    getAllPosts, getLikedPosts,  getFollowingPosts, getUserPosts, 
    deleteComment, searchPosts, updateComment } from '../controllers/post.controller.js';

const router = express.Router();

router.get("/all", protectedRoute, getAllPosts)
router.get("/following", protectedRoute, getFollowingPosts)
router.get("/likes/:id", protectedRoute, getLikedPosts)
router.get("/user/:userName", protectedRoute, getUserPosts)
router.get("/search", protectedRoute, searchPosts)
router.post("/create", protectedRoute, createPost)
router.post("/like/:id", protectedRoute, likeUnlikePost)
router.post("/comment/:id", protectedRoute, commentPost)
router.put("/:postId/comments/:commentId", protectedRoute, updateComment)
router.delete("/:id", protectedRoute, deletePost)
router.delete("/:postId/comments/:commentId", protectedRoute, deleteComment)

export default router;