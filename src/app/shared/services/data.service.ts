import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public queryData: any = {};
  public subject = new Subject<any>();
  private messageSource = new  BehaviorSubject(this.queryData);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(data: object) {
    this.messageSource.next(data)
  }
}
