import * as moduleAlias from "module-alias";
moduleAlias();
import {
  getFirstChar,
  getLastChar,
  getRandomChar,
  getRandomNumberBetween
} from "./helpers";

import * as assert from "assert";

let strings = [
  "!some test (string)",
  "some new [text] !!!!_?",
  "!!!!_? (and) one more",
  "[and] !$the last one"
];

describe("Helpers test", () => {
  describe("getFirstChar", () => {
    it("should return first alphabetic char except words inside brackets", async () => {
      let result = strings.map(string => getFirstChar(string));
      assert.deepStrictEqual(result, ["s", "s", "o", "t"]);
    });
  });

  describe("getLastChar", () => {
    it("should return last alphabetic char except words inside brackets", async () => {
      let result = strings.map(string => getLastChar(string));
      assert.deepStrictEqual(result, ["t", "w", "e", "e"]);
    });
  });

  describe("getRandomNumberBetween", () => {
    it("should return random number between min and max", async () => {
      let result = getRandomNumberBetween(7, 100);
      assert.equal(true, result >= 7);
      assert.equal(true, result <= 100);
    });
  });

  describe("getRandomChar", () => {
    it("should return random letter", async () => {
      let first = getRandomChar();
      let second = getRandomChar(first);
      assert.notEqual(first, second);
    });
  });
});
