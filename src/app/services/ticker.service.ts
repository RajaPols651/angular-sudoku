import { Injectable, EventEmitter } from '@angular/core';
import { Subject, timer, empty, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TickerService {
  
  private ticker: Subject<boolean> = new Subject<boolean>();

  public tick: Observable<number>;
  constructor() {
    this.tick = 
    this.ticker.pipe(
      startWith(false),
      switchMap(v => v ? timer(1000, 1000) : empty())
    );
   }

  /**
   * startTicker
   */
  public startTicker() {
    this.ticker.next(true);
  }

  /**
   * pauseTicker
   */
  public pauseTicker() {
    this.ticker.next(false);
  }

  /**
   * stopTicker
   
   */
  public stopTicker() {
    this.ticker.next(false);
  }

}
