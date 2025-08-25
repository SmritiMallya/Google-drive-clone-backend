import express from "express";
import { verifyUser } from "../middlewares/authMiddleware.js";
import { getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", verifyUser, getProfile);

export default router;
