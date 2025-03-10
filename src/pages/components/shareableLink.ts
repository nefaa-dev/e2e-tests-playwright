import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";
import axios from "axios";

const selectors = {
  verticalEllipsis: '[data-testid*="shareablelinks_viewMenu_button"]',
  revokeOption: '//div[@id="shareablelinks_revokelink_button"]',
  deleteOption: '[id*="shareablelinks_deleteLink_button"]',
  reactivateOption: '[id*="shareablelinks_reactivatelink_button"]',
  confirmButton: '//button[@id="confirm_button"]',
  status: {
    active: '//span[text()="Active"]',
    revoked: '//span[text()="Revoked"]',
  },
};
const endpoints = {
  generateshareablelink: "/api/v1/visualization/generateshareablelink",
  shareablelinks: "/api/v1/visualization/shareablelinks",
};

export class ShareableLink extends BasePage {
  public toBeCleanedUp: boolean;
  public link: string;
  private id: string;
  private readonly endpoints: any;

  constructor(page: Page) {
    super(page);
    this.toBeCleanedUp = false;
    this.link = "";
    this.id = "";
    this.endpoints = endpoints;
  }

  async clickOnVerticalEllipsis(): Promise<void> {
    const verticalEllipsis = (
      await this.locator(selectors.verticalEllipsis)
    ).first();
    verticalEllipsis.click();
  }

  async clickOnFromMenu(option: string): Promise<void> {
    switch (option.toLowerCase()) {
      case "delete":
        await this.click(selectors.deleteOption);
        break;
      case "revoke":
        await this.click(selectors.revokeOption);
        break;
      case "reactivate":
        await this.click(selectors.reactivateOption);
        break;
      default:
        console.info(
          "This operation for shareable links, is not available, recheck please !"
        );
        break;
    }
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.click(selectors.confirmButton);
  }

  async checkLinkStatus(loadName: string, status: string): Promise<void> {
    const loadNameSelector = `//a[text()="${loadName}"]`;
    await this.page.waitForSelector(loadNameSelector);
    const load = await this.page.$(loadNameSelector);
    const statusCol = await load?.$("../td[5]");
    switch (status.toLowerCase()) {
      case "active":
        await statusCol?.waitForSelector(selectors.status.active);
        break;
      case "revoked":
        await statusCol?.waitForSelector(selectors.status.revoked);
        break;
      case "expired":
        // to be implemented in the relevant test
        break;
    }
  }

  async isDeleted(link: string): Promise<boolean> {
    const selector = `//input[@value="${link}"]`;
    try {
      await this.waitForSelectorToBe({
        selector: selector,
        status: this.elementStates.hidden,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async generateViaApi(loadId: string, runId: string): Promise<void> {
    let baseUrl = this.apiBaseUrl;
    let apiKey = this.apiKey;

    const payload = {
      loadId: loadId,
      runId: runId,
    };

    const response = await this.retryOperation(async () => {
      const res = await axios.post(
        `${baseUrl}${this.endpoints.generateshareablelink}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": apiKey,
          },
        }
      );
      return res;
    });
    const responseBody = response.data;
    expect(responseBody.status).toBe("success");
    expect(responseBody.errorCode).toBe(null);
    expect(responseBody.errorMessage).toBe(null);
    this.link = responseBody.result.link;
    this.id = responseBody.result.shareableLinkId;
  }
  async get(): Promise<any> {
    const response = await this.retryOperation(async () => {
      const res = await axios.get(
        `${this.apiBaseUrl}${this.endpoints.shareablelinks}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": this.apiKey,
          },
        }
      );
      return res;
    });
    const responseBody = response.data;
    expect(responseBody.status).toBe("success");
    expect(responseBody.errorCode).toBe(null);
    expect(responseBody.errorMessage).toBe(null);
    return responseBody.result;
  }

  async revokeViaApi(): Promise<void> {
    const payload = {
      shareableLinkId: this.id,
      isRevoked: true,
    };

    const response = await this.retryOperation(async () => {
      const res = await axios.put(
        `${this.apiBaseUrl}${this.endpoints.shareablelinks}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": this.apiKey,
          },
        }
      );
      return res;
    });
    const responseBody = response.data;
    expect(responseBody.status).toBe("success");
  }

  async deleteViaApi(): Promise<void> {
    if (!this.id.length) {
      let result = await this.get();
      for (let obj of result) {
        if (obj.shareableLinkInfo.link == this.link) {
          this.id = obj.shareableLinkInfo.id;
          break;
        }
      }
    }

    const response = await this.retryOperation(async () => {
      const res = await axios.delete(
        `${this.apiBaseUrl}${this.endpoints.shareablelinks}/${this.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": this.apiKey,
          },
        }
      );
      return res;
    });
    const responseBody = response.data;
    expect(responseBody.status).toBe("success");
  }
}
