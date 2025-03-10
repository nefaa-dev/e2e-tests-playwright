import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Click On Check All box", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.selectAll();
});

defineStep("All Loads Should Be Checked", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const areChecked = await loadPage.areAllChecked();
  expect(areChecked).toBeTruthy();
});
defineStep("User Click On Delete Selection Button", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnDeleteSelection();
});

defineStep("Loads Should Be Deleted", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.isDashboardTableCleared();
});
