import { ElementHandle, expect, Locator, Page } from "@playwright/test";
import config from "../../playwright.config";
import fs from "node:fs";
import { URLs } from "../helpers/constants";
import { state } from "../helpers/types";
import { randomUUID } from "crypto";

const selectors = {
  createLoadPageHeader: '//h6[text()="Create Load"]',
  loadsPageHeader: '//h6[text()="Loads"]',
};
export class BasePage {
  protected page: Page;
  public webUrl: string;
  public dashboardPageURL: string;
  public mainURL: string;
  protected timeout: number;
  protected redirectionTimeout: number;
  public apiBaseUrl: string;
  public apiKey: string;
  public readonly elementStates: any;
  public readonly downloadsFolder: string;
  private readonly pages: Record<string, string>;
  private readonly pagesHeaders: Record<string, string>;
  constructor(page: Page) {
    this.page = page;
    this.webUrl = this.getWebURL();
    const apiKey = fs.readFileSync("apikey.txt", "utf8");
    this.apiBaseUrl = this.getApiBaseUrl();
    this.mainURL = this.getMainURL();
    this.dashboardPageURL = `${this.webUrl}/loads`;
    this.apiKey = apiKey;
    this.timeout = config.expect?.timeout! / this.getNumber(); // default: 30 sec
    this.redirectionTimeout = this.timeout * 1.5; // 45 sec
    this.downloadsFolder = "./Downloads";
    this.elementStates = {
      visible: "visible",
      detached: "detached",
      attached: "attached",
      hidden: "hidden",
      checked: "checked",
      unchecked: "unchecked",
      disabled: "disabled",
    };

    this.pages = {
      login: URLs.login,
      loads: URLs.loads,
      createload: URLs.createLoad,
      library: URLs.library,
      drafts: URLs.drafts,
      settings: URLs.generalSettings,
    };
    this.pagesHeaders = {
      loads: selectors.loadsPageHeader,
      createload: selectors.createLoadPageHeader,
    };
  }

  private getWebURL(): string {
    // Check if running in CI
    if (process.env.CI) {
      return process.env.WEB_URL ?? "";
    }

    // Check if running locally and read from .env file
    require("dotenv").config(); // Load .env file
    return process.env.WEB_URL ?? "";
  }
  private getMainURL(): string {
    let lastIndex = this.webUrl.lastIndexOf("/");

    if (lastIndex !== -1 && lastIndex !== 6 && lastIndex !== 7) {
      // Extract the substring up to the last "/"
      return this.webUrl.substring(0, lastIndex);
    } else {
      // Handle the case where "/" is not found in the string
      return this.webUrl;
    }
  }
  private getApiBaseUrl(): string {
    let newPart: string = "https://api";
    let firstIndex = this.webUrl.indexOf(".");

    const partToReplace = this.webUrl.substring(0, firstIndex);
    const apiBaseUrl = this.webUrl.replace(partToReplace, newPart);

    return apiBaseUrl;
  }
  private getNumber(timeoutInMilli: number = 30000): number {
    return config.expect?.timeout! / timeoutInMilli;
  }
  async goTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async WaitForRedirection(
    urlPattern: string | RegExp | ((url: URL) => boolean)
  ): Promise<void> {
    await this.page.waitForURL(urlPattern, {
      timeout: this.redirectionTimeout,
      waitUntil: "domcontentloaded",
    });

    if (typeof urlPattern === "string" || urlPattern instanceof RegExp) {
      await expect(this.page).toHaveURL(urlPattern);
    } else {
      const currentURL = this.page.url();
      const isURLMatching = urlPattern(new URL(currentURL));
      expect(isURLMatching).toBe(true);
    }
    await this.waitForLoadState("networkidle", { timeout: this.timeout });
  }

  async verifyPage(page: string) {
    const pageUrl = this.pages[page];
    if (!pageUrl) {
      throw new Error(`Unknown page: ${page}`);
    }
   
    await this.WaitForRedirection((url: { href: string | string[] }) =>
      url.href.includes(pageUrl)
    );
    await this.verifyPageIsVisible(page);
  }

  async verifyPageIsVisible(page: string) {
    const pageHeader = this.pagesHeaders[page];
    if (!pageHeader) {
      throw new Error(`Unknown page Header: ${page}`);
    }
    await this.waitForSelectorToBe({ selector: pageHeader });
  }

  async waitForLoadState(
    state: "load" | "domcontentloaded" | "networkidle",
    options?: { timeout?: number }
  ): Promise<void> {
    await this.page.waitForLoadState(state, options);
  }

  async checkCheckboxStatus(status: boolean, checkbox: Locator): Promise<void> {
    status
      ? await expect(checkbox).toBeChecked()
      : await expect(checkbox).not.toBeChecked();
  }

  async getNumberOfElementLocators(elementSelector: string): Promise<number> {
    return await this.page.locator(elementSelector).count();
  }
  async getNbrOfLocators(
    elementSelector: string,
    elementLocator?: Locator
  ): Promise<number> {
    if (elementLocator) {
      return await elementLocator.locator(elementSelector).count();
    }

    return await this.page.locator(elementSelector).count();
  }

  async assertNumberOfLocators(
    expectedCount: number,
    elementSelector: string,
    elementLocator?: Locator
  ) {
    let count = await this.getNbrOfLocators(elementSelector, elementLocator);
    expect(count).toEqual(expectedCount);
  }

  async toHaveValue(elementSelector: string, value: any): Promise<void> {
    const elementLocator = await this.waitForSelectorToBe({
      selector: elementSelector,
    });
    await expect(elementLocator).toHaveValue(value, {
      timeout: this.timeout,
    });
  }

  async toHaveText(elementSelector: string, value: string): Promise<void> {
    const element: Locator = this.page.locator(elementSelector).first();
    const elementInnerText: string = (await element.textContent()) ?? "";
    expect(elementInnerText).toEqual(value);
  }

  async elementShouldBe({
    selector,
    status = this.elementStates.visible,
    baseLocator = null,
  }: {
    selector: string;
    status?: string;
    baseLocator?: Locator | null;
  }): Promise<void> {
    const elementLocator: Locator = baseLocator
      ? baseLocator.locator(selector)
      : this.page.locator(selector);

    switch (status) {
      case this.elementStates.hidden:
        await expect(elementLocator).toBeHidden();
        break;
      case this.elementStates.checked:
        await expect(elementLocator).toBeChecked();
        break;
      case this.elementStates.unchecked:
        await expect(elementLocator).not.toBeChecked();
        break;
      case this.elementStates.disabled:
        await expect(elementLocator).toBeDisabled();
        break;
      case this.elementStates.enabled:
        await expect(elementLocator).toBeEnabled();
        break;
    }
  }

  async waitForSelectorToBe({
    selector,
    status = this.elementStates.visible,
    baseLocator = null,
    timeout = this.timeout,
  }: {
    selector: string;
    status?: state;
    baseLocator?: Locator | null;
    timeout?: number;
  }): Promise<Locator> {
    try {
      if (baseLocator) {
        let elementLocator = baseLocator.locator(selector);
        await elementLocator.waitFor({
          state: status,
          timeout: timeout,
        });
        return elementLocator;
      }

      let elementLocator = this.page.locator(selector);
      await elementLocator.waitFor({
        state: status,
        timeout: timeout,
      });
      return elementLocator;
    } catch (error) {
      console.error(
        `Error while waiting for element with selector ${selector} to be ${status}: `,
        error
      );
      return baseLocator!;
    }
  }

  async fill(elementSelector: string, value: string) {
    const elementLocator = await this.waitForSelectorToBe({
      selector: elementSelector,
    });
    await elementLocator.fill(value);
  }

  async waitForResponse(url: string): Promise<void> {
    await this.page.waitForResponse(url);
  }

  async retryUntilExpectationPasses(
    expectation: () => Promise<void>,
    maxAttempts: number = 100,
    delayMs: number = 100
  ): Promise<void> {
    let attempts: number = 0;
    let error: Error | undefined;
    while (attempts < maxAttempts) {
      try {
        await expectation();
        return; // Expectation passed, exit the loop
      } catch (e) {
        error = e as Error;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs)); // Wait for the specified delay
      attempts++;
    }
    throw error; // Expectation failed even after retries, throw the last error
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }
  async getDashboardPageURL(): Promise<string> {
    return this.dashboardPageURL;
  }

  generateUniqueId(): string {
    return randomUUID();
  }

  async click(elementSelector: string, timeout: number = this.timeout) {
    let elementLocator = await this.waitForSelectorToBe({
      selector: elementSelector,
      timeout: timeout,
    });
   
    await elementLocator.click();
    await this.waitForPageLoading();
  }

  async getLocators(
    elementSelector: string,
    elementLocator?: Locator
  ): Promise<Locator[]> {
    if (elementLocator) {
      return elementLocator.locator(elementSelector).all();
    }
    return this.page.locator(elementSelector).all();
  }

  async deleteAtribute(elementSelector: string, attributeName: string) {
    await this.page.$eval(
      elementSelector,
      (element, attribute) => {
        element.removeAttribute(attribute);
      },
      attributeName
    );
  }

  async waitForSelectorNotToBeVisible(elementSelector: string) {
    await expect(this.page.locator(elementSelector)).not.toBeVisible({
      timeout: this.timeout,
    });
  }

  async waitForPageLoading(): Promise<void> {
    await this.page.waitForLoadState("load", { timeout: this.timeout });
    await this.page.waitForSelector("html", { state: "visible" });
  }

  async locateElement(selector: string): Promise<ElementHandle> {
    const element = await this.page.$(selector);

    return element!;
  }
  async waitForTimeout(timeout: number): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

  async locator(selector: string): Promise<Locator> {
    return this.page.locator(selector);
  }

  async waitForSelector(
    selector: string,
    state: state = "attached"
  ): Promise<void> {
    await this.page.waitForSelector(selector, { state: state });
  }

  async hoverOn(selector: string): Promise<void> {
    await this.page.waitForTimeout(1000);
    const elementToHover = await this.locator(selector);
    await elementToHover.waitFor();
    await elementToHover.hover();
  }

  async retryOperation(callback: () => any, maxRetries = 3, delay = 1500) {
    let max = maxRetries;
    let result;
    while (true) {
      try {
        result = await callback();
        console.log(`API Request Succeeded!`);
        break;
      } catch (error) {
        max--;
        console.log(
          `API Request Failed, attempt ${maxRetries - max}, error was: ${error}`
        );

        if (max === 0) {
          console.log("Retry maximum reached. Exiting");
          break;
        }
      }
      await this.sleep(delay);
    }
    return result;
  }

  async sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, ms);
    });
  }

  async checkTooltipMessage(message: string): Promise<void> {
    const tooltipSelector = `//span[text() = "${message}"]`;
    await this.page.waitForSelector(tooltipSelector);
  }
}
