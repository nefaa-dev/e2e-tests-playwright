import { expect } from "@playwright/test";
import { defineStep, Then, When } from "@cucumber/cucumber";
import { error } from "console";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Click On Create Load", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnCreateLoad();
});

When("User Set Load Name", async (): Promise<void> => {
  await loadPage.setLoadName();
});

defineStep("User Click On Add Shipment Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnAddShipment();
});

defineStep("User Set Shipment Name", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.setShipmentName();
});

defineStep("User Click On Add Product Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnAddProduct();
});

defineStep(
  "User Fill in the product properties {string}, {float}, {float}, {float}, {float}, {float}, {float} And {float}",
  async (
    shape,
    height,
    diameter,
    length,
    crushingLimit,
    width,
    weight,
    quantity
  ): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.addProduct(
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
);

defineStep("User Click On Save Product Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.saveProduct();
});

defineStep("Add Product Modal Should Be Reset", async (): Promise<void> => {
  // Implement your step here
});

defineStep("User Click On Cancel Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.closeAddProductModal();
});

defineStep("User Click On Save And Close Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnSaveAndCloseBtn();
});

defineStep("User Enable Unloading Priority Toggle", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.enableUnloadingPriority();
});

defineStep(
  "Unloading Priority Toggle Should Be Enabled",
  async (): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const isEnabled = await loadPage.isUpEnabled();
    expect(isEnabled).toBeTruthy();
  }
);

defineStep("User Enter {float}", async (unloadingPriority): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.setUnloadingPriority(unloadingPriority);
});

defineStep("User Save Load", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.saveLoad();
});

defineStep("User Click On Save and Run Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnSaveAndRun();
  loadPage.toBeCleanedUp = true;
});

defineStep(
  "User Should Be Redirected To Dashboard Page",
  async (): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const expectedURL = await loadPage.getDashboardPageURL();
    await loadPage.WaitForRedirection(expectedURL);
    const currentURL = await loadPage.getCurrentURL();
    expect(currentURL).toContain(expectedURL);
  }
);

Then("Load Should Be Saved", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isSaved = await loadPage.isLoadSaved();
  expect(isSaved).toBeTruthy();
  loadPage.toBeCleanedUp = true;
});

When("the user selects a CSV file {string}", async (filePath: string) => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.uploadCsvFile(filePath);
});

defineStep("User Created Load", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.createLoadViaApi();
});

defineStep(
  "There Is Created Load {string} With {string} As Type Of Shipment",
  async (filePath: string, shipmentType: string) => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.clickOnCreateLoad();
    expect(await loadPage.checkDefaultTrnsprtMode()).toBeTruthy();
    await loadPage.selectTransportationMode(shipmentType);
    await loadPage.uploadCsvFile(filePath);
    await loadPage.setLoadName();
    await loadPage.saveLoad();
    const isSaved = await loadPage.isLoadSaved();
    expect(isSaved).toBeTruthy();
    loadPage.toBeCleanedUp = true;
  }
);

defineStep("User Created Loads {string}", async (filePath: string) => {
  function generateRandomLoadName(baseName: string): string {
    return baseName + Math.random().toString(36).substring(7);
  }

  const loadNames: string[] = [
    generateRandomLoadName("Load1"),
    generateRandomLoadName("Load2"),
  ];
  loadPage = Container.resolve(ContainerKeys.loadPage);
  for (let name of loadNames) {
    await loadPage.clickOnCreateLoad();
    expect(await loadPage.checkDefaultTrnsprtMode()).toBeTruthy();
    await loadPage.uploadCsvFile(filePath);
    await loadPage.setLoadName(name);
    await loadPage.saveLoad();
    const isSaved = await loadPage.isLoadSaved(name);
    expect(isSaved).toBeTruthy();
  }
});

defineStep("Product Should Not Be Added To The Shipment", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isEmpty = await loadPage.shipment.isEmpty();
  expect(isEmpty).toBeTruthy();
});

defineStep("User Clear The Load Name Field", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clearLoadNameInput();
});

defineStep("User Should Still at Create Load page", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const currentUrl = await loadPage.getCurrentURL();
  expect(currentUrl).toContain("loads/create/new");
});

defineStep("User Hover Mouse On Load Name Field", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.hoverOn(loadPage.selectors.loadNameInput);
});

defineStep(
  "Relevant Message should appear {string}",
  async (message: string) => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.checkErrorMessage(message);
  }
);

defineStep("Invalid Product Message Should Be Displayed", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isShown = await loadPage.checkInvalidShipmentMessage();
  expect(isShown).toBeTruthy();
});

defineStep(
  "{string} Transportation Mode Is Selected By Default",
  async (expectedMode: string) => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const isExpected = await loadPage.checkDefaultTrnsprtMode(expectedMode);
    expect(isExpected).toBeTruthy();
  }
);

defineStep(
  "User Select The Transportation Mode {string}",
  async (shipmentType: string) => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.selectTransportationMode(shipmentType);
  }
);

defineStep(
  "User Created Load Using {string} In Transportation Mode {string}",
  async (filePath: string, transportMode: string) => {
    let shipmentType: number;
    switch (transportMode.toLowerCase()) {
      case "land & sea shipment":
        shipmentType = 1;
        break;
      case "air shipment":
        shipmentType = 2;
        break;
      default:
        console.info("Invalid Transportation mode, please re-check!");
        throw error;
    }
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.createLoadViaApiUsingCSV(filePath, shipmentType);
  }
);

defineStep(
  "Type Of Shipment Should Be As Expected According To {string}",
  async (mode: string) => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const isExpected = await loadPage.isTypeOfShipmentAsExpected(mode);
    expect(isExpected).toBeTruthy();
  }
);

defineStep("Default Products Quantity Input Should Be 1", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.checkDefaultProductsQuantity();
});

defineStep(
  "The Added Rows Should Be As Equal As {int}",
  async (productsQuantityInput: number) => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const rowsCount = await loadPage.shipment.getNumberOfRows();
    expect(rowsCount).toEqual(productsQuantityInput);
  }
);

Then("Load Should Be {string}", async(state:string) => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.verifyState(state);
})
