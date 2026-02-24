const { execSync } = require("child_process");

module.exports = async () => {
  execSync("npx sequelize-cli db:migrate --env test", { stdio: "inherit" });
  // 如果你想讓 test DB 每次都有 seed 資料，再打開這行：
  // execSync("npx sequelize-cli db:seed:all --env test", { stdio: "inherit" });
};