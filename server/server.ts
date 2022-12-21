
import * as express from 'express';
import { Application } from "express";
import { getAllTasks, getAllUsers, completeTask } from "./get-tasks.route";

const bodyParser = require('body-parser');

const app: Application = express();

const cors = require('cors');

app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.route('/api/tasks').get(getAllTasks);
app.route('/api/users').get(getAllUsers);
app.route('/api/tasks/:taskId/complete/:userId').put(completeTask);

const httpServer: any = app.listen(9001, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});