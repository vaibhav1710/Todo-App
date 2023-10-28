const express = require("express");
const todo = require("../model/todos");

exports.createTask = async (req, res) => {
  try {
    const {title, description} = req.body;

    if (!title || !description) {
      res.status(401).send("please input the task");
    }

    const newTask = await todo.create({ title, description });
    res.status(201).json({
      success: true,
      message: "Task added successfully",
      newTask,
    });
  } catch (err) {
    console.log("ERROR IN CREATE ROUTE:", err);
    res.status(401).send(err);
  }
};
exports.getTask = async (req, res) => {
  try {
    const list = await todo.find();
    res.status(200).json({
      success: true,
      list,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

exports.updateTask = async (req,res) => {
  try{
    const task = await todo.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      Task: task
    })
  }catch(err){
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}
exports.deleteTask = async (req,res) => {
  try{
    const task = await todo.findByIdAndDelete(req.params.id,req.body);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    })
  }catch(err){
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}

