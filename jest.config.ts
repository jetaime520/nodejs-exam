import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  setupFiles: ["dotenv/config"],
  globalSetup: "<rootDir>/test/globalSetup.js",
  globalTeardown: "<rootDir>/test/globalTeardown.js",
};

export default config;