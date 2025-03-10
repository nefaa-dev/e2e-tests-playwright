import { expect } from "@playwright/test";
import { defineStep, Then } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Click On Results Button", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnResultsButton();
});

defineStep(
  "User Should Be Redirected To Results Page",
  async (): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const isRedirected = await loadPage.checkForResultsRedirection();
    expect(isRedirected).toBeTruthy();
  }
);

defineStep("User Click On Generate PDF Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnGeneratePDF();
});

defineStep("PDf Should Be Generated", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isGenerated = await loadPage.checkForPDFGeneration();
  expect(isGenerated).toBeTruthy();
});

defineStep("User Click On View PDF Button", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnViewPdf();
});

defineStep("PDF File Should Be Opened In New Tab", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isOpened = await loadPage.checkForPdfOpenning();
  expect(isOpened).toBeTruthy();
});

Then(
  "the variants dropdown should show {string}",
  async (variant: string): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.verifyVariantsDropdown(variant);
  }
);
