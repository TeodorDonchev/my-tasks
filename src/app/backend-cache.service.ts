import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'contracts/User';
import { AppTask } from 'contracts/Task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpBaseService, HttpServiceCacheDecorator, IService } from './helpers/Cache';

@Injectable({
  providedIn: 'root'
})

export class UserService implements IService<User> {
  service: IService<User>;
  constructor(http: HttpClient) {
    this.service = new HttpBaseService<User>(http, environment.host, "users");
  }

  get(): Observable<User[]> {
    return this.service.get();
  }
  getById(id: number): Observable<User> {
    return this.service.getById(id);
  }
  add(item: User): Observable<User> {
    return this.service.add(item);
  }
  update(item: User): Observable<User> {
    return this.service.update(item);
  }
  delete(id: number): Observable<User> {
    return this.service.delete(id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppTaskService implements IService<AppTask> {
  service: IService<AppTask>;
  constructor(http: HttpClient) {
    this.service = new HttpServiceCacheDecorator(new HttpBaseService<AppTask>(http, environment.host, "tasks"));
  }
  get(): Observable<AppTask[]> {
    return this.service.get();
  }
  getById(id: number): Observable<AppTask> {
    throw new Error('Method not implemented.');
  }
  add(item: AppTask): Observable<AppTask> {
    throw new Error('Method not implemented.');
  }
  update(item: AppTask): Observable<AppTask> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<AppTask> {
    throw new Error('Method not implemented.');
  }
}