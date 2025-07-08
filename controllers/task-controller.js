const express = require('express')
const fs = require('fs').promises
const bodyParse = require('body-parser');
const { type } = require('os');

const app = express();
app.use(bodyParse.json());

let data = [] // in-memory data

async function loadData() {
    try {
        const fileContent = await fs.readFile("./task.json", "utf-8");
        data = JSON.parse(fileContent);
        console.log("File loaded successfully");
    } catch (err) {
        console.error("Getting error while loading \n", err);
        data = [];
    }
}

async function saveData() {
    try {
        await fs.writeFile('./task.json', JSON.stringify(data, null, 2));
        console.log("data saved to file");
    } catch (err) {
        console.error("Error saving data ", err);
    }
}

async function getTasks(req, res) {
    try {
        res.json(data);
    } catch (err) {
        console.error("Following is the error ", err);
    }
}

async function getTaskByCompletion(req, res) {
    try {
        const {completed} = req.query
        const tasks = data.tasks.filter(task => `${task.completed}` === completed);
        res.status(200).json(tasks);
    } catch (err) {
        console.error("Fobllowing is the error ", err);
    }
}

async function getSingleTask(req, res) {
    try {
        const taskId = req.params.id;
        const task = data.tasks.find(task => task.id === parseInt(taskId));
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (err) {
        res.status(404).json({ message: "Task not found" });
    }
}

async function createTask(req, res) {
    try {
        const newTask = req.body;
        //increate id index.
        newTask.id = data.tasks.length + 1

        // Basic validation: check for required fields
        if (!newTask.title && !newTask.description) {
            res.status(400).json({ message: "Missing title and description fields" });
        } else if (typeof(newTask.completed) !== "boolean") {
            console.log(typeof(newTask.completed))
            res.status(400).json({ message: "status type should be boolean!"})
        }
        data.tasks.push(newTask);
        await saveData();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(404).json({ message: "Task not found" });
    }
}

async function updateTask(req, res) {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;
        if (!updatedTask.title && !updatedTask.description) {
            res.status(400).json({ message: "Missing title and description fields" });
        }

        if (typeof(updatedTask.completed) !== "boolean") {
            res.status(400).json({ message: "status type should be boolean!"})
        }

        const taskIndex = data.tasks.findIndex(task => task.id === parseInt(taskId));
        if (taskIndex === -1) {
            res.status(404).json({ message: "Task not found" });
        } else {
            data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updatedTask };
            await saveData();
            res.json(data.tasks[taskIndex]);
        }
    } catch (err) {
        console.error("Following is the error ", err);
    }
}

async function deleteTask(req, res) {
    try {
        const taskId = req.params.id;
        const taskIndex = data.findIndex(task => task.id === parseInt(taskId));
        if (taskIndex === -1) {
            res.status(404).json({ message: "Task not found" });
        } else {
            data.splice(taskIndex, 1);
            await saveData();
            res.json({ message: "Task deleted successfully" });
        }
    } catch (err) {
        console.error("Following is the error ", err);
    }
}

module.exports = { loadData, getTasks, getSingleTask, createTask, updateTask, deleteTask, getTaskByCompletion }