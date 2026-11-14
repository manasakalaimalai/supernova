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
  
  console.log('Capturing screenshots with proper scroll positioning...\n');
  
  // Hero - Full viewport capture (nav is part of hero)
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await desktop.waitForTimeout(500);
  await desktop.screenshot({
    path: '/opt/cursor/artifacts/hero-desktop-1440.png',
    fullPage: false
  });
  console.log('✓ Hero desktop 1440×900');
  
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await mobile.waitForTimeout(500);
  await mobile.screenshot({
    path: '/opt/cursor/artifacts/hero-mobile-390.png',
    fullPage: false
  });
  console.log('✓ Hero mobile 390×844');
  
  // The Flow - Scroll past it first to hide nav, then scroll back
  const flow = await desktop.$('#day-agenda');
  if (flow) {
    // Scroll past to trigger hide
    await desktop.evaluate(() => window.scrollTo(0, 2000));
    await desktop.waitForTimeout(300);
    // Scroll back to section
    await flow.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    // Take full viewport capture
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/flow-section-1440.png',
      fullPage: false
    });
    console.log('✓ The Flow section');
  }
  
  // The Arrival
  const arrival = await desktop.$('#arrivals');
  if (arrival) {
    await desktop.evaluate(() => window.scrollTo(0, 4000));
    await desktop.waitForTimeout(300);
    await arrival.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/arrival-section-1440.png',
      fullPage: false
    });
    console.log('✓ The Arrival section');
  }
  
  // Investor Segment
  const investor = await desktop.$('#investor-segment');
  if (investor) {
    await desktop.evaluate(() => window.scrollTo(0, 8000));
    await desktop.waitForTimeout(300);
    await investor.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/investor-segment-1440.png',
      fullPage: false
    });
    console.log('✓ Investor Segment section');
  }
  
  // After Party
  const party = await desktop.$('#afterparty');
  if (party) {
    await desktop.evaluate(() => window.scrollTo(0, 10000));
    await desktop.waitForTimeout(300);
    await party.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/after-party-1440.png',
      fullPage: false
    });
    console.log('✓ After Party section');
  }
  
  // Testimonials
  const testimonials = await desktop.$('#testimonials');
  if (testimonials) {
    await desktop.evaluate(() => window.scrollTo(0, 12000));
    await desktop.waitForTimeout(300);
    await testimonials.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/testimonials-1440.png',
      fullPage: false
    });
    console.log('✓ Testimonials section');
  }
  
  // CTA
  const cta = await desktop.$('#cta');
  if (cta) {
    await desktop.evaluate(() => window.scrollTo(0, 14000));
    await desktop.waitForTimeout(300);
    await cta.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await desktop.screenshot({
      path: '/opt/cursor/artifacts/cta-section-1440.png',
      fullPage: false
    });
    console.log('✓ CTA section');
  }
  
  // Full page - Desktop
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await desktop.waitForTimeout(500);
  await desktop.screenshot({
    path: '/opt/cursor/artifacts/full-page-desktop-1440.png',
    fullPage: true
  });
  console.log('✓ Full page desktop');
  
  // Full page - Mobile
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await mobile.waitForTimeout(500);
  await mobile.screenshot({
    path: '/opt/cursor/artifacts/full-page-mobile-390.png',
    fullPage: true
  });
  console.log('✓ Full page mobile');
  
  // Check for placeholder glyphs
  console.log('\n=== Checking for placeholder glyphs ===');
  const placeholderCheck = await desktop.evaluate(() => {
    // Common placeholder characters used by demo fonts
    const placeholders = ['\uFFFD', '□', '◻', '▯', '?'];
    const body = document.body.textContent || '';
    const found = [];
    
    placeholders.forEach(char => {
      if (body.includes(char)) {
        found.push(char);
      }
    });
    
    return found;
  });
  
  if (placeholderCheck.length > 0) {
    console.log('⚠ WARNING: Found placeholder characters:', placeholderCheck);
  } else {
    console.log('✓ No placeholder glyphs detected');
  }
  
  // Check font families
  console.log('\n=== Checking computed font families ===');
  const fontCheck = await desktop.evaluate(() => {
    const checks = [
      { selector: '.hero-wordmark', name: 'SUPERNOVA wordmark' },
      { selector: '.title-caps', name: 'Condensed caps titles' },
      { selector: '.flow-title', name: 'Flow agenda items' },
      { selector: '.body-copy', name: 'Body text' }
    ];
    
    const results = [];
    checks.forEach(check => {
      const el = document.querySelector(check.selector);
      if (el) {
        const font = window.getComputedStyle(el).fontFamily;
        results.push({ name: check.name, font: font });
      }
    });
    
    return results;
  });
  
  fontCheck.forEach(item => {
    const hasArial = item.font.includes('Arial') || item.font.includes('Helvetica');
    const hasTimes = item.font.includes('Times');
    const status = (hasArial || hasTimes) ? '⚠' : '✓';
    console.log(`${status} ${item.name}: ${item.font}`);
  });
  
  await browser.close();
  console.log('\n✅ All screenshots captured!\n');
})();
