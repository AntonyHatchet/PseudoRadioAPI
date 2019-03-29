import * as moduleAlias from "module-alias";
moduleAlias();
import xmlParser from "./xmlParser";

import * as assert from "assert";

const correctXml = `
  <Library>
    <Artist name="Duran Duran">
      <Song name="Planet Earth" id='3699' duration='237531'/>
      <Song name="Big Bang Generation" id='3706' duration='284160'/>
      <Song name="Electric Barbarella" id='3707' duration='319085'/>
    </Artist>
    <Artist name="2 Unlimited">
      <Song name="Get Ready For This (Orchestral Mix)" id='3731' duration='327471'/>
      <Song name="Do What's Good For Me" id='3791' duration='136829'/>
    </Artist>
  </Library>
`;
const incorrectXml = `
<Library>
	<Artistname="Duran Duran">
		Song name="Planet Earth" id='3699' duration='237531'/>
		<Song name="Big Bang Generation" id='3706' duration='284160'/>
		<Song name="Electric Barbarella" id='3707' duration='319085'/
  <Artist>
`;

describe("xmlParser", () => {
  describe("for correct data", () => {
    it("should return parsed xml", async () => {
      let result = xmlParser(correctXml);
      assert.notEqual(result.artists.size, 0);
      assert.deepStrictEqual(result.songs.get("b")[0], {
        name: "Big Bang Generation",
        id: 3706,
        duration: 284160,
        artist: "Duran Duran"
      });
    });
  });
  describe("for incorrect data", () => {
    it("should return error", async () => {
      let error: Error;
      try {
        xmlParser(incorrectXml);
      } catch (err) {
        error = err;
      }
      assert.strictEqual(
        error.message,
        "Attribute without value\nLine: 6\nColumn: 10\nChar: >"
      );
    });
  });
});
