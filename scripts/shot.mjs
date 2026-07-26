import puppeteer from "puppeteer-core";

const [url, prefix] = process.argv.slice(2);

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

const height = await page.evaluate(() => document.body.scrollHeight);
const vh = 900;
const shots = Math.min(8, Math.ceil(height / vh));

for (let i = 0; i < shots; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * vh);
  await new Promise((r) => setTimeout(r, 700)); // let the reveals animate
  await page.screenshot({ path: `${prefix}-${i}.png` });
}
await browser.close();
console.log(`✓ ${shots} sections -> ${prefix}-*.png`);
