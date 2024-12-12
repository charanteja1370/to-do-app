const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// POST /tasks - Create a new task
router.post('/', async (req, res) => {
    try {
        const {title, description, status} = req.body;
        const task = new Task({title, description, status});
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// GET /tasks - Fetch all tasks
router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// GET /tasks/:id - Fetch a task by its ID
router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const task = await Task.findById(id);
      if (!task){
        return res.status(404).json({ message: 'Task not found' });
      } 
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// PUT /tasks/:id - Update the task status
router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const {status} = req.body;
      const task = await Task.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// DELETE /tasks/:id - Delete a task by its ID
router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const task = await Task.findByIdAndDelete(id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
module.exports = router;