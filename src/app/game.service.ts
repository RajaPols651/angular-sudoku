import { Injectable } from '@angular/core';
import { Game } from './models/game-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TickerService } from './services/ticker.service';
import { GameLevel } from './enums';
import { SudokuAlgo } from './sudoku-algo';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  startTimer() {
    this.timerService.startTicker();
  }
  stopTimer() {
    this.timerService.stopTicker();
  }

  constructor(private http: HttpClient, private timerService: TickerService) 
  { 
    
  }

  getGame(offline: boolean, level: GameLevel): Game{
    let board: number[][] = [];
    if(offline){
      board = SudokuAlgo.generateSudokuBoard();
    }
    
    this.timerService.startTicker();
    return new Game(level, board);
  }
}
