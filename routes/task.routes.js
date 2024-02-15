import express from "express";
import { newTask, getMyTask , updateTask, deleteTask} from "../controllers/task.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/newtask",isAuthenticated,  newTask);
router.get("/mytask", isAuthenticated, getMyTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;
