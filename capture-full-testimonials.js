import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-cache']
  });

  // === DESKTOP 1440px ===
  console.log('=== Desktop 1440px ===');
  let page = await browser.newPage();
  await page.setCacheEnabled(false);
  
  // Tall viewport to accommodate full section
  await page.setViewport({ width: 1440, height: 3000 });
  
  const html = readFileSync('recap.html', 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(resolve => setTimeout(resolve, 4000));

  // Scroll to testimonials
  await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (section) {
      section.scrollIntoView({ block: 'center' });
    }
  });
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Take element screenshot (this captures the full element regardless of viewport)
  const section = await page.$('#testimonials');
  if (section) {
    await section.screenshot({
      path: '/opt/cursor/artifacts/r24-testimonials-1440.png'
    });
    
    const boxCount = await page.evaluate(() => {
      return document.querySelectorAll('.testimonial-box').length;
    });
    console.log(`✓ Desktop screenshot saved (${boxCount} boxes)`);
  }

  await page.close();

  // === MOBILE 390px ===
  console.log('\n=== Mobile 390px ===');
  page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 390, height: 4000 });
  
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(resolve => setTimeout(resolve, 4000));

  await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (section) {
      section.scrollIntoView({ block: 'center' });
    }
  });
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  const sectionMobile = await page.$('#testimonials');
  if (sectionMobile) {
    await sectionMobile.screenshot({
      path: '/opt/cursor/artifacts/r24-testimonials-390.png'
    });
    
    const boxCount = await page.evaluate(() => {
      return document.querySelectorAll('.testimonial-box').length;
    });
    console.log(`✓ Mobile screenshot saved (${boxCount} boxes)`);
  }

  await browser.close();
  console.log('\n=== All testimonials screenshots complete ===');
})();
