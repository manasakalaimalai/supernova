import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-cache']
  });

  // === DESKTOP 1440px ===
  let page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 1440, height: 2400 });
  
  const html = readFileSync('recap.html', 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Scroll to testimonials section
  await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (section) {
      section.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get section bounding box and take clip screenshot
  const section = await page.$('#testimonials');
  if (section) {
    const box = await section.boundingBox();
    console.log('Desktop testimonials box:', box);
    
    await page.screenshot({
      path: '/opt/cursor/artifacts/r24-testimonials-1440.png',
      clip: {
        x: 0,
        y: box.y,
        width: 1440,
        height: box.height
      }
    });
    console.log('✓ r24-testimonials-1440.png (desktop) saved');
    
    // Verify all 6 boxes are present
    const boxCount = await page.evaluate(() => {
      return document.querySelectorAll('.testimonial-box').length;
    });
    console.log(`  Found ${boxCount} testimonial boxes`);
  }

  await page.close();

  // === MOBILE 390px ===
  page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 390, height: 3000 });
  
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Scroll to testimonials section
  await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (section) {
      section.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  const sectionMobile = await page.$('#testimonials');
  if (sectionMobile) {
    const box = await sectionMobile.boundingBox();
    console.log('Mobile testimonials box:', box);
    
    await page.screenshot({
      path: '/opt/cursor/artifacts/r24-testimonials-390.png',
      clip: {
        x: 0,
        y: box.y,
        width: 390,
        height: box.height
      }
    });
    console.log('✓ r24-testimonials-390.png (mobile) saved');
    
    const boxCount = await page.evaluate(() => {
      return document.querySelectorAll('.testimonial-box').length;
    });
    console.log(`  Found ${boxCount} testimonial boxes`);
  }

  await browser.close();
  console.log('\n=== Testimonials screenshots updated ===');
})();
