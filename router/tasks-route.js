const express = require('express') //importing the express module.
const router = express.Router() // initializing the router

// get the controller of tasks, importing the methods.
const { getTasks, createTask, updateTask, getSingleTask, deleteTask, getTaskByCompletion } = require('../controllers/task-controller.js')

router.get('/', getTasks); //get all the tasks
router.get('/task/:id', getSingleTask); // retrive single task
router.get('/filter/', getTaskByCompletion); //retrive task by status
router.post('/create', createTask); //create new tasks
router.post('/update/:id', updateTask); // update exsting task
router.post('/delete/:id', deleteTask); // delete exsting task

module.exports = router
