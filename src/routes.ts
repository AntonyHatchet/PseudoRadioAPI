import * as Router from "koa-router";

import Radio from "controllers/Radio";

const router = new Router();
const radio = new Radio();

router
  .get("/", radio.root)
  .get("/playlist", radio.playlist)
  .get("/playlist/:count", radio.playlist)
  .get("/playlist/shortest/:duration", radio.shortest);

export default router;
