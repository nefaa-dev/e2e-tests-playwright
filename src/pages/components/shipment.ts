import {Page} from '@playwright/test';
import { BasePage } from '../basePage';


const selectors = {
  addShipmentButton: '//button[@id="createLoad_addShipment_button "]',
  shipmentNameInput: '//input[@name="shipments.0.shipmentName"]',
  deleteButton: '//button[@id="confirm_button"]',
  importPrdctButton: '//button[@id="createLoad_uploadProduct_button_0"]',
  shipmentsTable: '//table[@id="createLoad_shipments_table"]',
  shipmentTable: '//table[@id="load_table"]',
};

export class Shipment extends BasePage {
  public shipmentName: string;

  constructor(page: Page) {
    super(page);

    this.shipmentName = `Shipment-${this.generateUniqueId()}`;
  }

  async clickOnAddShipment(): Promise<void> {
    await this.page.locator(selectors.addShipmentButton).last().click();
  }

  async setShipmentName(): Promise<void> {
    await this.page.fill(selectors.shipmentNameInput, this.shipmentName);
  }

  async delete(index: number = 0): Promise<void> {
    const binSelector = `//button[@id="createLoad_removeProduct_button_${index}"]`;
    await this.click(binSelector);
    await this.clickOnDeleteButton();
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.click(selectors.deleteButton);
  }

  async clickOnImportProduct(): Promise<void> {
    await this.page.waitForTimeout(1000);
    await this.click(selectors.importPrdctButton);
  }

  async isEmpty(): Promise<boolean> {
    await this.page.waitForSelector(selectors.shipmentsTable);
    const shipmentTable = await this.page.$(selectors.shipmentsTable);
    const tableBody = await shipmentTable!.$("tbody");
    const rows = await tableBody?.$$("tr");
    return rows?.length == 2;
  }

  async getNumberOfRows(): Promise<any> {
    const shipmentTable = await this.waitForSelectorToBe({
      selector: selectors.shipmentTable,
    });
    const tableBody = shipmentTable.locator("tbody");
    const rowsCount = await this.getNbrOfLocators("tr", tableBody);
    return rowsCount;
  }
}
