import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'contracts/User';
import { AppTask } from 'contracts/Task';
import { CompletedTask } from 'contracts/CompletedTask';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  host = "http://localhost:9001/api/";
  constructor(private http: HttpClient) { }

  getUsers():Observable<Array<User>> {
    return this.http.get<Array<User>>(this.host + 'users/');
  }

  getTasks():Observable<Array<AppTask>> {
    return this.http.get<Array<AppTask>>(this.host + 'tasks/');
  }

  completeTask(taskId: number, userId: number): Observable<CompletedTask>{
    const body = {taskId: taskId, userId: userId}
    return this.http.put<CompletedTask>(this.host + `tasks/${taskId}/complete`, body);
  }
}
