export enum TaskType {
    Daily="daily",
    Weekly = "weekly",
    Monthly = "monthly",
    Annual = "annual"
}
export interface AppTask {
    id: number;
    name: string;
    type: TaskType
}
