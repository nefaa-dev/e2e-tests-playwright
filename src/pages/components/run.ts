import { expect, Page, ElementHandle, Browser } from "@playwright/test";
import { BrowserTestContext } from "../../containers/BrowserTestContext";
import { BasePage } from "../basePage";
import { PreveiwPage } from "../previewPage";
import { error } from "console";
import { ShareableLink } from "./shareableLink";
import { Container, ContainerKeys } from "../../containers/Container";
import * as fs from "fs";
import Papa from "papaparse";

const selectors = {
  runButton: '//button[@id="newRun_run_button"]',
  runNameInput: '//input[@placeholder="Please enter a run name"]',
  instantRun: '//div[@id="new-run_instant-solution_card"]',
  generatePdfButton: '//button[@id="packingResult_downloadPdf_button"]',
  resultsButton: '//span[text()="Results"]',
  viewPdfButton: '//span[@id="packingResult_viewPdf_span"]',
  vrtclEllipsis: 'button[id*="runDetail_rowMenu_button"]',
  deleteOption: '[id*="runDetails_deleteRun_button"]',
  deleteButton: '//button[@id="confirm_button"]',
  totalProducts: '//span[@data-testid="total-shapes"]',
  totalItems: '//span[@data-testid="items-count"]',
  filledVolume: '//span[@data-testid="filled-volume"]',
  filledWeight: '//span[@data-testid="filled-weight"]',
  totalWeight: '//span[@data-testid="total-weight"]',
  achievedHeight: '//span[@data-testid="achieved-height"]',
  weightPercentage: '//span[@data-testid="weight-percentage"]',
  volumePercentage: '//span[@data-testid="volume-percentage"]',
  remainingPrdctsButton:
    '//button[@id="packingResult_remainingProducts_button"]',
  remainingPrdctsTable: '//table[@id="remainingItems_table"]',
  cancelButton: '//button[@id="closeRemainingProductsModal_button"]',
  paginationSelector: '//ul[@id="packingResult_pagination"]',
  nbrOfRuns: '//span[@id="remainingRunsCount_span"]',
  newRunButton: '//button[@id="runDetail_newRun_button"]',
  resultsBtn: '[id*="rundDetails_results_link"]',
  count: '//span[text()="Count"]',
  UP: '//span[text()="Unloading Priority"]',
  volM3: "Volume (m3)",
  volPer: "Volume (%)",
  weightPer: "Weight (%)",
  width: '//span[text()="Width"]',
  height: '//span[text()="Height"]',
  length: '//span[text()="Length"]',
  diameter: '//span[text()="Diameter"]',
  weight: '//span[text()="Weight"]',
  crushingLimit: '//span[text()="Crushing limit"]',
  boxStckbltyToggle: '//input[@id="productDetails_stackable_checkbox_0"]',
  cylinderStckbltyToggle:
    '//input[contains(@id, "productDetails_stackable_checkbox")]',
  cylinderOnGroundToggle: '//input[@id="productDetails_floor_checkbox_0"]',
  shareLoadPlanBtn: '//button[@id="packingResult_shareLoadPlan_button"]',
  shareLoadPlanOption: '[id*="runDetails_shareLoadPlan_button"]',
  threeDCanvas: '//canvas[@data-engine="three.js r135"]',
  pageNotFound: '//p[text()="Page not found"]',
  unpackedProductsBtn: '[id*="runDetails_unpackedProducts_button"]',
};

const expectedProducts = {
  p1: {
    count: "5",
    UP: "2",
    volMm3: "0.01 m3",
    //volPer: "1.6%",
    weightPer: "0.33%",
    width: "200 (mm)",
    length: "200 (mm)",
    height: "200 (mm)",
    weight: "1 (kg)",
    crushingLimit: "-- (kg)",
  },
  p2: {
    count: "5",
    UP: "1",
    volMm3: "0.01 m3",
    //volPer: "1.2%",
    weightPer: "0.33%",
    diameter: "200 (mm)",
    height: "200 (mm)",
    weight: "1 (kg)",
    crushingLimit: "-- (kg)", // CL will be disabled for all orgs (ground pallets)
  },
};

export class Run extends BasePage {
  public name: string;
  public totalProducts: number;
  public totalItems: number;
  public filledVolume: string;
  public filledWeight: string;
  public totalWeight: string;
  public achievedHeight: string;
  public weightPercentage: string;
  public volumePercentage: string;
  public preview: PreveiwPage;
  public selectors: any;
  public sharedLink: string;
  public shareableLink: ShareableLink;
  public id: string;
  private readonly expectedProducts: any;
  private readonly testContext: BrowserTestContext;
  private readonly browser: Browser;
  private readonly runTimeout: number;

  constructor(page: Page) {
    super(page);
    this.selectors = selectors;
    this.testContext = Container.resolve(ContainerKeys.context);
    this.browser = Container.resolve(ContainerKeys.browser);
    this.name = `Run-${this.generateUniqueId()}`;
    this.runTimeout = this.timeout * 16; // 8 min
    this.id = "";
    this.totalProducts = 0;
    this.totalItems = 0;
    this.filledVolume = "";
    this.filledWeight = "";
    this.totalWeight = "";
    this.achievedHeight = "";
    this.weightPercentage = "";
    this.volumePercentage = "";
    this.preview = new PreveiwPage(page);
    this.shareableLink = new ShareableLink(page);
    this.sharedLink = this.shareableLink.link;
    this.expectedProducts = expectedProducts;
  }

  async setName(): Promise<void> {
    await this.fill(selectors.runNameInput, this.name);
  }

  async launch(): Promise<void> {
    await this.click(selectors.runButton);
  }
  async selectStrategy(runStrategy: string): Promise<void> {
    if (runStrategy.toLocaleLowerCase() === "instant") {
      await this.click(selectors.instantRun);
    }
  }

  async isCreated(): Promise<boolean> {
    const selector = `//span[text()="${this.name}"]`;
    try {
      await this.waitForSelectorToBe({ selector: selector });
      return true;
    } catch {
      return false;
    }
  }
  async getStatus(): Promise<string> {
    const selector = `//span[text()="${this.name}"]`;
    await this.waitForSelector(selector);
    const runName = await this.page.$(selector);
    const row = await runName!.$("xpath=ancestor::tr");
    const span = await row?.$("td:nth-child(8) span");
    const spanText = await span?.textContent();

    return spanText!;
  }

  async waitRunSuccess(): Promise<boolean> {
    const startTime = Date.now();
    let runStatus: string = await this.getStatus();
    while (
      Date.now() - startTime < this.runTimeout &&
      runStatus == "Processing"
    ) {
      runStatus = await this.getStatus();
    }

    return runStatus === "Success";
  }

  async find(): Promise<ElementHandle | null> {
    const selector = `//span[text()="${this.name}"]`;
    try {
      await this.page.waitForSelector(selector);
      const runNameElement = await this.page.$(selector);
      return runNameElement;
    } catch (error) {
      console.error(`Error finding run with selector "${selector}": ${error}`);
      return null;
    }
  }

  async goToResults(): Promise<void> {
    await this.page.waitForTimeout(5000);
    const targetRun = await this.find();
    if (targetRun) {
      const row = await targetRun.$("xpath=ancestor::tr");
      await row!.waitForSelector(selectors.resultsBtn, {
        timeout: this.timeout,
        state: "attached",
      });
      const resultsButton = await row?.$(selectors.resultsBtn);
      await resultsButton!.click();
    } else {
      console.log("run finding failed");
    }
  }

  async isResultsPage(): Promise<boolean> {
    const pattern = new RegExp(`^${this.webUrl}/(.*)/containers/1$`);

    await this.waitForPageLoading();
    const currentURL = await this.getCurrentURL();
    const match = currentURL.match(pattern);
    if (match) {
      return true;
    } else {
      return false;
    }
  }

  async generatePDF(): Promise<void> {
    await this.click(selectors.generatePdfButton);
  }

  async isPdfGenerated(): Promise<boolean> {
    return await this.waitForPdfGeneration();
  }

  async viewPDF(): Promise<void> {
    await this.click(selectors.viewPdfButton);
  }

  async findViewPDF(): Promise<ElementHandle> {
    const viewPdf = await this.page.$(selectors.viewPdfButton);
    return viewPdf!;
  }

  async waitForPdfGeneration(): Promise<boolean> {
    const startTime = Date.now();
    let viewPDF = await this.findViewPDF();
    while (Date.now() - startTime < this.timeout && !viewPDF) {
      viewPDF = await this.findViewPDF();
    }

    if (viewPDF) {
      return true;
    } else {
      return false;
    }
  }

  async isPdfOpened(): Promise<boolean> {
    const [newPage] = await Promise.all([this.page.waitForEvent("popup")]);

    const newPageUrl = newPage.url();
    await newPage.close();

    return newPageUrl.includes("Container-1.pdf");
  }

  async getTotalProducts(): Promise<number> {
    let totalProductsText: any;
    const totalProductsLocator = this.page.locator(selectors.totalProducts);
    totalProductsText = await totalProductsLocator.textContent();
    const totalProducts: number = parseInt(totalProductsText);

    return totalProducts;
  }

  async getTotalItems(): Promise<number> {
    let totalItemsText: any;
    const totalItemsLocator = this.page.locator(selectors.totalItems);
    totalItemsText = await totalItemsLocator.textContent();
    const totalItems: number = parseInt(totalItemsText);

    return totalItems;
  }

  async getFilledVolume(): Promise<string> {
    let filledVolumeText: any;
    const filledVolumeLocator = this.page.locator(selectors.filledVolume);
    filledVolumeText = await filledVolumeLocator.textContent();

    return filledVolumeText;
  }

  async getFilledWeight(): Promise<string> {
    let filledWeightText: any;
    const filledWeightLocator = this.page.locator(selectors.filledWeight);
    filledWeightText = await filledWeightLocator.textContent();

    return filledWeightText;
  }

  async getTotalWeight(): Promise<string> {
    let totalWeightText: any;
    const totalWeightLocator = this.page.locator(selectors.totalWeight);
    totalWeightText = await totalWeightLocator.textContent();
    return totalWeightText;
  }
  async getachievedHeight(): Promise<string> {
    let achievedHeightText: any;
    const achievedHeightLocator = this.page.locator(selectors.achievedHeight);
    achievedHeightText = await achievedHeightLocator.textContent();

    return achievedHeightText;
  }

  async getweightPercentage(): Promise<string> {
    let weightPercentageText: any;
    const weightPercentageLocator = this.page.locator(
      selectors.weightPercentage
    );
    weightPercentageText = await weightPercentageLocator.textContent();

    return weightPercentageText;
  }

  async getvolumePercentage(): Promise<string> {
    let volumePercentageText: any;
    const volumePercentageLocator = this.page.locator(
      selectors.volumePercentage
    );
    volumePercentageText = await volumePercentageLocator.textContent();
    return volumePercentageText;
  }

  async checkTotalProducts(): Promise<void> {
    this.totalProducts = await this.getTotalProducts();
  }
  async verifyTotalProducts(): Promise<void> {
    const expectedTotalProducts = 2;
    expect(this.totalProducts).toBe(expectedTotalProducts);
  }

  async checkTotalItems(): Promise<void> {
    this.totalItems = await this.getTotalItems();
  }
  async verifyTotalItems(): Promise<void> {
    const expectedTotalItems = 7;
    expect(this.totalItems).toEqual(expectedTotalItems);
  }

  async checkFilledVolume(): Promise<void> {
    this.filledVolume = await this.getFilledVolume();
  }
  async verifyFilledVolume(): Promise<void> {
    const expectedFilledVolume = "2.06m3";
    expect(this.filledVolume).toEqual(expectedFilledVolume);
  }

  async checkFilledWeight(): Promise<void> {
    this.filledWeight = await this.getFilledWeight();
  }
  async verifyFilledWeight(): Promise<void> {
    const expectedFilledWeight = "7 kg";
    expect(this.filledWeight).toEqual(expectedFilledWeight);
  }

  async checkTotalWeight(): Promise<void> {
    this.totalWeight = await this.getTotalWeight();
  }
  async verifyTotalWeight(): Promise<void> {
    const expectedTotalWeight = "32 kg";
    expect(this.totalWeight).toEqual(expectedTotalWeight);
  }

  async checkAchievedHeight(): Promise<void> {
    this.achievedHeight = await this.getachievedHeight();
  }
  async verifyAchievedHeight(): Promise<void> {
    const expectedAchievedHeight = "2145 mm";
    expect(this.achievedHeight).toEqual(expectedAchievedHeight);
  }

  async checkWeightPercentage(): Promise<void> {
    this.weightPercentage = await this.getweightPercentage();
  }
  async verifyWeightPercentage(): Promise<void> {
    const expectedWeightPercentage = "0.47 %";
    expect(this.weightPercentage).toEqual(expectedWeightPercentage);
  }

  async checkVolumePercentage(): Promise<void> {
    this.volumePercentage = await this.getvolumePercentage();
  }
  async verifyVolumePercentage(): Promise<void> {
    const expectedVolumePercentage = "83.54 %";
    expect(this.volumePercentage).toEqual(expectedVolumePercentage);
  }

  async clickOnVrtclEllipsis(): Promise<void> {
    const targetRun = await this.find();
    if (targetRun) {
      const row = await targetRun.$("xpath=ancestor::tr");
      const vrtclEllipsis = await row?.$(selectors.vrtclEllipsis);
      await vrtclEllipsis?.click();
    }
  }

  async clickOnDeleteOption(): Promise<void> {
    await this.click(selectors.deleteOption);
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.click(selectors.deleteButton);
  }

  async isDeleted(): Promise<boolean> {
    await this.page.waitForTimeout(5000);
    const selector = `//span[text()="${this.name}"]`;
    const runName = await this.page.$(selector);
    if (runName) {
      return false;
    }
    return true;
  }

  async clickOnTheRun(): Promise<void> {
    const selector = `//span[text()="${this.name}"]`;
    await this.click(selector);
  }

  async getPackingRslt(): Promise<string> {
    const targetRun = await this.find();
    let packing: any;
    try {
      const row = await targetRun?.$("xpath=ancestor::tr");
      const packingElmnt = await row?.$("td:nth-child(7) span");
      packing = await packingElmnt?.textContent();

      return packing;
    } catch (error) {
      console.error("Error while searching for Run: ", error);
      return "";
    }
  }

  async getTotalPackedItems(): Promise<number> {
    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(selectors.paginationSelector);
    const pagination = await this.page.$(selectors.paginationSelector);

    let totalPackedItems = 0;

    let pags = await pagination?.$$("li");
    let totalItemsOfThis = await this.getTotalItems();
    totalPackedItems += totalItemsOfThis;
    if (pags?.length == 3) {
      return totalPackedItems;
    } else {
      for (let i = 1; i <= pags!.length - 3; i++) {
        const nextButton = await pagination!.$("li:last-child");
        await nextButton!.click();
        await this.page.waitForTimeout(3000);
        const totalItemsOfThis = await this.getTotalItems();
        totalPackedItems += totalItemsOfThis;
      }
    }

    return totalPackedItems;
  }

  async clickOnRemainingPrdcts(): Promise<void> {
    await this.click(selectors.remainingPrdctsButton);
  }

  async getTotalUnpackedItems(): Promise<number> {
    await this.page.waitForSelector(selectors.remainingPrdctsTable);
    const table = await this.page.$(selectors.remainingPrdctsTable);
    const tbody = await table?.$("tbody");
    if (!tbody) {
      console.error("Remaining products table not found");
      throw error;
    }
    const rows = await tbody.$$("tr");
    let totalUnpackedItems = 0;
    for (const row of rows) {
      let quantityElmnt = await row.$("td:nth-child(2) div");
      let quantityTxt: any;
      quantityTxt = await quantityElmnt?.textContent();
      totalUnpackedItems += parseInt(quantityTxt);
    }

    return totalUnpackedItems;
  }

  async closeRemainingProductsModal(): Promise<void> {
    await this.click(selectors.cancelButton);
  }

  async getNumberOfRuns(): Promise<number> {
    let nbrOfRunsText: any;
    const nbrOfRunsLocator = this.page.locator(selectors.nbrOfRuns);
    nbrOfRunsText = await nbrOfRunsLocator.textContent();
    const nbrOfRuns: number = parseInt(nbrOfRunsText);

    return nbrOfRuns;
  }

  async clickOnNewRun(): Promise<void> {
    await this.click(selectors.newRunButton);
  }

  async expandProductDetails(index: number): Promise<void> {
    const expandBtn = `(//button[@type="button"])[${index}]`;
    await this.click(expandBtn);
  }

  async checkBoxDetails(
    expectedProducts: any = this.expectedProducts
  ): Promise<void> {
    await this.page.waitForTimeout(2000);
    const nameSelector = '//span[text()="box"]';
    await this.page.waitForSelector(nameSelector);
    const keys = Object.keys(expectedProducts.p1);
    let table = [
      selectors.count,
      selectors.UP,
      selectors.volM3,
      selectors.weightPer,
      selectors.width,
      selectors.length,
      selectors.height,
      selectors.weight,
      selectors.crushingLimit,
    ]; // removed selectors.volPer until volume accuracy issue is fixed
    let i = 0;
    for (let element of table) {
      let withOddSpan = [
        selectors.volM3,
        selectors.volPer,
        selectors.weightPer,
      ];
      let selector: string;
      if (!withOddSpan.includes(element)) {
        selector = element;
      } else {
        selector = `//span[contains(., "${element}")]`;
      }
      const text = await this.page.$(selector);
      const div = await text?.$("..");
      const value = await div?.$("span:nth-child(2)");
      //await this.waitForTimeout(200000)
      expect(await value?.innerText()).toBe(
        expectedProducts.p1[keys[i] as keyof typeof expectedProducts.p1]
      );
      i++;
    }

    // check rotations
    const divList = await this.page.$$('//div[@elevation="1"]');
    for (let i = 0; i < divList.length - 1; i++) {
      expect(divList.length).toEqual(6);
      if ([0, 1, 2].includes(i)) {
        const isActive = await divList[i].getAttribute("data-active");
        expect(isActive).toBe("false");
      } else {
        const isActive = await divList[i]?.getAttribute("data-active");
        expect(isActive).toBe("true");
      }
    }

    // check if stackable
    const stackableInput = await this.page.$(selectors.boxStckbltyToggle);
    const isChecked = await stackableInput?.isChecked();
    expect(isChecked).toBeTruthy();
  }

  async checkCylinderDetails(): Promise<void> {
    await this.page.waitForTimeout(2000);
    const nameSelector = '//span[text()="cylinder"]';
    await this.page.waitForSelector(nameSelector);
    const keys = Object.keys(expectedProducts.p2);
    let table = [
      selectors.count,
      selectors.UP,
      selectors.volM3,
      selectors.weightPer,
      selectors.diameter,
      selectors.height,
      selectors.weight,
      selectors.crushingLimit,
    ]; // removed selectors.volPer until volume accuracy issue is fixed
    let i = 0;
    for (let element of table) {
      let withOddSpan = [
        selectors.volM3,
        selectors.volPer,
        selectors.weightPer,
      ];
      let selector: string;
      if (!withOddSpan.includes(element)) {
        if (element == selectors.diameter) {
          selector = element;
        } else {
          selector = `(${element})[2]`;
        }
      } else {
        selector = `(//span[contains(., "${element}")])[2]`;
      }

      const text = await this.page.$(selector);
      const div = await text?.$("..");
      const value = await div?.$("span:nth-child(2)");

      expect(await value?.innerText()).toBe(
        expectedProducts.p2[keys[i] as keyof typeof expectedProducts.p2]
      );
      i++;
    }

    //check rotations
    const divList = await this.page.$$('//div[@elevation="1"]');
    const isActive = await divList[6]?.getAttribute("data-active");
    expect(isActive).toBe("true");

    // check if stackable
    const stackableInput = await this.page.$(selectors.cylinderStckbltyToggle);
    const isChecked = await stackableInput?.isChecked();
    expect(isChecked).toBeFalsy();

    // check if must be on floor

    const onGroundInput = await this.page.$(selectors.cylinderOnGroundToggle);
    const isGroundInputChecked = await onGroundInput?.isChecked();
    expect(isGroundInputChecked).toBeTruthy();
  }

  async clickOnShareLoadPlanButton(): Promise<void> {
    await this.click(selectors.shareLoadPlanBtn);
  }

  async clickOnShareLoadPlanOption(): Promise<void> {
    await this.click(selectors.shareLoadPlanOption);
  }

  async checkNotification(message: string): Promise<void> {
    const notifSelector = `//p[text()="${message}"]`;
    await this.page.waitForSelector(notifSelector, { state: "visible" });
  }

  async checkSharedLoadPlanAccess(status: string = ""): Promise<string> {
    // Grant clipboard permissions to browser context
    //await context.grantPermissions(["clipboard-read"]);

    if (status == "") {
      // Read URL from clipboard
      this.shareableLink.link = await this.page.evaluate(() =>
        navigator.clipboard.readText()
      );
    }
    const newTab = await this.testContext.newPage(this.browser);
    // Navigate to the URL
    await newTab.goto(this.shareableLink.link);

    if (status == "active" || "") {
      await newTab.waitForSelector(selectors.threeDCanvas, {
        state: "visible",
      });
    } else if (status == "revoked") {
      await newTab.waitForSelector(selectors.pageNotFound, {
        state: "visible",
      });
    }

    await newTab.close();

    return this.shareableLink.link;
  }

  async isShareLoadPlanBtnDisabled(): Promise<boolean> {
    const shareLoadPlanBtn = this.page.locator(selectors.shareLoadPlanBtn);
    return await shareLoadPlanBtn.isDisabled();
  }

  async isShareLoadPlanOptionDisabled(): Promise<boolean> {
    const shareLoadPlanOption = this.page.locator(
      selectors.shareLoadPlanOption
    );
    return await shareLoadPlanOption.isDisabled();
  }

  async shareLoadPlanViaApi(loadId: string, runId: string): Promise<void> {
    await this.shareableLink.generateViaApi(loadId, runId);
  }

  async revokeShareableLink(): Promise<void> {
    await this.shareableLink.revokeViaApi();
  }
  async getProductShape(
    productName: string,
    productId: string
  ): Promise<string> {
    const subId = `resultPage_itemName_${productName}_`;
    let shape = productId.substring(subId.length);

    return shape; //box shape
  }
  async getProductNameId(name: string): Promise<string> {
    const selector = `//span[text()="${name}"]`;
    let productNameLocator = await this.locator(selector);
    let id = await productNameLocator.getAttribute("id");

    return id ?? "";
  }

  async getProductName(index: number): Promise<string> {
    const expandBtn = `(//button[@type="button"])[${index}]`;
    let buttonLocator = await this.locator(expandBtn);
    let divJsHandle = await buttonLocator.evaluateHandle(
      (el) => el.previousElementSibling
    );
    let spanJsHandle = await divJsHandle.evaluateHandle((el) => el?.firstChild);
    let spanElmntHandle = spanJsHandle.asElement();

    return (await spanElmntHandle?.innerText()) ?? "";
  }

  async getCount(index: number): Promise<string> {
    let selector = `(//span[text()="Count"])[${index}]`;
    let countLabel = await this.locator(selector);
    let jsHandleElmnt = await countLabel.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();

    return (await spanElmnt?.innerText()) ?? "";
  }

  async getUnloadingPriority(index: number): Promise<string> {
    let selector = `(//span[text()="Unloading Priority"])[${index}]`;
    let unloadingPLabel = await this.locator(selector);
    let jsHandleElmnt = await unloadingPLabel.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();
    return (await spanElmnt?.innerText()) ?? "";
  }

  async getVolM3(index: number): Promise<string> {
    let selector = `(//span[text()='Volume ('])[${index}]`;
    let volM3Label = await this.locator(selector);
    let jsHandleElmnt = await volM3Label.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();
    return (await spanElmnt?.innerText()) ?? "";
  }

  async getVolPercentage(index: number): Promise<string> {
    let selector = `(//span[text()="Volume (%)"])[${index}]`;
    let volPerLabel = await this.locator(selector);
    let jsHandleElmnt = await volPerLabel.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();
    return (await spanElmnt?.innerText()) ?? "";
  }

  async getWeightPercentage(index: number): Promise<string> {
    let selector = `(//span[text()="Weight (%)"])[${index}]`;
    let weightPerLabel = await this.locator(selector);
    let jsHandleElmnt = await weightPerLabel.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();
    return (await spanElmnt?.innerText()) ?? "";
  }

  async getDiameter(index: number): Promise<string> {
    let selector = '//span[text()="Diameter"]';
    let diameterLabel = await this.locator(selector);
    let jsHandleElmnt = await diameterLabel.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();
    return (await spanElmnt?.innerText()) ?? "";
  }

  async getLength(index: number): Promise<string> {
    let selector = `(//span[text()="Length"])[${index}]`;
    let lengthLabel = await this.locator(selector);
    let jsHandleElmnt = await lengthLabel.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();
    return (await spanElmnt?.innerText()) ?? "";
  }

  async getWidth(index: number): Promise<string> {
    let selector = `(//span[text()="Width"])[${index}]`;
    let widthLabel = await this.locator(selector);
    let jsHandleElmnt = await widthLabel.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();
    return (await spanElmnt?.innerText()) ?? "";
  }

  async getHeight(index: number): Promise<string> {
    let selector = `(//span[text()="Height"])[${index}]`;
    let heightLabel = await this.locator(selector);
    let jsHandleElmnt = await heightLabel.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();
    return (await spanElmnt?.innerText()) ?? "";
  }

  async getWeight(index: number): Promise<string> {
    let selector = `(//span[text()="Weight"])[${index}]`;
    let weightLabel = await this.locator(selector);
    let jsHandleElmnt = await weightLabel.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let spanElmnt = jsHandleElmnt.asElement();
    return (await spanElmnt?.innerText()) ?? "";
  }

  async getCrushingLimit(index: number): Promise<string> {
    let selector = `(//span[text()="Crushing Limit"])[${index}]`;
    let crushingLimitElmnt = await this.page.$(selector);
    if (crushingLimitElmnt) {
      let crushingLimitLocator = await this.locator(selector);
      let jsHandleElmnt = await crushingLimitLocator.evaluateHandle(
        (el) => el.nextElementSibling
      );
      let spanElmnt = jsHandleElmnt.asElement();

      return (await spanElmnt?.innerText()) ?? "";
    }

    return "";
  }

  async getStackinOnTop(index: number): Promise<string> {
    let selector = `(//span[text()="Stackable item"])[${index}]`;
    let stackableLocator = await this.locator(selector);
    let nextSibling = await stackableLocator.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let child = await nextSibling.evaluateHandle((el) => el?.firstChild);
    let inputElmnt = child.asElement();
    let isStackable = "0";
    if (await inputElmnt?.isChecked()) {
      isStackable = "1";
    }

    return isStackable;
  }

  async getStackinOnGround(index: number): Promise<string> {
    let selector = `(//span[text()="Must be placed on the floor"])[${index}]`;
    let onGroundLocator = await this.locator(selector);
    let nextSibling = await onGroundLocator.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let child = await nextSibling.evaluateHandle((el) => el?.firstChild);
    let inputElmnt = child.asElement();

    let isOnGround = "0";
    if (await inputElmnt?.isChecked()) {
      isOnGround = "1";
    }

    return isOnGround;
  }

  async getMustGo(index: number): Promise<string> {
    let selector = `(//span[text()="Must Go"])[${index}]`;
    let mustGoLocator = await this.locator(selector);
    let nextSibling = await mustGoLocator.evaluateHandle(
      (el) => el.nextElementSibling
    );
    let child = await nextSibling.evaluateHandle((el) => el?.firstChild);
    let inputElmnt = child.asElement();

    let isMustGo = "0";
    if (await inputElmnt?.isChecked()) {
      isMustGo = "1";
    }

    return isMustGo;
  }

  async getRotation(productName: string, shape: string): Promise<string> {
    const selector = `//div[@id="resultPage_itemDetails_div_${productName}"]`;
    let productDetailsLocator = await this.locator(selector);
    let fifthChildLocator = productDetailsLocator.locator("xpath=./*").nth(4);
    let rotationsDivHandles = await fifthChildLocator
      .locator("div")
      .elementHandles();
    let rotationValue = 0;
    if (shape == "box") {
      let i = 0;
      for (let div of rotationsDivHandles) {
        i++;
        let dataActive = await div.getAttribute("data-active");

        if (dataActive) {
          rotationValue += Math.pow(2, rotationsDivHandles.length - i);
        }
      }
    } else if (shape == "cylinder") {
      let i = 0;
      for (let div of rotationsDivHandles) {
        i++;
        let dataActive = await div.getAttribute("data-active");

        if (dataActive) {
          rotationValue += 32;
        }
      }
    }

    return rotationValue.toString();
  }

  async getProductDetails(
    productName: string,
    index: number,
    shape: string
  ): Promise<any> {
    let actualProduct = {
      count: "",
      volM3: "",
      volPer: "",
      weightPer: "",
      width: "",
      diameter: "",
      length: "",
      height: "",
      weight: "",
      crushingLimit: "",
      stackingOnTop: "",
      stackingGround: "",
      mustGo: "",
      rotation: "",
    };

    actualProduct.count = await this.getCount(index);
    actualProduct.volM3 = await this.getVolM3(index);
    actualProduct.volPer = await this.getVolPercentage(index);
    actualProduct.weightPer = await this.getWeightPercentage(index);
    actualProduct.height = await this.getHeight(index);
    actualProduct.weight = await this.getWeight(index);
    actualProduct.crushingLimit = await this.getCrushingLimit(index);
    actualProduct.stackingOnTop = await this.getStackinOnTop(index);
    actualProduct.stackingGround = await this.getStackinOnGround(index);
    actualProduct.mustGo = await this.getMustGo(index);
    actualProduct.rotation = await this.getRotation(productName, shape);
    if (shape == "box") {
      actualProduct.diameter = "";
      actualProduct.length = await this.getLength(index);
      actualProduct.width = await this.getWidth(index);
    } else if (shape == "cylinder") {
      actualProduct.diameter = await this.getDiameter(index);
      actualProduct.length = "";
      actualProduct.width = "";
    }

    return actualProduct;
  }

  async checkPackedProducts(indexes: string, filePath: string): Promise<void> {
    const indexesList: number[] = indexes
      .split(",")
      .map((index) => parseInt(index.trim()));
    let actualProduct = {
      count: "",
      UP: "",
      volM3: "",
      volPer: "",
      weightPer: "",
      width: "",
      diameter: "",
      length: "",
      height: "",
      weight: "",
      crushingLimit: "",
      stackingOnTop: "",
      stackingGround: "",
      mustGo: "",
      rotation: "",
    };

    // get expected packed product details from csv file maybe

    const csvData = fs.readFileSync(filePath, "utf8");
    const parsedData = Papa.parse(csvData, { header: true });
    let expectedProductsList = parsedData.data.map((item: any) => {
      return {
        count: item.Quantity,
        volM3: item.Volume_M3,
        volPer: item.Volume_Percentage,
        weightPer: item.Weight_Percentage,
        width: item.Width,
        diameter: item.Diameter,
        length: item.Length,
        height: item.Height,
        weight: item.Weight,
        crushingLimit: item.Crushing_limit,
        stackingOnTop: item.Stacking_on_top,
        mustGo: item.Must_Go,
        rotation: item.Rotation,
      };
    });

    for (let index of indexesList) {
      // expand product details
      await this.expandProductDetails(index);
      let productName = await this.getProductName(index);
      let productId = await this.getProductNameId(productName);
      // check product shape

      let shape = await this.getProductShape(productName, productId);

      actualProduct = await this.getProductDetails(productName, index, shape);
      expect(actualProduct).toEqual(expectedProductsList[index - 1]);

      // collapse product details
      await this.expandProductDetails(index);
    }
  }

  async getRemainingProductsDetails(): Promise<any[]> {
    let remainingPrdctsList: any[] = [];
    let productInfo: any[] = [];
    const tableLocator = await this.locator(selectors.remainingPrdctsTable);
    await tableLocator.waitFor({ state: "visible" });
    const tBodyLocator = tableLocator.locator("tbody");
    let rows = await tBodyLocator.locator("tr").all();
    for (let row of rows) {
      let cells = await row.locator("td").all();
      for (let cell of cells) {
        let childJsHandle = await cell.evaluateHandle(
          (el) => el.firstElementChild
        );
        let child = childJsHandle.asElement();
        productInfo.push(await child?.innerText());
      }

      let actualProduct = {
        name: productInfo[0],
        count: productInfo[1],
        status: productInfo[2],
        reason: productInfo[3],
      };

      remainingPrdctsList.push(actualProduct);
      productInfo.length = 0;
    }

    return remainingPrdctsList;
  }

  async checkRemainingProducts(filePath: string): Promise<void> {
    // get expected remaining product details from csv file

    const csvData = fs.readFileSync(filePath, "utf8");
    const parsedData = Papa.parse(csvData, { header: true });
    let expectedProductsList = parsedData.data.map((item: any) => {
      return {
        name: item.Product_Name,
        count: item.Quantity,
        status: item.Status,
        reason: item.Reason,
      };
    });

    // get remaining products list
    const actualRemainingList = await this.getRemainingProductsDetails();

    expect(actualRemainingList).toStrictEqual(expectedProductsList);
  }

  async clickOnUnpackedProducts(): Promise<void> {
    const buttonLocator = await this.locator(selectors.unpackedProductsBtn);
    await buttonLocator.click();
  }

  async resultsButtonShouldBeHidden(): Promise<void> {
    await this.waitForSelectorToBe({
      selector: selectors.resultsBtn,
      status: this.elementStates.hidden,
    });
  }
}
