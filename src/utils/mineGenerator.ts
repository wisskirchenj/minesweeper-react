export const generateMines = (rows: number, cols: number, mine_count: number): number[] => {
  const mines: number[] = [];
  while (mines.length < mine_count) {
    const mine = Math.floor(Math.random() * rows * cols);
    if (!mines.includes(mine)) {
      mines.push(mine);
    }
  }
  return mines;
}
