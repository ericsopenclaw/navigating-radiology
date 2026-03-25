import { chromium } from 'playwright';

// Connect to the existing Chrome instance with remote debugging
const browser = await chromium.connect({
  wsEndpoint: 'ws://localhost:9222/devtools/browser/a1ffaf2b-4821-4b29-97ad-6f4e86ecc322'
});

console.log('Connected! Tabs:');
const targets = await browser.targets();
targets.forEach(t => console.log(' -', t.url(), '|', t.type()));

await browser.close();
