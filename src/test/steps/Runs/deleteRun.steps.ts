import { defineStep } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Click On All Loads Tab", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnAllLoads();
});

defineStep("User Click On The Load", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnTheLoad();
});

defineStep("User Click On Vertical Ellipsis Of The Run", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.clickOnVrtclEllipsis();
});

defineStep("User Click On Delete Option Of The Run", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.clickOnDeleteOption();
});

defineStep("User Click On Delete Button Of The Run", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.clickOnDeleteButton();
});

defineStep("Run Should Be Deleted", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isDeleted = await loadPage.run.isDeleted();
  expect(isDeleted).toBeTruthy();
});
