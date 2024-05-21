import App from '@/App';
import '@testing-library/jest-dom';
import {render, screen, userEvent} from './util/test-utils';
import {fireEvent} from "@testing-library/react";

describe('Simple App test', () => {
  it('the app title is displayed', () => {
    render(<App/>);
    expect(screen.getByText(/Minesweeper/)).toBeInTheDocument();
  })

  // assert, that the bomb.svg is visible
  it('two bombs are visible - in title and mine counter', () => {
    render(<App/>);
    expect(screen.getAllByAltText(/bomb/i)).toHaveLength(2);
  })

  it('72 cells are in with black background-color', async () => {
    render(<App/>)
    const cells = document.querySelectorAll('.cell');
    expect(cells.length).toEqual(8 * 9);
    const element = cells[0];
    expect(getComputedStyle(element).backgroundColor).toEqual('rgba(0, 0, 0, 0)');
  })

  it('10 cells have a bomb inside', async () => {
    render(<App/>)
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
      await userEvent.click(cell);
    }
    const cellsWithMines = document.querySelectorAll('.mine');
    expect(cellsWithMines.length).toEqual(10);
  })

  it('right click on cell displays flagged logo', async () => {
    render(<App/>)
    const cells = document.querySelectorAll('.cell');
    fireEvent.contextMenu(cells[0]);
    expect(screen.getByAltText(/flagged/i)).toBeInTheDocument();
  })
})
