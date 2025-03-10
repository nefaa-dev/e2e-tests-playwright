import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

const selectors = {
  emailInput: '//input[@type="email"]',
  sendButton: '//button[@id="manageOrganization_sendInvitation_button"]',
  vrtclEllipsis: 'button[id="manageOrganization_menu_button"]',
  deleteOption: '//div[@id="manageOrganization_delete_button"]',
  deleteButton: '//button[@id="confirm_button"]',
  checkboxInput: 'input[type="checkbox"]',
  deleteSelectionButton:
    '//button[@id="manageOrganization_deleteSelection_button"]',
  confirmDeleteButton: "//",
};

export class Invitation extends BasePage {
  public emailAddress: string;
  public toBeCleanedUp: boolean;

  constructor(page: Page) {
    super(page);
    this.emailAddress = `deeppack_auto+${this.generateUniqueId()}@instadeep.com`;
    this.toBeCleanedUp = false;
  }

  async find(): Promise<Locator | null> {
    const selector = `//td[text()="${this.emailAddress}"]`;

    try {
      return await this.waitForSelectorToBe({ selector: selector });
    } catch (error) {
      throw new Error(
        `Error finding invitation with selector "${selector}": ${error}`
      );
    }
  }

  async isSent(): Promise<boolean> {
    const targetInvitation = await this.find();
    if (targetInvitation) {
      return true;
    }
    return false;
  }

  async fillEmailField(): Promise<void> {
    await this.fill(selectors.emailInput, this.emailAddress);
  }

  async clickOnSendButton(): Promise<void> {
    await this.click(selectors.sendButton);
  }

  async clickOnVrtclEllipsis(): Promise<void> {
    const targetInvitation = await this.find();

    if (targetInvitation) {
      const row = await this.waitForSelectorToBe({
        selector: "xpath=ancestor::tr",
        baseLocator: targetInvitation,
      });

      const vrtclEllipsis = await this.waitForSelectorToBe({
        selector: selectors.vrtclEllipsis,
        baseLocator: row,
      });

      await vrtclEllipsis.click();
    }
  }

  async clickOnDeleteOption(): Promise<void> {
    await this.click(selectors.deleteOption);
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.click(selectors.deleteButton);
  }

  async isDeleted(): Promise<boolean> {
    const selector = `//td[text()="${this.emailAddress}"]`;
    await this.page.waitForSelector(selector, { state: "hidden" });
    const invitationElmnt = await this.page.$(selector);

    if (invitationElmnt) {
      return false;
    }
    return true;
  }

  async delete(): Promise<void> {
    const targetInvitation = await this.find();
    try {
      const row = await this.waitForSelectorToBe({
        selector: "xpath=ancestor::tr",
        baseLocator: targetInvitation,
      });

      const checkBox = await this.waitForSelectorToBe({
        selector: selectors.checkboxInput,
        baseLocator: row,
      });

      await checkBox.click();
      await this.click(selectors.deleteSelectionButton);
      await this.click(selectors.deleteButton);
    } catch (error) {
      throw new Error(`Error while deleting invitation: ${error}`);
    }
  }
}
