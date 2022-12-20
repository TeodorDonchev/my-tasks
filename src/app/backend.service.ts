import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'contracts/User';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  host = "http://localhost:9001/api/";
  constructor(private http: HttpClient) { }

  getUsers():Observable<Array<User>> {
    return this.http.get<Array<User>>(this.host + 'users/');
  }
}
