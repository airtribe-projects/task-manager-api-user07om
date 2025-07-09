Overview
--------

This is a simple task manager API built with Node.js and Express.js. It allows users to create, read, update, and delete tasks stored in a JSON file.

Setup Instructions
-----------------

1. Clone the repository: `git clone http://github.com/airtribe-projects/task-manager-api-user07om`
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`
4. The API will be available at `http://localhost:3000/ `

API Endpoints
-------------

### GET /tasks

* Retrieves all tasks
* Returns a JSON array of tasks

Example: `curl http://localhost:3000/tasks`

### GET /tasks/:id

* Retrieves a single task by its ID
* Returns a JSON object of the task if found, or a 404 error if not found

Example: `curl http://localhost:3000/tasks/1`

### POST /tasks/

* Creates a new task
* Expects a JSON object with `title`, `description`, and `completed` properties in the request body
* Returns the newly created task as JSON with a 201 status code

Example: `curl -X POST -H "Content-Type: application/json" -d '{"title": "New Task", "description": "New Task Description", "completed": false}' http://localhost:3000/tasks/`

### PUT /tasks/:id

* Updates an existing task
* Expects a JSON object with updated `title`, `description`, and `completed` properties in the request body
* Returns the updated task as JSON with a 200 status code

Example: `curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Task", "description": "Updated Task Description", "completed": true}' http://localhost:3000/ tasks/1`

### DELETE /tasks/:id

* Deletes a task by its ID
* Returns a JSON message indicating success or a 404 error if the task is not found

Example: `curl -X DELETE http://localhost:3000/tasks/1`

Testing the API
----------------

You can test the API using a tool like curl or a REST client like Postman.

1. Send a GET request to `http://localhost:3000/tasks` to retrieve all tasks.
2. Send a GET request to `http://localhost:3000/tasks/:id` to retrieve a single task by its ID.
3. Send a POST request to `http://localhost:3000/tasks/` with a JSON object containing the task details to create a new task.
4. Send a PUT request to `http://localhost:3000/tasks/:id` with a JSON object containing the updated task details to update an existing task.
5. Send a DELETE request to `http://localhost:3000/tasks/:id` to delete a task by its ID.

Note: Replace `:id` with the actual ID of the task you want to retrieve, update, or delete.