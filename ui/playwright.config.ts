import { defineConfig } from '@playwright/test';

// Bout en bout : un vrai navigateur contre la vraie stack (API Spring + front Angular),
// sans API simulée. Playwright démarre les deux serveurs, ou réutilise ceux qui tournent.
export default defineConfig({
  testDir: './e2e',
  workers: 1,
  forbidOnly: !!process.env['CI'],
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: [
    {
      command: './gradlew bootRun',
      cwd: '..',
      // Prêt dès que l'API répond (même en 401 une fois la sécurité ajoutée).
      port: 8080,
      timeout: 180_000,
      reuseExistingServer: !process.env['CI'],
    },
    {
      command: 'npm start',
      port: 4200,
      timeout: 120_000,
      reuseExistingServer: !process.env['CI'],
    },
  ],
});
