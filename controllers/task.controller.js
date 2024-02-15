import ErrorHandler from "../middleware/error.middleware.js";
import { Task } from "../models/task.models.js";

export const newTask = async (req, res, next) => {
  //Get the data from the frontend
  //create inside the database
  //return the response

  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new ErrorHandler("Task not Found", 404));
    }
  
    task.isCompleted = !task.isCompleted;
    await task.save();
  
    res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
      const task = await Task.findById(req.params.id);
      if(!task)
      {
          return next(new ErrorHandler("Task not Found", 404));
      }
      await task.deleteOne();
  
      res.status(200).json({
          message : "Task Deleted",
          success : true
      })
  } catch (error) {
    next(error);
  }
};
