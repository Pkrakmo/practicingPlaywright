Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
√ Do you want to use TypeScript or JavaScript? · TypeScript
√ Where to put your end-to-end tests? · tests
√ Add a GitHub Actions workflow? (y/N) · false
√ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen https://example.com    
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - .\playwright.config.ts - Playwright Test configuration

  Playwright Docs: https://playwright.dev/docs/intro

  Playwright API: https://playwright.dev/docs/api/class-playwright


  Remember dotenv: URL="https://example.com"




  -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
      Started: Fri May 31 2024 20:40:53 GMT+0200 (sentraleuropeisk sommertid)
      Runtime: 123527
      :large_green_circle: 1 | :red_circle: 12
      -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
      Failed: []
      Timed out: [
  "example.spec.ts:27:7",
  "example.spec.ts:27:7",
  "example.spec.ts:16:5",
  "example.spec.ts:27:7",
  "example.spec.ts:27:7",
  "example.spec.ts:16:5",
  "example.spec.ts:27:7",
  "example.spec.ts:16:5",
  "example.spec.ts:27:7",
  "example.spec.ts:27:7",
  "example.spec.ts:27:7",
  "example.spec.ts:16:5"
]
      Skipped: []
      -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.