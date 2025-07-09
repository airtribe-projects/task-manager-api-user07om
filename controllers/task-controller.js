const express = require('express')
const fs = require('fs').promises
const bodyParse = require('body-parser');
const { type } = require('os');

const app = express();
app.use(bodyParse.json());

let data = require('../task.json');
let idCounter = data.length ? Math.max(...data.map(t => t.id || 0)) + 1 : 1;

// GET /tasks
async function getTasks(req, res) {
    const { completed } = req.query;
    if (completed !== undefined) {
        if (completed !== 'true' && completed !== 'false') {
            return res.status(400).json({ error: "Invalid query, use either true or false" });
        }
        const filteredTasks = data.filter(t => t.completed === (completed === 'true'));
        return res.json(filteredTasks);
    }
    res.json(data);
}

// GET /tasks/:id
async function getSingleTask(req, res) {
    const id = Number(req.params.id);
    const task = data.find(t => t.id === id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
}

// POST /tasks
async function createTask(req, res) {
    const { title, description, completed } = req.body;
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!description) missingFields.push('description');
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `${missingFields.join(' and ')} ${missingFields.length === 1 ? 'is' : 'are'} required` });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Completed status must be true, false, or not included' });
    }
    const task = {
        id: idCounter++,
        title,
        description,
        completed: completed === undefined ? false : completed,
    };
    data.push(task);
    res.status(201).json(task);
}

// PUT /tasks/:id
async function updateTask(req, res) {
    const id = Number(req.params.id);
    const task = data.find(t => t.id === id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, completed } = req.body;
    if (title !== undefined && typeof title !== 'string') {
        return res.status(400).json({ message: 'Invalid title' });
    }
    if (description !== undefined && typeof description !== 'string') {
        return res.status(400).json({ message: 'Invalid description' });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Invalid completed status' });
    }
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
}

// DELETE /tasks/:id
async function deleteTask(req, res) {
    const id = Number(req.params.id);
    const index = data.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ message: 'Task not found' });

    data.splice(index, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
}

module.exports = {
    getTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
};