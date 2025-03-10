import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { LibraryPage } from "../../../pages/libraryPage";
import { Container, ContainerKeys } from "../../../containers/Container";
let libraryPage: LibraryPage;

defineStep("User Click On Edit Option Of The Product", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.product.clickOnEditOption();
});

defineStep("User Click On Update Product Button", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.product.clickOnUpdateButton();
});

defineStep("Product Should Be Updated", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isUpdated = await libraryPage.product.isUpdated();
  expect(isUpdated).toBeTruthy();
});
