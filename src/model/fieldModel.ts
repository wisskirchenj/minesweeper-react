import {generateMines} from "@/utils/mineGenerator.ts";

export interface Position {
  row: number;
  col: number;
}

export interface FieldModel {
  rows: number;
  cols: number;
  mine_count: number;
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

export const ROWS_DEFAULT = 13;
export const COLS_DEFAULT = 11;
export const MINES_DEFAULT = 20;

export const initializeMineField = (rows: number, cols: number, mines: number): FieldModel => {
  const createField = () => {
    const field: FieldModel = {
      rows: rows,
      cols: cols,
      mine_count: mines,
      cells: []
    };
    for (let row = 0; row < rows; row++) {
      field.cells[row] = [];
      for (let col = 0; col < cols; col++) {
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
    minePositions.forEach(mine => field.cells[Math.floor(mine / cols)][mine % cols].mine = true);
  }

  const calculateNeighborMines = () => {
    const countNeighborMines = (row: number, col: number) => {
      let count = 0;
      getNeighborPositions(row, col, rows, cols).forEach(pos => {
        if (field.cells[pos.row][pos.col].mine) {
          count++;
        }
      });
      return count;
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        field.cells[row][col].neighborMines = countNeighborMines(row, col);
      }
    }
  }

  if (isNaN(rows) || isNaN(cols) || isNaN(mines) || rows < 1 || cols < 8 || mines >= rows * cols) {
    throw new Error("Invalid field parameters");
  }
  const field = createField();
  const minePositions = generateMines(rows, cols, mines);
  fillMinesIntoField();
  calculateNeighborMines();
  return field;
}

export const getNeighborPositions = (row: number, col: number, rows: number, cols: number): Position[] => {
  const positions = [];
  for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
    for (let j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); j++) {
      positions.push({row: i, col: j});
    }
  }
  return positions.filter(pos => pos.row !== row || pos.col !== col);
}
