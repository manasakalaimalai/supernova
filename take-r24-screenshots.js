import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-cache']
  });

  // === DESKTOP 1440px ===
  let page = await browser.newPage();
  
  // Disable cache completely
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 1440, height: 900 });
  
  const html = readFileSync('recap.html', 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  
  await new Promise(resolve => setTimeout(resolve, 4000));

  // 1. Full hero viewport
  await page.screenshot({
    path: '/opt/cursor/artifacts/r24-hero-desktop-1440.png',
    fullPage: false
  });
  console.log('✓ r24-hero-desktop-1440.png saved');

  // 2. Zoomed RECAP
  const recapElement = await page.$('.hero-recap');
  if (recapElement) {
    await recapElement.screenshot({
      path: '/opt/cursor/artifacts/r24-recap-zoom.png'
    });
    console.log('✓ r24-recap-zoom.png saved');
  }

  // 3. Full testimonials section (element screenshot)
  const testimonialsSection = await page.$('#testimonials');
  if (testimonialsSection) {
    await testimonialsSection.screenshot({
      path: '/opt/cursor/artifacts/r24-testimonials-1440.png'
    });
    console.log('✓ r24-testimonials-1440.png saved');
  }

  // Get computed styles
  const recapStyles = await page.evaluate(() => {
    const el = document.querySelector('.hero-recap');
    const style = window.getComputedStyle(el);
    return {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      text: el.textContent.trim()
    };
  });
  console.log('RECAP styles:', recapStyles);

  const testimonialStyles = await page.evaluate(() => {
    const el = document.querySelector('.testimonial-text');
    const style = window.getComputedStyle(el);
    return {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      preview: el.textContent.trim().substring(0, 50) + '...'
    };
  });
  console.log('Testimonial styles:', testimonialStyles);

  await page.close();

  // === MOBILE 390px ===
  page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 390, height: 844 });
  
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(resolve => setTimeout(resolve, 4000));

  // 4. Mobile hero viewport
  await page.screenshot({
    path: '/opt/cursor/artifacts/r24-hero-mobile-390.png',
    fullPage: false
  });
  console.log('✓ r24-hero-mobile-390.png saved');

  // 5. Mobile testimonials section (element screenshot)
  const testimonialsSectionMobile = await page.$('#testimonials');
  if (testimonialsSectionMobile) {
    await testimonialsSectionMobile.screenshot({
      path: '/opt/cursor/artifacts/r24-testimonials-390.png'
    });
    console.log('✓ r24-testimonials-390.png saved');
  }

  await browser.close();
  console.log('\n=== All screenshots saved to /opt/cursor/artifacts/ ===');
})();
