const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  // Desktop page
  const desktop = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  
  await desktop.goto('http://localhost:8080/recap.html');
  await desktop.waitForLoadState('networkidle');
  await desktop.waitForTimeout(3000);
  
  // Mobile page
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1
  });
  
  await mobile.goto('http://localhost:8080/recap.html');
  await mobile.waitForLoadState('networkidle');
  await mobile.waitForTimeout(2000);
  
  console.log('Capturing hero and testimonials screenshots...\n');
  
  // Hero Desktop
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await desktop.waitForTimeout(500);
  await desktop.screenshot({
    path: '/opt/cursor/artifacts/hero-desktop-1440.png',
    fullPage: false
  });
  console.log('✓ Hero desktop 1440×900');
  
  // Hero Mobile
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await mobile.waitForTimeout(500);
  await mobile.screenshot({
    path: '/opt/cursor/artifacts/hero-mobile-390.png',
    fullPage: false
  });
  console.log('✓ Hero mobile 390×844');
  
  // Testimonials Desktop
  const testimonials = await desktop.$('#testimonials');
  if (testimonials) {
    await desktop.evaluate(() => window.scrollTo(0, 12000));
    await desktop.waitForTimeout(300);
    await testimonials.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/testimonials-desktop-1440.png',
      fullPage: false
    });
    console.log('✓ Testimonials desktop 1440×900');
  }
  
  // Testimonials Mobile
  const testimonialsMobile = await mobile.$('#testimonials');
  if (testimonialsMobile) {
    await mobile.evaluate(() => window.scrollTo(0, 10000));
    await mobile.waitForTimeout(300);
    await testimonialsMobile.scrollIntoViewIfNeeded();
    await mobile.waitForTimeout(500);
    await mobile.screenshot({
      path: '/opt/cursor/artifacts/testimonials-mobile-390.png',
      fullPage: false
    });
    console.log('✓ Testimonials mobile 390×844');
  }
  
  // Verify hero text order
  console.log('\n=== Verifying hero text structure ===');
  const heroText = await desktop.evaluate(() => {
    const recap = document.querySelector('.hero-recap');
    const wordmark = document.querySelector('.hero-wordmark');
    const edition = document.querySelector('.hero-edition');
    const meta = document.querySelector('.hero-meta');
    
    return {
      recap: recap ? recap.textContent.trim() : 'NOT FOUND',
      wordmark: wordmark ? wordmark.textContent.trim() : 'NOT FOUND',
      edition: edition ? edition.textContent.trim() : 'NOT FOUND',
      meta: meta ? meta.textContent.trim() : 'NOT FOUND'
    };
  });
  
  console.log('Hero text order:');
  console.log(`  1. ${heroText.recap}`);
  console.log(`  2. ${heroText.wordmark}`);
  console.log(`  3. ${heroText.edition}`);
  console.log(`  4. ${heroText.meta}`);
  
  await browser.close();
  console.log('\n✅ Screenshots captured!\n');
})();
