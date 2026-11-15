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
  await page.setViewport({ width: 1440, height: 900 });
  
  const html = readFileSync('recap.html', 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Get testimonials section position BEFORE scrolling
  const desktopInfo = await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (!section) return null;
    
    const rect = section.getBoundingClientRect();
    const boxes = document.querySelectorAll('.testimonial-box');
    
    return {
      offsetTop: section.offsetTop,
      scrollY: window.scrollY,
      rectTop: rect.top,
      height: rect.height,
      width: rect.width,
      boxCount: boxes.length
    };
  });
  
  console.log('Section info:', desktopInfo);
  
  // Scroll to the section
  await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    window.scrollTo(0, section.offsetTop - 100);
  });
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Now get the viewport position
  const viewportInfo = await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    const rect = section.getBoundingClientRect();
    return {
      scrollY: window.scrollY,
      rectTop: rect.top,
      rectBottom: rect.bottom,
      height: rect.height
    };
  });
  
  console.log('After scroll:', viewportInfo);
  
  // Take screenshot with calculated clip
  const clipY = Math.max(0, viewportInfo.rectTop);
  const clipHeight = Math.min(viewportInfo.height, 900 - clipY);
  
  await page.screenshot({
    path: '/opt/cursor/artifacts/r24-testimonials-1440.png',
    clip: {
      x: 0,
      y: clipY,
      width: 1440,
      height: 900
    },
    fullPage: false
  });
  console.log('✓ Desktop screenshot saved');

  await page.close();

  // === MOBILE 390px ===
  console.log('\n=== Mobile 390px ===');
  page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 390, height: 844 });
  
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(resolve => setTimeout(resolve, 3000));

  const mobileInfo = await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (!section) return null;
    
    const rect = section.getBoundingClientRect();
    const boxes = document.querySelectorAll('.testimonial-box');
    
    return {
      offsetTop: section.offsetTop,
      scrollY: window.scrollY,
      rectTop: rect.top,
      height: rect.height,
      width: rect.width,
      boxCount: boxes.length
    };
  });
  
  console.log('Section info:', mobileInfo);
  
  // Scroll to section
  await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    window.scrollTo(0, section.offsetTop - 50);
  });
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const viewportInfoMobile = await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    const rect = section.getBoundingClientRect();
    return {
      scrollY: window.scrollY,
      rectTop: rect.top,
      rectBottom: rect.bottom,
      height: rect.height
    };
  });
  
  console.log('After scroll:', viewportInfoMobile);
  
  await page.screenshot({
    path: '/opt/cursor/artifacts/r24-testimonials-390.png',
    clip: {
      x: 0,
      y: Math.max(0, viewportInfoMobile.rectTop),
      width: 390,
      height: 844
    },
    fullPage: false
  });
  console.log('✓ Mobile screenshot saved');

  await browser.close();
  console.log('\n=== Complete ===');
})();
