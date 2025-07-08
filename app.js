const express = require('express');
const tasks_routs = require('./router/tasks-route.js');
const { loadData } = require('./controllers/task-controller.js');
require('dotenv').config();


const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//health check 
app.get('/api/v1/task-manager', (req, res) => { res.send("Endpoint is working") });

// tasks API's ------
app.use("/api/v1/tasks", tasks_routs);

loadData().then(() => {
    app.listen(port, (err) => {
        console.log(`Server is listening on ${port}`);
    })
});

module.exports = app;
