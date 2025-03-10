import * as fs from "node:fs";
import * as dotenv from "dotenv";
import { LoginPage } from "../pages/loginPage";
import { GeneralSetting } from "../pages/generalSettingsPage";
import { Browser } from "playwright";
import { BrowserTestContext } from "../containers/BrowserTestContext";
dotenv.config();

let apiKey: string;
let browser;
let page;
let testContext: BrowserTestContext;
let loginPage: LoginPage;
let gnrlSettingPage: GeneralSetting;

async function startBrowser(webUrl: string) {
  if (!webUrl) {
    throw new Error(
      "WEB_URL is not defined. Please set the environment variable in the .env file."
    );
  }

  testContext = new BrowserTestContext();
  browser = await testContext.browserLaunch();
  return browser;
}

async function beforeAll(browser: Browser, webUrl: string) {
  page = await browser.newPage();
  await page.goto(webUrl);
  loginPage = new LoginPage(page);
  gnrlSettingPage = new GeneralSetting(page);

  await loginPage.login();
  await loginPage.assertIsUserLoggedIn();
  await page.context().storageState({ path: "auth.json" });
  await gnrlSettingPage.clickOnApiDoc();
  await gnrlSettingPage.generateApiKey();
  await page.waitForTimeout(2000);
  apiKey = await gnrlSettingPage.getApiKey();

  await gnrlSettingPage.setMeasurementUnitsViaApi("millimeter", 1, apiKey);
  fs.writeFileSync("apikey.txt", apiKey, "utf8");
}

async function closeBrowser() {
  if (testContext) {
    await testContext.clear();
    console.log("Browser closed");
  }
}

async function runWithRetries(maxRetries: number = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`Attempt ${attempt} of ${maxRetries}`);
    try {
      const webUrl = process.env.WEB_URL ?? "";
      browser = await startBrowser(webUrl);
      await beforeAll(browser, webUrl);
      await closeBrowser();
      break;
    } catch (error) {
      console.error(`Attempt ${attempt} failed with error: ${error}`);
      if (attempt === maxRetries) {
        console.error("All retry attempts failed.");
        throw error;
      } else {
        console.log("Retrying...");
      }
    }
  }
}

(async () => {
  await runWithRetries();
})();
