import { Component, OnInit, Input, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SudokuAlgo } from '../sudoku-algo';
import { Board } from '../models/board-model';
import { Cell } from '../models/cell-model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy, AfterViewInit {
  private _validNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  private _validKeyCodeMap = new Map<number, number>();
  private _keyeventSubscriber: Subscription = null;
  
  private _boardArr: number[][];
  @Input('boardArray')
  public get boardArr(): number[][] {
    return this._boardArr;
  }
  public set boardArr(value: number[][]) {
    this._boardArr = value;
    this.board = new Board(9, this._boardArr);
  }
  board: Board;
  selectedCell: Cell;
  availableNumbers: number[] = [1,2,3,4,5,6,7,8,9];
  rows: number[] = [1,2,3];
  rowBoxes: number[][] = [[1,2,3],[4,5,6],[7,8,9]];
  private _keyeventObservable: Observable<Event>;
  @Input()
  public get keyeventObservable(): Observable<Event> {
    return this._keyeventObservable;
  }
  public set keyeventObservable(value: Observable<Event>) {
    this._keyeventObservable = value;
    if(this._keyeventObservable){
      this._keyeventSubscriber = this.keyeventObservable.subscribe((n: KeyboardEvent) => {
        this.selectNumber(this._validKeyCodeMap.get(n.keyCode));
      });
    }
  }

  @Output('Completed') completed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
    this._validKeyCodeMap.set(8, 0);
    this._validKeyCodeMap.set(49, 1);
    this._validKeyCodeMap.set(50, 2);
    this._validKeyCodeMap.set(51, 3);
    this._validKeyCodeMap.set(52, 4);
    this._validKeyCodeMap.set(53, 5);
    this._validKeyCodeMap.set(54, 6);
    this._validKeyCodeMap.set(55, 7);
    this._validKeyCodeMap.set(56, 8);
    this._validKeyCodeMap.set(57, 9);
   }

  ngOnInit() {
  //  this.board1 = new Board(9, this.getRandomSudoku());
  }

  ngOnDestroy(): void {
    this._keyeventSubscriber.unsubscribe();
  }
  ngAfterViewInit(): void {
    
  }

  getRandomSudoku(): number[][]{
    return SudokuAlgo.generateSudokuBoard();
  }

  solvePuzzle(){
    this.board.solveSudokoPuzzle();
   // this.completed.emit(true);
  }

  onSelectCell(cell: Cell){
    if(cell.isReadOnly) return;
    this.board.selectCell(cell);
  }

  selectNumber(num: number){
    if(this.board.isSolved) return;
    if(this._validNums.indexOf(num) == -1) return;

    let dups = this.board.applySelectedNumber(num);

    if(this.board.isCompleted() && this.board.isValid()){
      this.completed.emit(true);
    }
  }

  toggleNote(cell: Cell, num: number){
    if(cell == this.board.selectedCell())
      cell.notes[num] = !cell.notes[num];
  }

}
