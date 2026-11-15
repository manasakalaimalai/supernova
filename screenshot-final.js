const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  
  // Desktop viewport
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('file://' + path.resolve('/workspace/recap.html'));
  await desktopPage.waitForTimeout(2000);
  
  // Mobile viewport
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('file://' + path.resolve('/workspace/recap.html'));
  await mobilePage.waitForTimeout(2000);
  
  console.log('✓ Pages loaded');
  
  // Hero - Desktop
  await desktopPage.screenshot({
    path: '/opt/cursor/artifacts/hero-desktop-1440.png',
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('✓ Hero desktop screenshot saved');
  
  // Hero - Mobile
  await mobilePage.screenshot({
    path: '/opt/cursor/artifacts/hero-mobile-390.png',
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });
  console.log('✓ Hero mobile screenshot saved');
  
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
    console.log('✓ Flow section screenshot saved');
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
    console.log('✓ Arrival section screenshot saved');
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
    console.log('✓ Investor segment screenshot saved');
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
    console.log('✓ After party screenshot saved');
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
    console.log('✓ Testimonials screenshot saved');
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
    console.log('✓ CTA section screenshot saved');
  }
  
  // Full page - Desktop
  await desktopPage.evaluate(() => window.scrollTo(0, 0));
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: '/opt/cursor/artifacts/full-page-desktop-1440.png',
    fullPage: true
  });
  console.log('✓ Full page desktop screenshot saved');
  
  // Full page - Mobile
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: '/opt/cursor/artifacts/full-page-mobile-390.png',
    fullPage: true
  });
  console.log('✓ Full page mobile screenshot saved');
  
  await browser.close();
  console.log('\n✅ All screenshots captured successfully!');
})();
