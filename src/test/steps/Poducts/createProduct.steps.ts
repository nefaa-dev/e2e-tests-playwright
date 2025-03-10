import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { LibraryPage } from "../../../pages/libraryPage";
import { Container, ContainerKeys } from "../../../containers/Container";
let libraryPage: LibraryPage;

let expectedArray: number[];

defineStep("User Click On Add Product", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.clickOnAddProduct();
});

defineStep(
  "User Fill in the product properties {string}, {float}, {float}, {float}, {float}, {float}, And {float}",
  async (
    string,
    float,
    float2,
    float3,
    float4,
    float5,
    float6
  ): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    await libraryPage.fillFormInLibrary(
      string,
      float,
      float2,
      float3,
      float4,
      float5,
      float6
    );
    expectedArray = [
      Math.abs(float),
      Math.abs(float2),
      Math.abs(float3),
      Math.abs(float4),
      Math.abs(float5),
      Math.abs(float6),
    ];
  }
);

defineStep(
  "Typed Inputs Should Be As Expected According To {string}",
  async (shape): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    const actualArray = await libraryPage.product.getInputsValues(shape);
    expect(actualArray).toEqual(expectedArray);
  }
);

defineStep("User Click On Save and Close Button", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.clickOnSaveAndClose();
});

defineStep("Add Product Modal Should Be Closed", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.clickOnClose();
});

defineStep("Product Should Be Created", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isCreated = await libraryPage.checkForProductCreation();
  expect(isCreated).toBeTruthy();
  libraryPage.product.toBeCleanedUp = true;
});

defineStep("Product Should Not Be Saved", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isCreated = await libraryPage.product.isCreated();
  expect(isCreated).toBeFalsy();
});

defineStep("User Created Product", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.clickOnAddProduct();
  await libraryPage.product.setProductName();
  await libraryPage.product.addBox();
  await libraryPage.clickOnSaveAndClose();
  const isCreated = await libraryPage.checkForProductCreation();
  expect(isCreated).toBeTruthy();
  libraryPage.product.toBeCleanedUp = true;
});

defineStep("Add Product Button Should Be disabled", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isDisabled = await libraryPage.product.isAddProductDisabled();
  expect(isDisabled).toBeTruthy();
});

defineStep("Menu Options Should Be disabled", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isDisabled = await libraryPage.product.isMenuDisabled();
  expect(isDisabled).toBeTruthy();
  libraryPage.product.toBeCleanedUp = false;
});

defineStep(
  "User Set Product Name As {string}",
  async (name: string): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    await libraryPage.product.setProductName(name);
    libraryPage.product.name = name;
  }
);
