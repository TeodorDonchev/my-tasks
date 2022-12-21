import { Request, Response } from 'express';
import { COMPLETED_TASKS, TASKS, USERS, } from "./db";
import { AppTask, TaskType } from '../contracts/Task';
import { CompletedTask } from '../contracts/CompletedTask';

export function getTasks() {
        return getUnfinishedTasks(TASKS, COMPLETED_TASKS, Date.now());
}

export function getUnfinishedTasks(tasks: AppTask[], completedTasks: CompletedTask[], currentDate: number):  { [key: string]: Array<AppTask> } {
        // Initialize the unfinishedTasks object with empty arrays for each task type
        const unfinishedTasks: { [key: string]: Array<AppTask> } = {
                [TaskType.Annual]: [],
                [TaskType.Monthly]: [],
                [TaskType.Weekly]: [],
                [TaskType.Daily]: [],
        };

        // Iterate over the tasks array
        for (const task of tasks) {
                // Check if the task has been completed
                const isCompleted = completedTasks.some(
                        completedTask => completedTask.relation.sourceId === task.id
                );

                // If the task is not completed, add it to the appropriate array in the unfinishedTasks object
                if (!isCompleted) {
                        unfinishedTasks[task.type].push(task);
                }
        }

        return unfinishedTasks;
}


export function getAllUsers(req: Request, res: Response) {
        setTimeout(() => {
                res.status(200).json(Object.values(USERS));
        }, 200);
}

export function completeTask(req: Request, res: Response) {

        const taskId = parseInt(req.params["taskId"]);
        const userId = Number(req.query["userId"]);
        if (isNaN(userId)) throw "User id is not defined";

        // Your code to handle completing the task with the given taskId and userId

        console.log("Completing task", taskId, userId);

        COMPLETED_TASKS.push({
                date: Date.now(),
                relation: {
                        targetId: taskId,
                        sourceId: userId
                }
        });

        setTimeout(() => {
                res.status(200).json(true);
        }, 2000);
}