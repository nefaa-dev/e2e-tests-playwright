import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Click On Edit Option", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnEditOption();
});

defineStep("User Should be Redirected To Edit Page", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const currentURL = await loadPage.getCurrentURL();
  expect(currentURL).toContain("edit");
});

defineStep("User Edit The Load", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.edit();
});

defineStep(
  "User Click On Update Load Button From Edit Page",
  async function () {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.clickOnUpdateLoad();
  }
);
