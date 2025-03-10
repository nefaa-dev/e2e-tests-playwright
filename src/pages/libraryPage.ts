import { expect, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Product } from "./components/product";
import { ContainerPage } from "./components/containerPage";

const selectors = {
  libraryButton: '//a[@id="Library-nav"]',
  seaCntnrTab: '//button[@id="organizationLibrary_navTab_button_1"]',
  boxTab: '//button[@id="organizationLibrary_navTab_button_2"]',
  groundPalletTab: '//button[@id="organizationLibrary_navTab_button_5"]',
  saveAndClose: '//button[@id="products_saveAndClose_button"]',
  loadTable: '//table[@id="load_table"]',
  checkAllBox: '//input[@title="Toggle All Rows Selected"]',
  deleteSelectionBtn: '//button[@id="products_deleteSelection_button"]',
};

export class LibraryPage extends BasePage {
  public product: Product;
  public container: ContainerPage;

  constructor(page: Page) {
    super(page);
    this.product = new Product(page);
    this.container = new ContainerPage(page);
  }
  async clickOnLibraryButton(): Promise<void> {
    await this.click(selectors.libraryButton);
  }

  async clickOnAddProduct(): Promise<void> {
    await this.product.addToLibrary();
  }

  async clickOnAddContainer(): Promise<void> {
    await this.container.add();
  }

  async selectContainerCategory(containerCategory: string): Promise<void> {
    switch (containerCategory.toLocaleLowerCase()) {
      case "sea container":
        await this.click(selectors.seaCntnrTab);
        break;
      case "box":
        await this.click(selectors.boxTab);
        break;
      case "ground pallet":
        await this.click(selectors.groundPalletTab);
        break;
    }
  }
  async fillForm(
    height: number,
    length: number,
    width: number,
    maxHeight: string,
    maxCargo: number,
    emptyWeight: number
  ): Promise<void> {
    await this.container.fillProperties(
      height,
      length,
      width,
      maxHeight,
      maxCargo,
      emptyWeight
    );
  }

  async clickOnSaveContainer(): Promise<void> {
    await this.container.save();
  }

  async clickOnClose(): Promise<void> {
    await this.container.cancel();
  }

  async checkForContainerCreation(): Promise<boolean> {
    return await this.container.isSaved();
  }

  async deleteContainer(): Promise<void> {
    await this.container.delete();
  }

  async fillFormInLibrary(
    shape: string,
    height: number,
    diameter: number,
    length: number,
    crushingLimit: number,
    width: number,
    weight: number
  ): Promise<void> {
    await this.product.fillForm(
      shape,
      height,
      diameter,
      length,
      crushingLimit,
      width,
      weight
    );
  }

  async checkForProductCreation(): Promise<boolean> {
    return await this.product.isSaved();
  }

  async clickOnSaveAndClose(): Promise<void> {
    await this.click(selectors.saveAndClose);
    await this.page.waitForTimeout(1000);
  }

  async deleteProduct(): Promise<void> {
    await this.product.delete();
  }

  async checkForImportedProducts(): Promise<void> {
    await this.page.waitForTimeout(1000);
    await this.page.waitForSelector(selectors.loadTable);

    const loadTable = await this.page.$(selectors.loadTable);
    const tableBody = await loadTable?.$("tbody");
    const row = await tableBody?.$("tr:nth-child(1)");
    await row?.$("td:nth-child(2) input");

    const cellShape = await row?.$("td:nth-child(3)");
    const productShape = await cellShape?.$("div[data-shape]");

    let shape: any = await productShape?.getAttribute("data-shape");
    let indexes: number[] = [2, 4, 5, 6, 7, 8, 9, 10, 12]; //[name, height, length, width, diameter, quantity, weight, crushingLimit, unloadingPriority]
    let productInfo: any[] = [
      this.product.name,
      this.product.height,
      this.product.length,
      this.product.width,
      this.product.diameter,
      this.product.quantity,
      this.product.weight,
      "",
      this.product.unloadingPriority,
    ];
    let i = 0;
    for (let k of indexes) {
      if (k == 8) {
        //quantity

        const input = await row?.$(`td:nth-child(${k}) input`);
        expect(await input?.inputValue()).toBe("");
        i++;
        continue;
      }
      if (k == 12) {
        //unloadingpriority
        const input = await row?.$(`td:nth-child(${k})`);
        expect(await input?.textContent()).toBe("");
        i++;
        continue;
      }
      if (shape == "box" && k == 7) {
        const input = await row?.$(`td:nth-child(${k})`); //diameter
        expect(await input?.textContent()).toBe("");
        i++;
        continue;
      } else if (shape == "cylinder" && [5, 6].includes(k)) {
        const input = await row?.$(`td:nth-child(${k}) input`);
        expect(input?.inputValue).toBe("");
        i++;
      }

      const input = await row?.$(`td:nth-child(${k}) input`);
      expect(await input?.inputValue()).toBe(productInfo[i].toString());

      i++;
    }
  }

  async selectAll(): Promise<void> {
    await this.waitForSelector(selectors.checkAllBox);
    await this.click(selectors.checkAllBox);
  }

  async isDeleteSelectionDisabled(): Promise<boolean> {
    const deleteSelectionBtn = await this.locator(selectors.deleteSelectionBtn);
    return await deleteSelectionBtn.isDisabled();
  }

  async isNotificationDisplayed(message: string): Promise<boolean> {
    const selector = `//p[text() = "${message}"]`;
    const notification = await this.locator(selector);
    if (notification) {
      return true;
    }
    return false;
  }
}
