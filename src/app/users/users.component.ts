import { Component, OnInit } from '@angular/core';
import { User } from 'contracts/User';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User> = [];
  selectedUser?: User;
  constructor(private service: BackendService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(users => this.users = users);
  }

  onSelect(u: User) {
    this.selectedUser = u;
  }
  deselectUser(){
    this.selectedUser = undefined;
  }
}
