const regExp = /\[(.*?)\]|\((.*?)\)|\!|\?|\_|\$|\.|\||\"|\'?/gi;
export const getFirstChar = (name: string = ""): string => {
  return name
    .replace(regExp, "")
    .trim()
    .toLowerCase()[0];
};

export const getLastChar = (name: string = ""): string => {
  return name
    .replace(regExp, "")
    .trim()
    .toLowerCase()
    .split("")
    .pop();
};

export const getRandomChar = (
  char: string = "",
  attempt: number = 10
): string => {
  let from = "a".charCodeAt(0); // get char code for start position
  let to = "z".charCodeAt(0); // get char code for end position
  let randomNumber = getRandomNumberBetween(from, to + 1);
  let newChar = String.fromCharCode(randomNumber);

  if (char === newChar && attempt > 0) {
    return getRandomChar(char, --attempt);
  }
  return newChar;
};

export const getRandomNumberBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};
