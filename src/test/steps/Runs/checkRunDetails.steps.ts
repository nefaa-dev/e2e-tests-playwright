import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Check Total Products info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkTotalProducts();
});

defineStep("Total Products should be correct", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.verifyTotalProducts();
});

defineStep("User Check Total Items info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkTotalItems();
});

defineStep("Total Items should be correct", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.verifyTotalItems();
});

defineStep("User Check Filled volume info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkFilledVolume();
});

defineStep("Filled volume should be correct", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.verifyFilledVolume();
});

defineStep("User Check Filled weight info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkFilledWeight();
});

defineStep("Filled weight should be correct", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.verifyFilledWeight();
});

defineStep("User Check Total weight info", async function () {
  await loadPage.run.checkTotalWeight();
});

defineStep("Total weight should be correct", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.verifyTotalWeight();
});

defineStep("User Check Achieved height info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkAchievedHeight();
});

defineStep("Achieved height should be correct", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.verifyAchievedHeight();
});

defineStep("User Check Weight percentage info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkWeightPercentage();
});

defineStep("Weight percentage should be correct", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.verifyWeightPercentage();
});

defineStep("User Check Volume percentage info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkVolumePercentage();
});

defineStep("Volume percentage should be correct", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.verifyVolumePercentage();
});
