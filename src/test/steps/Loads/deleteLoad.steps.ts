import { expect } from "@playwright/test";
import { defineStep, When } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

When("User Click On Vertical Ellipsis", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnVerticallEllipsis();
});

defineStep("User Click On Delete Option", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnDeleteOption();
});

defineStep("User Confirm Deletion", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnDelete();
});

defineStep("Load Should Be Deleted", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isDeleted = await loadPage.isDeleted();
  expect(isDeleted).toBeTruthy();
  loadPage.toBeCleanedUp = false;
});

defineStep("User Delete The Load", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnVerticallEllipsis();
  await loadPage.clickOnDeleteOption();
  await loadPage.clickOnDelete();
  const isDeleted = await loadPage.isDeleted();
  expect(isDeleted).toBeTruthy();
  loadPage.toBeCleanedUp = false;
});
