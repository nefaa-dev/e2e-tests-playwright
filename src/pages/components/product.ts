import { expect, Page, ElementHandle } from "@playwright/test";
import { BasePage } from "../basePage";

const selectors = {
  addProductButton: '//button[@id="createLoad_addProduct_button_0"]',
  addProductButtonLibrary: '//button[@id="products_addProduct_button"]',
  productNameInput: '//input[@id="name"]',
  productHeightInput: '//input[@name="height"]',
  productLengthInput: '//input[@name="length"]',
  productWidthInput: '//input[@name="width"]',
  productQuantityInput: '//input[@name="quantity"]',
  productWeightInput: '//input[@name="weight"]',
  productCrushingLimitInput: '//input[@name="crushingLimit"]',
  saveButton: '//button[@id="productModal_save_button"]',
  cancelButton: '//button[@id="productModal_cancel_button"]',
  productDiameterInput: '//input[@name="diameter"]',
  deleteSelectionButton: '//button[@id="products_deleteSelection_button"]',
  confirmDeleteButton: '//button[@id="products_deleteSelectedProducts_button"]',
  vrtclEllipsis: '(//button[starts-with(@id, "products_editMenu_button")])[1]',
  deleteOption: '//div[@id="products_deleteProduct_button"]',
  deleteButton: '//button[@id="products_deleteProductModal_button"]',
  editOption: '//div[@id="products_editProduct_button"]',
  updatePrdctButton: '//button[@id="products_updateProduct_button"]',
  addProductsBtn: '//button[@id="addProductsFromLibrary_button"]',
  checkAllBox: '(//input[@title="Toggle All Rows Selected"])[2]',
  importPrctsModal: '//div[@class="modal-content"]',
  selectShape: '//div[contains(@id, "shape")]',
  cylinderShape:
    '//div[contains(@id, "react-select-") and contains(@id, "-option-1")]',
  productRow: {
    name: '//input[@name="shipments.0.items.0.productName"]',
    length: '//input[@name="shipments.0.items.0.length"]',
    width: '//input[@name="shipments.0.items.0.width"]',
    height: '//input[@name="shipments.0.items.0.height"]',
    diameter: '//input[@name="shipments.0.items.0.diameter"]',
    quantity: '//input[@name="shipments.0.items.0.quantity"]',
    weight: '//input[@name="shipments.0.items.0.weight"]',
    crushingLimit: '//input[@name="shipments.0.items.0.crushingLimit"]',
  },
  checkAllBoxSelector: '//input[@title="Toggle All Rows Selected"]',

  propCells: {
    length: "div:nth-child(1) span:nth-child(2)",
    width: "div:nth-child(2) span:nth-child(2)",
    height0: "div:nth-child(3) span:nth-child(2)",
    height1: "div:nth-child(1) span:nth-child(2)",
    diameter: "div:nth-child(2) span:nth-child(2)",
    weight: "td:nth-child(4) span",
    quantity: "td:nth-child(5) span",
    crushLimit1: "td:nth-child(6) span",
    crushLimit0: "td:nth-child(8) span",
    unloadingPriority: "td:nth-child(6) span",
    loadingPriority: "td:nth-child(7) span",
  },
};

export class Product extends BasePage {
  public name: string;
  public height: number;
  public length: number;
  public width: number;
  public diameter: number;
  public quantity: number;
  public rotation: number;
  public shape: string;
  public weight: number;
  public crushingLimit: number;
  public unloadingPriority: number;
  public stackingGround: boolean;
  public stackingOnTop: boolean;
  public toBeCleanedUp: boolean;
  public propertiesMap: any;

  public dimensions: {
    name: string;
    height: number;
    length: number;
    width: number;
    diameter: number;
    weight: number;
    crushingLimit: number;
  };

  public endpoints = {
    create: "/api/v1/products",
  };

  constructor(page: Page) {
    super(page);

    this.name = `Product-${this.generateUniqueId()}`;
    this.height = 100;
    this.length = 100;
    this.width = 100;
    this.diameter = 100;
    this.weight = 1;
    this.quantity = 100;
    this.crushingLimit = NaN;
    this.unloadingPriority = 1;
    this.rotation = 63;
    this.shape = "box";
    this.stackingGround = false;
    this.stackingOnTop = true;
    this.toBeCleanedUp = false;
    this.dimensions = {
      name: this.name,
      height: this.height,
      length: this.length,
      width: this.width,
      diameter: this.diameter,
      weight: this.weight,
      crushingLimit: this.crushingLimit,
    };

    this.propertiesMap = {
      length: selectors.propCells.length,
      height0: selectors.propCells.height0,
      height1: selectors.propCells.height1,
      width: selectors.propCells.width,
      diameter: selectors.propCells.diameter,
      weight: selectors.propCells.weight,
      quantity: selectors.propCells.quantity,
      crushingLimit0: selectors.propCells.crushLimit0,
      crushingLimit1: selectors.propCells.crushLimit1,
      unloadingPriority: selectors.propCells.unloadingPriority,
      loadingPriority: selectors.propCells.loadingPriority,
    };
  }

  async addToLibrary(): Promise<void> {
    await this.click(selectors.addProductButtonLibrary);
  }
  async addToShipment(): Promise<void> {
    await this.click(selectors.addProductButton);
  }

  async setProductName(name: string = this.name): Promise<void> {
    await this.page.waitForSelector(selectors.productNameInput);
    await this.page.fill(selectors.productNameInput, name);
  }

  async setProductHeight(height: number = this.height): Promise<void> {
    await this.page.fill(selectors.productHeightInput, height.toString());
  }
  async setProductLength(length: number = this.length): Promise<void> {
    await this.page.fill(selectors.productLengthInput, length.toString());
  }
  async setProductWidth(width: number = this.width): Promise<void> {
    await this.page.fill(selectors.productWidthInput, width.toString());
  }
  async setProductQuantity(quantity: number = this.quantity): Promise<void> {
    await this.page.fill(selectors.productQuantityInput, quantity.toString());
  }
  async setProductWeight(weight: number = this.weight): Promise<void> {
    await this.page.fill(selectors.productWeightInput, weight.toString());
  }
  async setProductCrushingLimit(
    crushingLimit: number | null = this.crushingLimit
  ): Promise<void> {
    if (!Number.isNaN(crushingLimit)) {
      await this.fill(
        selectors.productCrushingLimitInput,
        crushingLimit!.toString()
      );
    }
  }

  async setDiameter(diameter: number) {
    await this.fill(selectors.productDiameterInput, diameter.toString());
  }

  async clickOnSaveProduct(): Promise<void> {
    await this.page.waitForSelector(selectors.saveButton);
    await this.page.locator(selectors.saveButton).click();
  }
  async clickOnCancelButton(): Promise<void> {
    await this.page.waitForSelector(selectors.cancelButton);
    await this.page.locator(selectors.cancelButton).click();
  }

  async selectCylinderAsShape(): Promise<void> {
    await this.click(selectors.selectShape);
    await this.click(selectors.cylinderShape);
  }

  async fillForm(
    shape: string,
    height: number,
    diameter: number,
    length: number,
    crushingLimit: number,
    width: number,
    weight: number
  ): Promise<void> {
    this.dimensions = {
      name: this.name,
      height: height,
      length: length,
      width: width,
      diameter: diameter,
      weight: weight,
      crushingLimit: crushingLimit,
    };

    await this.setProductName();

    if (shape.toLocaleLowerCase() == "box") {
      await this.addBox(height, length, width, weight, crushingLimit);
    } else if (shape.toLocaleLowerCase() == "cylinder") {
      await this.selectCylinderAsShape();
      await this.addCylinder(height, diameter, weight, crushingLimit);
    }
  }
  async fillRow(
    shape: string,
    height: number,
    diameter: number,
    length: number,
    crushingLimit: number,
    width: number,
    weight: number,
    quantity: number
  ) {
    this.dimensions = {
      name: this.name,
      height: height,
      length: length,
      width: width,
      diameter: diameter,
      weight: weight,
      crushingLimit: crushingLimit,
    };

    switch (shape.toLocaleLowerCase()) {
      case "box":
        await this.fillBoxInputs(
          length,
          width,
          height,
          quantity,
          weight,
          crushingLimit
        );
        break;
      case "cylinder":
        await this.selectCylinderAsShape();
        await this.fillCylinderInputs(
          height,
          diameter,
          quantity,
          weight,
          crushingLimit
        );
        break;
    }
  }

  async fillBoxInputs(
    length: number = this.length,
    width: number = this.width,
    height: number = this.height,
    quantity: number = this.quantity,
    weight: number = this.weight,
    crushingLimit: number = this.crushingLimit
  ) {
    await this.page.fill(selectors.productRow.name, this.name);
    await this.page.fill(selectors.productRow.length, length.toString());
    await this.page.fill(selectors.productRow.width, width.toString());
    await this.page.fill(selectors.productRow.height, height.toString());
    await this.page.fill(selectors.productRow.quantity, quantity.toString());
    await this.page.fill(selectors.productRow.weight, weight.toString());
    if (!Number.isNaN(crushingLimit)) {
      await this.page.fill(
        selectors.productRow.crushingLimit,
        crushingLimit.toString()
      );
    }
  }

  async fillCylinderInputs(
    height: number = this.height,
    diameter: number = this.diameter,
    quantity: number = this.quantity,
    weight: number = this.weight,
    crushingLimit: number = this.crushingLimit
  ) {
    await this.page.fill(selectors.productRow.name, this.name);
    await this.page.fill(selectors.productRow.height, height.toString());
    await this.page.fill(selectors.productRow.diameter, diameter.toString());
    await this.page.fill(selectors.productRow.quantity, quantity.toString());
    await this.page.fill(selectors.productRow.weight, weight.toString());
    if (!Number.isNaN(crushingLimit)) {
      await this.page.fill(
        selectors.productRow.crushingLimit,
        crushingLimit.toString()
      );
    }
  }

  async addBox(
    height: number = this.height,
    length: number = this.length,
    width: number = this.width,
    weight: number = this.weight,
    crushingLimit: number | null = this.crushingLimit
  ): Promise<void> {
    await this.setProductHeight(height);
    await this.setProductLength(length);
    await this.setProductWidth(width);
    await this.setProductWeight(weight);
    await this.setProductCrushingLimit(crushingLimit);
  }

  async addCylinder(
    height: number,
    diameter: number,
    weight: number,
    crushingLimit: number | null
  ): Promise<void> {
    await this.setProductHeight(height);
    await this.setDiameter(diameter);
    await this.setProductWeight(weight);
    await this.setProductCrushingLimit(crushingLimit);
  }

  async isSaved(): Promise<boolean> {
    await this.page.waitForTimeout(3000);
    const selector = `//td[text()="${this.name}"]`;
    try {
      await this.waitForSelectorToBe({ selector: selector });
      return true;
    } catch {
      return false;
    }
  }

  async isCreated(): Promise<boolean> {
    await this.page.waitForTimeout(1000);
    const selector = `//td[text()="${this.name}"]`;
    const targetProduct = await this.page.$(selector);
    if (targetProduct) {
      return true;
    } else {
      return false;
    }
  }

  async find(): Promise<ElementHandle | null> {
    const selector = `//td[text()="${this.name}"]`;

    try {
      const productNameElement = await this.page.$(selector);
      return productNameElement;
    } catch (error) {
      console.error(
        `Error finding Product with selector "${selector}": ${error}`
      );
      return null;
    }
  }

  async delete(): Promise<void> {
    const targetProduct = await this.find();

    if (targetProduct) {
      const row = await targetProduct.$("xpath=ancestor::tr");
      const checkBox = await row?.$("td:nth-child(1) div input");
      await checkBox?.click();
      await this.click(selectors.deleteSelectionButton);
      await this.click(selectors.confirmDeleteButton);
    }
  }

  async clickOnVrtclEllipsis(): Promise<void> {
    const targetContainer = await this.find();

    if (targetContainer) {
      const row = await targetContainer.$("xpath=ancestor::tr");
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
    await this.page.waitForTimeout(3000);
    const selector = `//td[text()="${this.name}"]`;
    const productName = await this.page.$(selector);
    if (productName) {
      return false;
    }
    return true;
  }

  async clickOnEditOption(): Promise<void> {
    await this.click(selectors.editOption);
  }

  async clickOnUpdateButton(): Promise<void> {
    await this.click(selectors.updatePrdctButton);
    await this.page.waitForTimeout(1000);
  }

  async isUpdated(): Promise<boolean> {
    await this.page.waitForTimeout(5000);
    const targetProduct = await this.find();

    if (targetProduct) {
      const row = await targetProduct?.$("xpath=ancestor::tr");
      const lengthElmnt = await row?.$("td:nth-child(4)");
      const widthElmnt = await row?.$("td:nth-child(5)");
      const heightElmnt = await row?.$("td:nth-child(6)");
      const diameterElmnt = await row?.$("td:nth-child(7)");
      const weightElmnt = await row?.$("td:nth-child(8)");
      const crushingLimitElmnt = await row?.$("td:nth-child(9)");

      expect(await heightElmnt?.textContent()).toBe(
        this.dimensions.height.toString()
      );
      expect(await lengthElmnt?.textContent()).toBe(
        this.dimensions.length.toString()
      );
      expect(await widthElmnt?.textContent()).toBe(
        this.dimensions.width.toString()
      );
      expect(await diameterElmnt?.textContent()).toBe("");
      expect(await weightElmnt?.textContent()).toBe(
        this.dimensions.weight.toString()
      );
      expect(await crushingLimitElmnt?.textContent()).toBe(
        this.dimensions.crushingLimit.toString()
      );

      return true;
    }
    return false;
  }

  async clickOnAddProductsBtn(): Promise<void> {
    await this.click(selectors.addProductsBtn);
    await this.page.waitForTimeout(1000);
  }

  async selectAll(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.click(selectors.checkAllBox);
    // verify that checkBox was chcked
    await this.page.waitForTimeout(1000);
    const checkBox = this.page.locator(selectors.checkAllBox);
    const isChecked = await checkBox.isChecked();
    expect(isChecked).toBeTruthy();
  }

  async isImportProductModalDisplayed(): Promise<boolean> {
    try {
      await this.page.waitForSelector(selectors.importPrctsModal);
      return true;
    } catch (error) {
      return false;
    }
  }

  async isAddProductDisabled(): Promise<boolean> {
    const addProductBtn = await this.locator(selectors.addProductButtonLibrary);
    return await addProductBtn.isDisabled();
  }

  async isMenuDisabled(): Promise<boolean> {
    const verticalEllipsis = await this.locator(selectors.vrtclEllipsis);
    return await verticalEllipsis.isDisabled();
  }

  async clearAll(): Promise<void> {
    const checkAllBox = await this.waitForSelectorToBe({
      selector: selectors.checkAllBoxSelector,
    });
    const isEnabled = await checkAllBox.isEnabled();
    if (isEnabled) {
      await checkAllBox.click();
      await this.click(selectors.deleteSelectionButton);
      await this.click(selectors.confirmDeleteButton);
      await this.waitForTimeout(1000);
    }
  }

  async getInputValue(selector: string): Promise<string> {
    const input = this.page.locator(selector);
    const value = await input.inputValue();

    return value;
  }

  async getInputsValues(shape: string): Promise<string[]> {
    let inputs: string[] = [];
    if (shape.toLowerCase() == "box") {
      //get height input
      const height = await this.getInputValue(selectors.productHeightInput);
      inputs.push(height);
      //get length input
      const length = await this.getInputValue(selectors.productLengthInput);
      inputs.push(length);
      //get width input
      const width = await this.getInputValue(selectors.productWidthInput);
      inputs.push(width);
    } else if (shape.toLowerCase() == "cylinder") {
      // get height input
      const height = await this.getInputValue(selectors.productHeightInput);
      inputs.push(height);
      // get diameter input
      const diameter = await this.getInputValue(selectors.productDiameterInput);
      inputs.push(diameter);
    }

    //get weight input
    const weight = await this.getInputValue(selectors.productWeightInput);
    inputs.push(weight);
    // get crushing limit input
    const crushingLimit = await this.getInputValue(
      selectors.productCrushingLimitInput
    );
    inputs.push(crushingLimit);

    return inputs;
  }
}
