import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-cache']
  });

  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Loading page and waiting for fonts...\n');
  
  await page.goto('http://localhost:3000/recap.html', { 
    waitUntil: 'networkidle0',
    timeout: 60000 
  });
  
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  await new Promise(resolve => setTimeout(resolve, 4000));

  // 1. Desktop hero
  console.log('Capturing desktop hero...');
  await page.screenshot({
    path: '/opt/cursor/artifacts/r25-hero-desktop-1440.png',
    fullPage: false
  });
  
  // 2. RECAP zoom
  console.log('Capturing RECAP zoom...');
  const recapEl = await page.$('.hero-recap');
  if (recapEl) {
    await recapEl.screenshot({
      path: '/opt/cursor/artifacts/r25-recap-zoom.png'
    });
  }
  
  // 3. Scroll to testimonials and wait for reveal animations
  console.log('Scrolling to testimonials...');
  await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (section) {
      window.scrollTo(0, section.offsetTop - 200);
    }
  });
  
  // Wait for scroll reveal animations to complete
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // 4. Full testimonials section (tall viewport)
  await page.setViewport({ width: 1440, height: 3000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Capturing testimonials desktop...');
  const testimonialsSection = await page.$('#testimonials');
  if (testimonialsSection) {
    await testimonialsSection.screenshot({
      path: '/opt/cursor/artifacts/r25-testimonials-1440.png'
    });
  }
  
  await page.close();
  
  // Mobile
  console.log('\nStarting mobile captures...');
  const mobilePage = await browser.newPage();
  await mobilePage.setCacheEnabled(false);
  await mobilePage.setViewport({ width: 390, height: 844 });
  
  await mobilePage.goto('http://localhost:3000/recap.html', { 
    waitUntil: 'networkidle0',
    timeout: 60000 
  });
  
  await mobilePage.evaluate(() => document.fonts.ready);
  await new Promise(resolve => setTimeout(resolve, 4000));
  
  // Scroll to testimonials
  await mobilePage.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (section) {
      window.scrollTo(0, section.offsetTop - 100);
    }
  });
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Tall viewport for full section
  await mobilePage.setViewport({ width: 390, height: 4000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Capturing testimonials mobile...');
  const testimonialsSectionMobile = await mobilePage.$('#testimonials');
  if (testimonialsSectionMobile) {
    await testimonialsSectionMobile.screenshot({
      path: '/opt/cursor/artifacts/r25-testimonials-390.png'
    });
  }
  
  await browser.close();
  
  console.log('\n✓ All r25 screenshots captured!');
  console.log('\nFiles:');
  console.log('  /opt/cursor/artifacts/r25-hero-desktop-1440.png');
  console.log('  /opt/cursor/artifacts/r25-recap-zoom.png');
  console.log('  /opt/cursor/artifacts/r25-testimonials-1440.png');
  console.log('  /opt/cursor/artifacts/r25-testimonials-390.png');
})();
