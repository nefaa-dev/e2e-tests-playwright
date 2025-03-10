import { expect, Page, ElementHandle } from "@playwright/test";
import { BasePage } from "../basePage";
import axios from "axios";

const selectors = {
  addContainerButton: '//button[@id="products_addProduct_button"]',
  nameInput: '//input[@id="containerName"]',
  heightInput: '//input[@id="formHeight"]',
  lengthInput: '//input[@name="length"]',
  widthInput: '//input[@id="formWidth"]',
  maxCargoInput: '//input[@id="formMaxCargo"]',
  emptyWeightInput: '//input[@id="formEmptyPallet"]',
  maxHeightInput: '//input[@id="formMaxHeight"]',
  saveButton: '//button[@id="containers_save_button"]',
  closeButton: '//button[@id="modal_close_button"]',
  deleteSelectionButton: '//button[@id="products_deleteSelection_button"]',
  confirmDeleteButton:
    '//button[@id="container_deleteSelectedContainers_button"]',
  binIcon: 'button[id*="containers_delete_button"]',
  deleteButton: '//button[@id="containers_deleteContainer_button"]',
  seaCntnrTab: '//button[@id="organizationLibrary_navTab_button_1"]',
  boxTab: '//button[@id="organizationLibrary_navTab_button_2"]',
  uldTab: '//button[@id="organizationLibrary_navTab_button_3"]',
  airPalletTab: '//button[@id="organizationLibrary_navTab_button_4"]',
  groundPalletTab: '//button[@id="organizationLibrary_navTab_button_5"]',
  expandDetailsBtn: 'button[id*="containers_collapse_button"]',
};

export class ContainerPage extends BasePage {
  public name: string;
  public type: number;
  public height: number;
  public length: number;
  public width: number;
  public maxCargo: number;
  public emptyWeight: number;
  public maxHeight: string;
  public toBeCleanedUp: boolean;
  public category: number;
  public id: string;
  public isThresholdReached: boolean;
  public predefinedList: string[];

  public predIds = {
    twentyStandard: "e68e6cd4-d7ff-47cc-8d5f-d7a269d4a283",
  };
  public endpoints = {
    create: "/api/v1/containers",
    read: "/api/v1/containers",
    deleteBatch: "/api/v1/containers/batch",
  };

  constructor(page: Page) {
    super(page);

    this.name = `Container-${this.generateUniqueId()}`;
    this.type = 1;
    this.height = 1000;
    this.length = 1000;
    this.width = 1000;
    this.maxCargo = 100;
    this.emptyWeight = 10;
    this.maxHeight = "2000";
    this.toBeCleanedUp = false;
    this.id = "";
    this.category = 0;
    this.predefinedList = [
      "40 Standard",
      "20 Standard",
      "M1H AMD",
      "LD3 AKE",
      "LD6 ALF",
      "PLA LD",
      "PMC Q7",
      "PAG",
      "PMC LD P",
      "PMC",
      "PMC Q5",
      "PMC Q6",
      "US Pallet",
      "Euro Pallet",
    ];
    this.isThresholdReached = false;
  }

  async add(): Promise<void> {
    await this.click(selectors.addContainerButton);
  }

  async setName(name: string = this.name): Promise<void> {
    await this.fill(selectors.nameInput, name);
  }

  async setHeight(height: number = this.height): Promise<void> {
    await this.fill(selectors.heightInput, height.toString());
  }
  async setLength(length: number = this.length): Promise<void> {
    await this.fill(selectors.lengthInput, length.toString());
  }
  async setWidth(width: number = this.width): Promise<void> {
    await this.fill(selectors.widthInput, width.toString());
  }
  async setMaxCargo(maxCargo: number = this.maxCargo): Promise<void> {
    await this.fill(selectors.maxCargoInput, maxCargo.toString());
  }
  async setEmptyWeight(weight: number = this.emptyWeight): Promise<void> {
    await this.fill(selectors.emptyWeightInput, weight.toString());
  }
  async setMaxHeight(maxHeight: string = this.maxHeight): Promise<void> {
    await this.fill(selectors.maxHeightInput, maxHeight.toString());
  }
  async save(): Promise<void> {
    await this.click(selectors.saveButton);
  }
  async cancel(): Promise<void> {
    await this.click(selectors.closeButton);
  }
  async fillProperties(
    height: number = this.height,
    length: number = this.length,
    width: number = this.width,
    maxHeight: string = this.maxHeight,
    maxCargo: number = this.maxCargo,
    emptyWeight: number = this.emptyWeight
  ): Promise<void> {
    await this.setName();
    await this.setHeight(height);
    await this.setLength(length);
    await this.setWidth(width);
    await this.setMaxCargo(maxCargo);
    await this.setEmptyWeight(emptyWeight);
    if (maxHeight != "") {
      await this.setMaxHeight(maxHeight);
    }
  }

  async isSaved(): Promise<boolean> {
    const selector = `//td[text()="${this.name}"]`;

    try {
      await this.waitForSelector(selector);
      return true;
    } catch {
      return false;
    }
  }

  async isCreated(): Promise<boolean> {
    const selector = `//td[text()="${this.name}"]`;
    await this.page.waitForTimeout(2000);
    const targetContainer = await this.page.$(selector);
    if (targetContainer) {
      return true;
    } else {
      return false;
    }
  }

  async find(): Promise<ElementHandle | null> {
    const selector = `//td[text()="${this.name}"]`;

    try {
      await this.page.waitForSelector(selector, { timeout: this.timeout / 2 });
      const containerNameElement = await this.page.$(selector);
      return containerNameElement;
    } catch (error) {
      console.error(
        `Error finding Container with selector "${selector}": ${error}`
      );
      return null;
    }
  }

  async delete(): Promise<void> {
    const targetContainer = await this.find();

    if (targetContainer) {
      const row = await targetContainer.$("xpath=ancestor::tr");
      const checkBox = await row?.$("td:nth-child(1) div input");
      await checkBox?.click();
      await this.click(selectors.deleteSelectionButton);
      await this.click(selectors.confirmDeleteButton);
    }
  }

  async clickOnBin(): Promise<void> {
    const targetContainer = await this.find();

    if (targetContainer) {
      const row = await targetContainer.$("xpath=ancestor::tr");
      const binIcon = await row?.$(selectors.binIcon);
      await binIcon?.click();
    }
  }

  async isDeletable(): Promise<boolean> {
    await this.page.waitForTimeout(5000);
    const targetContainer = await this.find();

    const row = await targetContainer!.$("xpath=ancestor::tr");
    const binIcon = await row?.$(selectors.binIcon);
    const isDisabled = await binIcon?.isDisabled();
    if (isDisabled) {
      return false;
    } else {
      return true;
    }
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.click(selectors.deleteButton);
  }

  async isDeleted(): Promise<boolean> {
    const selector = `//td[text()="${this.name}"]`;
    await this.page.waitForSelector(selector, { state: "hidden" });
    const containerName = await this.page.$(selector);
    if (containerName) {
      return false;
    }
    return true;
  }

  async createViaApi(
    containerCategory: number,
    containerName: string = this.name
  ): Promise<void> {
    const baseUrl = this.apiBaseUrl;
    const apiKey = this.apiKey;
    this.type = containerCategory;
    if (containerCategory == 4) {
      this.height = 100;
    }

    const payload = {
      containerType: this.type,
      name: containerName,
      height: this.height,
      length: this.length,
      width: this.width,
      maximumHeight: this.maxHeight,
      maximumCargoWeight: this.maxCargo,
      emptyWeight: this.emptyWeight,
    };

    const response = await this.retryOperation(async () => {
      const res = await axios.post(
        `${baseUrl}${this.endpoints.create}`,
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
    console.log("API data: ", responseBody);
    try {
      expect(responseBody.status).toBe("success");
      expect(responseBody.errorCode).toBe(null);
      expect(responseBody.errorMessage).toBe(null);
      this.id = responseBody.result;
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(
        `Error while api request or unexpected response, response was: ${responseBody}, error: ${error}`
      );
    }
  }

  async selectCategory(category: number): Promise<void> {
    switch (category) {
      case 1:
        await this.click(selectors.seaCntnrTab);
        break;
      case 5:
        await this.click(selectors.boxTab);
        break;
      case 4:
        await this.click(selectors.groundPalletTab);
        break;
    }
  }

  async getUnusedCustomContainers(): Promise<string[]> {
    const baseUrl = this.apiBaseUrl;
    const apiKey = this.apiKey;
    let customIds: string[] = [];
    let apiResponse: any;

    const response = await this.retryOperation(async () => {
      const res = await axios.get(`${baseUrl}${this.endpoints.read}`, {
        headers: {
          "Content-Type": "application/json",
          "x-deeppack-api-key": apiKey,
        },
      });
      return res;
    });

    const responseBody = response.data;
    expect(responseBody.status).toBe("success");
    expect(responseBody.errorCode).toBe(null);
    expect(responseBody.errorMessage).toBe(null);
    const containers = responseBody.result;

    for (let container of containers) {
      if (await this.isValidContainer(container)) {
        customIds.push(container.id);
      }
    }

    return customIds;
  }

  async isValidContainer(container: any) {
    const containerName = container.name;
    return (
      !this.predefinedList.includes(containerName) &&
      !container.isUsedByRun &&
      !containerName.startsWith("PMC")
    );
  }

  async clearUnusedCustom(): Promise<void> {
    const baseUrl = this.apiBaseUrl;
    const apiKey = this.apiKey;
    const customIds = await this.getUnusedCustomContainers();
    if (customIds.length != 0) {
      const response = await this.retryOperation(async () => {
        const queryIds = customIds.join("&containerIds=");
        const res = await axios.delete(
          `${baseUrl}${this.endpoints.deleteBatch}?containerIds=${queryIds}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-deeppack-api-key": apiKey,
            },
          }
        );
        return res;
      });

      let data = response.data;
      console.log("error message:", data.errorMessage);
      expect(response.status).toBe(200);
      expect(data.status).toBe("success");
      expect(data.errorCode).toBe(null);
      expect(data.errorMessage).toBe(null);
    }
  }

  async expandDetails(): Promise<void> {
    const targetContainer = await this.find();
    const expandBtn = await targetContainer?.$(selectors.expandDetailsBtn);
    await expandBtn?.click();
  }

  async getInternalVol(container: string): Promise<any> {
    let selector: string = "";
    switch (container.toLowerCase()) {
      case "sea container":
        selector = "(//label)[5]";
        break;
      case "ground pallet":
        selector = "(//label)[6]";
        break;
    }
    const internalVol = await this.page.$(selector);
    return await internalVol?.innerText();
  }

  async getToltalCount(): Promise<number> {
    let count: number = 0;
    const categories = [
      selectors.seaCntnrTab,
      selectors.boxTab,
      selectors.uldTab,
      selectors.airPalletTab,
      selectors.groundPalletTab,
    ];
    for (let element of categories) {
      let countStr: any;
      await this.waitForSelector(element);
      const tab = await this.page.$(element);
      const countSpan = await tab?.$("span:nth-child(3)");
      countStr = await countSpan?.textContent();
      count += parseInt(countStr);
    }
    return count;
  }

  async reachThreshold(
    threshold: number,
    currentCount: number,
    containerCategory: number = 1
  ): Promise<void> {
    const missingNbr = threshold - currentCount;

    for (let i = 0; i < missingNbr; i++) {
      let name: string = this.generateUniqueId();
      await this.createViaApi(containerCategory, name);
    }
  }
}
