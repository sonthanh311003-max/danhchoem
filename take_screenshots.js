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

  // 1. Chụp trang chủ
  console.log('Truy cập trang chủ http://localhost:3000/...');
  await page.goto('http://localhost:3000');
  
  console.log('Chụp ảnh Trang chủ Scene 1...');
  await page.screenshot({ path: path.join(outputDir, 'home_scene1.png') });
  
  await page.waitForTimeout(3000); // Đợi nắng và phong bì hiện ra
  console.log('Chụp ảnh Trang chủ Scene 3 (Volumetric Light + Envelope)...');
  await page.screenshot({ path: path.join(outputDir, 'home_scene3.png') });

  // 2. Chụp Wizard
  console.log('Truy cập http://localhost:3000/wizard...');
  await page.goto('http://localhost:3000/wizard');
  await page.waitForTimeout(2000);

  // STEP 1
  console.log('Chụp ảnh Step 1...');
  await page.screenshot({ path: path.join(outputDir, 'step_1.png') });
  await page.click('button:has-text("Người ấy")');
  await page.waitForTimeout(1500);

  // STEP 2
  console.log('Chụp ảnh Step 2...');
  await page.screenshot({ path: path.join(outputDir, 'step_2.png') });
  await page.click('button:has-text("Kỷ niệm ngày yêu")');
  await page.waitForTimeout(1500);

  // STEP 3
  console.log('Chụp ảnh Step 3...');
  await page.screenshot({ path: path.join(outputDir, 'step_3.png') });
  await page.fill('input[type="text"]', 'Mùa thu yêu thương');
  await page.waitForTimeout(500);
  await page.click('button:has-text("Tiếp tục câu chuyện")');
  await page.waitForTimeout(1500);

  // STEP 4
  console.log('Chụp ảnh Step 4...');
  await page.screenshot({ path: path.join(outputDir, 'step_4.png') });
  await page.click('button:has-text("Classic")');
  await page.waitForTimeout(1500);

  // STEP 5
  console.log('Chụp ảnh Step 5...');
  await page.screenshot({ path: path.join(outputDir, 'step_5.png') });
  await page.fill('input[type="url"]', 'https://images.unsplash.com/photo-1518199266791-5375a83190b7');
  await page.waitForTimeout(500);
  await page.click('form button');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outputDir, 'step_5_uploaded.png') });
  await page.click('button:has-text("Tiếp tục câu chuyện")');
  await page.waitForTimeout(1500);

  // STEP 6
  console.log('Chụp ảnh Step 6...');
  await page.screenshot({ path: path.join(outputDir, 'step_6.png') });
  await page.click('button:has-text("Chọn nhạc sau")');
  await page.waitForTimeout(1500);

  // STEP 7
  console.log('Chụp ảnh Step 7...');
  await page.screenshot({ path: path.join(outputDir, 'step_7.png') });
  await page.click('button:has-text("Tự viết từ đầu")');
  await page.waitForTimeout(1500);

  // STEP 8
  console.log('Chụp ảnh Step 8 (Generating)...');
  await page.screenshot({ path: path.join(outputDir, 'step_8.png') });

  await browser.close();
  console.log('Hoàn thành chụp ảnh toàn bộ!');
}

run().catch(console.error);
