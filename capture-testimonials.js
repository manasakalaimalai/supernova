import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  // Desktop 1440px
  let page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 2400 });
  
  const html = readFileSync('recap.html', 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Find testimonials section
  const section = await page.$('#testimonials');
  if (section) {
    const box = await section.boundingBox();
    console.log('Testimonials section box:', box);
    
    // Take full section screenshot
    await page.screenshot({
      path: 'assets/recap/testimonials-desktop-1440.png',
      clip: {
        x: 0,
        y: box.y,
        width: 1440,
        height: box.height
      }
    });
    console.log('✓ Desktop testimonials screenshot saved');
  }

  await page.close();

  // Mobile 390px
  page = await browser.newPage();
  await page.setViewport({ width: 390, height: 3000 });
  
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(resolve => setTimeout(resolve, 3000));

  const sectionMobile = await page.$('#testimonials');
  if (sectionMobile) {
    const box = await sectionMobile.boundingBox();
    console.log('Testimonials section box (mobile):', box);
    
    await page.screenshot({
      path: 'assets/recap/testimonials-mobile-390.png',
      clip: {
        x: 0,
        y: box.y,
        width: 390,
        height: box.height
      }
    });
    console.log('✓ Mobile testimonials screenshot saved');
  }

  await browser.close();
})();
