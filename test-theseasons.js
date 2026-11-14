const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext(); // Fresh context = no cache
  const page = await context.newPage({
    viewport: { width: 1440, height: 900 }
  });
  
  // Track ALL network requests
  const allRequests = [];
  page.on('request', request => {
    if (request.url().includes('assets/fonts/')) {
      allRequests.push(request.url());
    }
  });
  
  page.on('response', response => {
    if (response.url().includes('theseason')) {
      console.log(`\n✓ theseasons file requested: ${response.url().split('/').pop()}`);
      console.log(`  Status: ${response.status()}`);
    }
  });
  
  await page.goto('http://localhost:8080/recap.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  console.log('\n=== All Font Requests ===');
  allRequests.forEach(url => console.log(`  - ${url.split('/').pop()}`));
  
  const check = await page.evaluate(() => {
    const el = document.querySelector('.hero-recap');
    const style = window.getComputedStyle(el);
    
    // Force reflow
    el.offsetHeight;
    
    return {
      text: el.textContent,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      color: style.color
    };
  });
  
  console.log('\n=== RECAP Element ===');
  console.log(`Text: "${check.text}"`);
  console.log(`Font: ${check.fontFamily}`);
  console.log(`Weight: ${check.fontWeight}`);
  
  await page.screenshot({
    path: '/opt/cursor/artifacts/recap-fresh.png',
    clip: { x: 500, y: 100, width: 400, height: 100 }
  });
  
  await browser.close();
})();
