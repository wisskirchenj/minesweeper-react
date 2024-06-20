import App from '@/App';
import '@testing-library/jest-dom';
import {render} from './util/test-utils';
import {Cell} from "../src/components/Cell";
import {vi} from "vitest";

vi.mock('@/components/Cell.tsx');

describe('Simple App test with mocked cell', () => {

  it('MINE_COUNT cells have a bomb inside', () => {
    vi.mocked(Cell).mockImplementation(
        (props) => <div className="cell">{props.cellModel.mine ? 'true' : 'false'}</div>);
    render(<App/>)
    const cellsWithMines = [...document.querySelectorAll('.cell').values()].filter(
        cell => cell.textContent === 'true');
    expect(cellsWithMines.length).toEqual(20);
  })
})
