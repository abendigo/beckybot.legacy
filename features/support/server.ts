import { handler } from "../../frontend/build/handler";
import polka from "polka";

const app = polka()
  .use(handler)
  .listen(3001, () => {
    console.log("running");
  });

// setTimeout(() => {
//   app.server.close();
// }, 5000);
