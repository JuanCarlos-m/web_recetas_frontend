import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  @Output() logEvent:EventEmitter<any>=new EventEmitter();

  constructor() { }

  setloged(){
    this.logEvent.emit(true);
  }

  getEmittedValue(){
    return this.logEvent;
  }
}
