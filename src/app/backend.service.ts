import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'contracts/User';
import { CompletedTask } from 'contracts/CompletedTask';
import { AppTask } from 'contracts/Task';

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
    return this.http.put<CompletedTask>(this.host + `tasks/${taskId}/complete?userId=${userId}`, null);
  }
}
