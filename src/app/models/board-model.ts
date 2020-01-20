import { Cell } from './cell-model';
import { SudokuAlgo } from '../sudoku-algo';
import { CellState } from '../enums';

export class Box{
  cells: Cell[];
  num: number;
  constructor(cells: Cell[], num: number){
    this.cells = cells;
    this.num = num;
  }
}
export class Board{
    size: number;
    cells: Cell[] = [];
    rawBoard: number[][];
    boxes: Box[] = [];
    isSolved: boolean = false;

    constructor(size: number, board: number[][]){
      this.size = size;
      /* SudokuAlgo.solveSudoku(board);
      board[0][0] = 0;
      board[4][8] = 0;
      board[2][4] = 0; */
      this.rawBoard = board;
      for(let i = 0; i < board.length; i++)
      {
        for(let j = 0; j < board.length; j++){
          this.cells.push(new Cell(i, j, board[i][j]));
        }
      }

      for(let i = 1; i <= 9; i++){
        let box = new Box(this.getBox(i), i);
        this.boxes.push(box);
      }
    }

    public isCompleted(): boolean{
      let completed = true;
      this.cells.forEach(c => {
        if(c.num == 0){
          completed = false;
        }
      });
      return completed;
    }

    public isValid(): boolean{
      let valid = true;
      this.cells.forEach(c => {
        if(c.cellState == CellState.invalid){
          valid = false;
        }
      });
      return valid;
    }

    public getBox(num: number): Cell[]{
      if(num < 1 && num > 9) return null;

      let boxCells: Cell[] = [];

      let boxRowStart = Math.floor((num - 1) / 3) * 3;
      let boxColStart = 0;
      if(num == 1 || num == 4 || num == 7){
        boxColStart = 0;
      }
      else if(num == 2 || num == 5 || num == 8){
        boxColStart = 3;
      }
      else if(num == 3 || num == 6 || num == 9){
        boxColStart = 6;
      }

      for(let i = boxRowStart; i < boxRowStart + 3; i++){
        for(let j = boxColStart; j < boxColStart + 3; j++){
          boxCells.push(this.getCellByRowCol(i, j));
        }
      }
      return boxCells;

    }
  
    getCellByRowCol(row: number, col: number): Cell{
      return this.cells[row * (this.size) + col];
    }
  
    applySelectedNumber(num: number): void{
      if(this.selectedCell() == null) return;
      let dups = this.findDuplicateCells(this.selectedCell());
      if(dups && dups.length > 0){
        dups.push(this.selectedCell());
        this.setState(dups, CellState.valid);
      }
      
      this.selectedCell().num = num;

      dups = this.findDuplicateCells(this.selectedCell());
      if(dups && dups.length > 0){
        dups.push(this.selectedCell());
        this.setState(dups, CellState.invalid);
      }
    }

    setState(cells: Cell[], state: CellState){
      if(cells){
        for(let i = 0; i < cells.length; i++){
          this.getCellByRowCol(cells[i].row, cells[i].col).cellState = state;
        }
      }
    }

    findDuplicateCells(cell: Cell): Cell[]{
      if(cell){
        if(cell.num >= 1 && cell.num <= 9){
          let copy: number[][] = JSON.parse(JSON.stringify(this.rawBoard));
          copy[cell.row][cell.col] = cell.num;
          let dups: Cell[] = 
          SudokuAlgo.findDuplicateCells(copy, cell.row, cell.col);
          return dups;
        }
      }
      return [];
    }
  
    selectedCell(): Cell{
      let selectedCell = null;
      this.cells.forEach(c => {
        if(c.selected){
          selectedCell = c;
        }
      });
      return selectedCell;
    }
  
    selectCell(cell: Cell){
      if(this.selectedCell()){
        this.selectedCell().selected = false;
      }
      
      this.cells.forEach(c => {
        if(c == cell){
          c.selected = true;
          return;
        }
      });
    }
  
    solveSudokoPuzzle(): boolean{
      this.isSolved = SudokuAlgo.solveSudoku(this.rawBoard);
      for(let i = 0; i < this.rawBoard.length; i++)
      {
        for(let j = 0; j < this.rawBoard.length; j++){
          let c = this.getCellByRowCol(i, j);
          c.num = this.rawBoard[i][j];
          c.isReadOnly = true;
          c.cellState = CellState.valid;
        }
      }
      return this.isSolved;
    }
  }