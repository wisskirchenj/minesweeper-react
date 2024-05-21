import "@/components/ControlPanel.css"
import bomb from "@/assets/bomb.svg";

export function ControlPanel() {
  return (
      <div className="control-panel">
        <div>
          <img src={bomb} className="mini-logo" alt="bomb"/>
          <span className="mines-counter">&nbsp;10</span>
        </div>
        <button className="reset">😀</button>
        <span className="timer">0:00</span>
      </div>
  )
}
