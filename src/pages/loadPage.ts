import { ElementHandle, expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Product } from "./components/product";
import { Shipment } from "./components/shipment";
import { Run } from "./components/run";
import { ProductInt } from "./components/interface";
import * as fs from "fs";
import { ContainerPage } from "./components/containerPage";
import axios from "axios";
import * as Papa from "papaparse";

const selectors = {
  loadNameInput: '//input[@placeholder="Enter Load Name"]',
  createLoadButton: '(//button[@id="dashboard_createLoad_button"])[1]',
  addShipmentButton: '//button[@id="createLoad_addShipment_button "]',
  shipmentNameInput: '//input[@name="shipments.0.shipmentName"]',
  saveLoadButton: '//button[@id="createLoad_saveLoad_button"]',
  saveLoadBtnCopyPage: '//button[@id="copyLoad_saveLoad_button"]',
  saveAndRunButton: '//button[@id="createLoad_saveAndRunLoad_button"]',
  uploadFileInput: '//input[@id="file-upload"]',
  deleteSelectionButton: '//button[@id="dashboard_deleteSelection_button"]',
  deleteButton: '//button[@id="confirm_button"]',
  volMiniLoadPlanning: '//div[text()="Container Volume Minimization"]',
  shipMaxiLoadPlanning: '//div[text()="Shipment Maximization"]',
  seaContainerCategory: '//button[@id="newRun_filterBox_button_0"]',
  boxCategory: '//button[@id="newRun_filterBox_button_1"]',
  uldCategory: '//button[@id="newRun_filterBox_button_0"]',
  airPalletCategory: '//button[@id="newRun_filterBox_button_1"]',
  groundPalletCategory: '//button[@id="newRun_filterBox_button_2"]',
  secondGroundPallet: '(//button[@id="newRun_filterBox_button_4"])[2]',
  navTabsDropDown: '//button[@id="navTabs_navTabsDropdown_button"]',
  nextButoon: '//button[@data-testid="carousel-next-button"]',
  loadsNavTab: '//a[@id="Loads-nav"]',
  sideBarTrigger: '//button[@id="sidebar_trigger_button"]',
  deleteOption: '[id*="dashboard_deleteLoad_button"]',
  confirmDeleteButton: '//button[@id="confirm_button"]',
  allLoadsTab: '//button[@id="dashboard_navTaball_button"]',
  downloadCsvOption: '[id*="dashboard_downloadCsv_button"]',
  generalVrtclEllipsis: '//button[@id="runDetail_loadMenu_button"]',
  downloadCsvOptionRunPage: '//div[@id="runDetail_downloadCsv_button"]',
  lockIcon: 'button[id*="dashboard_status_button"]',
  confirmButton: '//button[@id="dashboard_shareLoad_button"]',
  sharedLoadsTab: '//button[@id="dashboard_navTabshared_button"]',
  lockIconRunPage: '//button[@id="runsDetails_shareLoad_button"]',
  InfoButton: "//*[contains(@id, 'dashboard_loadInfo_button')]",
  expandButton: '[id="loadInfo_expand_button"]',
  prdctsTable: '//table[@id="loadInfo_data_table"]',
  closeInfoModalBtn: '//button[@id="closeLoadInfoModal_button"]',
  loadInfoButton: '//div[@id="runDetail_loadInfo_button"]',
  loadInfoBtnResults: '//button[@id="packingResult_loadInfo_button"]',
  copyOption: "//*[contains(@id, 'dashboard_copyLoad_button')]",
  editOption: "//*[contains(@id, 'dashboard_editLoad_button')]",
  updateLoadButton: '//button[@id="updateLoad_update_button"]',
  loadPlanDropdown: '//div[@id="newRun_selectLoadPlanning_select"]',
  containerVolMiniOption: '//span[text()="Container Volume Minimization"]',
  shipmentMaxOption: '//span[text()="Shipment Maximization"]',
  checkAllBox: '(//input[@title="Toggle All Rows Selected"])[1]',
  checkBox: '//input[@type="checkbox"]',
  dashboardTable: '//table[@id="dashboard_table"]',
  dashboardTableTbody: '//table[@id="dashboard_table"]//tbody',
  proceedButton: '//button[@id="newRun_proceedInvalidProd_button"]',
  invalidProductsModal: '//div[@class="modal-content"]',
  saveAndCloseBtn: '//button[@id="productModal_saveAndClose_button"]',
  unloadingPriorityToggle:
    '(//span[text()="Unloading priority"]/following::input)[1]',
  upInput: '//input[@name="shipments.0.items.0.unloadingPriority"]',
  invalidShipmentMessage: '//div[@id="invalid_products_message"]',
  trasprtModeDropDown: '//div[@id="create_load_transportation_mode_select"]',
  seaMode: '//div[contains(@id, "option-0")]',
  airMode: '//div[contains(@id, "option-1")]',
  vrtclEllispsisBtn: 'button[id*="dashboard_loadMenu_button"]',
  productsQuantityInput: '//input[@id="createLoad_productsQuantity_input_0"]',
  loadsPagination: '//ul[@id="dashboard_pagination"]',
  wingedContourInput: 'input[id*="newRun_selectContainer_winged_contour"]',
  createLoadShipmentsTable: "#createLoad_shipments_table",
  ldpVariant: '//h3[text()="PMC LD P"]',
  ldpFVariant: '//h3[text()="PMC LD P-F"]',
  ldpMAXVariant: '//h3[text()="PMC LD P-MAX"]',
  searchLoadIcon: 'svg[data-test="search_icon"]',
  searchLoadInput: '//input[@data-test="search_input"]',
  loadInfoStackCheckbox: 'input[id*="loadInfo_stackable_checkbox"]',
};

export class LoadPage extends BasePage {
  public loadName: string;
  public shipment: Shipment;
  public product: Product;
  public run: Run;
  public container: ContainerPage;
  public toBeCleanedUp: boolean;
  public id: string = "";
  public isBot: boolean;
  public isCopied: boolean;
  public selectors: any;
  public transportationMode: number;
  private readonly loadSelector: string;

  public readonly loadsEndpoint = "/api/v1/loads";

  public runEndpoints = {
    create: `/api/v1/loads/${this.id}/runs`,
  };

  constructor(page: Page) {
    super(page);
    this.loadName = `Load-${this.generateUniqueId()}`;
    this.shipment = new Shipment(page);
    this.product = new Product(page);
    this.run = new Run(page);
    this.container = new ContainerPage(page);
    this.toBeCleanedUp = false;
    this.id = "";
    this.isBot = false;
    this.isCopied = false;
    this.selectors = selectors;
    this.transportationMode = 1; // Sea&Land mode
    this.loadSelector = `//span[text()="${this.loadName}"]`;
  }

  async clickOnCreateLoad(): Promise<void> {
    await this.page.locator(selectors.createLoadButton).first().click();
  }

  async clickOnAddShipment(): Promise<void> {
    await this.shipment.clickOnAddShipment();
  }

  async setLoadName(name: string = this.loadName): Promise<void> {
    await this.fill(selectors.loadNameInput, name);
  }

  async setShipmentName(): Promise<void> {
    await this.shipment.setShipmentName();
  }

  async clickOnAddProduct(): Promise<void> {
    await this.product.addToShipment();
  }

  async addProduct(
    shape: string,
    height: number,
    diameter: number,
    length: number,
    crushingLimit: number,
    width: number,
    weight: number,
    quantity: number
  ): Promise<void> {
    await this.product.fillRow(
      shape,
      height,
      diameter,
      length,
      crushingLimit,
      width,
      weight,
      quantity
    );
  }

  async saveProduct(): Promise<void> {
    await this.product.clickOnSaveProduct();
  }

  async closeAddProductModal(): Promise<void> {
    await this.product.clickOnCancelButton();
  }

  async saveLoad(): Promise<void> {
    await this.click(selectors.saveLoadButton);
  }

  async clickOnSaveAndRun(): Promise<void> {
    await this.click(selectors.saveAndRunButton);
    await this.waitForPageLoading();
  }

  async clickOnLoads(): Promise<void> {
    await this.click(selectors.loadsNavTab);
  }

  async uploadCsvFile(filePath: string): Promise<void> {
    const fileInput = await this.locator(selectors.uploadFileInput);
    await fileInput.setInputFiles(filePath);
    await this.waitForSelectorToBe({
      selector: selectors.createLoadShipmentsTable,
    });
  }

  async isLoadSaved(name: string = this.loadName): Promise<boolean> {
    const selector = `//span[text()="${name}"]`;

    try {
      await this.page.waitForSelector(selector);
      return true;
    } catch (error) {
      return false;
    }
  }

  async find(namePart: string = ""): Promise<ElementHandle | null> {
    const selector = `//span[text()="${namePart}${this.loadName}"]`;
    try {
      await this.page.waitForSelector(selector);
      const loadNameSpan = await this.page.$(selector);
      return loadNameSpan;
    } catch (error) {
      console.error(`Error finding load with selector "${selector}": ${error}`);
      return null;
    }
  }

  async delete(namePart: string = ""): Promise<void> {
    const targetLoad = await this.find(namePart);

    try {
      const row = await targetLoad!.$("xpath=ancestor::tr");
      const checkBox = await row?.$("td:nth-child(1)");
      await checkBox?.click();
      await this.page.locator(selectors.deleteSelectionButton).click();
      await this.page.locator(selectors.deleteButton).click();
    } catch (error) {
      console.error("Error finding load to delete", error);
    }
  }

  async isContaineVolumeMinimizationSelected(): Promise<boolean> {
    try {
      this.page.locator(selectors.volMiniLoadPlanning);
      return true;
    } catch (exception) {
      return false;
    }
  }

  async isShipmentMaxSelected(): Promise<boolean> {
    try {
      this.page.locator(selectors.shipMaxiLoadPlanning);
      return true;
    } catch (exception) {
      return false;
    }
  }

  async selectShipmentMaximization(): Promise<void> {
    await this.click(selectors.loadPlanDropdown);
    await this.page.waitForTimeout(1000);
    await this.click(selectors.shipmentMaxOption);
  }

  async selectContainerVolMini(): Promise<void> {
    await this.waitForSelector(selectors.loadPlanDropdown);
    const dropDown = await this.locator(selectors.loadPlanDropdown);
    await dropDown.click();
    await this.page.waitForTimeout(1000);
    const volMiniOption = await this.locator(selectors.containerVolMiniOption);
    await volMiniOption.click();
  }

  async selectContainerCategory(containerType: string): Promise<void> {
    await this.page.waitForTimeout(1000);
    switch (containerType.toLowerCase()) {
      case "sea containers":
        await this.page.locator(selectors.seaContainerCategory).click();
        break;

      case "boxes":
        await this.page.locator(selectors.boxCategory).click();
        break;

      case "uld container":
        await this.page.locator(selectors.uldCategory).click();
        break;

      case "air pallet":
        await this.click(selectors.airPalletCategory);
        break;

      case "ground pallet":
        await this.click(selectors.groundPalletCategory);
        break;
    }
  }

  async selectContainerType(containerNames: string): Promise<void> {
    const containerNameList: string[] = containerNames
      .split(",")
      .map((name) => name.trim());
    if (containerNameList.length === 1 && containerNameList[0] == "") {
      containerNameList[0] = this.container.name;
    }

    for (const container of containerNameList) {
      const selector = `//span[text()="${container}"]`;
      await this.waitForSelector(selector);
      const containerNameLocator = this.page.locator(selector);

      if (containerNameLocator) {
        const row = containerNameLocator.locator("xpath=ancestor::tr");
        const tdElement = row.locator("td:nth-child(1)");
        const checkBox = tdElement.locator('div input[type="checkbox"]');
        await checkBox.waitFor();
        await checkBox.click();
        //check checkbox state
        const isChecked = await checkBox.isChecked();
        expect(isChecked).toBeTruthy();
      }
    }
  }

  async checkForDisabledCategories(selectedCategory: string): Promise<boolean> {
    let categoriesSelectors = [
      selectors.seaContainerCategory,
      selectors.boxCategory,
      selectors.uldCategory,
      selectors.airPalletCategory,
      selectors.groundPalletCategory,
    ];

    switch (selectedCategory.toLowerCase()) {
      case "sea containers":
        categoriesSelectors.splice(0, 1);
        return await this.areDisabled(categoriesSelectors);

      case "boxes":
        categoriesSelectors.splice(1, 1);
        return await this.areDisabled(categoriesSelectors);

      case "uld container": {
        categoriesSelectors.splice(2, 2);
        const airPalletTab = await this.locator(selectors.airPalletCategory);
        const isDisabled = await airPalletTab.isDisabled();
        expect(isDisabled).toBeFalsy();
        return true;
      }

      case "air pallet": {
        categoriesSelectors.splice(2, 2);
        const uldTab = await this.locator(selectors.uldCategory);
        const isUldDisabled = await uldTab.isDisabled();
        expect(isUldDisabled).toBeFalsy();
        return true;
      }
      case "ground pallet":
        categoriesSelectors.splice(4, 1);
        return await this.areDisabled(categoriesSelectors);

      default:
        console.warn(
          "Container Category was not found, check for spelling mistakes"
        );
        return false;
    }
  }

  async areDisabled(selectors: string[]): Promise<boolean> {
    try {
      for (let selector of selectors) {
        const cntnrCategory = await this.locator(selector);
        const isDisabled = cntnrCategory.isDisabled();
        expect(isDisabled).toBeTruthy();
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async selectContainerCount(containerCount: string): Promise<void> {
    await this.page.waitForTimeout(2000);
    const containerCountList: number[] = containerCount.split(",").map(Number);

    let k = 0;
    for (const count of containerCountList) {
      await this.locator("(//span[text()='1'])[1]");
      for (let i = 1; i < count; i++) {
        const incrementButtonSelector = `(//button[@id="newRun_incrementCounter_button_${k}"])`;
        await this.click(incrementButtonSelector);
        // check counter value
        await this.locator(`(//span[text()='${count}'])[1]`);
      }

      k++;
    }
  }

  async setWingedContours(wingedFlags: string): Promise<void> {
    if (wingedFlags == "") return;
    const wingedFlagsList: string[] = wingedFlags
      .split(",")
      .map((flag) => flag.trim());
    await (await this.locator(selectors.wingedContourInput)).first().waitFor();
    const wingedContoursLocators = await (
      await this.locator(selectors.wingedContourInput)
    ).all();
    let k = 0;
    for (const flag of wingedFlagsList) {
      // check winged contour status by default
      await wingedContoursLocators[k].waitFor();
      expect(await wingedContoursLocators[k].isChecked()).toBeFalsy();
      const isTrue = flag.toLowerCase() == "true";
      if (isTrue) {
        const inputLocator = await this.locator(
          `//input[@id="${await wingedContoursLocators[k].getAttribute("id")}"]`
        );
        await inputLocator.waitFor();
        const parentLocator = inputLocator.locator("..");
        await parentLocator.waitFor();
        await parentLocator.click();
        expect(await inputLocator.isChecked()).toBeTruthy();
      }

      k++;
    }
  }

  async clickOnNextButton(): Promise<void> {
    await this.click(selectors.nextButoon);
  }

  async clickOnRunButton(): Promise<void> {
    await this.run.launch();
  }

  async setRunName(): Promise<void> {
    await this.run.setName();
  }

  async selectRunStrategy(strategy: string): Promise<void> {
    await this.run.selectStrategy(strategy);
  }

  async checkRunCreation(): Promise<boolean> {
    await this.waitForPageLoading();
    const iscreated = await this.run.isCreated();
    return iscreated;
  }

  async checkRunSuccess(): Promise<boolean> {
    const isSuccess = await this.run.waitRunSuccess();

    return isSuccess;
  }

  async checkForNavTabs(): Promise<ElementHandle | undefined> {
    let navTabs: any;
    try {
      navTabs = await this.waitForSelectorToBe({
        selector: selectors.navTabsDropDown,
      });
      return navTabs;
    } catch (error) {
      console.log(`locating navigation tab failed due to ${error}`);
      throw new Error(`locating navigation tab due to ${error}`);
    }
  }

  async clickOnResultsButton(): Promise<void> {
    await this.run.goToResults();
    await this.waitForPageLoading();
  }

  async checkForResultsRedirection(): Promise<boolean> {
    return await this.run.isResultsPage();
  }

  async clickOnGeneratePDF(): Promise<void> {
    await this.run.generatePDF();
  }

  async checkForPDFGeneration(): Promise<boolean> {
    const isGenerated = await this.run.isPdfGenerated();
    return isGenerated;
  }

  async clickOnViewPdf(): Promise<void> {
    await this.run.viewPDF();
  }

  async checkForPdfOpenning(): Promise<boolean> {
    return await this.run.isPdfOpened();
  }

  async clickOnVerticallEllipsis(): Promise<void> {
    const targetLoad = await this.find();

    const row = await targetLoad!.$("xpath=ancestor::tr");
    const vrtclEllipsis = await row?.$(selectors.vrtclEllispsisBtn);
    await vrtclEllipsis?.click();
  }

  async clickOnDeleteOption(): Promise<void> {
    await this.click(selectors.deleteOption);
  }

  async clickOnDelete(): Promise<void> {
    const btnLocator = await this.locator(selectors.confirmDeleteButton);
    await btnLocator.click();
    await btnLocator.waitFor({ state: "hidden" });
  }

  async isDeleted(): Promise<boolean> {
    await this.page.waitForTimeout(1000);
    const selector = `//span[text()="${this.loadName}"]`;
    const loadNameSpan = await this.page.$(selector);
    if (loadNameSpan) {
      return false;
    }
    return true;
  }

  async clickOnAllLoads(): Promise<void> {
    await this.click(selectors.allLoadsTab);
  }

  async clickOnTheLoad(): Promise<void> {
    //await this.page.reload();
    const selector = `//span[text()="${this.loadName}"]`;
    const elementLocator = await this.locator(selector);
    await elementLocator.click();
  }

  async clickOnDownloadCsv(): Promise<void> {
    const downloadPromise = this.page.waitForEvent("download");
    await this.click(selectors.downloadCsvOption);
    const download = await downloadPromise;
    await download.saveAs(
      `${this.downloadsFolder}/${download.suggestedFilename()}`
    );
  }

  async isCsvDownloaded(): Promise<boolean> {
    const filePath = `${this.downloadsFolder}/${this.loadName}.csv`;
    if (fs.existsSync(filePath)) {
      return true;
    } else {
      return false;
    }
  }

  async isExpectedCsv(filePath: string): Promise<boolean> {
    const downloadedFilePath = `${this.downloadsFolder}/${this.loadName}.csv`;
    const uploadedFilePath = `./${filePath}`;

    try {
      const uploadedContent = await fs.promises.readFile(
        uploadedFilePath,
        "utf-8"
      );
      const cleanedUploadedContent = uploadedContent.replace(/\r?\n/g, "\n");

      const downloadedContent = await fs.promises.readFile(
        downloadedFilePath,
        "utf-8"
      );
      const cleanedDownloadedContent = downloadedContent.replace(
        /\r?\n/g,
        "\n"
      );
      expect(cleanedUploadedContent).toEqual(cleanedDownloadedContent);
      return cleanedUploadedContent === cleanedDownloadedContent;
    } catch (error) {
      console.error(`Error in csv files comparison: ${error}`);
      return false;
    }
  }

  async clickOnVrtclEllipsisRunPage(): Promise<void> {
    await this.click(selectors.generalVrtclEllipsis);
  }

  async clickOnDownloadCsvRunPage(): Promise<void> {
    const downloadPromise = this.page.waitForEvent("download");
    await this.click(selectors.downloadCsvOptionRunPage);
    const download = await downloadPromise;
    await download.saveAs(
      `${this.downloadsFolder}/${download.suggestedFilename()}`
    );
  }

  async clickOnLockIcon(): Promise<void> {
    const targetLoad = await this.find();
    if (targetLoad) {
      const row = await targetLoad.$("xpath=ancestor::tr");
      const lockIcon = await row?.$(selectors.lockIcon);
      await lockIcon?.click();
    } else {
      console.log("Error while locating to-be-shared load");
    }
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.click(selectors.confirmButton);
  }

  async clickOnSharedLoadsTab(): Promise<void> {
    await this.click(selectors.sharedLoadsTab);
  }

  async isShared(): Promise<boolean> {
    const targetLoad = await this.find();
    if (targetLoad) {
      return true;
    }
    return false;
  }

  async clickOnLockIconRunPage(): Promise<void> {
    await this.click(selectors.lockIconRunPage);
  }

  async clickOnInfo(): Promise<void> {
    await this.click(selectors.InfoButton);
  }

  async clickOnLoadInfo(): Promise<void> {
    await this.click(selectors.loadInfoButton);
  }

  async clickOnLoadInfoButton(): Promise<void> {
    await this.click(selectors.loadInfoBtnResults);
  }

  async expandShipmentDetails(
    index: number,
    elmentLocator: Locator
  ): Promise<void> {
    /* Expand shipment  details */
    if (index != 0) {
      await elmentLocator.waitFor();
      await elmentLocator.click();
    }
    const expandBtnSelector = `(//button[@id="loadInfo_expand_button"])[${
      index + 1
    }]`;
    await this.waitForSelectorToBe({
      selector: expandBtnSelector,
    });
  }

  async getShipmentName(index: number): Promise<string> {
    const expandBtnLocator = await this.waitForSelectorToBe({
      selector: `(//button[@id='loadInfo_expand_button']/following-sibling::span)[${
        index + 1
      }]`,
    });
    let preshipmentName = await expandBtnLocator?.textContent();
    return preshipmentName!.substring(2);
  }

  async getProductName(elementLocator: Locator): Promise<string | null> {
    /* Get product name */
    const productNameElmnt = await this.waitForSelectorToBe({
      selector: "td:nth-child(1) div span:nth-child(3)",
      baseLocator: elementLocator,
    });
    return await productNameElmnt.textContent();
  }

  async getProductShape(elementLocator: Locator): Promise<string> {
    const shapeLocator = await this.waitForSelectorToBe({
      selector: "td:nth-child(2) svg",
      baseLocator: elementLocator,
    });
    const dataShape = await shapeLocator.getAttribute("data-shape");
    let shape: string = "";
    if (dataShape === "box") {
      shape = "0";
    } else if (dataShape == "cylinder") {
      shape = "1";
    }
    return shape;
  }

  async getProductProperty(
    property: string,
    elementLocator: Locator
  ): Promise<string | null> {
    const propSelector = this.product.propertiesMap[property];
    if (!propSelector) {
      throw new Error(`Unknown property: ${property}`);
    }
    const propLocator = await this.waitForSelectorToBe({
      selector: propSelector,
      baseLocator: elementLocator,
      status: this.elementStates.attached,
    });
    return await propLocator.textContent();
  }

  async getProductDimensions(
    elementLocator: Locator,
    index: number,
    product: any
  ): Promise<void> {
    const dimensionsColLocator = await this.waitForSelectorToBe({
      selector: "xpath=(./td[3]/div[1])",
      baseLocator: elementLocator,
      status: this.elementStates.attached,
    });
    if (product.Shape === "0") {
      //shape box
      product.Length = await this.getProductProperty(
        "length",
        dimensionsColLocator
      );
      product.Width = await this.getProductProperty(
        "width",
        dimensionsColLocator
      );
      product.Height = await this.getProductProperty(
        "height0",
        dimensionsColLocator
      );
      product.Diameter = "";
    } else if (product.Shape === "1") {
      // shape cylinder
      product.Height = await this.getProductProperty(
        "height1",
        dimensionsColLocator
      );
      product.Diameter = await this.getProductProperty(
        "diameter",
        dimensionsColLocator
      );
      product.Length = "";
      product.Width = "";
    }

    product.Weight = await this.getProductProperty("weight", elementLocator);
  }

  async getMustGoState(index: number): Promise<string> {
    const mustGoInput = await this.waitForSelectorToBe({
      selector: `(//input[@id='loadInfo_mustGo_switch_${index}'])`,
    });
    let mustGo = "0";
    if (await mustGoInput.isChecked()) {
      mustGo = "1";
    }
    return mustGo;
  }

  async getRotation(elementLocator: Locator, product: any): Promise<string> {
    let rotationsDivLocator = await this.waitForSelectorToBe({
      selector: 'div[id="loadInfoRotations_div"]',
      baseLocator: elementLocator,
    });
    let rotations = await this.getLocators("div", rotationsDivLocator);
    rotations?.reverse();
    let rotation: number = 0;
    if (product.Shape === "0") {
      //shape box

      for (let r = 0; r < rotations.length; r++) {
        let dataActive = await rotations[r].getAttribute("data-active");
        if (dataActive === "true") {
          rotation += 2 ** r;
        }
      }
      product.Rotation = rotation.toString();
    } else if (product.Shape === "1") {
      //shape cylinder
      for (const r in rotations) {
        let dataActive = await rotations[r].getAttribute("data-active");
        if (dataActive === "true") {
          rotation = 32;
        }
      }
    }
    return rotation.toString();
  }

  async getStackabilityState(elementLocator: Locator): Promise<string> {
    const stackabilityToggleLocator = await this.waitForSelectorToBe({
      selector: selectors.loadInfoStackCheckbox,
      baseLocator: elementLocator,
    });
    let stackingOnTop: string = "0";
    if (await stackabilityToggleLocator.isChecked()) {
      stackingOnTop = "1";
    }
    return stackingOnTop;
  }

  async getInfo(shipmentType: string): Promise<ProductInt[]> {
    let productList: ProductInt[] = [];
    await this.waitForSelector(selectors.expandButton);
    const expandBtnList = await this.getLocators(selectors.expandButton);

    /* Loop through shipment  list */
    for (let i = 0; i < expandBtnList.length; i++) {
      /* Expand shipment  details */
      await this.expandShipmentDetails(i, expandBtnList[i]);

      /* Get products table for the related shipment */
      const tableLocator = await this.waitForSelectorToBe({
        selector: `(//table[@id="loadInfo_data_table"])[${i + 1}]`,
      });
      const theadLocator = await this.waitForSelectorToBe({
        selector: "thead",
        baseLocator: tableLocator,
        status: this.elementStates.attached,
      });
      const headRowLocator = await this.waitForSelectorToBe({
        selector: "tr",
        baseLocator: theadLocator,
        status: this.elementStates.attached,
      });
      const tBodyLocator = await this.waitForSelectorToBe({
        selector: "tbody",
        baseLocator: tableLocator,
        status: this.elementStates.attached,
      });

      const columns = await this.getLocators("th", headRowLocator);
      const rows = await this.getLocators("tr", tBodyLocator);

      /* Loop through the products table rows and get products details */
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 2) {
        let product: any = {
          Shipment_Name: null,
          Product_Name: null,
          Shape: null,
          Height: null,
          Length: null,
          Width: null,
          Diameter: null,
          Quantity: null,
          Weight: null,
          Crushing_limit: null,
          Stacking_on_top: null,
          //Stacking_ground: null,
          Rotation: null,
          Unloading_priority: null,
          Loading_Priority: null,
          Must_Go: null,
        };
        /* Get shipment name */
        product.Shipment_Name = await this.getShipmentName(i);

        /* Get product name */
        product.Product_Name = await this.getProductName(rows[rowIndex]);

        /* Get product shape */
        product.Shape = await this.getProductShape(rows[rowIndex]);
        /* Get product dimensions */
        await this.getProductDimensions(rows[rowIndex], rowIndex, product);
        /* Get product quantity */
        product.Quantity = await this.getProductProperty(
          "quantity",
          rows[rowIndex]
        );
        if (shipmentType.toLowerCase() == "air shipment") {
          expect(columns?.length).toEqual(7);
          delete product.Unloading_priority;
          delete product.Loading_Priority;
          /* Get Must Go*/

          product.Must_Go = await this.getMustGoState(i);
          /* Get product crushing limit */
          product.Crushing_limit = await this.getProductProperty(
            "crushingLimit1",
            rows[rowIndex]
          );
        } else if (shipmentType.toLowerCase() == "land & sea shipment") {
          expect(columns.length).toEqual(9);
          delete product.Must_Go;
          /* Get product unloading priority */
          product.Unloading_priority = await this.getProductProperty(
            "unloadingPriority",
            rows[rowIndex]
          );
          /* Get product loading priority */
          product.Loading_Priority = await this.getProductProperty(
            "loadingPriority",
            rows[rowIndex]
          );
          /* Get product crushing limit */

          product.Crushing_limit = await this.getProductProperty(
            "crushingLimit0",
            rows[rowIndex]
          );
        }
        /* Expand product  settings */
        const settingsBtnLocator = await this.waitForSelectorToBe({
          selector: 'button[id*="loadInfoSettings_button"]',
          baseLocator: rows[rowIndex],
        });

        await settingsBtnLocator.click();
        //await this.page.waitForTimeout(1000);

        /* Get product rotation*/
        product.Rotation = await this.getRotation(rows[rowIndex + 1], product);
        /* Get product stackability */
        product.Stacking_on_top = await this.getStackabilityState(
          rows[rowIndex + 1]
        );
        /* Add product to the products list */
        productList.push(product);

        /* Collapse product settings */
        await settingsBtnLocator.click();
        await this.page.waitForTimeout(1000);
      }
      /* Collapse shipment  details */
      await expandBtnList[i].click();
      await this.page.waitForTimeout(1000);
    }
    /* Close Load Info  Modal */
    await this.closeInfoModal();
    /* Retrieve products  List */
    return productList;
  }

  async closeInfoModal(): Promise<void> {
    await this.click(selectors.closeInfoModalBtn);
  }

  async clickOnCopyOption(): Promise<void> {
    await this.click(selectors.copyOption);
  }

  async clickOnEditOption(): Promise<void> {
    await this.click(selectors.editOption);
  }

  async isCopiedLoadSaved(): Promise<boolean> {
    const selector = `//span[text()="Copy of ${this.loadName}"]`;

    try {
      await this.page.waitForSelector(selector);
      return true;
    } catch (error) {
      return false;
    }
  }

  async clickOnSaveLoadFromCopyPage(): Promise<void> {
    await this.click(selectors.saveLoadBtnCopyPage);
  }

  async edit(): Promise<void> {
    await this.shipment.delete();
  }

  async clickOnUpdateLoad(): Promise<void> {
    await this.click(selectors.updateLoadButton);
  }

  async selectAll(): Promise<void> {
    const inputLocator = await this.locator(selectors.checkAllBox);
    await inputLocator.click();
  }

  async areAllChecked(): Promise<boolean> {
    try {
      const checkBoxes = await this.page.$$(selectors.checkBox);
      for (let checkbox of checkBoxes) {
        //check checkbox state
        await this.page.waitForTimeout(1000);
        const isChecked = await checkbox.isChecked();
        expect(isChecked).toBeTruthy();
      }
      return true;
    } catch (error) {
      console.error("error while checking checkboex status:", error);
      return false;
    }
  }

  async getPaginationLength(): Promise<number> {
    let count: number = 0;
    const paginationLocator = await this.locator(selectors.loadsPagination);
    if (paginationLocator) {
      await paginationLocator.waitFor();
      const childs = await paginationLocator.locator("li").all();
      count = childs.length;
    }
    return count;
  }

  async clickOnDeleteSelection(): Promise<void> {
    const btnLocator = await this.locator(selectors.deleteSelectionButton);
    await btnLocator.click();
  }

  async isDashboardTableCleared(): Promise<void> {
    const paginationLocator = await this.locator(selectors.loadsPagination);
    while (await paginationLocator.isVisible()) {
      await this.selectAll();
      await this.clickOnDeleteSelection();
      await this.clickOnDelete();
    }
    await this.waitForSelectorNotToBeVisible(selectors.dashboardTableTbody);
  }

  async clearLoadNameInput(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.page.locator(selectors.loadNameInput).clear();
    await this.page.waitForTimeout(1000);
  }

  async checkErrorMessage(message: string): Promise<void> {
    await this.page.waitForTimeout(1000);
    const selector = `//span[text()="${message}"]`;
    await this.page.waitForSelector(selector);
  }

  async clickOnProceedButton(): Promise<void> {
    await this.click(selectors.proceedButton);
  }

  async checkForInvalidProducts(): Promise<void> {
    await this.page.waitForTimeout(1000);

    let invalidBox: any[] = ["invalidBox", "12035", "2355", "2395"];
    let expectedReason: string =
      "Item has no rotation were it can be placed in container";
    const modal = await this.page.$(selectors.invalidProductsModal);
    const invalidPrdctsTable = await modal?.$("table");
    const tableBody = await invalidPrdctsTable?.$("tbody");

    // check for the invalid box
    const boxRow = await tableBody?.$("tr:nth-child(1)");
    const boxName = await boxRow?.$("td:nth-child(1)");
    const boxHeight = await boxRow?.$(
      "td:nth-child(3) div div span:nth-child(2)"
    );
    const boxLength = await boxRow?.$(
      "td:nth-child(3) div div:nth-child(2) span:nth-child(2)"
    );
    const boxWidth = await boxRow?.$(
      "td:nth-child(3) div div:nth-child(3) span:nth-child(2)"
    );
    const boxReason = await boxRow?.$("td:nth-child(6) p");
    expect(await boxName?.textContent()).toContain(invalidBox[0]);
    expect(await boxHeight?.textContent()).toBe(invalidBox[1]);
    expect(await boxLength?.textContent()).toBe(invalidBox[2]);
    expect(await boxWidth?.textContent()).toBe(invalidBox[3]);
    expect(await boxReason?.textContent()).toBe(expectedReason);
  }

  async clickOnSaveAndCloseBtn(): Promise<void> {
    await this.click(selectors.saveAndCloseBtn);
  }

  async enableUnloadingPriority(): Promise<void> {
    await this.waitForSelector(selectors.unloadingPriorityToggle);
    try {
      await this.click(selectors.unloadingPriorityToggle);
    } catch (error) {
      console.error("error was: ", error);
      throw error;
    }
  }

  async isUpEnabled(): Promise<boolean> {
    const toggle = this.page.locator(selectors.unloadingPriorityToggle);
    return await toggle.isChecked();
  }

  async setUnloadingPriority(up: number): Promise<void> {
    await this.page.locator(selectors.upInput).fill(up.toString());
  }

  async checkInvalidShipmentMessage(): Promise<boolean> {
    const message = this.page.locator(selectors.invalidShipmentMessage);
    if (message) {
      return true;
    } else {
      return false;
    }
  }

  async createLoadViaApi(): Promise<void> {
    const baseUrl = this.apiBaseUrl;
    const apiKey = this.apiKey;

    const payload = {
      name: this.loadName,
      isUnloadingPriorityEnabled: true,
      transportationMode: this.transportationMode,
      items: [
        {
          shipmentName: this.shipment.shipmentName,
          productName: this.product.name,
          weight: this.product.width,
          height: this.product.height,
          length: this.product.length,
          width: this.product.width,
          quantity: this.product.quantity,
          rotation: this.product.rotation,
          stackingGround: this.product.stackingGround,
          stackingOnTop: this.product.stackingOnTop,
          crushingLimit: this.product.crushingLimit,
          unloadingPriority: this.product.unloadingPriority,
          shape: this.product.shape,
        },
      ],
    };

    const response = await this.retryOperation(async () => {
      const res = await axios.post(`${baseUrl}${this.loadsEndpoint}`, payload, {
        headers: {
          "Content-Type": "application/json",
          "x-deeppack-api-key": apiKey,
        },
      });
      return res;
    });

    const responseBody = response.data;
    this.id = responseBody.result;

    expect(responseBody.status).toBe("success");
    expect(responseBody.errorCode).toBe(null);
    expect(responseBody.errorMessage).toBe(null);
    this.toBeCleanedUp = true;
    this.isBot = true;
  }

  async createLoadViaApiUsingCSV(
    filePath: string,
    shipmentType: number
  ): Promise<void> {
    const baseUrl = this.apiBaseUrl;
    const apiKey = this.apiKey;
    const payload = await this.getPayloadFromCSV(filePath, shipmentType);
    const response = await this.retryOperation(async () => {
      const res = await axios.post(`${baseUrl}${this.loadsEndpoint}`, payload, {
        headers: {
          "Content-Type": "application/json",
          "x-deeppack-api-key": apiKey,
        },
      });
      return res;
    });

    const responseBody = response.data;
    this.id = responseBody.result;
    expect(responseBody.status).toBe("success");
    expect(responseBody.errorCode).toBe(null);
    expect(responseBody.errorMessage).toBe(null);
    this.toBeCleanedUp = true;
    this.isBot = true;
  }

  async getPayloadFromCSV(
    filePath: string,
    transportationMode: number = this.transportationMode
  ): Promise<any> {
    const csvData = fs.readFileSync(filePath, "utf8");
    const parsedData = Papa.parse(csvData, { header: true });
    let packingOrder: number | null;
    const payload = {
      name: this.loadName,
      isUnloadingPriorityEnabled: true,
      isLoadingPriorityEnabled: false,
      transportationMode: transportationMode,
      items: parsedData.data.map((item: any) => {
        let shapeValue;

        if (item.Shape === "0") {
          shapeValue = "box";
        } else if (item.Shape === "1") {
          shapeValue = "cylinder";
        } else {
          shapeValue = "unknown";
        }

        if (transportationMode == 1) {
          // sea and land shipment

          packingOrder = parseInt(item.Loading_Priority);
        } else if (transportationMode == 2) {
          // air shipment
          packingOrder = null;
          if (parseInt(item.Must_Go) == 1) {
            packingOrder = 1;
          }
        }

        return {
          shipmentName: item.Shipment_Name,
          productName: item.Product_Name,
          weight: parseFloat(item.Weight),
          height: parseFloat(item.Height),
          length: parseFloat(item.Length),
          width: parseFloat(item.Width),
          diameter: parseFloat(item.Diameter),
          quantity: parseInt(item.Quantity),
          rotation: parseFloat(item.Rotation),
          stackingGround: parseInt(item.Stacking_ground),
          stackingOnTop: parseInt(item.Stacking_on_top),
          crushingLimit: parseInt(item.Crushing_limit),
          unloadingPriority: parseInt(item.Unloading_priority),
          loadingPriority: packingOrder,
          shape: shapeValue,
        };
      }),
    };

    return payload;
  }

  async selectTransportationMode(mode: string): Promise<void> {
    const transportationMode = mode.toLowerCase();
    await this.click(selectors.trasprtModeDropDown);
    switch (transportationMode) {
      case "land & sea shipment":
        await this.click(selectors.seaMode);
        break;
      case "air shipment":
        await this.click(selectors.airMode);
        break;
    }
  }

  async checkDefaultTrnsprtMode(
    expectedMode: string = "Land & Sea shipment"
  ): Promise<boolean> {
    let isVisible: boolean = false;
    switch (expectedMode.toLowerCase()) {
      case "land & sea shipment": {
        let seaModeLocator = await this.locator(
          '//div[text()="Land & Sea shipment"]'
        );
        await seaModeLocator.waitFor();
        isVisible = await seaModeLocator.isVisible();
        break;
      }

      case "air shipment": {
        let airModeLocator = await this.locator('//div[text()="Air shipment"]');
        await airModeLocator.waitFor();
        isVisible = await airModeLocator.isVisible();
        break;
      }
    }
    return isVisible;
  }

  async isTypeOfShipmentAsExpected(mode: string): Promise<boolean> {
    const targetLoad = await this.find();
    try {
      let typeOfShip: any;
      const row = await targetLoad?.$("xpath=ancestor::tr");
      if (mode.toLowerCase() == "land & sea shipment") {
        await row?.waitForSelector(
          'span[id*="transportation_mode_SeaAndLand"]'
        );
        return true;
      } else if (mode.toLowerCase() == "air shipment") {
        await row?.waitForSelector('span[id*="transportation_mode_Air"]');
        return true;
      }
    } catch (error) {
      console.error(
        "Error while checking transportation mode of the load",
        error
      );
    }

    return false;
  }

  async checkDefaultProductsQuantity() {
    await this.waitForSelector(selectors.productsQuantityInput);
    const input = await this.page.$(selectors.productsQuantityInput);
    expect(await input?.inputValue()).toBe("1");
  }

  async getLoadsViaApi(): Promise<any> {
    const baseUrl = this.apiBaseUrl;
    const apiKey = this.apiKey;
    const response = await this.retryOperation(async () => {
      const res = await axios.get(`${baseUrl}${this.loadsEndpoint}`, {
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
    return responseBody.result.data;
  }

  async deleteViaApi(): Promise<void> {
    const baseUrl = this.apiBaseUrl;
    const apiKey = this.apiKey;
    const loads = await this.getLoadsViaApi();
    for (let load of loads) {
      if (load["name"] == this.loadName) {
        await this.retryOperation(async () => {
          const loadId = load["id"];
          await axios.delete(`${baseUrl}${this.loadsEndpoint}/${loadId}`, {
            headers: {
              "Content-Type": "application/json",
              "x-deeppack-api-key": apiKey,
            },
          });
        });
        break;
      }
    }
  }

  async verifyVariantsDropdown(variant: string) {
    // Function to verify that a selector comes first in the DOM order
    const isFirstInDOM = async (selector: string) => {
      const elements = await this.page.$$(selector); // Get all elements matching the selector
      const firstElement = elements[0];
      if (firstElement) {
        const position = await this.page.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return rect.top; // Return the top position of the element
        }, firstElement);
        return position; // Position will be a positive value representing its vertical position
      }
      return -1; // Return -1 if the element doesn't exist
    };

    switch (variant.toLowerCase()) {
      case "pmc ld p": {
        await this.waitForSelectorToBe({ selector: selectors.ldpVariant });
        const firstPosition = await isFirstInDOM(selectors.ldpVariant);
        const secondPosition = await isFirstInDOM(selectors.ldpFVariant);
        if (firstPosition > secondPosition) {
          throw new Error("The PMC LD P variant is not first in the dropdown");
        }
        break;
      }
      case "pmc ld p-f": {
        await this.waitForSelectorToBe({ selector: selectors.ldpFVariant });
        const firstPositionF = await isFirstInDOM(selectors.ldpFVariant);
        const secondPositionF = await isFirstInDOM(selectors.ldpMAXVariant);
        if (firstPositionF > secondPositionF) {
          throw new Error(
            "The PMC LD P-F variant is not first in the dropdown"
          );
        }
        break;
      }
      case "pmc ld p-max": {
        await this.waitForSelectorToBe({ selector: selectors.ldpMAXVariant });
        const firstPositionMAX = await isFirstInDOM(selectors.ldpMAXVariant);
        const secondPositionMAX = await isFirstInDOM(selectors.ldpFVariant);
        if (firstPositionMAX > secondPositionMAX) {
          throw new Error(
            "The PMC LD P-MAX variant is not first in the dropdown"
          );
        }
        break;
      }
      default:
        throw new Error(`Unknown variant: ${variant}`);
    }
  }

  async search() {
    await this.click(selectors.searchLoadIcon);
    const inputLocator = await this.waitForSelectorToBe({
      selector: selectors.searchLoadInput,
    });
    await inputLocator.fill(this.loadName);
  }

  async verifyState(state: string) {
    await this.elementShouldBe({ selector: this.loadSelector, status: state });
  }
}
