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
  
  // Check RECAP font
  const recapFont = await desktop.evaluate(() => {
    const recap = document.querySelector('.hero-recap');
    if (!recap) return { found: false };
    const style = window.getComputedStyle(recap);
    return {
      found: true,
      text: recap.textContent,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight
    };
  });
  
  console.log('RECAP element:');
  console.log(`  Text: "${recapFont.text}"`);
  console.log(`  Font: ${recapFont.fontFamily}`);
  console.log(`  Weight: ${recapFont.fontWeight}`);
  console.log(`  ✓ Should be: "The Seasons" (serif)\n`);
  
  // Check testimonial credit
  const creditCheck = await desktop.evaluate(() => {
    const credit = document.querySelector('.testimonial-credit');
    if (!credit) return { found: false };
    const style = window.getComputedStyle(credit);
    return {
      found: true,
      text: credit.textContent,
      fontFamily: style.fontFamily
    };
  });
  
  console.log('Testimonial credit:');
  console.log(`  Text: "${creditCheck.text}"`);
  console.log(`  Font: ${creditCheck.fontFamily}`);
  console.log(`  ✓ Should be: "JetBrains Mono" (monospace)\n`);
  
  // Check for broken glyphs in credits
  const allCredits = await desktop.evaluate(() => {
    const credits = document.querySelectorAll('.testimonial-credit');
    return Array.from(credits).map(el => el.textContent);
  });
  
  console.log('All credit labels:');
  allCredits.forEach((text, i) => {
    const hasBroken = text.includes('℞') || text.includes('�') || text.includes('□');
    const status = hasBroken ? '⚠ BROKEN' : '✓';
    console.log(`  ${status} ${i+1}. ${text}`);
  });
  
  console.log('\n=== Capturing Screenshots ===\n');
  
  // Hero Desktop
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await desktop.waitForTimeout(500);
  await desktop.screenshot({
    path: '/opt/cursor/artifacts/hero-desktop-1440.png',
    fullPage: false
  });
  console.log('✓ Hero desktop 1440×900');
  
  // Testimonials Desktop - Full section (tall capture)
  const testimonialsDesktop = await desktop.$('#testimonials');
  if (testimonialsDesktop) {
    await desktop.evaluate(() => window.scrollTo(0, 12000));
    await desktop.waitForTimeout(300);
    await testimonialsDesktop.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    
    const box = await testimonialsDesktop.boundingBox();
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/testimonials-desktop-1440.png',
      clip: { x: 0, y: box.y, width: 1440, height: Math.min(box.height, 2000) }
    });
    console.log('✓ Testimonials desktop 1440 (full section)');
  }
  
  // Testimonials Mobile
  const testimonialsMobile = await mobile.$('#testimonials');
  if (testimonialsMobile) {
    await mobile.evaluate(() => window.scrollTo(0, 10000));
    await mobile.waitForTimeout(300);
    await testimonialsMobile.scrollIntoViewIfNeeded();
    await mobile.waitForTimeout(500);
    
    const box = await testimonialsMobile.boundingBox();
    await mobile.screenshot({
      path: '/opt/cursor/artifacts/testimonials-mobile-390.png',
      clip: { x: 0, y: box.y, width: 390, height: Math.min(box.height, 3000) }
    });
    console.log('✓ Testimonials mobile 390 (full section)');
  }
  
  await browser.close();
  console.log('\n✅ All screenshots captured!\n');
})();
