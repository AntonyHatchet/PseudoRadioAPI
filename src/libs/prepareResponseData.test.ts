import * as moduleAlias from "module-alias";
moduleAlias();
import {
  getSongsByEnding,
  getSongsByEndingAndTimeLimit
} from "libs/prepareResponseData";

import * as assert from "assert";
let songs = new Map();
songs.set("a", [
  {
    name: "Ab",
    id: 1,
    duration: 1 * 60000,
    artist: "Artist"
  },
  {
    name: "Abc",
    id: 11,
    duration: 5 * 60000,
    artist: "Artist"
  }
]);
songs.set("b", [
  {
    name: "bC",
    id: 2,
    duration: 2 * 60000,
    artist: "Artist"
  },
  {
    name: "bCa",
    id: 22,
    duration: 5 * 60000,
    artist: "Artist"
  }
]);
songs.set("c", [
  {
    name: "Cb",
    id: 3,
    duration: 3 * 60000,
    artist: "Artist"
  },
  {
    name: "Cba",
    id: 33,
    duration: 4 * 60000,
    artist: "Artist"
  },
  {
    name: "Cbab",
    id: 34,
    duration: 2 * 60000,
    artist: "Artist"
  },
  {
    name: "Cbac",
    id: 35,
    duration: 2 * 60000,
    artist: "Artist"
  }
]);

describe("getSongsByEnding", () => {
  describe("for correct data", () => {
    it("should return prepared data", async () => {
      let result = getSongsByEnding(3, songs);
      assert.strictEqual(result.length, 3);
    });
  });
});

describe("getSongsByEndingAndTimeLimit", () => {
  describe("for correct data", () => {
    it("should return Ab and bC tracks", async () => {
      let result = getSongsByEndingAndTimeLimit(3, songs, "a");
      assert.strictEqual(result[0].name, "Ab");
      assert.strictEqual(result[1].name, "bC");
    });
    it("should return Abc and Cba tracks", async () => {
      let result = getSongsByEndingAndTimeLimit(9, songs, "a");
      assert.strictEqual(result[0].name, "Abc");
      assert.strictEqual(result[1].name, "Cba");
    });
    it("should return 3 tracks", async () => {
      let result = getSongsByEndingAndTimeLimit(12, songs, "b");
      assert.strictEqual(result.length, 3);
    });
  });
  describe("for incorect data", () => {
    it("should return empty array", async () => {
      let result = getSongsByEndingAndTimeLimit(0, songs);
      assert.strictEqual(result.length, 0);
    });
    it("should return empty array", async () => {
      let result = getSongsByEndingAndTimeLimit(12, new Map(), "q");
      assert.strictEqual(result.length, 0);
    });
  });
});
