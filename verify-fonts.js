import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  const html = readFileSync('recap.html', 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  
  await new Promise(resolve => setTimeout(resolve, 3000));

  // 1. Zoomed RECAP screenshot
  const recapElement = await page.$('.hero-recap');
  if (recapElement) {
    const box = await recapElement.boundingBox();
    await page.screenshot({
      path: 'assets/recap/verify-recap-font.png',
      clip: {
        x: Math.max(0, box.x - 20),
        y: Math.max(0, box.y - 20),
        width: Math.min(box.width + 40, 600),
        height: Math.min(box.height + 40, 200)
      }
    });
    console.log('✓ RECAP zoomed screenshot saved');
  }

  // 2. Zoomed testimonial text screenshot (first box)
  const testimonialText = await page.$('.testimonial-text');
  if (testimonialText) {
    const box = await testimonialText.boundingBox();
    await page.screenshot({
      path: 'assets/recap/verify-testimonial-font.png',
      clip: {
        x: Math.max(0, box.x - 20),
        y: Math.max(0, box.y - 40),
        width: Math.min(box.width + 40, 700),
        height: Math.min(box.height + 60, 400)
      }
    });
    console.log('✓ Testimonial text zoomed screenshot saved');
  }

  // 3. Get computed styles
  const recapStyles = await page.evaluate(() => {
    const el = document.querySelector('.hero-recap');
    const style = window.getComputedStyle(el);
    return {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      fontSize: style.fontSize
    };
  });
  console.log('RECAP computed styles:', recapStyles);

  const testimonialStyles = await page.evaluate(() => {
    const el = document.querySelector('.testimonial-text');
    const style = window.getComputedStyle(el);
    return {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      fontSize: style.fontSize
    };
  });
  console.log('Testimonial computed styles:', testimonialStyles);

  await browser.close();
})();
