import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Click On Copy Option", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnCopyOption();
});

defineStep("User Should be Redirected To Copy Page", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const currentURL = await loadPage.getCurrentURL();
  expect(currentURL).toContain("copy");
});

defineStep("The Copied Load Should Be Saved", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isSaved = await loadPage.isCopiedLoadSaved();
  expect(isSaved).toBeTruthy();
  loadPage.isCopied = true;
});

defineStep("User Click On Save Load Button", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnSaveLoadFromCopyPage();
});
