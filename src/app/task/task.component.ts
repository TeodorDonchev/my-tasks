import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { User } from 'contracts/User';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() user?: User;
  @Output() deselectUser = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    //make request to get the tasks
  }

  clearUser(){
    this.deselectUser.next();
    this.user = undefined;
  }

  complete(){

  }
}
