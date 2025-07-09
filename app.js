const express = require('express');
require('dotenv').config();

const {
  getTasks,
  createTask,
  updateTask,
  getSingleTask,
  deleteTask,
} = require('./controllers/task-controller.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get('/hello-world', (req, res) => {
  res.send('Endpoint is working');
});

// tasks API's ------
app.get('/tasks', getTasks); // get all the tasks
app.get('/tasks/:id', getSingleTask); // retrieve single task
app.post('/tasks', createTask); // create new tasks
app.put('/tasks/:id', updateTask); // update existing task
app.delete('/tasks/:id', deleteTask); // delete existing task

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}

module.exports = app;
