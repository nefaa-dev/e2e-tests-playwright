import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import axios from "axios";
import { LibraryPage } from "../../../pages/libraryPage";
import { Container, ContainerKeys } from "../../../containers/Container";
let libraryPage: LibraryPage;

defineStep("User Created Product Via API", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const baseUrl = libraryPage.product.apiBaseUrl;
  const apiKey = libraryPage.apiKey;

  const payload = {
    name: libraryPage.product.name,
    shape: libraryPage.product.shape,
    weight: libraryPage.product.rotation,
    rotation: libraryPage.product.rotation,
    stackingGround: libraryPage.product.stackingGround,
    stackingOnTop: libraryPage.product.stackingOnTop,
    height: libraryPage.product.height,
    length: libraryPage.product.length,
    width: libraryPage.product.width,
    crushingLimit: libraryPage.product.crushingLimit,
  };

  try {
    const response = await axios.post(
      `${baseUrl}${libraryPage.product.endpoints.create}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "x-deeppack-api-key": apiKey,
        },
      }
    );

    const responseBody = response.data;
    console.log(responseBody);
    expect(responseBody.status).toBe("success");
    expect(responseBody.errorCode).toBe(null);
    expect(responseBody.errorMessage).toBe(null);
    libraryPage.product.toBeCleanedUp = true;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
});

defineStep("User Click On Vertical Ellipsis Of The Product", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.product.clickOnVrtclEllipsis();
});

defineStep("User Click On Delete Option Of The Product", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.product.clickOnDeleteOption();
});

defineStep("User Click On Delete Button Of The Product", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.product.clickOnDeleteButton();
});

defineStep("Product Should Be Deleted", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isDeleted = await libraryPage.product.isDeleted();
  expect(isDeleted).toBeTruthy();
  libraryPage.product.toBeCleanedUp = false;
});

defineStep("Products Library Is Cleaned Up", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.product.clearAll();
});

defineStep("User Check All Products", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.selectAll();
});

defineStep("Delete Selection Button Should Be Disabled", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isDisabled = await libraryPage.isDeleteSelectionDisabled();
  expect(isDisabled).toBeTruthy();
  libraryPage.product.toBeCleanedUp = false;
});
