import "@/components/Field.css"
import {Cell} from "@/components/Cell.tsx";
import {generateMines} from "@/utils/mineGenerator.ts";

export function Field() {
  const ROWS = 9;
  const COLS = 8;
  const mines = generateMines()
  const rows = Array.from({length: ROWS}, (_, i) => (
      <div className="row" key={i}>
        {
          Array.from({length: COLS}, (_, j) => {
            const hasMine = mines.includes(i * COLS + j);
            return (<Cell mine={hasMine} key={j}/>);
          })
        }
      </div>
  ));

  return (
      <div className="field">
        {rows}
      </div>
  )
}
