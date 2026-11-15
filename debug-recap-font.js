const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  
  await page.goto('http://localhost:8080/recap.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  console.log('=== Debugging RECAP Font ===\n');
  
  // Check computed styles
  const recapDebug = await page.evaluate(() => {
    const el = document.querySelector('.hero-recap');
    if (!el) return { found: false };
    
    const style = window.getComputedStyle(el);
    
    // Check which fonts are actually loaded
    const loadedFonts = [];
    document.fonts.forEach(font => {
      if (font.family === 'The Seasons' && font.status === 'loaded') {
        loadedFonts.push({ weight: font.weight, style: font.style });
      }
    });
    
    return {
      found: true,
      text: el.textContent,
      computedFontFamily: style.fontFamily,
      computedFontWeight: style.fontWeight,
      computedFontSize: style.fontSize,
      loadedTheSeasons: loadedFonts,
      totalFonts: document.fonts.size
    };
  });
  
  console.log('Element: .hero-recap');
  console.log(`Text: "${recapDebug.text}"`);
  console.log(`Computed font-family: ${recapDebug.computedFontFamily}`);
  console.log(`Computed font-weight: ${recapDebug.computedFontWeight}`);
  console.log(`Computed font-size: ${recapDebug.computedFontSize}`);
  console.log(`\nThe Seasons variants loaded: ${recapDebug.loadedTheSeasons.length}`);
  recapDebug.loadedTheSeasons.forEach(f => {
    console.log(`  - weight: ${f.weight}, style: ${f.style}`);
  });
  console.log(`\nTotal fonts in document.fonts: ${recapDebug.totalFonts}`);
  
  // Check network request for the bd file
  const fontRequests = [];
  page.on('response', response => {
    if (response.url().includes('theseasons')) {
      fontRequests.push({
        url: response.url(),
        status: response.status(),
        contentType: response.headers()['content-type']
      });
    }
  });
  
  await page.reload();
  await page.waitForTimeout(2000);
  
  console.log('\n=== Font File Requests ===\n');
  if (fontRequests.length === 0) {
    console.log('⚠ No theseasons font files requested!');
  } else {
    fontRequests.forEach(req => {
      const filename = req.url.split('/').pop();
      console.log(`${req.status === 200 ? '✓' : '✗'} ${filename} (${req.status})`);
    });
  }
  
  // Check if RECAP text has glyphs that trigger unicode-range
  console.log('\n=== Unicode Range Check ===\n');
  const unicodeCheck = await page.evaluate(() => {
    const text = 'RECAP';
    return Array.from(text).map(char => ({
      char: char,
      code: char.charCodeAt(0),
      hex: '0x' + char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
    }));
  });
  
  console.log('RECAP characters:');
  unicodeCheck.forEach(c => {
    const inRange = c.code >= 0x0041 && c.code <= 0x005A;
    console.log(`  ${c.char}: ${c.hex} (U+${c.code.toString(16).toUpperCase().padStart(4, '0')}) ${inRange ? '✓ in range' : '✗ NOT in range'}`);
  });
  
  // Take zoomed screenshot of RECAP
  const recapEl = await page.$('.hero-recap');
  if (recapEl) {
    const box = await recapEl.boundingBox();
    await page.screenshot({
      path: '/opt/cursor/artifacts/recap-zoomed.png',
      clip: {
        x: Math.max(0, box.x - 20),
        y: Math.max(0, box.y - 20),
        width: Math.min(box.width + 40, 400),
        height: Math.min(box.height + 40, 200)
      }
    });
    console.log('\n✓ Zoomed screenshot saved: /opt/cursor/artifacts/recap-zoomed.png');
  }
  
  await browser.close();
})();
