const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8080/recap.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const debug = await page.evaluate(() => {
    const hero = document.getElementById('hero');
    const grid = document.querySelector('.hero-grid');
    const tiles = grid.querySelectorAll('.hero-tile');
    const gridStyle = window.getComputedStyle(grid);
    
    return {
      heroHeight: hero.offsetHeight,
      gridHeight: grid.offsetHeight,
      gridRows: gridStyle.gridAutoRows,
      tileCount: tiles.length,
      firstTileHeight: tiles[0] ? tiles[0].offsetHeight : 0,
      viewportHeight: window.innerHeight
    };
  });
  
  console.log('Hero Debug Info:');
  console.log(JSON.stringify(debug, null, 2));
  
  await browser.close();
})();
