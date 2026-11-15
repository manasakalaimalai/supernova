const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  
  const vercelUrl = 'https://supernova-git-cursor-supernov-50fdae-manasakalaimalais-projects.vercel.app/recap.html';
  
  console.log('=== Testing Vercel Preview ===\n');
  console.log(`URL: ${vercelUrl}\n`);
  
  try {
    await page.goto(vercelUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    console.log('✓ Page loaded\n');
    
    // Check font loading
    const fonts = await page.evaluate(() => {
      const checks = [
        { selector: '.hero-recap', name: 'RECAP' },
        { selector: '.hero-wordmark', name: 'SUPERNOVA' },
        { selector: '.hero-edition', name: 'edition 1' },
        { selector: '.title-caps', name: 'Title caps' },
        { selector: '.testimonial-credit', name: 'Credits' }
      ];
      
      return checks.map(check => {
        const el = document.querySelector(check.selector);
        if (!el) return { name: check.name, found: false };
        const style = window.getComputedStyle(el);
        return {
          name: check.name,
          found: true,
          fontFamily: style.fontFamily,
          text: el.textContent.substring(0, 30)
        };
      });
    });
    
    console.log('=== Font Loading on Vercel ===\n');
    fonts.forEach(f => {
      if (f.found) {
        console.log(`${f.name}:`);
        console.log(`  Font: ${f.fontFamily}`);
        console.log(`  Text: "${f.text}..."\n`);
      } else {
        console.log(`⚠ ${f.name}: NOT FOUND\n`);
      }
    });
    
    // Check for 404s on font files
    const resourceErrors = [];
    page.on('response', response => {
      if (response.status() === 404 && response.url().includes('/assets/fonts/')) {
        resourceErrors.push(response.url());
      }
    });
    
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    if (resourceErrors.length > 0) {
      console.log('⚠ Font 404 Errors:');
      resourceErrors.forEach(url => console.log(`  - ${url}`));
      console.log();
    } else {
      console.log('✓ No font 404 errors detected\n');
    }
    
    // Verify custom fonts are actually loading (not just fallbacks)
    const customFonts = await page.evaluate(() => {
      const loadedFonts = [];
      document.fonts.forEach(font => {
        if (font.status === 'loaded') {
          loadedFonts.push(font.family);
        }
      });
      return [...new Set(loadedFonts)];
    });
    
    console.log('=== Loaded Custom Fonts ===');
    customFonts.forEach(font => {
      const isCustom = ['Horizon', 'The Seasons', 'TT Commons Pro', 'Pinyon Script', 'Anton', 'JetBrains Mono', 'Melodrama'].includes(font);
      const marker = isCustom ? '✓' : ' ';
      console.log(`${marker} ${font}`);
    });
    console.log();
    
    const expectedFonts = ['Horizon', 'The Seasons', 'TT Commons Pro', 'Pinyon Script', 'Anton', 'JetBrains Mono'];
    const allPresent = expectedFonts.every(f => customFonts.includes(f));
    
    if (allPresent) {
      console.log('✅ All expected custom fonts loaded on Vercel!');
    } else {
      console.log('⚠ Some custom fonts missing:');
      expectedFonts.forEach(f => {
        if (!customFonts.includes(f)) console.log(`  - ${f}`);
      });
    }
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
  
  await browser.close();
})();
