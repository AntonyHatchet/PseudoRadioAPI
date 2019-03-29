import axios from "axios";
import * as assert from "assert";
import { logger } from "./logger";

assert(process.env.SONGS_FILE_URL, "SONGS_FILE_URL env variable should be set");

const url: string = process.env.SONGS_FILE_URL;

export default async (): Promise<any> => {
  logger.info("Fetch library data");
  let result = await axios(url);
  return result.data;
};
