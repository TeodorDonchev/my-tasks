import { User } from '../contracts/User';
import { Request, Response } from 'express';
import { USERS } from "./db";

export function getUsers(req: Request, res: Response) {
    setTimeout(() => {
        res.status(200).json(Object.values(USERS));
    }, 200);
}

export function createUser(req: Request, res: Response) {
    let user: User = req.body.json();
    USERS.push(user);
    setTimeout(() => {
        res.status(204);
    }, 200);
}

export function deleteUser(req: Request, res: Response) {
    let user: User = req.body.json();
    USERS.push(user);
    setTimeout(() => {
        res.status(204);
    }, 200);
}