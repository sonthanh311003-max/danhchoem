const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  const outputDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\ea17df29-4cb0-4037-a306-3a7bac925e0a\\wizard_flow';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Truy cập http://localhost:3000/welcome...');
  await page.goto('http://localhost:3000/welcome');
  await page.waitForTimeout(2500); // Chờ hiệu ứng mờ dần của Framer Motion xuất hiện đầy đủ

  console.log('Chụp ảnh màn hình Welcome Screen...');
  await page.screenshot({ path: path.join(outputDir, 'welcome_screen.png') });

  await browser.close();
  console.log('Hoàn thành chụp ảnh Welcome Screen!');
}

run().catch(console.error);
