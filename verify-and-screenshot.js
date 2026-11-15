const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  // Desktop viewport
  const desktopPage = await context.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:8080/recap.html');
  
  // Wait for fonts and images
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.waitForTimeout(3000);
  
  // Check for 404s
  const failed404s = [];
  desktopPage.on('response', response => {
    if (response.status() === 404) {
      failed404s.push(response.url());
    }
  });
  
  // Reload to catch any late 404s
  await desktopPage.reload();
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.waitForTimeout(2000);
  
  // Check fonts loaded
  const fontsLoaded = await desktopPage.evaluate(() => {
    const fonts = [];
    document.fonts.forEach(font => {
      fonts.push({ family: font.family, status: font.status });
    });
    return fonts;
  });
  
  console.log('\n✓ Fonts loaded:');
  const uniqueFonts = [...new Set(fontsLoaded.map(f => f.family))];
  uniqueFonts.forEach(family => {
    const count = fontsLoaded.filter(f => f.family === family && f.status === 'loaded').length;
    console.log(`  - ${family}: ${count} variant(s) loaded`);
  });
  
  // Check for 404s
  if (failed404s.length > 0) {
    console.log('\n⚠ 404 Errors found:');
    failed404s.forEach(url => console.log(`  - ${url}`));
  } else {
    console.log('\n✓ No 404 errors detected');
  }
  
  // Check hero images loaded
  const heroImagesLoaded = await desktopPage.evaluate(() => {
    const heroGrid = document.getElementById('hero-grid');
    if (!heroGrid) return { total: 0, loaded: 0 };
    const imgs = heroGrid.querySelectorAll('img');
    let loaded = 0;
    imgs.forEach(img => {
      if (img.complete && img.naturalHeight > 0) loaded++;
    });
    return { total: imgs.length, loaded: loaded };
  });
  
  console.log(`\n✓ Hero images: ${heroImagesLoaded.loaded}/${heroImagesLoaded.total} loaded`);
  
  // Check hero height
  const heroHeight = await desktopPage.evaluate(() => {
    const hero = document.getElementById('hero');
    return hero ? hero.offsetHeight : 0;
  });
  const viewportHeight = 900;
  console.log(`✓ Hero height: ${heroHeight}px (viewport: ${viewportHeight}px, fills: ${((heroHeight/viewportHeight)*100).toFixed(1)}%)`);
  
  // Mobile viewport
  const mobilePage = await context.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:8080/recap.html');
  await mobilePage.waitForLoadState('networkidle');
  await mobilePage.waitForTimeout(2000);
  
  console.log('\n✓ Pages loaded for screenshot capture\n');
  
  // Capture screenshots
  console.log('Capturing screenshots...\n');
  
  // Hero - Desktop
  await desktopPage.screenshot({
    path: '/opt/cursor/artifacts/hero-desktop-1440.png',
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('✓ Hero desktop (1440×900)');
  
  // Hero - Mobile
  await mobilePage.screenshot({
    path: '/opt/cursor/artifacts/hero-mobile-390.png',
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });
  console.log('✓ Hero mobile (390×844)');
  
  // The Flow section
  const flowSection = await desktopPage.$('#day-agenda');
  if (flowSection) {
    await flowSection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    const box = await flowSection.boundingBox();
    await desktopPage.screenshot({
      path: '/opt/cursor/artifacts/flow-section-1440.png',
      clip: { x: 0, y: box.y, width: 1440, height: Math.min(box.height, 900) }
    });
    console.log('✓ The Flow section');
  }
  
  // The Arrival section
  const arrivalSection = await desktopPage.$('#arrivals');
  if (arrivalSection) {
    await arrivalSection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    const box = await arrivalSection.boundingBox();
    await desktopPage.screenshot({
      path: '/opt/cursor/artifacts/arrival-section-1440.png',
      clip: { x: 0, y: box.y, width: 1440, height: Math.min(box.height, 900) }
    });
    console.log('✓ The Arrival section');
  }
  
  // Investor Segment section
  const investorSection = await desktopPage.$('#investor-segment');
  if (investorSection) {
    await investorSection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    const box = await investorSection.boundingBox();
    await desktopPage.screenshot({
      path: '/opt/cursor/artifacts/investor-segment-1440.png',
      clip: { x: 0, y: box.y, width: 1440, height: Math.min(box.height, 900) }
    });
    console.log('✓ Investor Segment section');
  }
  
  // After Party section
  const afterPartySection = await desktopPage.$('#afterparty');
  if (afterPartySection) {
    await afterPartySection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    const box = await afterPartySection.boundingBox();
    await desktopPage.screenshot({
      path: '/opt/cursor/artifacts/after-party-1440.png',
      clip: { x: 0, y: box.y, width: 1440, height: Math.min(box.height, 900) }
    });
    console.log('✓ After Party section');
  }
  
  // Testimonials section
  const testimonialsSection = await desktopPage.$('#testimonials');
  if (testimonialsSection) {
    await testimonialsSection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    const box = await testimonialsSection.boundingBox();
    await desktopPage.screenshot({
      path: '/opt/cursor/artifacts/testimonials-1440.png',
      clip: { x: 0, y: box.y, width: 1440, height: Math.min(box.height, 900) }
    });
    console.log('✓ Testimonials section');
  }
  
  // CTA section
  const ctaSection = await desktopPage.$('#cta');
  if (ctaSection) {
    await ctaSection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    const box = await ctaSection.boundingBox();
    await desktopPage.screenshot({
      path: '/opt/cursor/artifacts/cta-section-1440.png',
      clip: { x: 0, y: box.y, width: 1440, height: Math.min(box.height, 900) }
    });
    console.log('✓ CTA section');
  }
  
  // Full page - Desktop
  await desktopPage.evaluate(() => window.scrollTo(0, 0));
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: '/opt/cursor/artifacts/full-page-desktop-1440.png',
    fullPage: true
  });
  console.log('✓ Full page desktop (1440px)');
  
  // Full page - Mobile
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: '/opt/cursor/artifacts/full-page-mobile-390.png',
    fullPage: true
  });
  console.log('✓ Full page mobile (390px)');
  
  await browser.close();
  console.log('\n✅ All screenshots captured successfully!\n');
  
  // Summary
  console.log('=== VERIFICATION SUMMARY ===');
  console.log(`Fonts loaded: ${uniqueFonts.join(', ')}`);
  console.log(`404 errors: ${failed404s.length === 0 ? 'None' : failed404s.length}`);
  console.log(`Hero images: ${heroImagesLoaded.loaded}/${heroImagesLoaded.total}`);
  console.log(`Hero fills viewport: ${((heroHeight/viewportHeight)*100).toFixed(1)}%`);
  console.log('===========================\n');
  
  process.exit(0);
})();
