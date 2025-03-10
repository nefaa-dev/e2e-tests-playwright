import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Invitation } from "./components/invitation";
import axios from "axios";
import { ShareableLink } from "./components/shareableLink";

const selectors = {
  generateButton: '//div[@id="apiDocumentation_generateKey_button"]',
  apiKeyInput: '//input[@type="text"]',
  apiDocLink: '//a[@id="API Documentation_nav_link"]',
  manageOrgLink: '//a[@id="Manage Organization_nav_link"]',
  invitationsTab: '//button[@id="manageOrganization_invitations_button"]',
  inviteUsrButton: '//button[@id="manageOrganization_inviteUser_button"]',
  invitationSentNotif: '//p[text()="Invitation(s) were sent successfully !"]',
  inviteUsrTooltip: '//span[@data-for="invite_user_tooltip"]',
  shareableLinks: '//button[@id="generalSettings_navtab_button_3"]',
  shareableLinksTable: '//table[@id="shareable_links_table"]',
  status: {
    active: '//span[text() = "Active"]',
  },
  headerOrganizationButton: '//button[normalize-space(span)="Organization"]',
  headerPreferencesButton: '//button[normalize-space(span)="Preferences"]',
  headerApiButton: '//button[normalize-space(span)="API"]',
  headerShareableLinksButton:
    '//button[normalize-space(span)="Shareable links"]',
  mustBeOnTheFloorToggle: "#stackable-on-ground",
  transportationModeDropdown: "#transportation_mode",
};
const endpoints = {
  update: "/api/v1/organization/preferences",
};

let preferencesPayload = {
  defaultSupportRatio: 0.7,
  defaultCeilingClearance: 1,
  defaultDimensionMeasurement: 1,
  defaultMassMeasurement: 1,
  defaultPackingSequence: 1,
};

export class GeneralSetting extends BasePage {
  public invitation: Invitation;
  public shareableLink: ShareableLink;
  isDefaultLengthUnit: boolean;

  constructor(page: Page) {
    super(page);
    this.invitation = new Invitation(page);
    this.shareableLink = new ShareableLink(page);
    this.isDefaultLengthUnit = true;
  }

  async clickOnApiDoc(): Promise<void> {
    let apiDocLinkLocator = await this.locator(selectors.apiDocLink);
    await apiDocLinkLocator.click();
  }

  async clickOnShareableLinks(): Promise<void> {
    await this.click(selectors.shareableLinks);
  }

  async generateApiKey(): Promise<void> {
    let generateBtnLocator = await this.locator(selectors.generateButton);
    await generateBtnLocator.click();
  }

  async getApiKey(): Promise<string> {
    await this.locator(selectors.apiKeyInput);
    let apiKey: string;

    apiKey = await this.page.$eval(
      selectors.apiKeyInput,
      (input) => (input as HTMLInputElement).value
    );

    return apiKey;
  }

  async clickOnManageOrg(): Promise<void> {
    await this.click(selectors.manageOrgLink);
  }

  async clickOnInvitationsTab(): Promise<void> {
    await this.click(selectors.invitationsTab);
  }

  async clickOnInviteUser(): Promise<void> {
    await this.page.waitForSelector(selectors.inviteUsrButton);

    await this.click(selectors.inviteUsrTooltip);
  }

  async isInvitationSent(): Promise<boolean> {
    await this.waitForSelectorToBe({ selector: selectors.invitationSentNotif });
    return await this.invitation.isSent();
  }

  async passApiKey(key: string): Promise<string> {
    return key;
  }
  async setMeasurementUnitsViaApi(
    lengthUnit: string = "millimeter",
    massUnit: number = 1,
    apiKey: string = this.apiKey
  ): Promise<void> {
    switch (lengthUnit.toLowerCase()) {
      case "meter":
        preferencesPayload.defaultDimensionMeasurement = 1;
        this.isDefaultLengthUnit = true;
        break;

      case "centimeter":
        preferencesPayload.defaultDimensionMeasurement = 2;
        this.isDefaultLengthUnit = false;
        break;

      case "millimeter":
        preferencesPayload.defaultDimensionMeasurement = 3;
        this.isDefaultLengthUnit = false;
        break;

      case "inch":
        preferencesPayload.defaultDimensionMeasurement = 4;
        this.isDefaultLengthUnit = false;
        break;

      case "feet":
        preferencesPayload.defaultDimensionMeasurement = 5;
        this.isDefaultLengthUnit = false;
        break;
    }

    preferencesPayload.defaultMassMeasurement = massUnit;

    await this.retryOperation(async () => {
      const res = await axios.put(
        `${this.apiBaseUrl}${endpoints.update}`,
        preferencesPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": apiKey,
          },
        }
      );
      return res;
    });
  }

  async checkShareableLink(
    loadName: string,
    runName: string,
    shareableLink: string
  ): Promise<void> {
    await this.waitForSelectorToBe({ selector: selectors.shareableLinksTable });

    const shareLinksTable = await this.page.$(selectors.shareableLinksTable);
    const tableBody = await shareLinksTable?.$("tbody");
    const rows = await tableBody?.$$("tr");

    if (rows) {
      for (const _row in rows) {
        const loadNameXPath = `//td//a[text() = "${loadName}"]`;
        const runNameXPath = `//td//a[text() = "${runName}"]`;
        const linkXPath = `//td//input[@value="${shareableLink}"]`;
        const statusXPath = `//td//a[text() = "${loadName}"]/ancestor::tr/td[.//span[text() = "Active"]]`;

        await this.waitForSelectorToBe({ selector: loadNameXPath });
        await this.waitForSelectorToBe({ selector: runNameXPath });
        await this.waitForSelectorToBe({ selector: linkXPath });
        await this.waitForSelectorToBe({ selector: statusXPath });
      }
    }
  }

  async clickOnHeaderButton(button: string) {
    switch (button.toLowerCase()) {
      case "preferences":
        await this.click(selectors.headerPreferencesButton);
        break;
      case "organization":
        await this.click(selectors.headerOrganizationButton);
        break;
      case "api":
        await this.click(selectors.headerApiButton);
        break;
      case "shareable links":
        await this.click(selectors.headerShareableLinksButton);
        break;
      default:
        throw new Error("Invalid button name");
    }
  }

  async verifyToggleState(element: string, state: string) {
    if (element.toLowerCase() === "must be placed on the floor") {
      await this.elementShouldBe({
        selector: selectors.mustBeOnTheFloorToggle,
        status: this.elementStates.enabled,
      });
    }
  }

  async verifyDropdownIsDisabled(dropdown: string) {
    if (dropdown.toLowerCase() === "transportation mode") {
      await this.elementShouldBe({
        selector: selectors.transportationModeDropdown,
        status: this.elementStates.disabled,
      });
    }
  }

  async verifyDropdownValue(dropdown: string, mode: string) {
    if (dropdown.toLowerCase() === "transportation mode") {
      await this.toHaveValue(selectors.transportationModeDropdown, mode);
    }
  }
}
