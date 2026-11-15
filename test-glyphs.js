const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  const page = await context.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  
  // Clear cache by using new context
  await page.goto('http://localhost:8080/recap.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  console.log('=== Testing specific text elements for glyphs ===\n');
  
  const tests = [
    { selector: '.flow-time', text: '4:00 PM' },
    { selector: '.domain-tag', text: 'AI, Agents & Dev Tools' },
    { text: "Women's Health" },
    { text: '20+ investors' },
    { text: 'Z47' },
    { text: "We're" },
    { text: 'Co-founders' },
    { text: "who'd" }
  ];
  
  for (const test of tests) {
    const result = await page.evaluate((t) => {
      let el;
      if (t.selector) {
        el = document.querySelector(t.selector);
      } else {
        // Find element containing text
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          null
        );
        
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent.includes(t.text)) {
            el = node.parentElement;
            break;
          }
        }
      }
      
      if (!el) return { found: false };
      
      const style = window.getComputedStyle(el);
      const hasPlaceholder = el.textContent.includes('\uFFFD') || 
                            el.textContent.includes('□') || 
                            el.textContent.includes('◻');
      
      return {
        found: true,
        text: el.textContent.substring(0, 50),
        fontFamily: style.fontFamily,
        hasPlaceholder: hasPlaceholder
      };
    }, test);
    
    if (result.found) {
      const status = result.hasPlaceholder ? '⚠ PLACEHOLDER' : '✓';
      console.log(`${status} "${test.text}" → ${result.fontFamily}`);
      if (result.hasPlaceholder) {
        console.log(`   Rendered as: ${result.text}`);
      }
    } else {
      console.log(`✗ Not found: "${test.text}"`);
    }
  }
  
  // Test Anton loading
  console.log('\n=== Checking Anton font ===');
  const antonTest = await page.evaluate(() => {
    const caps = document.querySelector('.title-caps');
    if (!caps) return { found: false };
    
    const style = window.getComputedStyle(caps);
    return {
      found: true,
      text: caps.textContent.substring(0, 30),
      fontFamily: style.fontFamily,
      fontSize: style.fontSize
    };
  });
  
  if (antonTest.found) {
    console.log(`Title caps: "${antonTest.text}"`);
    console.log(`Font: ${antonTest.fontFamily}`);
    console.log(`Size: ${antonTest.fontSize}`);
  }
  
  await browser.close();
})();
