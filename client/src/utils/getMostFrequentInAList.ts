// https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
export default (myArray: string[]): string => {
  return myArray.reduce(
    (a, b, i, arr) =>
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length
        ? a
        : b,
    null
  );
};
