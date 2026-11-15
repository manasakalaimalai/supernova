const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  // Desktop page with device scale factor 1
  const desktop = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  
  await desktop.goto('http://localhost:8080/recap.html');
  await desktop.waitForLoadState('networkidle');
  await desktop.waitForTimeout(3000);
  
  // Mobile page with device scale factor 1
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1
  });
  
  await mobile.goto('http://localhost:8080/recap.html');
  await mobile.waitForLoadState('networkidle');
  await mobile.waitForTimeout(2000);
  
  console.log('Capturing final screenshots...\n');
  
  // Hero - Desktop (full viewport)
  await desktop.screenshot({
    path: '/opt/cursor/artifacts/hero-desktop-1440.png',
    fullPage: false
  });
  console.log('✓ Hero desktop 1440×900');
  
  // Hero - Mobile (full viewport)
  await mobile.screenshot({
    path: '/opt/cursor/artifacts/hero-mobile-390.png',
    fullPage: false
  });
  console.log('✓ Hero mobile 390×844');
  
  // The Flow
  const flow = await desktop.$('#day-agenda');
  if (flow) {
    await flow.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await flow.screenshot({
      path: '/opt/cursor/artifacts/flow-section-1440.png'
    });
    console.log('✓ The Flow section');
  }
  
  // The Arrival
  const arrival = await desktop.$('#arrivals');
  if (arrival) {
    await arrival.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await arrival.screenshot({
      path: '/opt/cursor/artifacts/arrival-section-1440.png'
    });
    console.log('✓ The Arrival section');
  }
  
  // Investor Segment
  const investor = await desktop.$('#investor-segment');
  if (investor) {
    await investor.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await investor.screenshot({
      path: '/opt/cursor/artifacts/investor-segment-1440.png'
    });
    console.log('✓ Investor Segment');
  }
  
  // After Party
  const party = await desktop.$('#afterparty');
  if (party) {
    await party.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await party.screenshot({
      path: '/opt/cursor/artifacts/after-party-1440.png'
    });
    console.log('✓ After Party section');
  }
  
  // Testimonials
  const testimonials = await desktop.$('#testimonials');
  if (testimonials) {
    await testimonials.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await testimonials.screenshot({
      path: '/opt/cursor/artifacts/testimonials-1440.png'
    });
    console.log('✓ Testimonials section');
  }
  
  // CTA
  const cta = await desktop.$('#cta');
  if (cta) {
    await cta.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await cta.screenshot({
      path: '/opt/cursor/artifacts/cta-section-1440.png'
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
  
  await browser.close();
  console.log('\n✅ All final screenshots captured!\n');
})();
