import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  
  // Track all requests
  const requests = [];
  page.on('request', request => {
    const url = request.url();
    if (url.includes('font') || url.includes('otf') || url.includes('woff') || 
        url.includes('assets/') || url.includes('.jpg') || url.includes('.png')) {
      requests.push({ url, type: request.resourceType() });
    }
  });
  
  // Track responses
  const responses = {};
  page.on('response', response => {
    const url = response.url();
    if (url.includes('font') || url.includes('otf') || url.includes('woff') || 
        url.includes('assets/') || url.includes('.jpg') || url.includes('.png')) {
      responses[url] = {
        status: response.status(),
        statusText: response.statusText(),
        url: url
      };
    }
  });

  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('=== Loading http://localhost:3000/recap.html ===\n');
  
  try {
    await page.goto('http://localhost:3000/recap.html', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
  } catch (e) {
    console.log('Page load error:', e.message);
  }
  
  // Wait for fonts
  await page.evaluate(() => document.fonts.ready);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('=== REQUEST LOG ===\n');
  
  // Group by status
  const statuses = {};
  for (const [url, resp] of Object.entries(responses)) {
    const status = resp.status;
    if (!statuses[status]) statuses[status] = [];
    statuses[status].push(resp);
  }
  
  // Show 404s first
  if (statuses[404]) {
    console.log('❌ 404 NOT FOUND:');
    statuses[404].forEach(r => {
      const shortUrl = r.url.replace('http://localhost:3000/', '');
      console.log(`   ${shortUrl}`);
    });
    console.log('');
  }
  
  if (statuses[200]) {
    console.log('✓ 200 OK:');
    statuses[200].forEach(r => {
      const shortUrl = r.url.replace('http://localhost:3000/', '');
      console.log(`   ${shortUrl}`);
    });
    console.log('');
  }
  
  // Check other status codes
  for (const [status, resps] of Object.entries(statuses)) {
    if (status !== '200' && status !== '404') {
      console.log(`${status}:`);
      resps.forEach(r => {
        const shortUrl = r.url.replace('http://localhost:3000/', '');
        console.log(`   ${shortUrl}`);
      });
      console.log('');
    }
  }
  
  // Font check
  console.log('=== FONT CHECK (document.fonts.check) ===\n');
  
  const fontChecks = await page.evaluate(() => {
    const checks = [
      { name: 'Horizon', test: '12px Horizon' },
      { name: 'The Seasons Bold', test: '700 12px "The Seasons"' },
      { name: 'TT Commons Pro', test: '12px "TT Commons Pro"' },
      { name: 'Pinyon Script', test: '12px "Pinyon Script"' },
      { name: 'Anton', test: '12px Anton' }
    ];
    
    return checks.map(c => ({
      font: c.name,
      loaded: document.fonts.check(c.test)
    }));
  });
  
  fontChecks.forEach(({ font, loaded }) => {
    console.log(`${loaded ? '✓' : '✗'} ${font}: ${loaded ? 'LOADED' : 'NOT LOADED'}`);
  });
  
  console.log('\n=== COMPUTED STYLES ===\n');
  
  const styles = await page.evaluate(() => {
    const elements = {
      'SUPERNOVA': document.querySelector('.hero-supernova'),
      'RECAP': document.querySelector('.hero-recap'),
      'edition 1': document.querySelector('.hero-edition'),
      'What they (script)': document.querySelector('.section-eyebrow'),
      'TOOK HOME': document.querySelector('.section-caps'),
      'Testimonial text': document.querySelector('.testimonial-text'),
      'Testimonial credit': document.querySelector('.testimonial-credit')
    };
    
    const result = {};
    for (const [label, el] of Object.entries(elements)) {
      if (el) {
        const style = window.getComputedStyle(el);
        result[label] = {
          fontFamily: style.fontFamily,
          fontWeight: style.fontWeight,
          fontSize: style.fontSize
        };
      } else {
        result[label] = 'ELEMENT NOT FOUND';
      }
    }
    return result;
  });
  
  Object.entries(styles).forEach(([label, style]) => {
    if (typeof style === 'string') {
      console.log(`${label}: ${style}`);
    } else {
      console.log(`${label}:`);
      console.log(`   font-family: ${style.fontFamily}`);
      console.log(`   font-weight: ${style.fontWeight}`);
    }
  });
  
  await browser.close();
})();
