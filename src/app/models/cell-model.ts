import { CellState } from '../enums';

export class Cell{
    private _num: number;
  public get num(): number {
    return this._num;
  }
  public set num(value: number) {
    this._num = value;
    this.notes.clear();
  }
    row: number;
    col: number;
    isReadOnly: boolean = true;
    cellState: CellState;

    notes: Map<number, boolean> = new Map<number, boolean>();
  
    private _selected: boolean = false;
    public get selected(): boolean {
      return this._selected;
    }
  
    
    public set selected(value : boolean) {
      this._selected = value;
    }
    
  
    private _top: string;
    public get top(): string {
      return this.row * 50 + "px";
    }
  
    public get left(): string {
      return this.col * 50 + "px";
    }
  
    public get isInvalid(): boolean{
      return this.cellState == CellState.invalid;
    }
  
    constructor(row: number, col: number, value: number){
      this.num = value;
      this.row = row;
      this.col = col;
      this.cellState = CellState.valid;
      if(value == 0) this.isReadOnly = false;
      this.notes.set(1, false);
      this.notes.set(2, false);
      this.notes.set(3, false);
      this.notes.set(4, false);
      this.notes.set(5, false);
      this.notes.set(6, false);
      this.notes.set(7, false);
      this.notes.set(8, false);
      this.notes.set(9, false);
    }
  
    toggleSelection(): void{
      this._selected = !this._selected;
    }
  }