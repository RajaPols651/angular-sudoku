import { Cell } from './cell-model';

export class Box{
    cells: Cell[];
    num: number;
    constructor(cells: Cell[], num: number){
      this.cells = cells;
      this.num = num;
    }
  }