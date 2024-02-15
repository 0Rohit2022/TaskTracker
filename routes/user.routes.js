import express from "express";
import { loginUser, logoutUser, registerUser, currentUser } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",isAuthenticated, logoutUser);
router.get("/current-user", isAuthenticated, currentUser);


export default router;