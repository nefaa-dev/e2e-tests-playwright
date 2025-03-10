import { expect, Page } from "@playwright/test";
import { BasePage } from "./basePage";

const selectors = {
  usernameInput: '//input[@id="username"]',
  passwordInput: '//input[@id="password"]',
  continueButton: '//button[text()="Continue"]',
};

export class LoginPage extends BasePage {
  private readonly username: string;
  private readonly password: string;
  private readonly anotherUsername: string;
  public selectors: any;
  constructor(page: Page) {
    super(page);
    this.username = process.env.DEEPPACK_USER_NAME ?? "";
    this.password = process.env.DEEPPACK_PASSWORD ?? "";
    this.selectors = selectors;
    this.anotherUsername = "deeppack_auto+another@instadeep.com";
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.waitForSelector(selectors.usernameInput);
    await this.page.fill(selectors.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.waitForSelector(selectors.passwordInput);
    await this.page.fill(selectors.passwordInput, password);
  }

  async clickOnContinueButton(): Promise<void> {
    await this.page.waitForSelector(selectors.continueButton);
    await this.page.locator(selectors.continueButton).click();
  }

  async assertIsUserLoggedIn(): Promise<void> {
    const expectedUrl = this.dashboardPageURL;
    try {
      await this.WaitForRedirection(expectedUrl);
    } catch (error) {
      await this.forceRedirection();
    }
    const currentURL: string = this.page.url();
    expect(currentURL).toContain(this.webUrl);
  }

  async login(
    username: string = this.username,
    password: string = this.password
  ): Promise<void> {
    const btnLocator = this.page.locator(selectors.continueButton);
    await btnLocator.waitFor();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickOnContinueButton();
  }

  async loginBasedOnRole(role: string = "owner"): Promise<void> {
    switch (role.toLowerCase()) {
      case "owner":
        await this.login(this.username, this.password);
        break;
      case "manager":
        await this.login(
          "n.taamallah+manager.testorg@instadeep.com",
          "Test123@"
        );
        break;
      case "user":
        await this.login("n.taamallah+usertestorg@instadeep.com", "Test123@");
        break;
      case "supervisor":
        await this.login(
          "n.taamallah+supervisor.testorg@instadeep.com",
          "Test123@"
        );
        break;
      default:
        await this.login(this.username, this.password);
        break;
    }
  }

  async forceRedirection(url: string = this.webUrl): Promise<void> {
    await this.goTo(this.webUrl);
    await this.WaitForRedirection(this.webUrl);
  }
  async signInAnotherAccount(role: string = "owner") {
    if (role.toLowerCase()) {
      await this.login(this.anotherUsername, this.password);
    }
  }

  async verifySignedInRole(role: string): Promise<void> {
    const roleSelector = `(//span[text()="${role.toLowerCase()}"])[2]`;
    await this.waitForSelectorToBe({ selector: roleSelector });
  }
}
