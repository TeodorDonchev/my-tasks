import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppTask } from 'contracts/Task';
import { User } from 'contracts/User';
import { forkJoin } from 'rxjs';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
  users: User[] = [];
  tasks: AppTask[] = [];
  selectedTask?:AppTask;
  selectedUser?: User;

  constructor(private service: BackendService) {
  }

  ngOnInit(): void {
    forkJoin({ tasks: this.service.getTasks(), users: this.service.getUsers() }).subscribe(results => {
      this.tasks = results.tasks;
      this.users = results.users;
    });
  }

  userSelect(u: User) {
    this.selectedUser = u;
    this.selectedTask = this.selectRandomTask();
  }
  
  selectRandomTask() {
    return this.tasks[Math.floor(Math.random() * this.tasks.length)];
  }

  complete() {
    this.service.completeTask(this.selectedTask?.id || 0, this.selectedUser?.id || 0).subscribe(isCompleted => {
      if (isCompleted) {
        this.tasks = this.tasks.filter(t => t.id !== this.selectedTask?.id);
        this.selectedTask = undefined;
        this.selectedUser = undefined;
      }
    });
  }
}