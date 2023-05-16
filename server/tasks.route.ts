import { Request, Response } from 'express';
import { COMPLETED_TASKS, TASKS, } from "./db";
import { AppTask, TaskType } from '../contracts/Task';
import { CompletedTask } from '../contracts/CompletedTask';

export function getTasks(req: Request, res: Response) {
        setTimeout(() => {
                res.status(200).json(getUncompletedTasks(TASKS, COMPLETED_TASKS, Date.now()));
        }, 200);
}

export function getUncompletedTasks(tasks: AppTask[], completedTasks: CompletedTask[], currentDate: number): Array<AppTask> {
        
        const unfinishedTasks: AppTask[] = [];

        // Iterate over the tasks array
        for (const task of tasks) {
                // Check if the task has been completed
                const isCompleted = completedTasks.some(
                        completedTask => {
                                if (completedTask.relation.targetId !== task.id) return false;
                                let momentOfChecking = new Date(currentDate);
                                momentOfChecking.setHours(0);//in order to mark only the day of the operation not the specific hour
                                switch (task.type) {
                                        case TaskType.Annual:
                                                return completedTask.date > currentDate - momentOfChecking.setFullYear(momentOfChecking.getFullYear() - 1);
                                        case TaskType.Monthly:
                                                return completedTask.date > currentDate - momentOfChecking.setMonth(momentOfChecking.getMonth() - 1);
                                        case TaskType.Weekly:
                                                return completedTask.date > currentDate - momentOfChecking.setFullYear(momentOfChecking.getFullYear(), momentOfChecking.getMonth(), momentOfChecking.getDay() - 7);
                                        case TaskType.Daily:
                                                return completedTask.date > currentDate - momentOfChecking.setFullYear(momentOfChecking.getFullYear(), momentOfChecking.getMonth(), momentOfChecking.getDay() - 1);
                                        default: return false;
                                }
                        }
                );

                // If the task is not completed, add it to the appropriate array in the unfinishedTasks object
                if (!isCompleted) {
                        unfinishedTasks.push(task);
                }
        }

        return unfinishedTasks;
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
export function createTask(req: Request, res: Response){

}
export function deleteTask(req: Request, res: Response){

}