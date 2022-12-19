

import {Request, Response} from 'express';
import {TASKS} from "./db";



export function getAllTasks(req: Request, res: Response) {


        setTimeout(() => {

             res.status(200).json({payload:Object.values(TASKS)});

        }, 200);
}
