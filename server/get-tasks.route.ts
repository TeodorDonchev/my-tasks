import { Relation } from '../contracts/Relations';
import { Request, Response } from 'express';
import { parse } from 'path';
import { COMPLETED_TASKS, TASKS, USERS, } from "./db";

export function getAllTasks(req: Request, res: Response) {
        setTimeout(() => {
                res.status(200).json(Object.values(TASKS));
        }, 200);
}

export function getAllUsers(req: Request, res: Response) {
        setTimeout(() => {
                res.status(200).json(Object.values(USERS));
        }, 200);
}

export function completeTask(req: Request, res: Response) {

        const taskId = parseInt(req.params["taskId"]);
        const userId = Number(req.params["userId"]);
        if(isNaN(userId)) throw "User id is not defined";

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