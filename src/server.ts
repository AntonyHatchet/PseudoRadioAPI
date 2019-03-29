import * as moduleAlias from "module-alias";
moduleAlias();

import "libs/unhandledRejections";

import * as dotenv from "dotenv";
dotenv.config();

import * as Koa from "koa";
import * as json from "koa-json";
import router from "./routes";
import logger from "libs/logger";

const app = new Koa();

import * as assert from "assert";

app.use(json());
app.use(router.routes()).use(router.allowedMethods());

assert(
  process.env.APP_SERVER_PORT,
  "APP_SERVER_PORT env variable should be set"
);

const port: number = Number(process.env.APP_SERVER_PORT);

app.listen(port);
logger.info(`Server listen on port ${port}`);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (
      !["Malicious Path", "Unauthorized", "request aborted"].includes(
        err.message
      )
    ) {
      logger.error(err, ctx.request, { app: "playlist" });
    }
    throw err;
  }
});
