import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Click On Lock Icon", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnLockIcon();
});

defineStep("User Click On Lock Icon In Run Page", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnLockIconRunPage();
});

defineStep("User Click On Confirm Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnConfirmButton();
});

defineStep("User Click On Shared Loads Tab", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnSharedLoadsTab();
});

defineStep("Load Should Be Shared", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isShared = await loadPage.isShared();
  expect(isShared).toBeTruthy();
});

defineStep("User Click On Loads", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnLoads();
});
