import {
  getLastChar,
  getRandomChar,
  getRandomNumberBetween
} from "libs/helpers";
import { ISong } from "datatypes/types";
import { logger } from "./logger";

export const getSongsByEnding = (
  counter: number = 10,
  songs: Map<string, ISong[]>
) => {
  let result = [];
  let lastChar = null;

  while (counter--) {
    if (lastChar === null) {
      lastChar = getRandomChar();
    }

    while (!songs.has(lastChar)) {
      lastChar = getRandomChar();
    }

    let songsArray = songs.get(lastChar);

    songsArray.sort((left: ISong, right: ISong) => {
      if (left.duration > right.duration) {
        return 1;
      }
      if (left.duration < right.duration) {
        return -1;
      }
      return 0;
    });

    let randomSong = songsArray[getRandomNumberBetween(0, songsArray.length)];

    result.push(randomSong.name);

    lastChar = getLastChar(randomSong.name);
  }

  return result;
};

export const getSongsByEndingAndTimeLimit = (
  minutes: number = 10,
  songs: Map<string, ISong[]>,
  starterChar: string = getRandomChar(),
  attempt: number = 10
): any[] => {
  let result = [];
  let lastChar = starterChar;

  let milliseconds = 60 * minutes * 1000;

  while (true) {
    while (!songs.has(lastChar) && --attempt) {
      lastChar = getRandomChar();
    }

    if (!songs.has(lastChar)) {
      break;
    }

    let songsArray = songs.get(lastChar);

    songsArray.sort((left: ISong, right: ISong) => {
      if (left.duration > right.duration) {
        return 1;
      }
      if (left.duration < right.duration) {
        return -1;
      }
      return 0;
    });

    let randomSong = findHigestLimitedValue(milliseconds, songsArray);

    if (!randomSong) {
      break;
    }

    milliseconds -= randomSong.duration;

    result.push({
      name: randomSong.name,
      duration: randomSong.duration
    });

    lastChar = getLastChar(randomSong.name);
  }

  if (result.length < 1 && attempt > 0) {
    return getSongsByEndingAndTimeLimit(
      minutes,
      songs,
      getRandomChar(),
      attempt - 1
    );
  }
  return result;
};

const findHigestLimitedValue = (limit: number, array: ISong[]): ISong => {
  return array.reduce((acc: ISong, val: ISong): ISong => {
    logger.info({ acc, val });
    if (
      (acc === null && val.duration <= limit) ||
      (acc && acc.duration < val.duration && val.duration <= limit)
    ) {
      acc = val;
    }

    return acc;
  }, null);
};
