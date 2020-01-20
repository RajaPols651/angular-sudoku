import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output('solve') solveSudoku: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('timer', { static : false}) timerComp: TimerComponent;
  constructor() { }

  ngOnInit() {
  }

  solvePuzzle(): void{
    this.solveSudoku.emit();
  }

}
