import express from "express";
export const app = express();
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleware } from "./middleware/error.middleware.js";


config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Task Tracker</h1>");
});

// Using Error Middleware
app.use(ErrorMiddleware);