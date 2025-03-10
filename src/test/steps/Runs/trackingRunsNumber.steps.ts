import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

let nbrOfRunsBefore: number;
defineStep("User Get The Number Of Available Runs", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  nbrOfRunsBefore = await loadPage.run.getNumberOfRuns();
});

defineStep(
  "Number Of Available Runs Should Be Decremented By One",
  async function () {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const nbrOfRunsAfter = await loadPage.run.getNumberOfRuns();
    expect(nbrOfRunsAfter).toEqual(nbrOfRunsBefore - 1);
  }
);

defineStep("User Click On New Run Button", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.clickOnNewRun();
});
