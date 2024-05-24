import "@/components/Cell.css"
import target from "@/assets/target.svg";
import fired from "@/assets/fired.svg";
import React from "react";
import {CellModel} from "@/model/fieldModel.ts";

interface CellProps {
  cellModel: CellModel;
  clickHandler: (row: number, col: number, rightClick: boolean) => void;
}

export const Cell = ({cellModel, clickHandler}: Readonly<CellProps>) => {

  const dynamicClass = () => {
    if (cellModel.flagged) {
      return "flagged";
    } else if (cellModel.revealed) {
      return cellModel.mine ? "mine" : "empty";
    }
    return "";
  }

  const handleClick= () => {
    clickHandler(cellModel.row, cellModel.col, false);
  }

  const handleRightClick = (mouseEvent: React.MouseEvent) => {
    mouseEvent.preventDefault();
    clickHandler(cellModel.row, cellModel.col, true);
  }

  return (
      <div
        className={`cell ${dynamicClass()}`}
        onClick={handleClick} onContextMenu={handleRightClick}>
        {cellModel.revealed && (cellModel.mine
            ? <img src={fired} className="cell-image" alt="mine"/>
            : <span>{cellModel.neighborMines ? cellModel.neighborMines : ''}</span>)}
        {cellModel.flagged && <img src={target} className="cell-image" alt="flagged"/>}
      </div>
  )
}
