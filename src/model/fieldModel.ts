import {generateMines} from "@/utils/mineGenerator.ts";

export interface Position {
  row: number;
  col: number;
}

export interface FieldModel {
  cells: CellModel[][];
}

export interface CellModel {
  row: number;
  col: number;
  mine: boolean;
  neighborMines: number;
  revealed: boolean;
  flagged: boolean;
}

export const ROWS = 13;
export const COLS = 11;
export const MINE_COUNT = 20;

export const initializeMineField = (): FieldModel => {
  const createField = () => {
    const field: FieldModel = {
      cells: []
    };
    for (let row = 0; row < ROWS; row++) {
      field.cells[row] = [];
      for (let col = 0; col < COLS; col++) {
        field.cells[row][col] = {
          row: row,
          col: col,
          mine: false,
          neighborMines: 0,
          revealed: false,
          flagged: false,
        };
      }
    }
    return field;
  }

  const fillMinesIntoField = () => {
    minePositions.forEach(mine => field.cells[Math.floor(mine / COLS)][mine % COLS].mine = true);
  }

  const calculateNeighborMines = () => {
    const countNeighborMines = (row: number, col: number) => {
      let count = 0;
      getNeighborPositions(row, col).forEach(pos => {
        if (field.cells[pos.row][pos.col].mine) {
          count++;
        }
      });
      return count;
    }

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        field.cells[row][col].neighborMines = countNeighborMines(row, col);
      }
    }
  }

  const field = createField();
  const minePositions = generateMines(ROWS, COLS, MINE_COUNT);
  fillMinesIntoField();
  calculateNeighborMines();
  return field;
}

export const getNeighborPositions = (row: number, col: number): Position[] => {
  const positions = [];
  for (let i = Math.max(0, row - 1); i <= Math.min(ROWS - 1, row + 1); i++) {
    for (let j = Math.max(0, col - 1); j <= Math.min(COLS - 1, col + 1); j++) {
      positions.push({row: i, col: j});
    }
  }
  return positions.filter(pos => pos.row !== row || pos.col !== col);
}
