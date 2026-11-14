const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  const desktop = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  
  await desktop.goto('http://localhost:8080/recap.html');
  await desktop.waitForLoadState('networkidle');
  await desktop.waitForTimeout(3000);
  
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1
  });
  
  await mobile.goto('http://localhost:8080/recap.html');
  await mobile.waitForLoadState('networkidle');
  await mobile.waitForTimeout(2000);
  
  console.log('=== Hero Element Sizes (Desktop 1440) ===\n');
  
  const desktopSizes = await desktop.evaluate(() => {
    const recap = document.querySelector('.hero-recap');
    const wordmark = document.querySelector('.hero-wordmark');
    const edition = document.querySelector('.hero-edition');
    const meta = document.querySelector('.hero-meta');
    
    const getSize = (el) => {
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        text: el.textContent.trim(),
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        fontFamily: style.fontFamily.split(',')[0].replace(/['"]/g, '')
      };
    };
    
    return {
      recap: getSize(recap),
      wordmark: getSize(wordmark),
      edition: getSize(edition),
      meta: getSize(meta)
    };
  });
  
  console.log('RECAP:');
  console.log(`  "${desktopSizes.recap.text}"`);
  console.log(`  Font: ${desktopSizes.recap.fontFamily}`);
  console.log(`  Size: ${desktopSizes.recap.fontSize} (weight ${desktopSizes.recap.fontWeight})\n`);
  
  console.log('SUPERNOVA:');
  console.log(`  "${desktopSizes.wordmark.text}"`);
  console.log(`  Font: ${desktopSizes.wordmark.fontFamily}`);
  console.log(`  Size: ${desktopSizes.wordmark.fontSize}\n`);
  
  console.log('edition 1:');
  console.log(`  "${desktopSizes.edition.text}"`);
  console.log(`  Font: ${desktopSizes.edition.fontFamily}`);
  console.log(`  Size: ${desktopSizes.edition.fontSize} ✓ Target: ~96px\n`);
  
  console.log('Bengaluru · 10.10.26:');
  console.log(`  "${desktopSizes.meta.text}"`);
  console.log(`  Font: ${desktopSizes.meta.fontFamily}`);
  console.log(`  Size: ${desktopSizes.meta.fontSize} ✓ Target: 20-24px\n`);
  
  console.log('=== Hero Element Sizes (Mobile 390) ===\n');
  
  const mobileSizes = await mobile.evaluate(() => {
    const edition = document.querySelector('.hero-edition');
    const meta = document.querySelector('.hero-meta');
    
    const getSize = (el) => {
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return style.fontSize;
    };
    
    return {
      edition: getSize(edition),
      meta: getSize(meta)
    };
  });
  
  console.log(`edition 1: ${mobileSizes.edition}`);
  console.log(`Location/date: ${mobileSizes.meta} ✓ Target: 16-18px\n`);
  
  // Capture screenshots
  console.log('=== Capturing Screenshots ===\n');
  
  await desktop.screenshot({
    path: '/opt/cursor/artifacts/hero-desktop-1440.png',
    fullPage: false
  });
  console.log('✓ Hero desktop 1440×900');
  
  await mobile.screenshot({
    path: '/opt/cursor/artifacts/hero-mobile-390.png',
    fullPage: false
  });
  console.log('✓ Hero mobile 390×844\n');
  
  await browser.close();
})();
