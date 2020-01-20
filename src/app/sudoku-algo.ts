export class SudokuAlgo{
    public static solveSudoku(board: number[][]): boolean{
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j] == 0){
                    for(let k = 1; k <= 9; k++){
                        if(SudokuAlgo.safePosition(board, i, j, k)){
                            board[i][j] = k;
                            if(!SudokuAlgo.solveSudoku(board)){
                                board[i][j] = 0;
                            }
                        }
                    }
                    if(board[i][j] == 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public static isValidBoard(board: number[][]): boolean{
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j] > 0 && !this.safePosition(board, i, j, board[i][j])) return false;
            }
        }
        return true;
    }

    public static findDuplicateCells(board: number[][], i: number, j: number): any[]{
        let cells: any[] = [];
        if(board[i][j] == 0) return [];
            for(let col = 0; col < board.length; col++){
                if(board[i][col] == board[i][j] && col != j) {
                    cells.push({row: i, col: col, num: board[i][j]});
                }
            }

            for(let row = 0; row < board.length; row++){
                if(board[row][j] == board[i][j] && row != i) {
                    cells.push({row: row, col: j, num: board[i][j]});
                }
            }
            let boxRowStart: number = Math.floor(i / 3) * 3;
            let boxColStart: number = Math.floor(j / 3) * 3;
            
            for(let r = boxRowStart; r < boxRowStart + 3; r++){
                for(let c = boxColStart; c < boxColStart + 3; c++){
                    if(board[r][c] == board[i][j] && r != i && c != j) {
                        cells.push({row: r, col: c, num: board[i][j]});
                    }
                }
            }
            
        return cells;
    }

    private static safePosition(board: number[][], i: number, 
        j: number, k: number): boolean{
            if(board[i][j] > 0) return false;
            for(let col = 0; col < board.length; col++){
                if(board[i][col] == k) return false;
            }

            for(let row = 0; row < board.length; row++){
                if(board[row][j] == k) return false;
            }
            let boxRowStart: number = Math.floor(i / 3) * 3;
            let boxColStart: number = Math.floor(j / 3) * 3;
            
            for(let r = boxRowStart; r < boxRowStart + 3; r++){
                for(let c = boxColStart; c < boxColStart + 3; c++){
                    if(board[r][c] == k) return false;
                }
            }
            return true;
    }

    public static generateSudokuBoard(): number[][]{
        let board = this.generateSudokuBoardInt();
        while(!this.solveSudoku(JSON.parse(JSON.stringify(board)))){
            board = this.generateSudokuBoardInt();
        }
        return board;
    }

    private static generateSudokuBoardInt(): number[][]{
        let board: number[][] = 
        [ [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0] ];

        let numbers: number = 30;

        while(numbers > 0){
            while(!this.placeNumber(board, this.getRandomIntInclusive(0, 8), this.getRandomIntInclusive(0, 8), this.getRandomIntInclusive(1, 9))){
            }
            numbers--;
        }
        
        //place numbers diagonally in the board, then we have to check only the box
        /* let row = 0;
        let col = 0;
        while(row < 9 && col < 9){
            while(!this.placeNumber(board, row, col, this.getRandomNum())){
            }
            row++;
            col++;
        }
        row = 0; col = 8;
        while(row < 9 && col >= 0){
            while(!this.placeNumber(board, row, col, this.getRandomNum())){
            }
            row++;
            col--;
        }
        */
        return board;
    }

    private static placeNumber(board: number[][], row: number, col: number, num: number): boolean{
        if(board[row][col] > 0) return false;

        for(let j = 0; j < board.length; j++){
            if(board[row][j] == num) return false;
        }

        for(let i = 0; i < board.length; i++){
            if(board[i][col] == num) return false;
        }

        let rowStart = this.getBoxRowStart(row);
        let colStart = this.getBoxColStart(col);
        for(let i = rowStart; i < rowStart + 3; i++){
            for(let j = colStart; j < colStart + 3; j++){
                if(board[i][j] == num) return false;
            }
        }
        board[row][col] = num;
        return true;
    }

    private static getRandomNum(): number{
        let num: number = 0;
        while(num == 0){
            num = this.getRandomInt(10);
        }
        return num;
    }

    private static getRandomInt(max: number): number{
        return Math.floor(Math.random() * Math.max(max));
    }

    private static getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
      }

    private static getBoxRowStart(row: number): number{
        return Math.floor(row / 3) * 3;
    }

    private static getBoxColStart(col: number): number{
        return Math.floor(col / 3) * 3;
    }
}