import "@/components/Field.css"
import {Cell} from "@/components/Cell.tsx";
import {FieldModel, getNeighborPositions} from "@/model/fieldModel.ts";
import {GameState} from "@/components/Minesweeper.tsx";

interface FieldProps {
  field: FieldModel;
  setField: (field: FieldModel) => void;
  gameState: GameState;
  changeGameState: (newState: GameState) => void;
  minesToFlag: number;
  changeFlagged: (change: number) => void;
}

export const Field = (
    {field, setField, gameState, changeGameState, minesToFlag, changeFlagged}: Readonly<FieldProps>
) => {

  const changeAndSetField = (action: (field: FieldModel) => void) => {
    const newField = {...field};
    action(newField);
    setField(newField);
  }

  const revealEmptyNeighbors = (row: number, col: number) => {
    const zeroMineNeighborCells = [{row: row, col: col}]
    while (zeroMineNeighborCells.length > 0) {
      const center = zeroMineNeighborCells.pop()!;
      const unrevealedNeighbors = getNeighborPositions(center.row, center.col).filter(
          pos => !field.cells[pos.row][pos.col].revealed && !field.cells[pos.row][pos.col].flagged);
      zeroMineNeighborCells.push(...unrevealedNeighbors.filter(pos =>
          field.cells[pos.row][pos.col].neighborMines === 0));
      changeAndSetField((newField: FieldModel) => {
        unrevealedNeighbors.forEach(pos => newField.cells[pos.row][pos.col].revealed = true);
      });
    }
  }

  const handleClick = (row: number, col: number, rightClick: boolean) => {
    if (gameState === 'won' || gameState === 'lost') {
      return;
    }
    if (rightClick && (minesToFlag || field.cells[row][col].flagged) && !field.cells[row][col].revealed) {
      handleRightClick(row, col);
    } else if (!rightClick && !field.cells[row][col].revealed && !field.cells[row][col].flagged) {
      gameState === 'initial' && changeGameState('running');
      handleLeftClick(row, col);
    }
    checkWin();
  }

  const checkWin = () => {
    let won = true;
    field.cells.forEach(row => row.forEach(cell => {
      if (cell.mine !== cell.flagged || (!cell.revealed && !cell.mine)) {
        won = false;
      }
    }));
    won && changeGameState('won');
  }

  const revealAllMines = () => {
    changeAndSetField((newField: FieldModel) => {
      newField.cells.forEach(row => row.forEach(cell => {
        if (cell.mine) {
          cell.flagged = false;
          cell.revealed = true;
        }
      }));
    });
  }

  const handleLeftClick = (row: number, col: number) => {
    changeAndSetField((newField: FieldModel) => newField.cells[row][col].revealed = true);
    if (field.cells[row][col].mine) {
      if (gameState === 'initial') {
        changeGameState('initial');
        return;
      }
      revealAllMines();
      changeGameState('lost');
    } else if (field.cells[row][col].neighborMines === 0) {
      revealEmptyNeighbors(row, col);
    }
  }

  const handleRightClick = (row: number, col: number) => {
    changeAndSetField((newField: FieldModel) =>
        newField.cells[row][col].flagged = !newField.cells[row][col].flagged);
    changeFlagged(field.cells[row][col].flagged ? -1 : 1);
  }

  return (
      <div className="field">
        {field.cells.map((row, i) => (
            <div className="row" key={i}>
              {row.map((cell, j) => (
                  <Cell cellModel={cell} key={`${i},${j}`} clickHandler={handleClick}/>
              ))}
            </div>
        ))}
      </div>
  )
}
