import { User } from '../contracts/User';
import { Request, Response } from 'express';
import { USERS } from "./db";

export function getUsers(req: Request, res: Response) {
    setTimeout(() => {
        res.status(200).json(Object.values(USERS));
    }, 200);
}

export function getUserById(req: Request, res: Response) {
    let userId = parseInt(req.params["userId"]);
    setTimeout(() => {
        res.status(200).json(USERS.find(user => user.id == userId));
    }, 200);
}

export function updateUserById(req: Request, res: Response) {
    let user: User = req.body.json();
    let userId = parseInt(req.params["userId"]);
    //check if the user exists
    if (!USERS.find(user => user.id == userId)) {
        res.status(404).json({ error: "user not found" });
        return;
    }
    if(user.id != userId){  
        res.status(400).json({ error: "user id does not match" });
        return;
    }
    USERS[userId] = user;
    setTimeout(() => {
        res.status(204);
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