import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

let totalPackedItems: number;
let totalUnpackedItems: number;

defineStep(
  "Run Should Be {string} Packed",
  async function (packedAsExpected: string) {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const packing = await loadPage.run.getPackingRslt();
    expect(packing).toBe(packedAsExpected);
  }
);

defineStep("User Get The Total Items Of Each Container", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  totalPackedItems = await loadPage.run.getTotalPackedItems();
});

defineStep("User Click On Remaining Products Button", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.clickOnRemainingPrdcts();
});

defineStep("User Close The Remaining Products Modal", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.closeRemainingProductsModal();
});

defineStep("User Get The Total Unpacked Items", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  totalUnpackedItems = await loadPage.run.getTotalUnpackedItems();
});

defineStep(
  "Sum of Packed And Unpacked Items Should Be Equal To The Total Quantity",
  async function () {
    const totalQuantity: number = 80;
    expect(totalPackedItems + totalUnpackedItems).toEqual(totalQuantity);
  }
);

defineStep(
  "Remaning Products Should Be As Expected In {string}",
  async function (filePath: string) {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.run.checkRemainingProducts(filePath);
  }
);

defineStep("User Click On Unpacked Products Option", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.clickOnUnpackedProducts();
});
