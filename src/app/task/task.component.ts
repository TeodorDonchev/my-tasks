import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'contracts/User';
import { AppTask } from 'contracts/Task'
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() user?: User;
  @Output() deselectUser = new EventEmitter<void>();
  selectedTask?: AppTask;
  tasks: Array<AppTask> = [];
  constructor(private service: BackendService) {

  }

  ngOnInit(): void {
    this.service.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.selectedTask = this.selectRandomTask();
    });
  }

  clearUser() {
    this.deselectUser.next();
    this.user = undefined;
    this.selectedTask = this.selectRandomTask();
  }

  selectRandomTask(){
    return this.tasks[Math.floor(Math.random() * this.tasks.length)];
  }

  complete() {
    this.service.completeTask(this.selectedTask?.id || 0, this.user?.id || 0).subscribe(isCompleted => {
      if(isCompleted){
        this.tasks = this.tasks.filter(t => t.id !== this.selectedTask?.id);
        this.selectedTask = undefined;
      }
    });
  }
}
