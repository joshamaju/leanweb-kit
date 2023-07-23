import { serve } from "@hono/node-server";

// @ts-ignore
import app from "./.hono-mvc/server/entry.js";

serve(app, (info) => {
  console.log("Server running " + info.address);
});
