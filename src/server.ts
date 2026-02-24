import "dotenv/config";
import app from "./app";
import { initDb } from "./models";

const port = Number(process.env.PORT || 3000);

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
(async () => {
  await initDb();
  console.log("DB connected");

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})();