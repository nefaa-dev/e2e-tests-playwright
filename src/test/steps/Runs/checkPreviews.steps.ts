import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

let volUtil: any, weightUtil: any, packedItemsNbr: any, totalNbrOfCntnrs: any;
let expectedUsedCntnrs: boolean;

defineStep("User Should Be Redirected To Previews Page", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const currentUrl = await loadPage.getCurrentURL();
  expect(currentUrl).toContain("load-details");
  loadPage.locator('//h6[text="Run Result"]');
});

defineStep("User Check Used Containers", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.waitForTimeout(5000);
  expectedUsedCntnrs = await loadPage.run.preview.checkUsedContainers();
});

defineStep("Used Containers Should Be As Expected", async function () {
  expect(expectedUsedCntnrs).toBeTruthy();
});

defineStep("User Check Total Number Of Containers Info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  totalNbrOfCntnrs = await loadPage.run.preview.getTotalNbrOfContainers();
});

defineStep(
  "Total Number Of Containers Should Be As Expected",
  async function () {
    const expectedtotalNbrOfCntnrs = "1";
    expect(totalNbrOfCntnrs).toBe(expectedtotalNbrOfCntnrs);
  }
);

defineStep("User Check Volume Utilization Info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  volUtil = await loadPage.run.preview.getVolumeUtilization();
});

defineStep("Volume Utilization Should Be Correct", async function () {
  const expectedVolUtil = "19.6%";
  expect(volUtil).toBe(expectedVolUtil);
});
defineStep("User Check Weight Utilization Info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  weightUtil = await loadPage.run.preview.getWeightUtilization();
});

defineStep("Weight Utilization Should Be Correct", async function () {
  const expectedWeightUtil = "0.08%";
  expect(weightUtil).toBe(expectedWeightUtil);
});

defineStep("User Check Total Packed Items Info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  packedItemsNbr = await loadPage.run.preview.getTotalPackedItems();
});

defineStep("Total Packed Items Should Be Correct", async function () {
  const expectedItemsNbr = "20";
  expect(packedItemsNbr).toBe(expectedItemsNbr);
});

defineStep("Results Previews Should Be Inaccessible", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const previousUrl = await loadPage.run.getCurrentURL();
  await loadPage.run.clickOnTheRun();
  const currentUrl = await loadPage.run.getCurrentURL();
  expect(currentUrl).toBe(previousUrl);
});
