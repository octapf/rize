import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://127.0.0.1:8081",
    viewportWidth: 375,
    viewportHeight: 812,
    defaultCommandTimeout: 15000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 20000,
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
