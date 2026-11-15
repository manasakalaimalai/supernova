import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-cache']
  });

  // === DESKTOP 1440px ===
  console.log('=== Desktop testimonials 1440px ===');
  let page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000/recap.html', { 
    waitUntil: 'networkidle0',
    timeout: 60000 
  });
  
  await page.evaluate(() => document.fonts.ready);
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Scroll to testimonials section
  await page.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (section) {
      window.scrollTo(0, section.offsetTop - 300);
    }
  });
  
  // Wait for scroll-reveal to trigger (3s fallback in code + 1s buffer)
  console.log('Waiting for scroll-reveal animations...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Check that all boxes have .in class
  const revealStatus = await page.evaluate(() => {
    const boxes = document.querySelectorAll('#testimonials .testimonial-box');
    const revealed = Array.from(boxes).filter(b => b.classList.contains('in')).length;
    return { total: boxes.length, revealed };
  });
  console.log(`Revealed: ${revealStatus.revealed}/${revealStatus.total} boxes`);
  
  // Take full section screenshot with tall viewport
  await page.setViewport({ width: 1440, height: 3000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const section = await page.$('#testimonials');
  if (section) {
    await section.screenshot({
      path: '/opt/cursor/artifacts/r26-testimonials-1440.png'
    });
    console.log('✓ r26-testimonials-1440.png saved');
  }
  
  await page.close();

  // === MOBILE 390px ===
  console.log('\n=== Mobile testimonials 390px ===');
  const mobilePage = await browser.newPage();
  await mobilePage.setCacheEnabled(false);
  await mobilePage.setViewport({ width: 390, height: 844 });
  
  await mobilePage.goto('http://localhost:3000/recap.html', { 
    waitUntil: 'networkidle0',
    timeout: 60000 
  });
  
  await mobilePage.evaluate(() => document.fonts.ready);
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Scroll to testimonials
  await mobilePage.evaluate(() => {
    const section = document.querySelector('#testimonials');
    if (section) {
      window.scrollTo(0, section.offsetTop - 100);
    }
  });
  
  // Wait for scroll-reveal
  console.log('Waiting for scroll-reveal animations...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const revealStatusMobile = await mobilePage.evaluate(() => {
    const boxes = document.querySelectorAll('#testimonials .testimonial-box');
    const revealed = Array.from(boxes).filter(b => b.classList.contains('in')).length;
    return { total: boxes.length, revealed };
  });
  console.log(`Revealed: ${revealStatusMobile.revealed}/${revealStatusMobile.total} boxes`);
  
  // Tall viewport for full section
  await mobilePage.setViewport({ width: 390, height: 4000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const sectionMobile = await mobilePage.$('#testimonials');
  if (sectionMobile) {
    await sectionMobile.screenshot({
      path: '/opt/cursor/artifacts/r26-testimonials-390.png'
    });
    console.log('✓ r26-testimonials-390.png saved');
  }

  await browser.close();
  
  console.log('\n✅ r26 testimonials screenshots complete!');
})();
