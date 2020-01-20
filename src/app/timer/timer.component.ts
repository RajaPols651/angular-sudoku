import { Component, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { timer, Subscription, Subject, empty } from 'rxjs';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy, AfterViewInit {
  ngAfterViewInit(): void {
    
  }
  
  timerSubscription: Subscription;
  hours: number;
  minutes: number;
  seconds: number;
  show: boolean = false;
  time: string = '00:00:00';
  

  constructor(private tickerService: TickerService) { 
    this.timerSubscription = this.tickerService.tick.subscribe(seconds => {
      this.setTime(seconds);
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  ngOnInit() {
    
  }

  private setTime(seconds: number){
      this.hours = Math.floor(seconds / 3600);
      seconds = seconds % 3600;
      this.minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      this.seconds = seconds;
      this.time = `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
  }

}
