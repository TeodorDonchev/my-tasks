import { CompletedTask } from "contracts/CompletedTask";
import { AppTask, TaskType } from "contracts/Task";
import { getUncompletedTasks } from "server/tasks.route";


describe('getUnfinishedTasks', () => {
    it('should return the correct number of unfinished tasks for each type', () => {
        // Set up test data
        const tasks: AppTask[] = [
            { id: 1, type: TaskType.Annual, name: "task Annual" },
            { id: 2, type: TaskType.Annual, name: "task Annual 2" },
            { id: 3, type: TaskType.Monthly, name: "task Monthly" },
            { id: 4, type: TaskType.Monthly, name: "task Monthly 2" },
            { id: 5, type: TaskType.Weekly, name: "task Weekly" },
            { id: 6, type: TaskType.Weekly, name: "task Weekly 2" },
            { id: 7, type: TaskType.Daily, name: "task Daily" },
            { id: 8, type: TaskType.Daily, name: "task Daily 2" },
        ];

        const completedTasks: CompletedTask[] = [
            //04.12.21 not complete annual
            { date: 1641309464936, relation: { sourceId: 5, targetId: 1 } },
            //05.08.22 completed annual
            { date: 1662387617602, relation: { sourceId: 5, targetId: 2 } },
            //05.12.22 completed monthly
            { date: 1672932056505, relation: { sourceId: 5, targetId: 3 } },
            //05.11.22 not completed monthly
            { date: 1670253718359, relation: { sourceId: 5, targetId: 4 } },

        ]

        // Call the getUnfinishedTasks function
        // 20.12.2022 -> 1671557914390
        const unfinishedTasks = getUncompletedTasks(tasks, completedTasks, 1671557914390);

        // Verify that the function returns the correct number of tasks for each type
        expect(unfinishedTasks.filter(u => u.type === TaskType.Annual)).toHaveSize(1);
        expect(unfinishedTasks.filter(u => u.type === TaskType.Monthly)).toHaveSize(1);
        expect(unfinishedTasks.filter(u => u.type === TaskType.Weekly)).toHaveSize(2);
        expect(unfinishedTasks.filter(u => u.type === TaskType.Daily)).toHaveSize(2);
    });
});