import * as moduleAlias from "module-alias";
moduleAlias();
import fetch from "./fetch";

import * as assert from "assert";

describe("fetch async data", () => {
  describe("for correct data", () => {
    it("should return fetched data", async () => {
      let result = await fetch();
      assert.notEqual(result.length, 0);
    });
  });
});
