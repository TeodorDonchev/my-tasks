export enum TaskType {
    Daily,
    Weekly,
    Monthly,
    Anual
}
export interface AppTask {
    id: number;
    name: string;
    type: TaskType
}
