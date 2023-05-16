import { CompletedTask } from "../contracts/CompletedTask";
import { AppTask, TaskType } from "../contracts/Task";
import { User } from "../contracts/User";

export const TASKS: Array<AppTask> = [
    {
        id: 0,
        name: "test daily task",
        description: 'Deleting a repository will permanently delete release attachments, team permissions, issues, comments, and forks (if the repository is private). This action cannot be undone. Some deleted repositories can be restored within 90 days of deletion. For more information, see " Restoring a deleted repository ."(docs.github.com)',
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
    },
    {
        id: 4,
        name: "test annual task",
        description: "test annual task description",
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