
import * as express from 'express';
import { Application } from "express";
import { createTask, completeTask, getTasks, deleteTask } from "./tasks.route";
import { getUsers, createUser, deleteUser, getUserById, updateUserById } from "./user.route";

const bodyParser = require('body-parser');

const app: Application = express();

const cors = require('cors');

app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.route('/api/tasks').get(getTasks);
app.route('/api/tasks').put(createTask);
app.route('/api/tasks').delete(deleteTask);
app.route('/api/tasks/:taskId/complete/').put(completeTask);

app.route('/api/users').get(getUsers);
app.route('/api/users').put(createUser);
app.route('/api/users').delete(deleteUser);
app.route('/api/users/:userId').get(getUserById);
app.route('/api/users/:userId').put(updateUserById);


const httpServer: any = app.listen(9001, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});