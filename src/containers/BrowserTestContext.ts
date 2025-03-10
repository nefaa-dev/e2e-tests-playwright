import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  firefox,
  webkit,
} from "@playwright/test";
import { Container, ContainerKeys } from "./Container";
import fs from "fs";
import path from "path";

const isCI = process.env.CI === "true"; // Check if running on CI
interface TestContext {
  browserLaunch(): Promise<Browser>;
  newPage(browser: Browser, scenarioName?: string): Promise<Page>;
  clear(): Promise<void>;
}

export class BrowserTestContext implements TestContext {
  async browserLaunch(browserName: string = "chromium"): Promise<Browser> {
    let browser: Browser;
    switch (browserName) {
      case "chromium":
        browser = await chromium.launch({
          headless: JSON.parse(process.env.IS_HEADLESS!),
          args: ["--window-size=1920,1080"],
        });
        break;
      case "firefox":
        browser = await firefox.launch({ headless: isCI });
        break;
      case "webkit":
        browser = await webkit.launch({ headless: isCI });
        break;
      default:
        throw new Error(`Unsupported browser: ${browserName}`);
    }
    Container.register(ContainerKeys.browser, browser);

    return browser!;
  }

  private async initContext(
    browser: Browser,
    scenarioName: any,
    useStorageState?: boolean
  ): Promise<BrowserContext> {
    const harPath = `./artifacts/har/${scenarioName}`;
    const videoPath = `./artifacts/videos/${scenarioName}`;
    fs.mkdirSync(path.dirname(harPath), { recursive: true });

    let options = {
      ignoreHTTPSErrors: true,
      recordVideo: {
        dir: videoPath,
      },
      recordHar: {
        omitContent: true,
        path: harPath,
      },
      viewport: null,
      permissions: ["clipboard-read", "clipboard-write"],
      ...(useStorageState ? { storageState: "auth.json" } : {}),
    };

    let context = await browser.newContext(options);

    Container.register(ContainerKeys.context, context);
    return context;
  }

  async newPage(
    browser: Browser,
    scenarioName?: string,
    useStorageState?: boolean
  ): Promise<Page> {
    let page: Page;
    if (scenarioName !== "undefined") {
      let context = await this.initContext(
        browser,
        scenarioName,
        useStorageState
      );
      page = await context.newPage();
    } else {
      page = await browser.newPage();
    }

    Container.register(ContainerKeys.page, page);
    return page;
  }

  async clear(): Promise<void> {
    await this.close(ContainerKeys.page);
    await this.close(ContainerKeys.context);
    await this.close(ContainerKeys.browser);
  }

  async close(resource: keyof typeof ContainerKeys): Promise<void> {
    try {
      if (Container.isRegistered(resource)) {
        console.log(`Closing resource: ${resource}`);
        const resourceObj: any = Container.resolve(resource);

        if (resourceObj) {
          await resourceObj.close();
          console.log(`Resource ${resource} closed successfully.`);
        }
      }
    } catch (error) {
      console.error(`Error during closing resource ${resource}:`, error);
    }
  }
}
