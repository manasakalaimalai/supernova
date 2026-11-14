import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000/recap.html', { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
  
  await page.evaluate(() => document.fonts.ready);
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('=== VISUAL FONT RENDERING TEST ===\n');
  
  const fontTest = await page.evaluate(() => {
    // Create test elements
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;background:white;padding:20px;z-index:99999;';
    
    const tests = [
      { text: 'RECAP', family: 'The Seasons', weight: '700', label: 'The Seasons Bold' },
      { text: 'RECAP', family: 'Inter', weight: '700', label: 'Inter Bold (fallback)' },
      { text: 'Hello World', family: 'TT Commons Pro', weight: '400', label: 'TT Commons Pro' },
      { text: 'SUPERNOVA', family: 'Horizon', weight: '400', label: 'Horizon' }
    ];
    
    const results = [];
    
    tests.forEach(test => {
      const span = document.createElement('span');
      span.textContent = test.text;
      span.style.fontFamily = `"${test.family}"`;
      span.style.fontWeight = test.weight;
      span.style.fontSize = '24px';
      span.style.display = 'block';
      span.style.marginBottom = '10px';
      container.appendChild(span);
      
      document.body.appendChild(container);
      const computed = window.getComputedStyle(span);
      document.body.removeChild(container);
      
      results.push({
        label: test.label,
        requested: test.family,
        computed: computed.fontFamily,
        weight: computed.fontWeight
      });
    });
    
    return results;
  });
  
  fontTest.forEach(result => {
    const match = result.computed.includes(result.requested);
    console.log(`${match ? '✓' : '✗'} ${result.label}`);
    console.log(`  Requested: "${result.requested}"`);
    console.log(`  Computed:  ${result.computed}`);
    console.log('');
  });
  
  // Now check actual page elements
  console.log('=== ACTUAL PAGE ELEMENTS ===\n');
  
  const pageElements = await page.evaluate(() => {
    const elements = [
      { selector: '.hero-recap', label: 'RECAP heading' },
      { selector: '.hero-supernova', label: 'SUPERNOVA' },
      { selector: '.hero-edition', label: 'edition 1' },
      { selector: '.testimonial-text', label: 'Testimonial text' }
    ];
    
    return elements.map(({ selector, label }) => {
      const el = document.querySelector(selector);
      if (!el) return { label, found: false };
      
      const style = window.getComputedStyle(el);
      return {
        label,
        found: true,
        text: el.textContent.trim().substring(0, 30),
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight
      };
    });
  });
  
  pageElements.forEach(el => {
    if (!el.found) {
      console.log(`✗ ${el.label}: NOT FOUND`);
    } else {
      console.log(`✓ ${el.label}: "${el.text}"`);
      console.log(`  Font: ${el.fontFamily}`);
      console.log(`  Weight: ${el.fontWeight}`);
    }
    console.log('');
  });

  await browser.close();
})();
