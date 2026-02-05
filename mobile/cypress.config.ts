import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8081",
    viewportWidth: 375,
    viewportHeight: 812, // iPhone X dimensions effectively
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
