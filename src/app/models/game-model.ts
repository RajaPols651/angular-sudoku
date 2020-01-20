import { Player } from './player-model';
import { GameLevel } from '../enums';

export class Game{
    board: number[][];
    players: Player[];
    gameLevel: GameLevel;
  
    constructor(level: GameLevel, board: number[][]){
      this.gameLevel = level;
      this.board = board;
    }
  }