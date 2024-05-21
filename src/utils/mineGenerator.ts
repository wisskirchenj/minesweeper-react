// random generator for 10 mines in the 8 x 9 cell field
export function generateMines(): number[] {
  const mines: number[] = [];
  while (mines.length < 10) {
    const mine = Math.floor(Math.random() * 8 * 9);
    if (!mines.includes(mine)) {
      mines.push(mine);
    }
  }
  return mines;
}
