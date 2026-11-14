import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  
  // Track ALL requests
  page.on('request', request => {
    const url = request.url();
    if (url.includes('theseasons') || url.includes('Fontspring-DEMO')) {
      console.log(`REQUEST: ${url}`);
    }
  });
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('theseasons') || url.includes('Fontspring-DEMO')) {
      console.log(`RESPONSE ${response.status()}: ${url}`);
    }
  });
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Loading page...\n');
  await page.goto('http://localhost:3000/recap.html', { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
  
  await page.evaluate(() => document.fonts.ready);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n=== Checking @font-face rules ===\n');
  
  const fontFaceInfo = await page.evaluate(() => {
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          if (rule instanceof CSSFontFaceRule) {
            const family = rule.style.getPropertyValue('font-family');
            const src = rule.style.getPropertyValue('src');
            const weight = rule.style.getPropertyValue('font-weight');
            
            if (family.includes('Seasons') || src.includes('theseasons')) {
              rules.push({ family, src, weight });
            }
          }
        }
      } catch (e) {
        // CORS or other error
      }
    }
    return rules;
  });
  
  if (fontFaceInfo.length === 0) {
    console.log('NO @font-face rules found for The Seasons!');
  } else {
    fontFaceInfo.forEach((rule, i) => {
      console.log(`Rule ${i + 1}:`);
      console.log(`  font-family: ${rule.family}`);
      console.log(`  font-weight: ${rule.weight}`);
      console.log(`  src: ${rule.src}`);
      console.log('');
    });
  }

  await browser.close();
})();
