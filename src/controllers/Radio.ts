import * as Koa from "koa";
import { ILibrary } from "datatypes/types";
import fetch from "libs/fetch";
import xmlParser from "libs/xmlParser";

import {
  getSongsByEnding,
  getSongsByEndingAndTimeLimit
} from "libs/prepareResponseData";

class Radio {
  public library: ILibrary;

  public async root(ctx: Koa.Context): Promise<void> {
    ctx.body = {
      routes: {
        "/": "You are here now =)",
        "/playlist": "This route will return 10 random tracks.",
        "/playlist/:count":
          "This route will return a playlist with requested count tracks",
        "/playlist/shortest/:duration":
          "This route will return the shortest count of tracks playlist, in a given duration."
      }
    };
  }

  public shortest = async (ctx: Koa.Context): Promise<void> => {
    if (!this.library) {
      let result = await fetch();
      this.library = xmlParser(result);
    }

    ctx.body = getSongsByEndingAndTimeLimit(
      ctx.params.duration,
      this.library.songs
    );
  };

  public playlist = async (ctx: Koa.Context): Promise<void> => {
    if (!this.library) {
      let result = await fetch();
      this.library = xmlParser(result);
    }

    ctx.body = getSongsByEnding(ctx.params.count, this.library.songs);
  };
}

export default Radio;
