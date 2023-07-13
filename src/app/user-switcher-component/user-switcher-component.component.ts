import { Component, OnInit } from '@angular/core';
import { User } from 'contracts/User';

@Component({
  selector: 'app-user-switcher-component',
  templateUrl: './user-switcher-component.component.html',
  styleUrls: ['./user-switcher-component.component.css']
})
export class UserSwitcherComponentComponent implements OnInit {
  
  users: User[] = [];
  selectedUser?: User;
  constructor() { }

  ngOnInit(): void {
  }

  userSelect(u: User) {
    this.selectedUser = u;
  }

}
