import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppTask } from 'contracts/Task';
import { User } from 'contracts/User';
import { forkJoin } from 'rxjs';
import { BackendService } from '../backend.service';
import { NotificationService } from "../notification.service";

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

  constructor(private service: BackendService, private readonly notificationService: NotificationService) {
  }

  ngOnInit(): void {
    forkJoin({ tasks: this.service.getTasks(), users: this.service.getUsers() }).subscribe(results => {
      this.tasks = results.tasks;
      this.users = results.users;
    });
  }

  userSelect(u: User) {
    this.notificationService.showError("Dummy error message");
    this.selectedUser = u;
    this.selectedTask = this.selectRandomTask();
  }
  
  selectRandomTask() {
    return this.tasks[Math.floor(Math.random() * this.tasks.length)];
  }

  complete() {
    if(!this.selectedTask || !this.selectedUser) {
      this.notificationService.showError("Please select a user and a task");
      return;
    }
    let taskid = this.selectedTask.id;
    let userid = this.selectedUser.id;
    this.service.completeTask(taskid, userid).subscribe(isCompleted => {
      if (isCompleted) {
        this.tasks = this.tasks.filter(t => t.id !== this.selectedTask?.id);
        this.selectedTask = undefined;
        this.selectedUser = undefined;
      }
    });
  }
}