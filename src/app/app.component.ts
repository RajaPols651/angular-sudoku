import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { BoardComponent } from './board/board.component';
import { GameService } from './game.service';
import { GameLevel } from './enums';
import { Game } from './models/game-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  public game: Game;

  ngOnInit(): void {
    this.game = this.gameService.getGame(true, GameLevel.Easy);
  }
  keyboardEventObservable: Observable<Event>;

  @ViewChild('board', { static: false}) board : BoardComponent;
  constructor(private gameService : GameService){
  }
  ngAfterViewInit(): void {
    this.keyboardEventObservable = fromEvent(window.document, 'keyup');
  }
  title = 'sudoku-live';

  solveSudoku(evt): void{
    this.board.solvePuzzle();
  }

  onGameCompleted(b: boolean){
    this.gameService.stopTimer();
  }
}
