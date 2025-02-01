const Task = require("../models/task");
const joi = require("joi");
const mongoose = require("mongoose");

/* Add a Task */
const taskInputSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  status: joi.string().required(),
  userId: joi.string().required(),
  priority: joi.string().required(),
});

const addNewTask = async (req, res) => {
  const { title, description, status, userId, priority } = req.body;

  const { error } = taskInputSchema.validate({
    title,
    description,
    status,
    userId,
    priority,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const newlyCreatedTask = await Task.create({
      title,
      description,
      status,
      userId,
      priority,
    });

    return res.status(200).json({
      success: true,
      message: "Task added successfully",
      task: newlyCreatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again!",
    });
  }
};

/* Get All Tasks for a User */
const getAllTasks = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const tasks = await Task.find({ userId: id });

    return res.status(200).json({
      success: true,
      taskList: tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching tasks. Please try again!",
    });
  }
};

/* Update a Task */
const updateTask = async (req, res) => {
  const { title, description, status, priority, userId, _id } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      { title, description, status, priority, userId },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the task. Please try again!",
    });
  }
};

/* Delete a Task */
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Task ID is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID",
    });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the task. Please try again!",
    });
  }
};

module.exports = { addNewTask, getAllTasks, deleteTask, updateTask };
