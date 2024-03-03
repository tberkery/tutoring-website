import puppeteer, { Browser, Page } from "puppeteer";

describe("App.js", () => {
  let browser : Browser;
  let page : Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  it("contains the welcome text", async () => {
    debugger;
    await page.goto("http://localhost:5000/signIn");
    await page.waitForSelector("#identifier-field");
    await page.click("#identifier-field");
    await page.type("#identifier-field", "mflynn24@jhu.edu");
    await page.waitForSelector(".cl-formButtonPrimary");
    await page.click('.cl-formButtonPrimary');
    await page.waitForSelector('#password-field');
    await page.click("#password-field");
    await page.type('#password-field', "Arct!cTern1");
    await page.waitForSelector(".cl-formButtonPrimary");
    await page.click('.cl-formButtonPrimary');
    await page.waitForNavigation( {waitUntil: 'networkidle2'} )
    const text = await page.$eval(".App-welcome-text", (e) => e.textContent);
    expect(text).toContain("Edit src/App.js and save to reload.");
  });

  afterAll(() => browser.close());
});