import express from "express";
import { authCheck, signup } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/authCheck", protectedRoute, authCheck);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;