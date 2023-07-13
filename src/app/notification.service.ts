import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  private readonly errorsSubject$ = new Subject<string>();
  iteration: number = 0;

  public errors$() { 
    return this.errorsSubject$.asObservable();
  }

  public showError(message: string) : void {
    this.errorsSubject$.next(message + " " + this.iteration++);
  }
  constructor() { }
}
