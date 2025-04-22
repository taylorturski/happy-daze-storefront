import {defineConfig, devices} from "@playwright/test";

export default defineConfig({
  testDir: "tests",

  timeout: 30_000,

  retries: process.env.CI ? 2 : 0,

  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    viewport: {width: 1280, height: 720},
    actionTimeout: 10_000,
    trace: "on-first-retry",
  },

  // ▶️ Start your Next.js dev server before tests, and reuse if already running
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {name: "chromium", use: {...devices["Desktop Chrome"]}},
    {name: "firefox", use: {...devices["Desktop Firefox"]}},
    {name: "webkit", use: {...devices["Desktop Safari"]}},
  ],

  outputDir: "playwright-report",
});
