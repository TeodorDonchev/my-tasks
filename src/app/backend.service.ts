import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, share, shareReplay, Subject, switchMap } from 'rxjs';
import { User } from 'contracts/User';
import { CompletedTask } from 'contracts/CompletedTask';
import { AppTask } from 'contracts/Task';
import { UserService, AppTaskService } from './backend-cache.service';
import { response } from 'express';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class BackendService {
  // get host from configuration file (environment.ts)
  readonly host = environment.host;

  constructor(private http: HttpClient,
    @Inject(UserService) private userService: UserService,
    @Inject(AppTaskService) private tasksService: AppTaskService) {
  }

  /// <summary>
  /// get all users from the server and cache them 
  /// if the cache is empty or expired it will make a request to the server
  /// if the cache is not empty and not expired it will return the cached value
  /// </summary>
  /// <returns>Observable of array of users</returns>
  getUsers(): Observable<Array<User>> {
    return this.userService.get()
  }

  getTasks(): Observable<Array<AppTask>> {
    return this.tasksService.get();
  }

  completeTask(taskId: number, userId: number): Observable<CompletedTask> {
    return this.http.put<CompletedTask>(this.host + `tasks/${taskId}/complete?userId=${userId}`, null);
  }
}