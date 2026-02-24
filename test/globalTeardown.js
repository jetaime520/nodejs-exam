//const { sequelize } = require("../dist/models"); // ❌ 先不要用 dist（你現在是用 ts-jest）

//module.exports = async () => {};

// const { execSync } = require("child_process");
// module.exports = async () => {
//   execSync("npx sequelize-cli db:migrate:undo:all --env test", { stdio: "inherit" });
// };

// const testSequelize = require("./testSequelize");

// module.exports = async () => {
//   await testSequelize.close();
// };

// module.exports = async () => {
//   const { closeDb } = require("../src/models");
//   await closeDb();
// };

module.exports = async () => {
  // 這個才是 app 實際用的 sequelize instance
  const { sequelize } = require("../src/models/sequelize");
  await sequelize.close();
};