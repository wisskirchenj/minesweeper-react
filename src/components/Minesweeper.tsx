import '@/components/Minesweeper.css'
import {ControlPanel} from "@/components/ControlPanel.tsx";
import {Field} from "@/components/Field.tsx";
import bomb from '@/assets/bomb.svg'
import React, {useState} from "react";
import {FieldModel, initializeMineField, ROWS_DEFAULT, COLS_DEFAULT, MINES_DEFAULT} from "@/model/fieldModel.ts";

export type GameState = 'initial' | 'won' | 'running' | 'lost';

export const Minesweeper = () => {
  const [field, setField] = useState<FieldModel>(
      initializeMineField(ROWS_DEFAULT, COLS_DEFAULT, MINES_DEFAULT)
  );
  const [rows, setRows] = useState(ROWS_DEFAULT.toString());
  const [cols, setCols] = useState(COLS_DEFAULT.toString());
  const [minesToFlag, setMinesToFlag] = useState(MINES_DEFAULT);
  const [gameState, setGameState] = useState<GameState>('initial')

  const changeGameState = (newState: GameState) => {
    newState === 'initial' && resetGameState()
    setGameState(newState);
  }

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setRows(newValue);
  }

  const handleColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setCols(newValue);
  }

  const changeMinesToFlag = (change: number) => {
    setMinesToFlag(minesToFlag + change);
  }

  const setMines = (value: number) => {
    setMinesToFlag(value);
    setField(initializeMineField(Number(rows), Number(cols), value));
  }

  const resetGameState = () => {
    setMinesToFlag(field.mine_count);
    setField(initializeMineField(Number(rows), Number(cols), field.mine_count));
  }

  return (
      <div className="Minesweeper" style={{width: 50 * field.cols}}>
        <header className="Minesweeper-header">
          <h2>Minesweeper&nbsp;&nbsp;</h2>
          <img src={bomb} className="Minesweeper-logo" alt="bomb"/>
          <div>
            &nbsp;&nbsp;
            <input id="rows" value={rows} disabled={gameState === "running"} onChange={handleRowChange}></input>
            &nbsp;x&nbsp;
            <input id="cols" value={cols} disabled={gameState === "running"} onChange={handleColChange}></input>
          </div>
        </header>
        <ControlPanel gameState={gameState} minesToFlag={minesToFlag}
                      changeGameState={changeGameState}
                      setMines={setMines}
        />
        <Field
            field={field} setField={setField}
            gameState={gameState} changeGameState={changeGameState}
            minesToFlag={minesToFlag} changeFlagged={changeMinesToFlag}
        />
      </div>
  )
}
