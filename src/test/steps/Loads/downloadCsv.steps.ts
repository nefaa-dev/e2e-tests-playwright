import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Click On Download Csv Option", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnDownloadCsv();
});

defineStep("Csv File Should Be Downloaded", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isDownloaded = await loadPage.isCsvDownloaded();
  expect(isDownloaded).toBeTruthy();
});

defineStep(
  "CSV File Content Should Be As Expected {string}",
  async (filePath: string) => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const isAsExpected = await loadPage.isExpectedCsv(filePath);
    expect(isAsExpected).toBeTruthy();
  }
);

defineStep("User Click On Download CSV Option In Run Page", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnDownloadCsvRunPage();
});

defineStep("User Click On The Vertical Ellipsis", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnVrtclEllipsisRunPage();
});

defineStep("User Click On The Run", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.clickOnTheRun();
});

defineStep("User Click On The Vertical Ellipsis In Previews Page", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.preview.clickOnVrtclEllipsis();
});

defineStep("User Click On Download CSV Option In Previews Page", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.preview.clickOnDownloadCsv();
});
