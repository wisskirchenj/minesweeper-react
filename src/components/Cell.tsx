import "@/components/Cell.css"
import target from "@/assets/target.svg";
import fired from "@/assets/fired.svg";
import React, {useState} from "react";

type Status = "hidden" | "revealed" | "flagged";

export interface CellProps {
  mine: boolean;
}

export function Cell({mine}: CellProps) {

  const [status, setStatus] = useState<Status>("hidden");

  function dynamicClass() {
    if (status === "flagged") {
      return "flagged";
    } else if (status === "revealed") {
      return mine ? "mine" : "empty";
    }
    return "";
  }

  function handleClick() {
    setStatus("revealed");
  }

  function handleRightClick(mouseEvent: React.MouseEvent) {
    mouseEvent.preventDefault();
    setStatus(status === "flagged" ? "hidden" : "flagged");
  }


  return (
      <div className={`cell ${dynamicClass()}`} onClick={handleClick} onContextMenu={handleRightClick}>
        {status === "revealed" && mine && <img src={fired} className="cell-image" alt="mine"/>}
        {status === "flagged" && <img src={target} className="cell-image" alt="flagged"/>}
      </div>
  )
}
