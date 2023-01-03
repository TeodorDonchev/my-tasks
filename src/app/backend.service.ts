import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, share, shareReplay, Subject, switchMap } from 'rxjs';
import { User } from 'contracts/User';
import { CompletedTask } from 'contracts/CompletedTask';
import { AppTask } from 'contracts/Task';
import { BackendCacheService } from './backend-cache.service';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})

export class BackendService {

  host = "http://localhost:9001/api/";

  constructor(private http: HttpClient,
    @Inject(BackendCacheService) private userCacheService: BackendCacheService<User>,
    @Inject(BackendCacheService) private tasksCacheService: BackendCacheService<AppTask>) {
  }

  getUsers(): Observable<Array<User>> {
    try {
      return this.userCacheService.getValue();
    } catch (e) {
      let users = this.http.get<Array<User>>(this.host + 'users/');
      this.userCacheService.setValue(users);
      return users;
    }
  }

  getTasks(): Observable<Array<AppTask>> {
    try {
      return this.tasksCacheService.getValue()
    } catch (e) {
      let tasks = this.http.get<Array<AppTask>>(this.host + 'tasks/');
      this.tasksCacheService.setValue(tasks);
      return tasks;
    }
  }

  completeTask(taskId: number, userId: number): Observable<CompletedTask> {
    return this.http.put<CompletedTask>(this.host + `tasks/${taskId}/complete?userId=${userId}`, null);
  }
}