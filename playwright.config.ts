import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  projects: [
    {
      name: "node",
      testMatch: [
        "**/unit/**/*.spec.ts",
        "**/integration/**/*.spec.ts",
        "**/e2e/**/*.spec.ts",
      ],
    },
    {
      name: "chromium",
      testMatch: ["**/browser/**/*.spec.ts"],
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      testMatch: ["**/browser/**/*.spec.ts"],
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      testMatch: ["**/browser/**/*.spec.ts"],
      use: { browserName: "webkit" },
    },
    {
      name: "mobile-chromium",
      testMatch: ["**/browser/**/*.spec.ts"],
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "mobile-webkit",
      testMatch: ["**/browser/**/*.spec.ts"],
      use: { ...devices["iPhone 14"] },
    },
  ],
});
