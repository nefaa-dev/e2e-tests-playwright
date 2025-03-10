import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { LoadPage } from "../../../pages/loadPage";
import { LibraryPage } from "../../../pages/libraryPage";
import { Container, ContainerKeys } from "../../../containers/Container";
let libraryPage: LibraryPage;
let loadPage: LoadPage;

defineStep("Modal Should Be Displayed", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isDisplayed = await loadPage.product.isImportProductModalDisplayed();
  expect(isDisplayed).toBeTruthy();
});

defineStep("User Click On Import Product Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.shipment.clickOnImportProduct();
});

defineStep("User Select All Products", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.product.selectAll();
});

defineStep("User Click On Add Products Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.product.clickOnAddProductsBtn();
});

defineStep(
  "Products Should Be Imported As Expected",
  async (): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    await libraryPage.checkForImportedProducts();
  }
);
