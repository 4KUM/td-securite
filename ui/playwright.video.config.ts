import { defineConfig } from '@playwright/test';
import base from './playwright.config';

// Même stack que l'e2e, mais pour filmer : un seul scénario (e2e/demo.video.ts),
// ralenti pour qu'on suive, vidéo gardée dans video/.
export default defineConfig({
  ...base,
  testDir: './e2e',
  testMatch: 'demo.video.ts',
  outputDir: './video',
  use: {
    ...base.use,
    viewport: { width: 1280, height: 720 },
    video: { mode: 'on', size: { width: 1280, height: 720 } },
    launchOptions: { slowMo: 600 },
  },
});
