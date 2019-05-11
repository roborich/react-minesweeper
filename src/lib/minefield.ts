import { getFilledArray, shuffleSort } from '../util';

export interface SquareData {
  hasMine: boolean;
  isCleared: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

const getNeighbors = (
  width: number,
  height: number,
  index: number,
): number[] => {
  const minRowIndex = Math.floor(index / width) * width;
  const isLeft = index === minRowIndex;
  const isRight = index === minRowIndex + width - 1;
  const isTop = index - width < 0;
  const isBottom = index + width > width * height - 1;

  return [0, 1, 2, 3, 5, 6, 7, 8]
    .map(n => {
      const xOffset = (n % 3) - 1;
      const yOffset = Math.floor(n / 3) - 1;
      if (
        (isLeft && xOffset === -1) ||
        (isRight && xOffset === 1) ||
        (isTop && yOffset === -1) ||
        (isBottom && yOffset === 1)
      ) {
        return undefined;
      }
      return index + yOffset * width + xOffset;
    })
    .filter(neighbor => neighbor !== undefined) as number[];
};

export const createMinefield = (
  width: number,
  height: number,
  totalMines: number,
): SquareData[] => {
  const getNeighborCount = (index: number, data: boolean[]): number => {
    return getNeighbors(width, height, index)
      .map(neighborIndex => {
        if (data[neighborIndex] === undefined) {
          return 0;
        }
        return Number(data[neighborIndex]);
      })
      .reduce((a, b) => a + b);
  };

  return [
    ...getFilledArray(totalMines, true),
    ...getFilledArray(height * width - totalMines, false),
  ]
    .sort(shuffleSort)
    .map((hasMine, i, arr) => ({
      hasMine,
      isCleared: false,
      isFlagged: false,
      neighborCount: getNeighborCount(i, arr),
    }));
};

export const clearSquare = (
  data: SquareData[],
  width: number,
  height: number,
  index: number,
): void => {
  if (data[index].isCleared) {
    return;
  }
  data[index].isCleared = true;
  if (data[index].neighborCount === 0) {
    getNeighbors(width, height, index).forEach(neighbor => {
      clearSquare(data, width, height, neighbor);
    });
  }
};

export const didWin = (field: SquareData[]): boolean =>
  field.every(({ isCleared, hasMine }) => isCleared || hasMine);

const getFlagCount = (field: SquareData[]): number =>
  field.reduce((total: number, { isFlagged }) => total + Number(isFlagged), 0);

export const unflaggedCount = (
  field: SquareData[],
  totalMines: number,
): number => totalMines - getFlagCount(field);

export const revealAll = (field: SquareData[]): SquareData[] =>
  field.map(data => {
    data.isCleared = true;
    return data;
  });
