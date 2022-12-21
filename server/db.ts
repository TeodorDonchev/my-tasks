import { CompletedTask } from "../contracts/CompletedTask";
import { AppTask, TaskType } from "../contracts/Task";
import { User } from "../contracts/User";

export const TASKS: Array<AppTask> = [
    {
        id: 0,
        name: "test daily task",
        type: TaskType.Daily
    },
    {
        id: 1,
        name: "test weekly task",
        type: TaskType.Weekly
    },
    {
        id: 2,
        name: "test montly task",
        type: TaskType.Monthly
    },
    {
        id: 3,
        name: "test annual task",
        type: TaskType.Annual
    }
];
export const USERS: Array<User> = [
    {
        id:0,
        name:"Pesho"
    },
    {
        id:1,
        name:"Gosho"
    },
    {
        id:3,
        name:"Atanas"
    },
    {
        id:4,
        name:"Lacho"
    }
];
//used to store the completed task in the memory 
export const COMPLETED_TASKS : Array<CompletedTask> = [

]