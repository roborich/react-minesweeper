export const getFilledArray = <T>(length: number, value: T): T[] =>
  Array.from({ length }).fill(value) as T[];

export const shuffleSort = () => (Math.round(Math.random()) === 1 ? 1 : -1);
export const shuffle = <T>(arr: T[]): T[] => arr.slice().sort(shuffleSort);

export const chunk = <T>(arr: T[], size: number): T[][] => {
  const newArr: T[][] = [];
  arr.forEach((item, index) => {
    const newIndex = Math.floor(index / size);
    if (newArr[newIndex] === undefined) {
      newArr[newIndex] = [];
    }
    newArr[newIndex].push(item);
  });
  return newArr;
};
