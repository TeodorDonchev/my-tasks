
import * as express from 'express';
import { Application } from "express";
import { getUnfinishedTasks, getAllUsers, completeTask, getTasks } from "./get-tasks.route";

const bodyParser = require('body-parser');

const app: Application = express();

const cors = require('cors');

app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.route('/api/tasks').get(getTasks);
app.route('/api/users').get(getAllUsers);
app.route('/api/tasks/:taskId/complete').put(completeTask);

const httpServer: any = app.listen(9001, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});