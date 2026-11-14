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
  
  console.log('=== Font Verification ===\n');
  
  const fonts = await desktop.evaluate(() => {
    const recap = document.querySelector('.hero-recap');
    const quote = document.querySelector('.testimonial-text');
    
    const getFont = (el) => {
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight,
        text: el.textContent.substring(0, 50)
      };
    };
    
    return {
      recap: getFont(recap),
      quote: getFont(quote)
    };
  });
  
  console.log('RECAP:');
  console.log(`  Font: ${fonts.recap.fontFamily}`);
  console.log(`  Weight: ${fonts.recap.fontWeight}`);
  console.log(`  Text: "${fonts.recap.text}"\n`);
  
  console.log('Testimonial text:');
  console.log(`  Font: ${fonts.quote.fontFamily}`);
  console.log(`  Weight: ${fonts.quote.fontWeight}`);
  console.log(`  Text: "${fonts.quote.text}..."\n`);
  
  // Get all six quotes
  const allQuotes = await desktop.evaluate(() => {
    const boxes = document.querySelectorAll('.testimonial-box');
    return Array.from(boxes).map(box => ({
      text: box.querySelector('.testimonial-text')?.textContent.trim() || '',
      credit: box.querySelector('.testimonial-credit')?.textContent.trim() || ''
    }));
  });
  
  console.log('=== All Six Testimonials ===\n');
  allQuotes.forEach((q, i) => {
    console.log(`${i + 1}. TEXT: "${q.text}"`);
    console.log(`   CREDIT: ${q.credit}\n`);
  });
  
  console.log('=== Capturing Screenshots ===\n');
  
  // RECAP zoomed
  const recapEl = await desktop.$('.hero-recap');
  if (recapEl) {
    const box = await recapEl.boundingBox();
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/recap-zoomed.png',
      clip: {
        x: Math.max(0, box.x - 40),
        y: Math.max(0, box.y - 20),
        width: Math.min(box.width + 80, 600),
        height: Math.min(box.height + 40, 150)
      }
    });
    console.log('✓ RECAP zoomed screenshot');
  }
  
  // Hero desktop
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await desktop.waitForTimeout(300);
  await desktop.screenshot({
    path: '/opt/cursor/artifacts/hero-desktop-1440.png',
    fullPage: false
  });
  console.log('✓ Hero desktop 1440×900');
  
  // Testimonials desktop - TALL capture (all 6 boxes)
  const testimonialsDesktop = await desktop.$('#testimonials');
  if (testimonialsDesktop) {
    await desktop.evaluate(() => window.scrollTo(0, 12000));
    await desktop.waitForTimeout(300);
    await testimonialsDesktop.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    
    const box = await testimonialsDesktop.boundingBox();
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/testimonials-desktop-1440-full.png',
      clip: {
        x: 0,
        y: Math.max(0, box.y - 20),
        width: 1440,
        height: Math.min(box.height + 40, 2500)
      }
    });
    console.log('✓ Testimonials desktop 1440 (FULL - all 6 boxes)');
  }
  
  // Testimonials mobile - TALL capture
  const testimonialsMobile = await mobile.$('#testimonials');
  if (testimonialsMobile) {
    await mobile.evaluate(() => window.scrollTo(0, 10000));
    await mobile.waitForTimeout(300);
    await testimonialsMobile.scrollIntoViewIfNeeded();
    await mobile.waitForTimeout(500);
    
    const box = await testimonialsMobile.boundingBox();
    await mobile.screenshot({
      path: '/opt/cursor/artifacts/testimonials-mobile-390-full.png',
      clip: {
        x: 0,
        y: Math.max(0, box.y - 20),
        width: 390,
        height: Math.min(box.height + 40, 4000)
      }
    });
    console.log('✓ Testimonials mobile 390 (FULL - all 6 boxes)');
  }
  
  await browser.close();
  console.log('\n✅ All verification complete!\n');
})();
